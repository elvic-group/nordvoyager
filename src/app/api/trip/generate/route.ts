import { NextRequest, NextResponse } from "next/server";
import { tripInputSchema } from "@/lib/validators/trip";
import { streamTrip } from "@/lib/ai/generator";
import { saveTripToDb } from "@/lib/services/db-service";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = tripInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "ValidationError", details: parsed.error.issues },
        { status: 422 },
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let finalTrip: any = null;

        try {
          for await (const event of streamTrip(parsed.data)) {
            if (event.type === "day") {
              const data = JSON.stringify({ type: "day", day: event.day });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            } else if (event.type === "complete") {
              finalTrip = event.trip;
            }
          }

          // Persist to DB
          const session = await auth();
          const userId = session?.user?.id || "anonymous";
          try {
            await saveTripToDb(finalTrip, userId);
          } catch (dbError) {
            console.error("Failed to persist trip to DB:", dbError);
          }

          // Send complete event with trip data
          const completeData = JSON.stringify({
            type: "complete",
            trip: finalTrip,
          });
          controller.enqueue(encoder.encode(`data: ${completeData}\n\n`));
        } catch (error) {
          const errorData = JSON.stringify({
            type: "error",
            error: "Generation failed",
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Trip generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
