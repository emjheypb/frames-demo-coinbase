import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

const images = ["book_blue", "book_brown", "book_purple"];

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const searchParams = req.nextUrl.searchParams;
  const id: any = searchParams.get("id");
  const idAsNumber = parseInt(id);

  if (idAsNumber === 3) {
    return new NextResponse(
      `<!DOCTYPE html><html>
        <head>
        <title>Frame 7</title>
        <meta property="fc:frame" content="vNext"/>
        <meta property="fc:frame:image" content="${
          process.env.NEXT_PUBLIC_BASE_URL
        }/${images[id - 1]}.png"/>
        <meta property="fc:frame:button:1" content="GitHub"/>
        <meta property="fc:frame:button:1:action" content="post_redirect"/>
        <meta property="fc:frame:button:2" content="YouTube Link"/>
        <meta property="fc:frame:button:2:action" content="link"/>
        <meta property="fc:frame:button:2:target" content="https://youtube.com"/>
        <meta property="fc:frame:button:3" content="OnChainKit"/>
        <meta property="fc:frame:button:3:post_url" content="${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/onchaintest"/>
        <meta property="fc:frame:post_url" content="${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/end"/>
        </head>
        </html>`
    );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        ogTitle: `Frame ${id}`,
        buttons: [
          {
            label: "HOME",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          },
          {
            label: "<",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${
              idAsNumber === 1 ? 1 : idAsNumber - 1
            }`,
          },
          {
            label: ">",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${
              idAsNumber > images.length ? images.length : idAsNumber + 1
            }`,
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_BASE_URL}/${images[id - 1]}.png`,
          aspectRatio: "1:1",
        },
        postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      })
    );
  }
};

export const POST = async (req: NextRequest): Promise<Response> => {
  return getResponse(req);
};

export const dynamic = "force-dynamic";
