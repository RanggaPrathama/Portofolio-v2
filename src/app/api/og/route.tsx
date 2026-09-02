import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DATA } from "@/data/resume";
import { ImageResponse } from "next/og";

/**
 * Dynamic social-sharing card with a static fallback.
 * Primary path: render a branded 1200x630 card via `next/og` (ImageResponse)
 * Fallback: if the dynamic card fails to render, serve a static fallback image from `public/og.jpeg`.
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
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#000000",
          fontFamily: "'Inter', sans-serif",
          padding: "80px 120px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 500,
            color: "#a1a1aa",
            letterSpacing: "0.05em",
            marginBottom: 32,
            textTransform: "uppercase",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ marginRight: 16 }}
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          rangga-dev.vercel.app
        </div>

        {/* Judul Utama */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 30 ? 64 : 84,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: 24,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 400,
            color: "#a1a1aa",
            lineHeight: 1.5,
            maxWidth: 900,
          }}
        >
          {description}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch {
    const file = await readFile(join(process.cwd(), "public", "og.jpeg"));
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
}
