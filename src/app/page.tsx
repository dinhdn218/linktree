import HomePage from "@/modules/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linktree Đinh Ngọc Định",
  description: "Linktree của Đinh Ngọc Định",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Linktree Đinh Ngọc Định",
    description: "Linktree của Đinh Ngọc Định",
    images: {
      url: "/opengraph-image", // Points to the API route
      width: 1200,
      height: 630,
      alt: "My Open Graph Image",
    },
    type: "website",
    url: "https://dnd-portfolio.vercel.app/",
  },
};

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
