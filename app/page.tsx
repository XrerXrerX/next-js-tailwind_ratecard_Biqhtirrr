/** @format */

"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Eye,
  TrendingUp,
  Play,
  Star,
  Instagram,
  Mail,
  MessageCircle,
  Check,
  X,
  Calendar,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type SiteContent = {
  profile: {
    handle: string;
    name: string;
    tagline: string;
    followers: string;
    tiktokUrl: string;
    updateDate: string;
    aboutText1: string;
    aboutText2: string;
    highlights: string[];
  };
  demographics: {
    gender: { female: number; male: number; others: number };
    age: { "18-24": number; "25-34": number; "36-55+": number };
    location: { indonesia: number; others: number };
  };
  packages: {
    id: string;
    name: string;
    subtitle: string;
    price: string;
    priceNote: string;
    save: string;
    color: string;
    popular: boolean;
    features: string[];
  }[];
  analytics: {
    overviewImage: string;
    audienceImage: string;
    monthlyViews: string;
    monthlyLikes: string;
    femaleAudience: string;
    primaryAge: string;
    topVideos: { image: string; title: string; views: string; likes: string }[];
  };
  contact: {
    email: string;
    whatsapp: string;
    instagramUrl: string;
    tiktokEmbedId: string;
  };
};

// ─── Default content ──────────────────────────────────────────────────────────

const defaultContent: SiteContent = {
  profile: {
    handle: "@biqhtirrr",
    name: "Andien",
    tagline: "TikTok Content Creator & Lifestyle Influencer",
    followers: "222.1K",
    tiktokUrl: "https://www.tiktok.com/@biqhtirrr?is_from_webapp=1&sender_device=pc",
    updateDate: "update 5 April 2026 (recap 28 days ago)",
    aboutText1:
      "Hi, I'm Andien — a TikTok content creator with over 222,1K followers and 12,5M total likes. I help brands build stronger visibility, credibility, and audience trust through authentic, high-engagement content.",
    aboutText2:
      "By collaborating with me, your brand doesn't just get exposure, it gains meaningful connections with a loyal audience that actively engages, remembers, and converts.",
    highlights: [
      "Focused on Beauty & Lifestyle storytelling that feels natural and trusted",
      "Consistent performance up to ~100K average views per video",
      "Audience-driven content designed to increase brand recall and value",
    ],
  },
  demographics: {
    gender: { female: 82, male: 16, others: 2 },
    age: { "18-24": 43.9, "25-34": 40.9, "36-55+": 17.2 },
    location: { indonesia: 95.6, others: 4.6 },
  },
  packages: [
    {
      id: "single",
      name: "Single Video",
      subtitle: "Perfect for your brand 🚀",
      price: "Rp 2.650.000",
      priceNote: "per video content",
      save: "",
      color: "rose",
      popular: false,
      features: [
        "1 TikTok video (30–60 seconds)",
        "Professional editing & effects",
        "2 revisions included",
        "Code boost free 30 days included",
      ],
    },
    {
      id: "triple",
      name: "Triple Video Package",
      subtitle: "Best value for campaign series",
      price: "Rp 7.400.000",
      priceNote: "3 video contents",
      save: "Save Rp 550.000!",
      color: "amber",
      popular: true,
      features: [
        "3 TikTok videos (30–60 seconds each)",
        "Professional editing & effects",
        "3 revisions per video included",
        "Code boost free 90 days included",
      ],
    },
    {
      id: "fifth",
      name: "Fifth Video Package",
      subtitle: "Best value for raising your brand awareness",
      price: "Rp 11.500.000",
      priceNote: "5 video contents",
      save: "Save Rp 1.750.000!",
      color: "purple",
      popular: false,
      features: [
        "5 TikTok videos (30–60 seconds each)",
        "Professional editing & effects",
        "4 revisions per video included",
        "Code boost free 90 days included",
      ],
    },
    {
      id: "custom",
      name: "Custom Video Package",
      subtitle: "tell me more what you need",
      price: "Chat Us Now!",
      priceNote: "depends on your needs",
      save: "",
      color: "sky",
      popular: false,
      features: [],
    },
  ],
  analytics: {
    overviewImage: "/2-jan/ov_2jan.png",
    audienceImage: "/2-jan/vi_2jan.png",
    monthlyViews: "1M++",
    monthlyLikes: "500K++",
    femaleAudience: "82%",
    primaryAge: "18–24",
    topVideos: [
      { image: "/11m.jpg", title: "Most Viewed Content", views: "11M+ Views", likes: "541K Likes" },
      { image: "/48m.jpg", title: "Second Most Viewed", views: "4.8M+ Views", likes: "174K Likes" },
      { image: "/47m.jpg", title: "Third Most Viewed", views: "4.7M+ Views", likes: "271K Likes" },
    ],
  },
  contact: {
    email: "dikihidayat.dh@gmail.com",
    whatsapp: "+6289612716535",
    instagramUrl: "https://www.instagram.com/andienads/",
    tiktokEmbedId: "biqhtirrr",
  },
};

// ─── Theme ────────────────────────────────────────────────────────────────────

const T = {
  primary: "#ec4899",
  primaryDark: "#be185d",
  accent: "#f9a8d4",
  accentDark: "#db2777",
  text: "#831843",
  textMuted: "#9d6b85",
  surface: "#ffffff",
  border: "#fce7f3",
  chip1: "#fce7f3",
  chip1Text: "#be185d",
  chip2: "#fef3f7",
  chip2Text: "#9d2466",
};

const PKG_PALETTE: Record<string, { from: string; to: string; price: string }> = {
  rose:   { from: "#f9a8d4", to: "#ec4899",  price: "#be185d" },
  amber:  { from: "#fbbf24", to: "#f472b6",  price: "#be185d" },
  purple: { from: "#c4b5fd", to: "#a78bfa",  price: "#6d28d9" },
  sky:    { from: "#7dd3fc", to: "#f9a8d4",  price: "#0891b2" },
};

// ─── Small inline SVG icons ───────────────────────────────────────────────────

function SparkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" />
    </svg>
  );
}

function WaIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 6.3A8 8 0 0 0 4.4 16l-1.1 4 4.1-1.1a8 8 0 0 0 12-7 8 8 0 0 0-1.8-5.6zm-5.6 12.3a6.6 6.6 0 0 1-3.4-.9l-.2-.2-2.4.7.7-2.4-.2-.3a6.6 6.6 0 1 1 12.2-3.5 6.6 6.6 0 0 1-6.7 6.6zm3.7-5c-.2-.1-1.2-.6-1.4-.6-.2-.1-.3-.1-.5.1l-.6.7c-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.7-1-.6-.5-1-1.2-1.2-1.4-.1-.2 0-.3.1-.4l.3-.4.2-.3c.1-.1 0-.2 0-.4l-.6-1.4c-.1-.4-.3-.3-.4-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.7-.8 1.8 0 1 .7 2 .8 2.1.1.1 1.5 2.4 3.7 3.3.5.2.9.4 1.2.5.5.2 1 .1 1.4.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1z" />
    </svg>
  );
}

// ─── Reusable card wrapper ────────────────────────────────────────────────────

function SCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Chip / badge ─────────────────────────────────────────────────────────────

function Chip({
  icon, bg, color, children,
}: {
  icon: React.ReactNode;
  bg: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 999,
        background: bg,
        color,
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

// ─── Cotton-candy decorative background ───────────────────────────────────────

function Decorations() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <div className="puff-layer puff-layer--a" />
      <div className="puff-layer puff-layer--b" />
      <div className="puff-layer puff-layer--c" />

      {/* Wave ribbon – upper */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{ position: "absolute", top: "20%", left: 0, width: "100%", height: 220, opacity: 0.55 }}
      >
        <defs>
          <linearGradient id="r1" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0" />
            <stop offset="50%" stopColor="#f9a8d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="ribbon-a"
          fill="url(#r1)"
          d="M0,100 C240,40 480,160 720,100 C960,40 1200,160 1440,100 L1440,140 C1200,200 960,80 720,140 C480,200 240,80 0,140 Z"
          style={{ filter: "blur(14px)" }}
        />
      </svg>

      {/* Wave ribbon – lower */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{ position: "absolute", bottom: "15%", left: 0, width: "100%", height: 240, opacity: 0.5 }}
      >
        <defs>
          <linearGradient id="r2" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#f0abfc" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="ribbon-b"
          fill="url(#r2)"
          d="M0,100 C240,160 480,40 720,100 C960,160 1200,40 1440,100 L1440,60 C1200,0 960,120 720,60 C480,0 240,120 0,60 Z"
          style={{ filter: "blur(16px)" }}
        />
      </svg>

      {/* Floating sparkles */}
      {(
        [
          { top: "12%",  left: "8%",   size: 18, delay: "0s" },
          { top: "20%",  right: "12%", size: 14, delay: "1.2s" },
          { top: "55%",  left: "5%",   size: 12, delay: "2s" },
          { top: "70%",  right: "8%",  size: 20, delay: "0.6s" },
          { top: "40%",  left: "48%",  size: 10, delay: "3s" },
          { bottom: "18%", left: "30%", size: 16, delay: "1.5s" },
          { top: "85%",  right: "30%", size: 13, delay: "2.8s" },
        ] as { top?: string; bottom?: string; left?: string; right?: string; size: number; delay: string }[]
      ).map((s, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            color: T.primary,
            opacity: 0.4,
            animation: `sparkleFloat 5s ease-in-out infinite ${s.delay}`,
          }}
        >
          <SparkIcon size={s.size} />
        </span>
      ))}

      {/* Floating hearts */}
      {(
        [
          { top: "25%",    left: "15%",  size: 14, delay: "2.5s" },
          { top: "65%",    right: "20%", size: 18, delay: "0.8s" },
          { bottom: "30%", left: "55%",  size: 12, delay: "3.5s" },
        ] as { top?: string; bottom?: string; left?: string; right?: string; size: number; delay: string }[]
      ).map((s, i) => (
        <span
          key={`h${i}`}
          style={{
            position: "absolute",
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            color: T.accentDark,
            opacity: 0.35,
            animation: `sparkleFloat 6s ease-in-out infinite ${s.delay}`,
          }}
        >
          <Heart size={s.size} fill="currentColor" />
        </span>
      ))}
    </div>
  );
}

// ─── Floating FAB contact ─────────────────────────────────────────────────────

function FloatingContact({ waLink, instagramUrl }: { waLink: string; instagramUrl: string }) {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const items = [
    {
      id: "wa",
      label: "WhatsApp",
      icon: <WaIcon size={22} />,
      bg: "linear-gradient(135deg, #25d366, #128c7e)",
      href: waLink,
    },
    {
      id: "ig",
      label: "Instagram",
      icon: <Instagram size={22} />,
      bg: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af)",
      href: instagramUrl,
    },
    {
      id: "mail",
      label: "Email",
      icon: <Mail size={22} />,
      bg: `linear-gradient(135deg, ${T.primary}, ${T.accentDark})`,
      href: "mailto:dikihidayat.dh@gmail.com",
    },
    {
      id: "tt",
      label: "TikTok",
      icon: <Play size={22} />,
      bg: "linear-gradient(135deg, #25f4ee, #fe2c55)",
      href: "https://www.tiktok.com/@biqhtirrr",
    },
  ];

  return (
    <>
      {/* Hint bubble */}
      {!open && pulse && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 96,
            zIndex: 49,
            background: "#fff",
            color: T.text,
            padding: "10px 14px",
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(236, 72, 153, 0.18)",
            fontSize: 13,
            fontWeight: 600,
            border: `1px solid ${T.border}`,
            animation: "fcBubble 0.5s ease-out, fcFloat 3s ease-in-out 0.5s infinite",
            whiteSpace: "nowrap",
          }}
        >
          Hi, let&apos;s chat! 💕
          <div
            style={{
              position: "absolute",
              right: -6,
              bottom: 14,
              width: 12,
              height: 12,
              background: "#fff",
              transform: "rotate(45deg)",
              borderRight: `1px solid ${T.border}`,
              borderTop: `1px solid ${T.border}`,
            }}
          />
        </div>
      )}

      {/* Expanded contact items */}
      <div
        style={{
          position: "fixed",
          bottom: 96,
          right: 24,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-end",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {items.map((item, i) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(0.6)",
              opacity: open ? 1 : 0,
              transition: `all 0.35s cubic-bezier(0.34,1.56,0.64,1) ${
                open ? i * 0.05 : (items.length - i) * 0.03
              }s`,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                background: "#fff",
                color: T.text,
                padding: "6px 12px",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 700,
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                border: `1px solid ${T.border}`,
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                background: item.bg,
                display: "grid",
                placeItems: "center",
                color: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
              }}
            >
              {item.icon}
            </span>
          </a>
        ))}
      </div>

      {/* Main FAB button */}
      <button
        onClick={() => {
          setOpen(!open);
          setPulse(false);
        }}
        aria-label="Contact"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 51,
          width: 60,
          height: 60,
          borderRadius: 999,
          border: "none",
          background: `linear-gradient(135deg, ${T.primary}, ${T.accentDark})`,
          color: "#fff",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          boxShadow: open
            ? "0 12px 30px rgba(236, 72, 153, 0.45)"
            : "0 10px 25px rgba(236, 72, 153, 0.35)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s",
          transform: open ? "rotate(135deg) scale(1.05)" : "rotate(0deg) scale(1)",
          fontFamily: "inherit",
        }}
      >
        {/* Pulse ring */}
        {!open && pulse && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              background: T.primary,
              opacity: 0.5,
              animation: "fcPulse 2s ease-out infinite",
            }}
          />
        )}

        {open ? <X size={24} /> : <MessageCircle size={26} />}

        {/* Sparkle badge */}
        {!open && (
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#fff",
              display: "grid",
              placeItems: "center",
              color: T.accentDark,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              animation: "fcSparkle 2s ease-in-out infinite",
            }}
          >
            <SparkIcon size={11} />
          </span>
        )}
      </button>
    </>
  );
}

// ─── Demographics bar group ───────────────────────────────────────────────────

function DemogGroup({
  title,
  color,
  track,
  data,
}: {
  title: string;
  color: string;
  track: string;
  data: Record<string, number>;
}) {
  return (
    <div>
      <h4
        style={{
          margin: "0 0 14px",
          fontSize: 16,
          fontWeight: 800,
          color,
          textAlign: "center",
          borderBottom: `2px solid ${T.accent}`,
          paddingBottom: 8,
        }}
      >
        {title}
      </h4>
      {Object.entries(data).map(([k, v]) => (
        <div key={k} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, textTransform: "capitalize" }}>
              {k.includes("-") || k.includes("+") ? `Age ${k}` : k}
            </span>
            <span style={{ fontSize: 13, color: T.textMuted }}>{v}%</span>
          </div>
          <div
            style={{
              width: "100%",
              height: 8,
              background: track,
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${v}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${color}, ${color})`,
                borderRadius: 999,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Stat box ─────────────────────────────────────────────────────────────────

function StatBox({
  label,
  value,
  color,
  bg,
}: {
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div style={{ textAlign: "center", padding: 16, background: bg, borderRadius: 12 }}>
      <div style={{ fontSize: 24, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ─── About Me text — bold + spotlight helpers ─────────────────────────────────

function renderAboutText(text: string, creatorName: string): React.ReactNode[] {
  // Pattern 1: creator name (e.g. "Andien")
  const nameRe = new RegExp(`(${creatorName})`, "gi");
  // Pattern 2: "creator with over X followers and Y total likes"
  const statsRe =
    /(creator with over [\d.,]+[KkMmBb]*\+?\s+followers and [\d.,]+[KkMmBb]*\+?\s+total likes)/i;

  const nameStyle: React.CSSProperties = {
    fontWeight: 800,
    color: T.primaryDark,
    background: "rgba(236,72,153,0.10)",
    borderRadius: 5,
    padding: "1px 5px",
    display: "inline",
  };

  const statsStyle: React.CSSProperties = {
    fontWeight: 700,
    color: T.primaryDark,
    background:
      "linear-gradient(120deg, transparent 0%, rgba(249,168,212,0.38) 15%, rgba(249,168,212,0.38) 85%, transparent 100%)",
    padding: "1px 2px",
    borderRadius: 3,
    display: "inline",
  };

  // First split by stats pattern, then by name within plain segments
  const result: React.ReactNode[] = [];
  const byStats = text.split(statsRe);
  byStats.forEach((chunk, si) => {
    if (statsRe.test(chunk)) {
      result.push(
        <mark key={`stat-${si}`} style={statsStyle}>
          {chunk}
        </mark>
      );
      return;
    }
    // Split remaining chunk by creator name
    const byName = chunk.split(nameRe);
    byName.forEach((seg, ni) => {
      if (seg.toLowerCase() === creatorName.toLowerCase()) {
        result.push(
          <strong key={`name-${si}-${ni}`} style={nameStyle}>
            {seg}
          </strong>
        );
      } else {
        result.push(<span key={`plain-${si}-${ni}`}>{seg}</span>);
      }
    });
  });
  return result;
}

// Icon colours that rotate across the three bullets
const BULLET_COLORS = [T.primary, T.accentDark, "#8b5cf6"];

function HighlightBullet({ text, index }: { text: string; index: number }) {
  const color = BULLET_COLORS[index % BULLET_COLORS.length];
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: "12px 14px",
        borderRadius: 12,
        background:
          "linear-gradient(135deg, rgba(252,231,243,0.55), rgba(254,243,247,0.9))",
        border: "1px solid rgba(249,168,212,0.25)",
        borderLeft: `3px solid ${color}`,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          background: `linear-gradient(135deg, ${color}, ${color}bb)`,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          boxShadow: `0 4px 10px ${color}40`,
        }}
      >
        <TrendingUp size={14} style={{ color: "#fff" }} />
      </div>
      <span
        style={{
          color: T.text,
          fontSize: 14,
          lineHeight: 1.65,
          paddingTop: 5,
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile");
  const [emailCopied, setEmailCopied] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/content")
      .then((r) => r.json())
      .then((data: SiteContent) => setContent(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(content.contact.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {}
  };

  const waLink = `https://wa.me/${content.contact.whatsapp.replace(/\D/g, "")}`;

  const cssVars = {
    "--primary": T.primary,
    "--primary-dark": T.primaryDark,
    "--accent": T.accent,
    "--accent-dark": T.accentDark,
    "--text": T.text,
    "--text-muted": T.textMuted,
    "--surface": T.surface,
    "--border": T.border,
    "--chip1": T.chip1,
    "--chip1-text": T.chip1Text,
    "--chip2": T.chip2,
    "--chip2-text": T.chip2Text,
  } as React.CSSProperties;

  return (
    <div
      style={{
        ...cssVars,
        minHeight: "100vh",
        background: "linear-gradient(160deg, #fff5f7 0%, #ffeef5 50%, #fef3f7 100%)",
        color: T.text,
        fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
        position: "relative",
      }}
    >
      <Decorations />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Header ── */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: scrolled
              ? "rgba(255, 240, 248, 0.28)"
              : "rgba(255,255,255,0.88)",
            backdropFilter: scrolled
              ? "blur(24px) saturate(200%)"
              : "blur(12px) saturate(120%)",
            WebkitBackdropFilter: scrolled
              ? "blur(24px) saturate(200%)"
              : "blur(12px) saturate(120%)",
            borderBottom: scrolled
              ? "1px solid rgba(249, 168, 212, 0.3)"
              : `1px solid ${T.border}`,
            boxShadow: scrolled
              ? "0 4px 32px rgba(236, 72, 153, 0.12)"
              : "none",
            transition:
              "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 24px",
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${T.primary}, ${T.accentDark})`,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Play size={14} style={{ color: "#fff" }} />
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: T.text,
                  textShadow: scrolled ? "0 1px 4px rgba(255,255,255,0.6)" : "none",
                  transition: "text-shadow 0.4s ease",
                }}
              >
                {content.profile.handle}
              </span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex" style={{ gap: 32, display: "flex" }}>
              {["profile", "ratecard", "analytics"].map((s) => (
                <button
                  key={s}
                  className="nav-item"
                  onClick={() => setActiveSection(s)}
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    textTransform: "capitalize",
                    color: activeSection === s ? T.primary : T.textMuted,
                    borderBottom:
                      activeSection === s
                        ? `2px solid ${T.primary}`
                        : "2px solid transparent",
                    fontFamily: "inherit",
                    textShadow: scrolled ? "0 1px 4px rgba(255,255,255,0.6)" : "none",
                    transition: "color 0.2s, text-shadow 0.4s ease",
                  }}
                >
                  {s}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          {/* ── Hero ── */}
          <section style={{ padding: "48px 0 8px", textAlign: "center" }}>
            {/* Avatar with orbit rings */}
            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginBottom: 24,
                width: 180,
                height: 180,
              }}
            >
              <svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
              >
                <defs>
                  <linearGradient id="flowA" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor={T.primary} stopOpacity="0" />
                    <stop offset="50%" stopColor={T.primary} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={T.primary} stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="flowB" x1="1" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={T.accent} stopOpacity="0" />
                    <stop offset="50%" stopColor={T.accent} stopOpacity="0.85" />
                    <stop offset="100%" stopColor={T.accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Outer arc – slow spin */}
                <circle
                  cx="90" cy="90" r="86"
                  fill="none" stroke="url(#flowA)" strokeWidth="2" strokeLinecap="round"
                  strokeDasharray="120 420"
                  style={{
                    transformOrigin: "90px 90px",
                    animation: "spinSlow 12s linear infinite",
                  }}
                />
                {/* Mid arc – reverse spin */}
                <circle
                  cx="90" cy="90" r="80"
                  fill="none" stroke="url(#flowB)" strokeWidth="1.5" strokeLinecap="round"
                  strokeDasharray="60 380"
                  style={{
                    transformOrigin: "90px 90px",
                    animation: "spinReverse 9s linear infinite",
                  }}
                />
                {/* Tiny dots along orbit */}
                <circle
                  cx="90" cy="90" r="84"
                  fill="none" stroke={T.accent} strokeWidth="3" strokeLinecap="round"
                  strokeDasharray="2 80"
                  style={{
                    transformOrigin: "90px 90px",
                    animation: "spinSlow 18s linear infinite",
                  }}
                />
              </svg>

              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  width: 144,
                  height: 144,
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
                  padding: 4,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 999,
                    background: "#fff",
                    padding: 4,
                  }}
                >
                  <img
                    src="/image.jpg"
                    alt={content.profile.handle}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 999,
                      objectFit: "cover",
                      transform: "rotate(-90deg)",
                      cursor: "pointer",
                    }}
                    onClick={() => setModalImage("/image.jpg")}
                  />
                </div>
              </div>

              {/* Heartbeat badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  background: T.primary,
                  display: "grid",
                  placeItems: "center",
                  border: "3px solid #fff",
                  animation: "heartBeat 2.5s ease-in-out infinite",
                }}
              >
                <Heart size={16} style={{ color: "#fff" }} fill="white" />
              </div>
            </div>

            <h1
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: T.text,
                margin: "16px 0 12px",
                letterSpacing: "-0.02em",
                cursor: "pointer",
              }}
              onClick={() => window.open(content.profile.tiktokUrl, "_blank")}
            >
              {content.profile.handle}
            </h1>
            <p style={{ fontSize: 20, color: T.textMuted, maxWidth: 640, margin: "0 auto 24px" }}>
              {content.profile.tagline}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Chip icon={<Users size={14} />} bg={T.chip1} color={T.chip1Text}>
                {content.profile.followers} Followers
              </Chip>
              <Chip icon={<Eye size={14} />} bg={T.chip2} color={T.chip2Text}>
                Millions of Views
              </Chip>
              <Chip icon={<TrendingUp size={14} />} bg={T.chip1} color={T.chip1Text}>
                High Engagement
              </Chip>
            </div>

          </section>

          {/* ── Profile section ── */}
          {activeSection === "profile" && (
            <section className="fade-up" style={{ padding: "32px 0 64px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 32,
                }}
              >
                {/* About Me */}
                <SCard>
                  <div
                    style={{
                      padding: "20px 24px",
                      background: `linear-gradient(135deg, ${T.chip1} 0%, ${T.chip2} 100%)`,
                    }}
                  >
                    <h3 style={{ margin: 0, color: T.text, fontSize: 18, fontWeight: 700 }}>
                      About Me
                    </h3>
                  </div>
                  <div style={{ padding: 24 }}>
                    <p style={{ color: T.textMuted, lineHeight: 1.8, marginTop: 0, fontSize: 15 }}>
                      {renderAboutText(content.profile.aboutText1, content.profile.name)}
                    </p>
                    <p style={{ color: T.textMuted, lineHeight: 1.8, fontSize: 15 }}>
                      {content.profile.aboutText2}
                    </p>

                    {/* Spotlight divider */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        margin: "20px 0 16px",
                      }}
                    >
                      <div
                        style={{
                          height: 1,
                          flex: 1,
                          background: `linear-gradient(90deg, transparent, ${T.accent})`,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: T.primary,
                          textTransform: "uppercase",
                        }}
                      >
                        Highlights
                      </span>
                      <div
                        style={{
                          height: 1,
                          flex: 1,
                          background: `linear-gradient(90deg, ${T.accent}, transparent)`,
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {content.profile.highlights.map((h, i) => (
                        <HighlightBullet key={i} text={h} index={i} />
                      ))}
                    </div>
                  </div>
                </SCard>

                {/* Demographics */}
                <SCard>
                  <div
                    style={{
                      padding: "20px 24px",
                      background: `linear-gradient(135deg, ${T.chip1} 0%, ${T.chip2} 100%)`,
                    }}
                  >
                    <h3 style={{ margin: 0, color: T.text, fontSize: 18, fontWeight: 700 }}>
                      Audience Demographics
                    </h3>
                  </div>
                  <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
                    <DemogGroup
                      title="Gender"
                      color={T.primary}
                      track={T.chip1}
                      data={content.demographics.gender}
                    />
                    <DemogGroup
                      title="Age"
                      color={T.accentDark}
                      track={T.chip2}
                      data={content.demographics.age}
                    />
                    <DemogGroup
                      title="Location"
                      color="#10b981"
                      track="#d1fae5"
                      data={content.demographics.location}
                    />
                  </div>
                </SCard>
              </div>
            </section>
          )}

          {/* ── Ratecard section ── */}
          {activeSection === "ratecard" && (
            <section className="fade-up" style={{ padding: "32px 0 64px" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: T.text,
                    margin: "0 0 12px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Rate Card
                </h2>
                <p style={{ fontSize: 18, color: T.textMuted, margin: 0 }}>
                  Professional content creation packages ✨
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 32,
                  maxWidth: 900,
                  margin: "0 auto",
                }}
              >
                {content.packages.map((pkg) => {
                  const c = PKG_PALETTE[pkg.color] || PKG_PALETTE.rose;
                  return (
                    <div
                      key={pkg.id}
                      className="pkg-card"
                      style={{
                        position: "relative",
                        background: T.surface,
                        border: `1px solid ${T.border}`,
                        borderRadius: 16,
                        boxShadow: pkg.popular
                          ? "0 20px 50px rgba(0,0,0,0.12)"
                          : "0 10px 30px rgba(0,0,0,0.06)",
                        overflow: "hidden",
                        transform: pkg.popular ? "translateY(-4px)" : "none",
                      }}
                    >
                      {pkg.popular && (
                        <div
                          style={{
                            position: "absolute",
                            top: -2,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                            color: "#fff",
                            padding: "4px 16px",
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: "0.1em",
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                          }}
                        >
                          MOST POPULAR
                        </div>
                      )}

                      {/* Card header */}
                      <div
                        style={{
                          padding: "28px 24px 24px",
                          background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        <h3 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>
                          {pkg.name}
                        </h3>
                        <p style={{ margin: 0, opacity: 0.9, fontSize: 14 }}>{pkg.subtitle}</p>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: 28 }}>
                        <div style={{ textAlign: "center", marginBottom: 24 }}>
                          <div
                            style={{
                              fontSize: 32,
                              fontWeight: 800,
                              color: c.price,
                              lineHeight: 1.1,
                            }}
                          >
                            {pkg.price}
                          </div>
                          <div style={{ color: T.textMuted, fontSize: 14, marginTop: 4 }}>
                            {pkg.priceNote}
                          </div>
                          {pkg.save && (
                            <div
                              style={{
                                color: T.primary,
                                fontSize: 13,
                                fontWeight: 700,
                                marginTop: 6,
                              }}
                            >
                              {pkg.save}
                            </div>
                          )}
                        </div>

                        {pkg.features.length > 0 && (
                          <ul
                            style={{
                              listStyle: "none",
                              padding: 0,
                              margin: "0 0 24px",
                              display: "flex",
                              flexDirection: "column",
                              gap: 12,
                            }}
                          >
                            {pkg.features.map((f, i) => (
                              <li
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 10,
                                  color: T.textMuted,
                                  fontSize: 14,
                                  lineHeight: 1.5,
                                }}
                              >
                                <span
                                  style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 999,
                                    background: c.to,
                                    flexShrink: 0,
                                    marginTop: 8,
                                  }}
                                />
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}

                        <button
                          onClick={() => window.open(waLink, "_blank")}
                          style={{
                            width: "100%",
                            background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                            color: "#fff",
                            border: "none",
                            padding: "12px 16px",
                            borderRadius: 10,
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: "pointer",
                            transition: "filter 0.15s",
                            fontFamily: "inherit",
                          }}
                          onMouseEnter={(e) =>
                            ((e.target as HTMLElement).style.filter = "brightness(0.95)")
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLElement).style.filter = "")
                          }
                        >
                          {pkg.id === "custom" ? "Consultation Now!" : "Choose Package"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Every package includes */}
              <div style={{ marginTop: 48, maxWidth: 800, margin: "48px auto 0" }}>
                <SCard>
                  <div
                    style={{
                      padding: 28,
                      background: `linear-gradient(135deg, ${T.chip1}, ${T.chip2})`,
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 20px",
                        color: T.text,
                        fontSize: 18,
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      Every package includes
                    </h3>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: 12,
                        fontSize: 14,
                        color: T.textMuted,
                      }}
                    >
                      {[
                        "Content planning & scripting",
                        "Professional voice over",
                        "Post-production editing",
                        "Hashtag optimization",
                        "Posting at optimal times",
                        "30-day performance tracking",
                      ].map((x) => (
                        <div key={x} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Check size={14} style={{ color: T.primary, flexShrink: 0 }} />
                          <span>{x}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SCard>
              </div>
            </section>
          )}

          {/* ── Analytics section ── */}
          {activeSection === "analytics" && (
            <section className="fade-up" style={{ padding: "32px 0 64px" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: T.text,
                    margin: "0 0 12px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Analytics Overview
                </h2>
                <p style={{ fontSize: 18, color: T.textMuted, margin: 0 }}>
                  Real performance data and engagement metrics
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 32,
                  marginBottom: 32,
                }}
              >
                {/* Overview Metrics */}
                <SCard>
                  <div
                    style={{
                      padding: "20px 24px",
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    <h3 style={{ margin: 0, color: T.text, fontSize: 18, fontWeight: 700 }}>
                      Overview Metrics
                    </h3>
                  </div>
                  <div style={{ padding: 20 }}>
                    <img
                      src={content.analytics.overviewImage}
                      alt="Analytics Dashboard"
                      style={{
                        width: "100%",
                        height: 240,
                        objectFit: "cover",
                        borderRadius: 10,
                        marginBottom: 16,
                        border: `1px solid ${T.border}`,
                        cursor: "pointer",
                      }}
                      onClick={() => setModalImage(content.analytics.overviewImage)}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <StatBox
                        label="Monthly Views"
                        value={content.analytics.monthlyViews}
                        color={T.primary}
                        bg={T.chip1}
                      />
                      <StatBox
                        label="Monthly Likes"
                        value={content.analytics.monthlyLikes}
                        color={T.accentDark}
                        bg={T.chip2}
                      />
                    </div>
                  </div>
                </SCard>

                {/* Audience Insights */}
                <SCard>
                  <div
                    style={{
                      padding: "20px 24px",
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    <h3 style={{ margin: 0, color: T.text, fontSize: 18, fontWeight: 700 }}>
                      Audience Insights
                    </h3>
                  </div>
                  <div style={{ padding: 20 }}>
                    <img
                      src={content.analytics.audienceImage}
                      alt="Audience Demographics"
                      style={{
                        width: "100%",
                        height: 240,
                        objectFit: "cover",
                        borderRadius: 10,
                        marginBottom: 16,
                        border: `1px solid ${T.border}`,
                        cursor: "pointer",
                      }}
                      onClick={() => setModalImage(content.analytics.audienceImage)}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <StatBox
                        label="Female Audience"
                        value={content.analytics.femaleAudience}
                        color={T.primary}
                        bg={T.chip1}
                      />
                      <StatBox
                        label="Primary Age"
                        value={content.analytics.primaryAge}
                        color={T.accentDark}
                        bg={T.chip2}
                      />
                    </div>
                  </div>
                </SCard>
              </div>

              {/* Top videos */}
              <SCard>
                <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.border}` }}>
                  <h3 style={{ margin: 0, color: T.text, fontSize: 18, fontWeight: 700 }}>
                    Most Viewed Content
                  </h3>
                </div>
                <div
                  style={{
                    padding: 28,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 32,
                  }}
                >
                  {content.analytics.topVideos.map((vid, i) => (
                    <div
                      key={i}
                      className="video-card"
                      style={{ textAlign: "center", cursor: "pointer" }}
                      onClick={() => window.open(content.profile.tiktokUrl, "_blank")}
                    >
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                          marginBottom: 16,
                        }}
                      >
                        <img
                          src={vid.image}
                          alt={vid.title}
                          className="video-thumb"
                          style={{
                            width: 192,
                            height: 256,
                            objectFit: "cover",
                            borderRadius: 12,
                            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            padding: "4px 8px",
                            borderRadius: 6,
                            background: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          #{i + 1}
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            width: 40,
                            height: 40,
                            borderRadius: 999,
                            background: "rgba(0,0,0,0.6)",
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <Play size={16} style={{ color: "#fff", marginLeft: 2 }} />
                        </div>
                      </div>
                      <h4 style={{ margin: "0 0 8px", color: T.text, fontWeight: 700 }}>
                        {vid.title}
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 12,
                          fontSize: 13,
                          color: T.textMuted,
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Eye size={13} />
                          {vid.views}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Heart size={13} fill="currentColor" />
                          {vid.likes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </SCard>
            </section>
          )}

          {/* ── Contact section ── */}
          <section style={{ paddingBottom: 48 }}>
            <SCard>
              <div
                style={{
                  padding: 40,
                  textAlign: "center",
                  background: `linear-gradient(135deg, ${T.chip1}, ${T.chip2})`,
                }}
              >
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: 28,
                    fontWeight: 800,
                    color: T.text,
                  }}
                >
                  Ready to Collaborate?
                </h3>
                <p
                  style={{
                    margin: "0 auto 28px",
                    color: T.textMuted,
                    maxWidth: 560,
                  }}
                >
                  Let&apos;s create amazing content together. Reach out to discuss your project and
                  get started.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                  <button
                    onClick={copyEmail}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 24px",
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
                      color: "#fff",
                      border: "none",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                      fontFamily: "inherit",
                    }}
                  >
                    {emailCopied ? <Check size={16} /> : <Mail size={16} />}
                    {emailCopied ? "Email Copied!" : "Email Me"}
                  </button>
                  <button
                    onClick={() => window.open(waLink, "_blank")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 24px",
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #25d366, #128c7e)",
                      color: "#fff",
                      border: "none",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                      fontFamily: "inherit",
                    }}
                  >
                    <WaIcon size={16} />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => window.open(content.contact.instagramUrl, "_blank")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 24px",
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
                      color: "#fff",
                      border: "none",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                      fontFamily: "inherit",
                    }}
                  >
                    <Instagram size={16} />
                    DM Instagram
                  </button>
                </div>
              </div>
            </SCard>
          </section>

          {/* ── TikTok embed ── */}
          <section style={{ textAlign: "center", marginBottom: 64 }}>
            <SCard>
              <div
                style={{
                  padding: 32,
                  background: `linear-gradient(135deg, ${T.chip1}, ${T.chip2})`,
                }}
              >
                <h3
                  style={{
                    margin: "0 0 24px",
                    fontSize: 22,
                    fontWeight: 800,
                    color: T.text,
                  }}
                >
                  Check Out My TikTok Content
                </h3>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {mounted && (
                    <blockquote
                      className="tiktok-embed"
                      cite={`https://www.tiktok.com/@${content.contact.tiktokEmbedId}`}
                      data-unique-id={content.contact.tiktokEmbedId}
                      data-embed-type="creator"
                      style={{ maxWidth: "780px", minWidth: "288px" }}
                    >
                      <section>
                        <a
                          target="_blank"
                          href={`https://www.tiktok.com/@${content.contact.tiktokEmbedId}?refer=creator_embed`}
                        >
                          @{content.contact.tiktokEmbedId}
                        </a>
                      </section>
                    </blockquote>
                  )}
                </div>
              </div>
            </SCard>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer
          style={{
            background: T.surface,
            borderTop: `1px solid ${T.border}`,
            padding: "32px 0",
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${T.primary}, ${T.accentDark})`,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Play size={10} style={{ color: "#fff" }} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>
                {content.profile.handle}
              </span>
            </div>

            <div
              style={{
                paddingTop: 16,
                borderTop: `1px solid ${T.border}`,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ color: T.textMuted, fontSize: 13 }}>Powered by</span>
              <a
                href="https://lintasinovasiglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                <img src="/logo-ligal.png" alt="" style={{ height: 24 }} />
                <span style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>
                  PT. Lintas Inovasi Global
                </span>
              </a>
            </div>

            <p style={{ fontSize: 12, color: T.textMuted, marginTop: 12 }}>
              © 2026 {content.profile.handle}. All rights reserved. | Professional TikTok Content
              Creator
            </p>
          </div>
        </footer>
      </div>

      {/* ── Update date badge — fixed top-right ── */}
      <div
        style={{
          position: "fixed",
          top: 72,
          right: 12,
          zIndex: 35,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px 5px 9px",
          borderRadius: 999,
          background: "rgba(255, 245, 250, 0.72)",
          backdropFilter: "blur(14px) saturate(180%)",
          WebkitBackdropFilter: "blur(14px) saturate(180%)",
          border: "1px solid rgba(249, 168, 212, 0.45)",
          boxShadow: "0 4px 16px rgba(236, 72, 153, 0.10)",
          pointerEvents: "none",
          maxWidth: "calc(100vw - 24px)",
          overflow: "hidden",
        }}
      >
        <Calendar size={12} style={{ color: T.primary, flexShrink: 0 }} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: T.textMuted,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {content.profile.updateDate}
        </span>
      </div>

      {/* ── Floating FAB contact ── */}
      <FloatingContact
        waLink={waLink}
        instagramUrl={content.contact.instagramUrl}
      />

      {/* ── Mobile bottom nav ── */}
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden"
        style={{
          background: "rgba(17,5,19,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          zIndex: 48,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0" }}>
          {(["profile", "ratecard", "analytics"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background: activeSection === s ? "rgba(255,255,255,0.1)" : "transparent",
                color: activeSection === s ? T.primary : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 0.2s",
              }}
            >
              {s === "profile" && <Users size={20} style={{ marginBottom: 2 }} />}
              {s === "ratecard" && <Star size={20} style={{ marginBottom: 2 }} />}
              {s === "analytics" && <TrendingUp size={20} style={{ marginBottom: 2 }} />}
              <span style={{ fontSize: 11, textTransform: "capitalize" }}>{s}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Image modal ── */}
      {modalImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(6px)",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => setModalImage(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setModalImage(null)}
              style={{
                position: "absolute",
                top: -16,
                right: -16,
                width: 36,
                height: 36,
                borderRadius: 999,
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                zIndex: 1,
              }}
            >
              <X size={18} />
            </button>
            <img
              src={modalImage}
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: 12,
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
