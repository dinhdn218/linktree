import HomePage, { LinkRecord, ConfigRecord } from "@/modules/HomePage";
import { Metadata } from "next";

const getLinks = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/links?sort[0][field]=id&sort[0][direction]=asc`,
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

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getConfigs();
  const title = data?.records?.find(
    (r: ConfigRecord) => r.fields.title === "site_title"
  )?.fields.value;
  const description = data?.records?.find(
    (r: ConfigRecord) => r.fields.title === "site_description"
  )?.fields.value;
  return {
    title: title || "Đinh Ngọc Định",
    description: description || "I'm a Frontend Engineer",
  };
};

export default async function Home() {
  const linkRecords: LinkRecord[] = await getLinks();
  const configRecords: ConfigRecord[] = await getConfigs();
  return (
    <>
      <HomePage linkRecords={linkRecords} configRecords={configRecords} />
    </>
  );
}
