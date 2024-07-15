import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const request = await req.json();
    const email = request.untrustedData.inputText;

    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      const searchParams = new URLSearchParams({
        title: "Invalid Email",
      });

      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: "BACK",
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
            },
            {
              label: "REGISTER",
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/onchaintest`,
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/og?${searchParams}`,
            aspectRatio: "1:1",
          },
          input: {
            text: "EMAIL",
          },
          postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        })
      );
    }

    const { data, error } = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    if (error) {
      const searchParams = new URLSearchParams({
        title: "An error occurred. Try again.",
      });

      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: "BACK",
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
            },
            {
              label: "REGISTER",
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/onchaintest`,
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/og?${searchParams}`,
            aspectRatio: "1:1",
          },
          input: {
            text: "EMAIL",
          },
          postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        })
      );
    }

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "HOME",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_BASE_URL}/heart.png`,
          aspectRatio: "1:1",
        },
        postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      })
    );
  } catch (error) {
    const searchParams = new URLSearchParams({
      title: "An error occurred. Try again.",
    });

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "BACK",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
          },
          {
            label: "REGISTER",
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/onchaintest`,
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_BASE_URL}/og?${searchParams}`,
          aspectRatio: "1:1",
        },
        input: {
          text: "EMAIL",
        },
        postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      })
    );
  }
}
