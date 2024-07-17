import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function getResponse(req: NextRequest): Promise<NextResponse> {
  try {
    const body: FrameRequest = await req.json();
    const { untrustedData } = body;
    const email = untrustedData.inputText;

    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      const searchParams = new URLSearchParams({
        title: email
          ? "Invalid Email"
          : "Enter your email address to register!",
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
            src: `${process.env.NEXT_PUBLIC_BASE_URL}/og?title=Invalid+Email`,
            aspectRatio: "1:1",
          },
          input: {
            text: `EMAIL`,
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

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
