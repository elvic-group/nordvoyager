import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatDate,
  formatTemp,
  generateId,
} from "@/lib/utils/formatters";

describe("formatCurrency", () => {
  it("formats Norwegian kroner", () => {
    expect(formatCurrency(21000)).toBe("21\u00a0000 kr");
  });

  it("formats small amounts", () => {
    expect(formatCurrency(400)).toBe("400 kr");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("0 kr");
  });
});

describe("formatDate", () => {
  it("formats a Norwegian date string", () => {
    expect(formatDate("2025-01-05")).toContain("5.");
  });
});

describe("formatTemp", () => {
  it("formats positive temperatures", () => {
    expect(formatTemp(5)).toBe("5 °C");
  });

  it("formats negative temperatures", () => {
    expect(formatTemp(-3)).toBe("-3 °C");
  });
});

describe("generateId", () => {
  it("generates a string with trip_ prefix", () => {
    const id = generateId();
    expect(id).toMatch(/^trip_/);
  });

  it("generates unique IDs", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });
});
