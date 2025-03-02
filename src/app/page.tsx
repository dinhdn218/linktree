import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Fragment } from "react";

const links: {
  title: string;
  url: string;
}[] = [
  { title: "Github", url: "https://github.com/dinhdn218" },
  { title: "Linkedin", url: "https://www.linkedin.com/in/dinhdn218/" },
  { title: "Facebook", url: "https://www.facebook.com/dinhdn218/" },
  { title: "Instagram", url: "https://www.instagram.com/d.ngocdinh/" },
  { title: "Tiktok", url: "https://www.tiktok.com/@dinhdn218" },
  { title: "Email", url: "mailto:dinhdn218@gmail.com" },
];

export default function Home() {
  return (
    <main className="py-8 px-4 min-h-screen bg-gradient-to-b from-indigo-300 via-green-300 to-teal-300">
      <div className="max-w-2xl mx-auto my-8 relative">
        <Avatar className="h-24 w-24 mx-auto">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback />
        </Avatar>

        <section className="text-center mt-5">
          <h1 className="text-xl font-semibold">Đinh Ngọc Định</h1>
          <p>I&apos;m a Frontend Developer</p>
        </section>

        <section className="flex flex-col w-full mx-auto gap-4 mt-8">
          {links.map((link: { title: string; url: string }) => (
            <Fragment key={link.url}>
              <div className="rounded-full overflow-hidden shadow-md relative">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-5 px-12 text-center bg-white text-neutral-950 block"
                >
                  <span className="leading-snug">{link.title}</span>
                </a>

                <div className="absolute top-0 right-0 h-full aspect-square">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    <DotsHorizontalIcon />
                  </Button>
                </div>
              </div>
            </Fragment>
          ))}
        </section>
      </div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
