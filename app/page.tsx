/** @format */

"use client";

import { useState } from "react";
import { SITE_CONTENT, T } from "@/lib/site-content";

// ─── Brand icons (inline, self-contained) ──────────────────────────────────────

function WaIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 6.3A8 8 0 0 0 4.4 16l-1.1 4 4.1-1.1a8 8 0 0 0 12-7 8 8 0 0 0-1.8-5.6zm-5.6 12.3a6.6 6.6 0 0 1-3.4-.9l-.2-.2-2.4.7.7-2.4-.2-.3a6.6 6.6 0 1 1 12.2-3.5 6.6 6.6 0 0 1-6.7 6.6zm3.7-5c-.2-.1-1.2-.6-1.4-.6-.2-.1-.3-.1-.5.1l-.6.7c-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.7-1-.6-.5-1-1.2-1.2-1.4-.1-.2 0-.3.1-.4l.3-.4.2-.3c.1-.1 0-.2 0-.4l-.6-1.4c-.1-.4-.3-.3-.4-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.7-.8 1.8 0 1 .7 2 .8 2.1.1.1 1.5 2.4 3.7 3.3.5.2.9.4 1.2.5.5.2 1 .1 1.4.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1z" />
    </svg>
  );
}

function IgIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TiktokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 3c.3 2 1.6 3.6 3.5 3.9v2.6c-1.3.1-2.5-.3-3.6-1v5.7a5.2 5.2 0 1 1-5.2-5.2c.3 0 .5 0 .8.1v2.7a2.6 2.6 0 1 0 1.8 2.5V3h2.7z" />
    </svg>
  );
}

function MailIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function CheckIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CopyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

// ─── Biolink button ─────────────────────────────────────────────────────────────

type BtnProps = {
  href?: string;
  onClick?: () => void;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
};

function BioButton({ href, onClick, label, sublabel, icon }: BtnProps) {
  const inner = (
    <>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: 12,
          flexShrink: 0,
          background: T.chip1,
          color: T.primaryDark,
        }}
      >
        {icon}
      </span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.25, textAlign: "left", minWidth: 0 }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>{label}</span>
        {sublabel && (
          <span
            style={{
              fontSize: 12.5,
              fontWeight: 500,
              color: T.textMuted,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {sublabel}
          </span>
        )}
      </span>
      <span style={{ marginLeft: "auto", fontSize: 18, opacity: 0.45, paddingLeft: 8 }}>›</span>
    </>
  );

  const style: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    width: "100%",
    padding: "12px 16px",
    borderRadius: 18,
    textDecoration: "none",
    color: T.text,
    background: T.surface,
    border: `1.5px solid ${T.border}`,
    boxShadow: "0 6px 18px rgba(190,24,93,0.08)",
    font: "inherit",
    cursor: "pointer",
    textAlign: "left",
  };

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="biolink-btn" style={style}>
        {inner}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="biolink-btn" style={style}>
      {inner}
    </a>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────────

export default function BioLink() {
  const { profile, contact, profileImage } = SITE_CONTENT;
  const waLink = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`;
  const igHandle = contact.instagramUrl
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, "@")
    .replace(/\/$/, "");

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      // ignore clipboard failures (e.g. insecure context)
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #fff5f7 0%, #ffeef5 50%, #fef3f7 100%)",
        color: T.text,
        fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
      }}
    >
      <style>{`
        .biolink-btn { transition: transform .18s ease, box-shadow .18s ease; }
        .biolink-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 26px rgba(190,24,93,0.16); }
        .biolink-btn:active { transform: translateY(-1px); }
        @keyframes toastIn { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>

      <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Row 1 — profile photo */}
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: "50%",
            padding: 4,
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
            boxShadow: "0 16px 36px rgba(236,72,153,0.32)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileImage}
            alt={profile.name}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              border: `3px solid ${T.surface}`,
              display: "block",
            }}
          />
        </div>

        {/* Row 2 — identity */}
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: T.text }}>{profile.name}</h1>
          <p style={{ fontSize: 15, fontWeight: 600, color: T.primaryDark, margin: "4px 0 0" }}>
            {profile.handle}
          </p>
          <p style={{ fontSize: 13.5, color: T.textMuted, margin: "8px 0 0", maxWidth: 320 }}>
            {profile.tagline}
          </p>
          <span
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "5px 14px",
              borderRadius: 999,
              background: T.chip1,
              color: T.chip1Text,
              fontSize: 12.5,
              fontWeight: 700,
            }}
          >
            {profile.followers} followers
          </span>
        </div>

        {/* Row 3 — CTA buttons */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 13, marginTop: 28 }}>
          <BioButton
            href={waLink}
            label="Want to discuss more?"
            sublabel="Contact via WhatsApp"
            icon={<WaIcon />}
          />
          <BioButton
            href={profile.tiktokUrl}
            label="View content on TikTok"
            sublabel={profile.handle}
            icon={<TiktokIcon />}
          />
          <BioButton
            href={contact.instagramUrl}
            label="View content on Instagram"
            sublabel={igHandle}
            icon={<IgIcon />}
          />
          {/* Email — main action opens the mail client; copy icon is a secondary action */}
          <div
            className="biolink-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              width: "100%",
              padding: "12px 16px",
              borderRadius: 18,
              background: T.surface,
              border: `1.5px solid ${T.border}`,
              boxShadow: "0 6px 18px rgba(190,24,93,0.08)",
            }}
          >
            <a
              href={`mailto:${contact.email}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                flex: 1,
                minWidth: 0,
                textDecoration: "none",
                color: T.text,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  flexShrink: 0,
                  background: T.chip1,
                  color: T.primaryDark,
                }}
              >
                <MailIcon />
              </span>
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.25, minWidth: 0 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>Contact via email</span>
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: T.textMuted,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {contact.email}
                </span>
              </span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              title={copied ? "Copied!" : "Copy email"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                flexShrink: 0,
                padding: 0,
                border: "none",
                borderRadius: 8,
                background: "transparent",
                color: copied ? T.primaryDark : T.textMuted,
                cursor: "pointer",
                font: "inherit",
                transition: "color .18s ease",
              }}
            >
              {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            </button>
          </div>
        </div>

        <p style={{ fontSize: 11.5, color: T.textMuted, marginTop: 32, opacity: 0.8 }}>
          Made by Andienads Management · © 2025–2026
        </p>
      </div>

      {/* Toast */}
      {copied && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 18px",
            borderRadius: 999,
            background: T.primaryDark,
            color: "#fff",
            fontSize: 13.5,
            fontWeight: 600,
            boxShadow: "0 12px 30px rgba(190,24,93,0.4)",
            animation: "toastIn .22s ease",
            zIndex: 50,
          }}
        >
          <CheckIcon size={16} />
          Email copied to clipboard
        </div>
      )}
    </main>
  );
}
