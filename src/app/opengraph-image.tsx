/* eslint-disable @next/next/no-img-element */
import { ConfigRecord } from "@/modules/HomePage";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const getConfigs = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/configs?sort[0][field]=id&sort[0][direction]=asc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.records;
};

// Image generation
export default async function Image() {
  const data = await getConfigs();
  // Font loading, process.cwd() is Next.js project directory
  const caladeaBold = await readFile(
    join(process.cwd(), "src/fonts/Caladea/Caladea-Bold.ttf")
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "#113c4d",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={
              data?.find((r: ConfigRecord) => r.fields.title === "main_avatar")
                ?.fields?.value || "https://github.com/shadcn.png"
            }
            alt="image-sample"
            style={{
              width: "300",
              height: "300",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            fetchPriority="high"
          />
          <h2
            style={{
              fontSize: 40,
              color: "#FFFFFF",
            }}
          >
            Hi, I&apos;m Dinh, nice to connect with you!
          </h2>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Caladea",
          data: caladeaBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
