import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<Response> => {
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;

  const path = buttonId === 1 ? "gotogithub" : "gotoyoutube";

  const headers = new Headers();
  headers.set("Location", `${process.env.NEXT_PUBLIC_BASE_URL}/`);

  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${path}`,
    {
      headers: headers,
      status: 302,
    }
  );

  return response;
};

export const dynamic = "force-dynamic";
