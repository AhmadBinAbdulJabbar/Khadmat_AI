import { NextResponse } from "next/server";
import { runServiceOrchestration } from "@/lib/agentic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message : "";
    const sessionId = typeof body.session_id === "string" ? body.session_id : undefined;

    if (!message.trim()) {
      return NextResponse.json({ detail: "message is required" }, { status: 400 });
    }

    const result = runServiceOrchestration(message, { sessionId });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        detail: error instanceof Error ? error.message : "Unable to process service request",
      },
      { status: 500 },
    );
  }
}
