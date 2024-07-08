import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Start",
    },
  ],
  image: `${process.env.VERCEL_URL}/next.svg`,
  postUrl: `${process.env.VERCEL_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: "Frames Demo",
  description: "Second attempt on frames using coinbase",
  openGraph: {
    title: "Frames Demo",
    description: "Second attempt on frames using coinbase",
    images: [`${process.env.VERCEL_URL}/next.svg`],
  },
  other: { ...frameMetadata },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello, world!
    </main>
  );
}
