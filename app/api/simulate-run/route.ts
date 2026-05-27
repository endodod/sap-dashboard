import { NextResponse } from "next/server";
import type { SimulationRun } from "@/lib/simulationTypes";

// TODO: Set SAP_AGENT_URL in environment once sap-agent /api/simulate-run is implemented.
// Expected response shape: SimulationRun (see lib/simulationTypes.ts)
const SAP_AGENT_URL = process.env.SAP_AGENT_URL ?? "https://agent.paulkuehn.ch";

export async function GET() {
  try {
    const res = await fetch(`${SAP_AGENT_URL}/api/simulate-run`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(30_000),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { status: "error", message: `Agent returned HTTP ${res.status}` },
        { status: 502 }
      );
    }

    const run: SimulationRun = await res.json();
    return NextResponse.json(run);
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "TimeoutError";
    return NextResponse.json(
      {
        status: "unavailable",
        message: isTimeout
          ? "Simulation timed out — the agent server may be starting up."
          : "Agent server not reachable. Implement sap-agent /api/simulate-run.",
      },
      { status: 503 }
    );
  }
}
