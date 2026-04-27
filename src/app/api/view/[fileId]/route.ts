import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    if (!process.env.TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ error: "Bot token not configured" }, { status: 500 });
    }

    // 1. Get file path from Telegram
    const fileRes = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`);
    const fileData = await fileRes.json();
    
    if (!fileData.ok) {
      return NextResponse.json({ error: "Failed to get file info" }, { status: 500 });
    }

    const filePath = fileData.result.file_path;
    const downloadUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`;

    // 2. Determine content type based on extension
    let contentType = "application/octet-stream";
    const lowerPath = filePath.toLowerCase();
    if (lowerPath.endsWith('.pdf')) contentType = "application/pdf";
    else if (lowerPath.endsWith('.jpg') || lowerPath.endsWith('.jpeg')) contentType = "image/jpeg";
    else if (lowerPath.endsWith('.png')) contentType = "image/png";

    // 3. Fetch binary data
    const binaryRes = await fetch(downloadUrl);
    if (!binaryRes.ok) throw new Error("Failed to fetch from Telegram storage");
    
    const buffer = await binaryRes.arrayBuffer();

    // Use raw Response for maximum header control
    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="artifact_${fileId.slice(0, 8)}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "Access-Control-Allow-Origin": "*", // Allow cross-origin preview if needed
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
