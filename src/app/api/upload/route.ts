import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const dir = join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const fileName = `${Date.now()}-${file.name.replaceAll(" ", "-")}`;
  await writeFile(join(dir, fileName), buffer);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
