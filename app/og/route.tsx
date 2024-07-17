import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title") : "Title";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          {title}
        </div>
      ),
      {
        width: 630,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};
