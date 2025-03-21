"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckIcon, CopyIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";

export type Link = {
  title: string;
  url: string;
  id: number;
};

export type Config = {
  title: string;
  value: string;
  id: number;
};

export type LinkRecord = {
  id: string;
  createdTime: string;
  fields: Link;
};

export type ConfigRecord = {
  id: string;
  createdTime: string;
  fields: Config;
};

export default function HomePage({
  linkRecords,
  configRecords,
}: {
  linkRecords: LinkRecord[];
  configRecords: ConfigRecord[];
}) {
  const curHref: string =
    typeof window !== "undefined" ? window.location.href : "";
  const [modal, setModal] = useState<{
    open: boolean;
    link: { title: string; url: string };
  }>({
    open: false,
    link: {
      title: "",
      url: "",
    },
  });
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  return (
    <main className="relative p-4 min-h-screen bg-gradient-to-b from-indigo-300 via-green-300 to-teal-300 dark:bg-gradient-to-b dark:from-background dark:via-muted dark:to-muted">
      <ModeToggle />
      <div className="max-w-2xl p-4 md:p-0 mx-auto md:my-8 absolute top-4 right-0 left-0">
        <Button
          aria-label="share-this-site"
          variant={"secondary"}
          size={"icon"}
          className="rounded-full absolute top-0 md:left-full right-4 cursor-pointer"
          onClick={() =>
            setModal({
              open: true,
              link: { title: "Đinh Ngọc Định", url: curHref },
            })
          }
        >
          <DotsHorizontalIcon />
        </Button>

        <Avatar className="h-30 w-30 md:h-40 md:w-40 mx-auto object-cover">
          <Image
            src={
              configRecords?.find(
                (r: ConfigRecord) => r.fields.title === "main_avatar"
              )?.fields?.value || "https://github.com/shadcn.png"
            }
            priority
            fill
            alt={""}
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Avatar>

        <section className="text-center mt-5">
          <h1 className="text-xl font-semibold">
            {
              configRecords?.find(
                (r: ConfigRecord) => r.fields.title === "main_title"
              )?.fields?.value
            }
          </h1>
          <p>
            {
              configRecords?.find(
                (r: ConfigRecord) => r.fields.title === "main_description"
              )?.fields?.value
            }
          </p>
        </section>

        <section className="flex flex-col w-full mx-auto gap-4 mt-8">
          {linkRecords.map((record: LinkRecord, index: number) => (
            <Fragment key={index}>
              <motion.div
                whileHover={{
                  scale: 1.015,
                  transition: { duration: 0.1 },
                }}
                transition={{ ease: "easeInOut" }}
                className="rounded-full overflow-hidden shadow-md relative"
              >
                <a
                  href={record.fields.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-5 px-12 text-center bg-white text-neutral-950 block dark:bg-cyan-950 dark:text-white"
                >
                  <span className="leading-snug">{record.fields.title}</span>
                </a>

                <div className="absolute top-0 right-0 h-full aspect-square">
                  <Button
                    aria-label="share-social"
                    variant={"ghost"}
                    size={"icon"}
                    className="rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() =>
                      setModal({
                        open: true,
                        link: record.fields,
                      })
                    }
                  >
                    <DotsHorizontalIcon />
                  </Button>
                </div>
              </motion.div>
            </Fragment>
          ))}
        </section>
      </div>
      <Dialog
        open={modal.open}
        onOpenChange={(open: boolean) => setModal({ ...modal, open })}
      >
        <DialogContent
          className="max-w-full md:max-w-lg absolute top-full -translate-y-full sm:top-1/2 sm:-translate-y-1/2 rounded-none sm:rounded-lg"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-base md:text-lg font-bold">
              Chia sẻ Link
            </DialogTitle>
            <div>
              <div className="flex items-center gap-2 md:gap-4 relative">
                {modal.link.url === curHref ? (
                  <div className="relative aspect-video w-full rounded-3xl">
                    <Image
                      src="/opengraph-image"
                      alt="og-image"
                      className="rounded-xl"
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <motion.a
                    whileHover={{
                      scale: 1.015,
                      transition: { duration: 0.3 },
                    }}
                    transition={{ ease: "easeInOut" }}
                    href={modal.link.url}
                    target="_blank"
                    className="flex flex-col gap-1 items-center py-4 px-5 w-full md:max-w-80 mx-auto bg-stone-200 rounded-3xl my-3 dark:bg-accent"
                  >
                    <h3 className="text-lg md:text-xl font-bold leading-snug">
                      {modal.link.title}
                    </h3>
                    <p className="text-[13px] text-center whitespace-nowrap w-36 text-ellipsis overflow-hidden">
                      {modal.link.url}
                    </p>
                  </motion.a>
                )}
                <div
                  onClick={() => {
                    setCopiedLink(true);
                    setTimeout(() => {
                      setCopiedLink(false);
                    }, 2000);
                    navigator.clipboard.writeText(modal.link.url);
                  }}
                  className="rounded-full w-8 h-8 md:w-10 md:h-10 absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer bg-stone-200 dark:bg-accent flex items-center justify-center p-2 md:p-2.5"
                >
                  {copiedLink ? (
                    <CheckIcon className="w-full h-full" />
                  ) : (
                    <CopyIcon className="w-full h-full" />
                  )}
                </div>
              </div>

              <div className="flex gap-4 md:gap-8 justify-center mt-6 mb-3 items-start">
                <TwitterShareButton url={modal.link.url}>
                  <XIcon className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden" />
                </TwitterShareButton>
                <FacebookShareButton url={modal.link.url}>
                  <FacebookIcon className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden" />
                </FacebookShareButton>
                <LinkedinShareButton url={modal.link.url}>
                  <LinkedinIcon className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden" />
                </LinkedinShareButton>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
