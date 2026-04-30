/** @format */

import { NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Only allow image types
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, GIF images are allowed" },
        { status: 400 }
      );
    }

    // Sanitize filename
    const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    writeFileSync(filePath, buffer);

    return NextResponse.json({ path: `/uploads/${filename}` });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
