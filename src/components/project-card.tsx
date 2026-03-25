import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={
        "group relative flex flex-col overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm hover:border-border/80 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 ease-out h-full"
      }
    >
      {/* Gradient top accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link
        href={href || "#"}
        className={cn("block cursor-pointer overflow-hidden", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {image && (
          <div className="relative overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}
      </Link>
      <CardHeader className="px-3 pt-3">
        <div className="space-y-1.5">
          <CardTitle className="mt-1 text-base font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
            {title}
          </CardTitle>
          <time className="font-sans text-xs text-muted-foreground">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert line-clamp-3">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-3">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags?.map((tag) => (
              <Badge
                className="px-2 py-0.5 text-[10px] bg-muted/50 text-muted-foreground border border-border/30 hover:bg-muted/80 transition-colors"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-3 pb-3">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1.5">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge
                  key={idx}
                  className="flex gap-2 px-2.5 py-1 text-[10px] bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
