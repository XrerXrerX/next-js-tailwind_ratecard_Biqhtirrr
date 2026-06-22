/** @format */

// ─── Shared site content + theme ───────────────────────────────────────────────
// Single source of truth for both the biolink home (/) and the rate card
// (/ratecard). Edit values here. See CONTENT-GUIDE.md for a field-by-field map.

export type SiteContent = {
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
  // Profile photo shown on the biolink home and the rate card hero.
  profileImage: string;
};

export const SITE_CONTENT: SiteContent = {
  profile: {
    handle: "@andienads_real",
    name: "Andien",
    tagline: "TikTok Content Creator & Lifestyle Influencer",
    followers: "223K",
    tiktokUrl: "https://www.tiktok.com/@andienads_real?is_from_webapp=1&sender_device=pc",
    updateDate: "update 19 June 2026 (recap 28 days)",
    aboutText1:
      "Hi, I'm Andien , a TikTok content creator with over 223K followers and 12,7M total likes. I help brands build stronger visibility, credibility, and audience trust through authentic, high-engagement content.",
    aboutText2:
      "By collaborating with me, your brand doesn't just get exposure, it gains meaningful connections with a loyal audience that actively engages, remembers, and converts.",
    highlights: [
      "Focused on Beauty & Lifestyle storytelling that feels natural and trusted",
      "Consistent performance up to ~100K average views per video",
      "Audience-driven content designed to increase brand recall and value",
    ],
  },
  demographics: {
    gender: { female: 85, male: 14, others: 1 },
    age: { "18-24": 41.2, "25-34": 43.7, "36-55+": 15.1 },
    location: { indonesia: 95.7, others: 4.3 },
  },
  packages: [
    {
      id: "single",
      name: "Single Video",
      subtitle: "Perfect for your brand 🚀",
      price: "Rp 2.250.000",
      priceNote: "per video content",
      save: "",
      color: "rose",
      popular: false,
      features: [
        "1 TikTok video (30-60 seconds)",
        "Professional editing & effects",
        "2 revisions included",
        "Code boost free 30 days included",
      ],
    },
    {
      id: "triple",
      name: "Triple Video Package",
      subtitle: "Best value for campaign series",
      price: "Rp 6.950.000",
      priceNote: "3 video contents",
      save: "Save Rp 550.000!",
      color: "amber",
      popular: true,
      features: [
        "3 TikTok videos (30-60 seconds each)",
        "Professional editing & effects",
        "3 revisions per video included",
        "Code boost free 90 days included",
      ],
    },
    {
      id: "fifth",
      name: "Fifth Video Package",
      subtitle: "Best value for raising your brand awareness",
      price: "Rp 9.500.000",
      priceNote: "5 video contents",
      save: "Save Rp 1.750.000!",
      color: "purple",
      popular: false,
      features: [
        "5 TikTok videos (30-60 seconds each)",
        "Professional editing & effects",
        "4 revisions per video included",
        "Code boost free 90 days included",
      ],
    },
    {
      id: "custom",
      name: "Custom Video Package",
      subtitle: "tell me more what you need",
      price: "Chat Us Now !",
      priceNote: "depends on your needs",
      save: "",
      color: "sky",
      popular: false,
      features: [],
    },
  ],
  analytics: {
    overviewImage: "/uploads/ov19june.png",
    audienceImage: "/uploads/au19june.png",
    monthlyViews: "3.5M++",
    monthlyLikes: "200K++",
    femaleAudience: "85%",
    primaryAge: "25-34",
    topVideos: [
      { image: "/11m.jpg", title: "Most View Content", views: "11M+ Views", likes: "541K Likes" },
      { image: "/48m.jpg", title: "second Most View Content", views: "4.8M+ Views", likes: "174K Likes" },
      { image: "/47m.jpg", title: "third Most View Content", views: "4.7M+ Views", likes: "271K Likes" },
    ],
  },
  contact: {
    email: "dikihidayat.dh@gmail.com",
    whatsapp: "+6289612716535",
    instagramUrl: "https://www.instagram.com/andienads/",
    tiktokEmbedId: "andienads_real",
  },
  profileImage: "/image.jpg",
};

// ─── Theme palette ──────────────────────────────────────────────────────────────

export const T = {
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
