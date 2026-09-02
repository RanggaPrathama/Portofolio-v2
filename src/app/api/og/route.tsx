import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DATA } from "@/data/resume";
import { ImageResponse } from "next/og";

/**
 * Dynamic social-sharing card with a static fallback.
 * Primary path: render a branded 1200x630 card via `next/og` (ImageResponse)
 * Fallback: if the dynamic card fails to render, serve a static fallback image from `public/og.png`.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || DATA.name;
    const description = searchParams.get("desc") || DATA.description;

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(59,130,246,0.28) 0%, transparent 50%), radial-gradient(circle at 82% 80%, rgba(139,92,246,0.28) 0%, transparent 50%)",
          fontFamily: "'Inter', sans-serif",
          color: "#f9fafb",
          padding: "48px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: title.length > 30 ? 56 : 76, 
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 36,
            fontWeight: 600,
            color: "#d1d5db",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          {description}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 22,
            fontWeight: 600,
            color: "#60a5fa",
            letterSpacing: "0.04em",
          }}
        >
          RANGGA-DEV.VERCEL.APP
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch {
    const png = await readFile(join(process.cwd(), "public", "og.png"));
    return new Response(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
}
