import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #062840 0%, #0e507b 60%, #093d60 100%)",
          padding: "60px",
        }}
      >
        {/* Logo */}
        <img
          src={`${siteConfig.siteUrl}/images/Logo.png`}
          alt={siteConfig.name}
          width={320}
          height={160}
          style={{ objectFit: "contain", marginBottom: "40px" }}
        />

        {/* Tagline */}
        <p
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            maxWidth: "700px",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.description}
        </p>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#19AFAF",
            }}
          />
          <span style={{ fontSize: "18px", color: "#19AFAF", fontWeight: 700 }}>
            {siteConfig.siteUrl.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    size
  );
}
