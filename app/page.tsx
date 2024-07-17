import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "START",
    },
  ],
  image: {
    src: `${process.env.NEXT_PUBLIC_BASE_URL}/human.png`,
    aspectRatio: "1:1",
  },
  postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: "Frames Demo",
  description: "Second attempt on frames using coinbase",
  openGraph: {
    title: "Frames Demo",
    description: "Second attempt on frames using coinbase",
    images: [
      `https://media.wired.com/photos/593221d8b8eb31692072dedf/master/w_2560%2Cc_limit/MJ-giphy.gif`,
    ],
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
