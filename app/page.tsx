/** @format */

"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Eye,
  TrendingUp,
  Play,
  Calendar,
  Star,
  Instagram,
  Mail,
  MessageCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const defaultContent: SiteContent = {
  profile: {
    handle: "@biqhtirrr",
    name: "Andien",
    tagline: "TikTok Content Creator & Lifestyle Influencer",
    followers: "217.4K",
    tiktokUrl: "https://www.tiktok.com/@biqhtirrr?is_from_webapp=1&sender_device=pc",
    updateDate: "update 2 january 2026 (recap 28 days ago)",
    aboutText1:
      "Hi, I'm Andien — a TikTok content creator with over 217.4K followers and 11.6M total likes. I help brands build stronger visibility, credibility, and audience trust through authentic, high-engagement content.",
    aboutText2:
      "By collaborating with me, your brand doesn't just get exposure, it gains meaningful connections with a loyal audience that actively engages, remembers, and converts.",
    highlights: [
      "Focused on Beauty & Lifestyle storytelling that feels natural and trusted",
      "Consistent performance up to ~100K average views per video",
      "Audience-driven content designed to increase brand recall and value",
    ],
  },
  demographics: {
    gender: { female: 72, male: 15, others: 13 },
    age: { "18-24": 44.9, "25-34": 39.7, "36-55+": 15.4 },
    location: { indonesia: 96.9, others: 3.1 },
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
      price: "Rp 7.400.000",
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
      price: "Rp 11.500.000",
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
    overviewImage: "/2-jan/ov_2jan.png",
    audienceImage: "/2-jan/vi_2jan.png",
    monthlyViews: "1M++",
    monthlyLikes: "500K++",
    femaleAudience: "72%",
    primaryAge: "18-24",
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
    tiktokEmbedId: "biqhtirrr",
  },
};

// Color map for package cards (Tailwind classes must be static)
const pkgColors: Record<string, {
  header: string;
  btn: string;
  border: string;
  price: string;
  dot: string;
  feat: string;
}> = {
  rose: {
    header: "bg-gradient-to-r from-rose-400 to-rose-500",
    btn: "bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600",
    border: "border-rose-200",
    price: "text-amber-800",
    dot: "bg-rose-400",
    feat: "text-amber-700",
  },
  amber: {
    header: "bg-gradient-to-r from-amber-400 to-amber-500",
    btn: "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600",
    border: "border-amber-300",
    price: "text-amber-800",
    dot: "bg-amber-400",
    feat: "text-amber-700",
  },
  purple: {
    header: "bg-gradient-to-r from-purple-400 to-purple-500",
    btn: "bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600",
    border: "border-purple-300",
    price: "text-purple-800",
    dot: "bg-purple-400",
    feat: "text-purple-700",
  },
  sky: {
    header: "bg-gradient-to-r from-sky-400 to-sky-500",
    btn: "bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600",
    border: "border-sky-300",
    price: "text-sky-800",
    dot: "bg-sky-400",
    feat: "text-sky-700",
  },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile");
  const [emailCopied, setEmailCopied] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data: SiteContent) => setContent(data))
      .catch(() => {/* use default */});
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(content.contact.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const openModal = (imageSrc: string) => setModalImage(imageSrc);
  const closeModal = () => setModalImage(null);

  const waLink = `https://wa.me/${content.contact.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-amber-800">{content.profile.handle}</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              {["profile", "ratecard", "analytics"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`capitalize font-medium transition-colors ${
                    activeSection === section
                      ? "text-rose-600 border-b-2 border-rose-600"
                      : "text-amber-700 hover:text-rose-600"
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-4">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-rose-400 to-amber-400 p-1 cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <img
                  src="/image.jpg"
                  alt={content.profile.handle}
                  className="w-28 h-28 rounded-full object-cover -rotate-90"
                  onClick={() => openModal("/image.jpg")}
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-current" />
            </div>
          </div>

          <h1
            onClick={() => window.open(content.profile.tiktokUrl, "_blank")}
            className="text-4xl md:text-5xl font-bold text-amber-800 mb-4 cursor-pointer hover:text-rose-600 transition-colors duration-300"
          >
            {content.profile.handle}
          </h1>
          <p className="text-xl text-amber-600 mb-6 max-w-2xl mx-auto">
            {content.profile.tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-200">
              <Users className="w-4 h-4 mr-1" />
              {content.profile.followers} Followers
            </Badge>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200">
              <Eye className="w-4 h-4 mr-1" />
              Million of Views
            </Badge>
            <Badge variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-200">
              <TrendingUp className="w-4 h-4 mr-1" />
              more Engagement
            </Badge>
          </div>
          <p className="text-lg font-semibold italic underline text-amber-800 text-right">
            {content.profile.updateDate}
          </p>
        </section>

        {/* Profile Section */}
        {activeSection === "profile" && (
          <section className="mb-16 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-rose-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-rose-100 to-amber-100">
                  <CardTitle className="text-amber-800">About Me</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-amber-700 leading-relaxed mb-6">
                    {content.profile.aboutText1}
                  </p>
                  <p className="text-amber-700 leading-relaxed mb-6">
                    {content.profile.aboutText2}
                  </p>
                  <div className="space-y-4">
                    {content.profile.highlights.map((h, i) => (
                      <div key={i} className="flex items-center text-amber-600">
                        <TrendingUp className="w-5 h-5 mr-3 text-rose-500" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-rose-100 to-amber-100">
                  <CardTitle className="text-amber-800">Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Gender */}
                    <div>
                      <h1 className="font-bold text-lg text-rose-600 border-b-2 border-yellow-500 my-2 pb-2 text-center">Gender</h1>
                      {(["female", "male", "others"] as const).map((k) => (
                        <div key={k} className="mb-3">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-amber-700 capitalize">{k}</span>
                            <span className="text-sm text-amber-600">{content.demographics.gender[k]}%</span>
                          </div>
                          <div className="w-full bg-rose-100 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-rose-400 to-rose-500 h-2 rounded-full"
                              style={{ width: `${content.demographics.gender[k]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Age */}
                    <div>
                      <h1 className="font-bold text-lg text-amber-600 border-b-2 border-yellow-500 my-2 pb-2 text-center">Age</h1>
                      {(["18-24", "25-34", "36-55+"] as const).map((k) => (
                        <div key={k} className="mb-3">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-amber-700">Age {k}</span>
                            <span className="text-sm text-amber-600">{content.demographics.age[k]}%</span>
                          </div>
                          <div className="w-full bg-amber-100 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full"
                              style={{ width: `${content.demographics.age[k]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Location */}
                    <div>
                      <h1 className="font-bold text-lg text-green-600 border-b-2 border-yellow-500 my-2 pb-2 text-center">Location</h1>
                      {(["indonesia", "others"] as const).map((k) => (
                        <div key={k} className="mb-3">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-green-700 capitalize">{k}</span>
                            <span className="text-sm text-green-600">{content.demographics.location[k]}%</span>
                          </div>
                          <div className="w-full bg-green-100 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                              style={{ width: `${content.demographics.location[k]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Rate Card Section */}
        {activeSection === "ratecard" && (
          <section className="mb-16 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">Rate Card</h2>
              <p className="text-xl text-amber-600 max-w-2xl mx-auto">
                Professional content creation packages ✨
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {content.packages.map((pkg) => {
                const colors = pkgColors[pkg.color] || pkgColors.rose;
                return (
                  <Card
                    key={pkg.id}
                    className={`${colors.border} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-1 text-sm font-semibold">
                          MOST POPULAR
                        </Badge>
                      </div>
                    )}
                    <CardHeader className={`${colors.header} text-white text-center rounded-t-lg`}>
                      <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                      <p className="opacity-80">{pkg.subtitle}</p>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <div className={`text-4xl font-bold ${colors.price} mb-2`}>{pkg.price}</div>
                        <div className="text-amber-600">{pkg.priceNote}</div>
                        {pkg.save && (
                          <div className="text-sm text-rose-600 font-medium mt-1">{pkg.save}</div>
                        )}
                      </div>
                      {pkg.features.length > 0 && (
                        <ul className="space-y-4 mb-8">
                          {pkg.features.map((feat, i) => (
                            <li key={i} className={`flex items-center ${colors.feat}`}>
                              <div className={`w-2 h-2 ${colors.dot} rounded-full mr-3`} />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button
                        onClick={() => window.open(waLink, "_blank")}
                        className={`w-full ${colors.btn} text-white font-semibold py-3 rounded-lg transition-all duration-300`}
                      >
                        {pkg.id === "custom" ? "Consultation Now !" : "Choose Package"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Card className="border-rose-200 bg-gradient-to-r from-rose-50 to-amber-50 max-w-3xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">Package Includes</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-amber-700">
                    <div>• Content planning & scripting</div>
                    <div>• Professional voice over</div>
                    <div>• Post-production editing</div>
                    <div>• Hashtag optimization</div>
                    <div>• Posting at optimal times</div>
                    <div>• 30-day performance tracking</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Analytics Section */}
        {activeSection === "analytics" && (
          <section className="mb-16 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
                Analytics Overview
              </h2>
              <p className="text-xl text-amber-600 max-w-2xl mx-auto">
                Real performance data and engagement metrics
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card className="border-rose-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-amber-800">Overview Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={content.analytics.overviewImage}
                    alt="Analytics Dashboard"
                    className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    onClick={() => openModal(content.analytics.overviewImage)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-rose-50 rounded-lg">
                      <div className="text-xl font-bold text-rose-600">{content.analytics.monthlyViews}</div>
                      <div className="text-sm text-amber-600">Monthly Average</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">{content.analytics.monthlyLikes}</div>
                      <div className="text-sm text-amber-600">Monthly Likes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-amber-800">Audience Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={content.analytics.audienceImage}
                    alt="Audience Demographics"
                    className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    onClick={() => openModal(content.analytics.audienceImage)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-rose-50 rounded-lg">
                      <div className="text-2xl font-bold text-rose-600">{content.analytics.femaleAudience}</div>
                      <div className="text-sm text-amber-600">Female Audience</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">{content.analytics.primaryAge}</div>
                      <div className="text-sm text-amber-600">Primary Age Group</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-rose-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-amber-800">Most View Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6 justify-center items-center">
                  {content.analytics.topVideos.map((vid, i) => (
                    <div key={i} className="text-center flex flex-col items-center">
                      <img
                        src={vid.image}
                        alt={vid.title}
                        className="w-48 h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                        onClick={() => window.open(content.profile.tiktokUrl, "_blank")}
                      />
                      <h4 className="font-semibold text-amber-800 mb-2">{vid.title}</h4>
                      <div className="text-sm text-amber-600 space-y-1">
                        <div>{vid.views}</div>
                        <div>{vid.likes}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Contact Section */}
        <section className="text-center">
          <Card className="border-rose-200 bg-gradient-to-r from-rose-100 to-amber-100 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Ready to Collaborate?</h3>
              <p className="text-amber-600 mb-6 max-w-2xl mx-auto">
                Let's create amazing content together! Reach out to discuss your project and get started.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={copyEmail}
                  className="bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white"
                >
                  {emailCopied ? <Check className="w-4 h-4 mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                  {emailCopied ? "Email Copied!" : "Email Me"}
                </Button>
                <Button
                  onClick={() => window.open(waLink, "_blank")}
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  onClick={() => window.open(content.contact.instagramUrl, "_blank")}
                  className="bg-gradient-to-r from-rose-400 to-amber-400 hover:from-rose-500 hover:to-amber-500 text-white"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  DM Instagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* TikTok Embed Section */}
        <section className="text-center mb-16">
          <Card className="border-rose-200 bg-gradient-to-r from-rose-50 to-amber-50 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-amber-800 mb-6">Check Out My TikTok Content</h3>
              <div className="flex justify-center">
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
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-rose-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full flex items-center justify-center">
                <Play className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-bold text-amber-800">{content.profile.handle}</span>
            </div>
            <div className="pt-4 border-t border-rose-100">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
                <span className="text-amber-500 text-sm">Powered by</span>
                <a
                  href="https://lintasinovasiglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
                >
                  <img src="/logo-ligal.png" alt="PT. Lintas Inovasi Global" className="h-8 w-auto" />
                  <span className="text-amber-600 text-sm font-semibold hover:text-rose-500 transition-colors">
                    PT. Lintas Inovasi Global
                  </span>
                </a>
              </div>
            </div>
            <p className="text-amber-600 text-sm mt-4">
              © 2024 {content.profile.handle}. All rights reserved. | Professional TikTok Content Creator
            </p>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={modalImage}
              alt="Zoomed view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 md:hidden">
        <div className="flex justify-around py-2">
          {["profile", "ratecard", "analytics"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                activeSection === section
                  ? "text-rose-400 bg-white/10"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {section === "profile" && <Users className="w-5 h-5 mb-1" />}
              {section === "ratecard" && <Star className="w-5 h-5 mb-1" />}
              {section === "analytics" && <TrendingUp className="w-5 h-5 mb-1" />}
              <span className="text-xs capitalize">{section}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
