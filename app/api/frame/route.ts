import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

const images = ["book_blue", "book_brown", "book_purple"];

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const searchParams = req.nextUrl.searchParams;
  const id: any = searchParams.get("id");
  const idAsNumber = parseInt(id);

  if (idAsNumber === images.length) {
    return new NextResponse(
      getFrameHtmlResponse({
        ogTitle: `Frame ${id}`,
        buttons: [
          {
            label: "Github",
            action: "post_redirect",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/end`,
          },
          {
            label: "YouTube",
            action: "link",
            target: `https://youtube.com`,
          },
          {
            label: "HOME",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
          },
          {
            label: "OnChainKit",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/onchaintest`,
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_BASE_URL}/${images[id - 1]}.png`,
          aspectRatio: "1:1",
        },
        postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/end`,
      })
    );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        ogTitle: `Frame ${id}`,
        buttons: [
          {
            label: "<",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${
              idAsNumber === 1 ? 1 : idAsNumber - 1
            }`,
          },
          {
            label: "HOME",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
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
