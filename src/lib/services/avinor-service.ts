import { City } from "@/lib/types";

interface AvinorFlight {
  uniqueId?: string;
  flightId: string;
  airline: string;
  airport: string;
  scheduleTime: string;
  arrDep: string;
  arrivalAirport?: string;
  departureAirport?: string;
  gate?: string;
  checkIn?: string;
  beltNumber?: string;
  viaAirport?: string;
  statusCode?: string;
  statusTime?: string;
  domInt: string;
}

interface AvinorFlightResponse {
  flights: AvinorFlight[];
  lastUpdate: string;
}

const AVINOR_BASE = "https://asrv.avinor.no/XmlFeed/v1.0";

const AIRPORT_IATA: Record<City, string> = {
  tromso: "TOS",
  bodo: "BOO",
  alta: "ALF",
  svalbard: "LYR",
  lofoten: "EVE",
  senja: "",
  narvik: "EVE",
  hammerfest: "HFT",
};

export async function fetchFlights(
  city: City,
  direction: "D" | "A" = "D",
  timeFrom = 1,
  timeTo = 12,
): Promise<AvinorFlightResponse> {
  const iata = AIRPORT_IATA[city];
  if (!iata) {
    return { flights: [], lastUpdate: new Date().toISOString() };
  }

  const url = `${AVINOR_BASE}?airport=${iata}&direction=${direction}&TimeFrom=${timeFrom}&TimeTo=${timeTo}`;

  try {
    const res = await fetch(url, { next: { revalidate: 180 } });
    if (!res.ok) throw new Error(`Avinor API returned ${res.status}`);

    const xmlText = await res.text();
    return parseAvinorXml(xmlText);
  } catch (error) {
    console.error("Avinor fetch failed:", error);
    return { flights: [], lastUpdate: new Date().toISOString() };
  }
}

function parseAvinorXml(xml: string): AvinorFlightResponse {
  const flights: AvinorFlight[] = [];
  const simpleXml = xml.replace(/\s+/g, " ").trim();

  // Extract lastUpdate from flights element
  const lastUpdateMatch = simpleXml.match(/<flights\s+lastUpdate="([^"]+)"/);
  const lastUpdate = lastUpdateMatch?.[1] || new Date().toISOString();

  // Simple regex-based XML parsing for flight elements
  const flightRegex = /<flight[^>]*>([\s\S]*?)<\/flight>/g;
  let match;

  while ((match = flightRegex.exec(simpleXml)) !== null) {
    const flightXml = match[1];
    const flight: AvinorFlight = {
      uniqueId: extractXmlValue(flightXml, "uniqueId") || undefined,
      flightId:
        extractXmlValue(flightXml, "flight_id") ||
        extractXmlValue(flightXml, "flightId") ||
        "",
      airline: extractXmlValue(flightXml, "airline") || "",
      airport: extractXmlValue(flightXml, "airport") || "",
      scheduleTime: extractXmlValue(flightXml, "schedule_time") || "",
      arrDep: extractXmlValue(flightXml, "arr_dep") || "",
      gate: extractXmlValue(flightXml, "gate") || undefined,
      checkIn: extractXmlValue(flightXml, "check_in") || undefined,
      beltNumber: extractXmlValue(flightXml, "belt_number") || undefined,
      viaAirport: extractXmlValue(flightXml, "via_airport") || undefined,
      statusCode: extractXmlValue(flightXml, "status", "code") || undefined,
      statusTime: extractXmlValue(flightXml, "status", "time") || undefined,
      domInt: extractXmlValue(flightXml, "dom_int") || "",
    };

    // Determine arrival vs departure airport
    if (flight.arrDep === "D") {
      flight.departureAirport = "TOS";
      flight.arrivalAirport = flight.airport;
    } else {
      flight.arrivalAirport = "TOS";
      flight.departureAirport = flight.airport;
    }

    flights.push(flight);
  }

  return { flights, lastUpdate };
}

function extractXmlValue(
  xml: string,
  tag: string,
  attribute?: string,
): string | null {
  if (attribute) {
    const attrRegex = new RegExp(`<${tag}[^>]*${attribute}="([^"]+)"`);
    const match = attrRegex.exec(xml);
    return match?.[1] || null;
  }

  const valueRegex = new RegExp(`<${tag}>([^<]+)<\/${tag}>`);
  const match = valueRegex.exec(xml);
  return match?.[1] || null;
}

export type { AvinorFlight, AvinorFlightResponse };
