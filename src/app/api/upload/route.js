import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ "message": "No file found" });
    }

    const byteData = await file.arrayBuffer();
    const buffer=Buffer.from(byteData);
    const path = `./public/images/${file.name}`;

    await writeFile(path, Buffer.from(buffer));

    return NextResponse.json({ "message": "File uploaded", success: true });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.error(new Error("Internal server error"));
  }
}

