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

    // image
    const imageBuffer = await readFile(
      join(process.cwd(), "public", "og.jpeg"),
    );
    const base64Image = imageBuffer.toString("base64");
    const imageSrc = `data:image/jpeg;base64,${base64Image}`;
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#0a0a0a", // Warna hitam pekat
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Latar Belakang Grid SVG */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          width="1200"
          height="630"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Konten Utama */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 48,
            width: "100%",
          }}
        >
          {/* Badge Pill di Atas */}
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 9999, // Membuat bentuk kapsul
              padding: "6px 24px",
              color: "#e4e4e7",
              fontSize: 20,
              letterSpacing: "0.02em",
            }}
          >
            rangga-dev.vercel.app
          </div>

          {/* Judul Dinamis */}
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: title.length > 25 ? 48 : 56, // Mengecil otomatis jika judul panjang
              fontWeight: 700,
              marginTop: 20,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>

          {/* Deskripsi Dinamis */}
          <div
            style={{
              display: "flex",
              color: "#a1a1aa",
              fontSize: 24,
              fontWeight: 400,
              marginTop: 12,
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>

          {/* Card Gambar */}
          <div
            style={{
              display: "flex",
              marginTop: 32,
              width: 1040,
              height: 400,
              borderRadius: 16,
              overflow: "hidden", // Memastikan gambar mengikuti border radius
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="Avatar Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
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
