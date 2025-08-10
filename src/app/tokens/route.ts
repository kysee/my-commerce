import { tokens } from "@/db/tokens";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json(tokens);
}