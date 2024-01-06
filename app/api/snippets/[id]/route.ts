import { NextRequest, NextResponse } from "next/server";
import { deleteSnippet, readSnippet, updateSnippet } from "./service";
import { getQueryParams } from "@/lib/server-utils";
import { z } from "zod";

const readAllSnippetSchema = z.object({
  userId: z.string().min(1),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const queryParams = getQueryParams(req) as typeof readAllSnippetSchema._type;
  return NextResponse.json(await readSnippet(Number(params.id), queryParams));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  return NextResponse.json(await updateSnippet(Number(params.id), body));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(await deleteSnippet(Number(params.id)));
}
