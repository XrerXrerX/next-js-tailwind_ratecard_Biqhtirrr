/** @format */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ── Image upload button ──────────────────────────────────────────────────────
function UploadButton({
  onUploaded,
  label = "Upload Image",
}: {
  onUploaded: (path: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.path) {
        onUploaded(data.path);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFile}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 rounded-lg text-xs font-medium text-white transition-colors whitespace-nowrap"
      >
        {uploading ? "Uploading..." : `↑ ${label}`}
      </button>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

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

type Tab = "profile" | "demographics" | "packages" | "analytics" | "contact";

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => setContent(data))
      .catch(() => setStatusMsg("Failed to load content."));
  }, []);

  const save = useCallback(async () => {
    if (!content) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setStatus("saved");
        setStatusMsg("Saved successfully!");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error("Save failed");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Error saving content.");
    }
  }, [content]);

  const updateProfile = (key: keyof SiteContent["profile"], value: string) => {
    setContent((prev) =>
      prev ? { ...prev, profile: { ...prev.profile, [key]: value } } : prev
    );
  };

  const updateHighlight = (index: number, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const highlights = [...prev.profile.highlights];
      highlights[index] = value;
      return { ...prev, profile: { ...prev.profile, highlights } };
    });
  };

  const addHighlight = () => {
    setContent((prev) =>
      prev
        ? { ...prev, profile: { ...prev.profile, highlights: [...prev.profile.highlights, ""] } }
        : prev
    );
  };

  const removeHighlight = (index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const highlights = prev.profile.highlights.filter((_, i) => i !== index);
      return { ...prev, profile: { ...prev.profile, highlights } };
    });
  };

  const updateDemog = (
    section: "gender" | "age" | "location",
    key: string,
    value: number
  ) => {
    setContent((prev) =>
      prev
        ? {
            ...prev,
            demographics: {
              ...prev.demographics,
              [section]: { ...prev.demographics[section], [key]: value },
            },
          }
        : prev
    );
  };

  const updatePackage = (
    pkgIndex: number,
    key: keyof SiteContent["packages"][0],
    value: string | boolean
  ) => {
    setContent((prev) => {
      if (!prev) return prev;
      const packages = [...prev.packages];
      packages[pkgIndex] = { ...packages[pkgIndex], [key]: value };
      return { ...prev, packages };
    });
  };

  const updatePackageFeature = (pkgIndex: number, featIndex: number, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const packages = [...prev.packages];
      const features = [...packages[pkgIndex].features];
      features[featIndex] = value;
      packages[pkgIndex] = { ...packages[pkgIndex], features };
      return { ...prev, packages };
    });
  };

  const addPackageFeature = (pkgIndex: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const packages = [...prev.packages];
      packages[pkgIndex] = {
        ...packages[pkgIndex],
        features: [...packages[pkgIndex].features, ""],
      };
      return { ...prev, packages };
    });
  };

  const removePackageFeature = (pkgIndex: number, featIndex: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const packages = [...prev.packages];
      packages[pkgIndex] = {
        ...packages[pkgIndex],
        features: packages[pkgIndex].features.filter((_, i) => i !== featIndex),
      };
      return { ...prev, packages };
    });
  };

  const updateAnalytics = (key: keyof Omit<SiteContent["analytics"], "topVideos">, value: string) => {

    setContent((prev) =>
      prev ? { ...prev, analytics: { ...prev.analytics, [key]: value } } : prev
    );
  };

  const updateTopVideo = (
    index: number,
    key: keyof SiteContent["analytics"]["topVideos"][0],
    value: string
  ) => {
    setContent((prev) => {
      if (!prev) return prev;
      const topVideos = [...prev.analytics.topVideos];
      topVideos[index] = { ...topVideos[index], [key]: value };
      return { ...prev, analytics: { ...prev.analytics, topVideos } };
    });
  };

  const updateContact = (key: keyof SiteContent["contact"], value: string) => {
    setContent((prev) =>
      prev ? { ...prev, contact: { ...prev.contact, [key]: value } } : prev
    );
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-white text-lg">{statusMsg || "Loading..."}</p>
      </div>
    );
  }

  const tabs: Tab[] = ["profile", "demographics", "packages", "analytics", "contact"];

  const inputCls =
    "w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400";
  const labelCls = "block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide";
  const textareaCls =
    "w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400 resize-y";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-rose-400">Admin Panel</h1>
          <p className="text-xs text-gray-400">biqhtirrr.com content editor</p>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <Badge className="bg-green-600 text-white">✓ {statusMsg}</Badge>
          )}
          {status === "error" && (
            <Badge className="bg-red-600 text-white">✗ {statusMsg}</Badge>
          )}
          <Button
            onClick={save}
            disabled={status === "saving"}
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6"
          >
            {status === "saving" ? "Saving..." : "Save Changes"}
          </Button>
          <a
            href="/"
            target="_blank"
            className="text-xs text-gray-400 hover:text-white underline"
          >
            View Site →
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-rose-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Profile Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Handle</label>
                    <input
                      className={inputCls}
                      value={content.profile.handle}
                      onChange={(e) => updateProfile("handle", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Name</label>
                    <input
                      className={inputCls}
                      value={content.profile.name}
                      onChange={(e) => updateProfile("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Followers</label>
                    <input
                      className={inputCls}
                      value={content.profile.followers}
                      onChange={(e) => updateProfile("followers", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Update Date Text</label>
                    <input
                      className={inputCls}
                      value={content.profile.updateDate}
                      onChange={(e) => updateProfile("updateDate", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Tagline</label>
                  <input
                    className={inputCls}
                    value={content.profile.tagline}
                    onChange={(e) => updateProfile("tagline", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>TikTok URL</label>
                  <input
                    className={inputCls}
                    value={content.profile.tiktokUrl}
                    onChange={(e) => updateProfile("tiktokUrl", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>About Text (paragraph 1)</label>
                  <textarea
                    className={textareaCls}
                    rows={3}
                    value={content.profile.aboutText1}
                    onChange={(e) => updateProfile("aboutText1", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>About Text (paragraph 2)</label>
                  <textarea
                    className={textareaCls}
                    rows={3}
                    value={content.profile.aboutText2}
                    onChange={(e) => updateProfile("aboutText2", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Highlight Bullet Points</label>
                  <div className="space-y-2">
                    {content.profile.highlights.map((h, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          className={inputCls}
                          value={h}
                          onChange={(e) => updateHighlight(i, e.target.value)}
                        />
                        <button
                          onClick={() => removeHighlight(i)}
                          className="px-3 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addHighlight}
                      className="text-sm text-rose-400 hover:text-rose-300 underline"
                    >
                      + Add highlight
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── DEMOGRAPHICS TAB ── */}
        {activeTab === "demographics" && (
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Gender (%)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                {(["female", "male", "others"] as const).map((k) => (
                  <div key={k}>
                    <label className={labelCls}>{k}</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      className={inputCls}
                      value={content.demographics.gender[k]}
                      onChange={(e) =>
                        updateDemog("gender", k, parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Age (%)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                {(["18-24", "25-34", "36-55+"] as const).map((k) => (
                  <div key={k}>
                    <label className={labelCls}>Age {k}</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      className={inputCls}
                      value={content.demographics.age[k]}
                      onChange={(e) =>
                        updateDemog("age", k, parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Location (%)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {(["indonesia", "others"] as const).map((k) => (
                  <div key={k}>
                    <label className={labelCls}>{k}</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      className={inputCls}
                      value={content.demographics.location[k]}
                      onChange={(e) =>
                        updateDemog("location", k, parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── PACKAGES TAB ── */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            {content.packages.map((pkg, pkgIndex) => (
              <Card key={pkg.id} className="bg-gray-900 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">{pkg.name}</CardTitle>
                  <Badge
                    className={`${
                      pkg.popular ? "bg-amber-500" : "bg-gray-700"
                    } text-white`}
                  >
                    {pkg.popular ? "Most Popular" : pkg.color}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Package Name</label>
                      <input
                        className={inputCls}
                        value={pkg.name}
                        onChange={(e) => updatePackage(pkgIndex, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Subtitle</label>
                      <input
                        className={inputCls}
                        value={pkg.subtitle}
                        onChange={(e) => updatePackage(pkgIndex, "subtitle", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Price</label>
                      <input
                        className={inputCls}
                        value={pkg.price}
                        onChange={(e) => updatePackage(pkgIndex, "price", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Price Note</label>
                      <input
                        className={inputCls}
                        value={pkg.priceNote}
                        onChange={(e) => updatePackage(pkgIndex, "priceNote", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Save Text (e.g. &quot;Save Rp 550.000!&quot;)</label>
                      <input
                        className={inputCls}
                        value={pkg.save}
                        onChange={(e) => updatePackage(pkgIndex, "save", e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-5">
                      <input
                        type="checkbox"
                        id={`popular-${pkgIndex}`}
                        checked={pkg.popular}
                        onChange={(e) => updatePackage(pkgIndex, "popular", e.target.checked)}
                        className="w-4 h-4 accent-rose-500"
                      />
                      <label
                        htmlFor={`popular-${pkgIndex}`}
                        className="text-sm text-gray-300"
                      >
                        Show &quot;MOST POPULAR&quot; badge
                      </label>
                    </div>
                  </div>

                  {pkg.features.length > 0 && (
                    <div>
                      <label className={labelCls}>Features</label>
                      <div className="space-y-2">
                        {pkg.features.map((feat, featIndex) => (
                          <div key={featIndex} className="flex gap-2">
                            <input
                              className={inputCls}
                              value={feat}
                              onChange={(e) =>
                                updatePackageFeature(pkgIndex, featIndex, e.target.value)
                              }
                            />
                            <button
                              onClick={() => removePackageFeature(pkgIndex, featIndex)}
                              className="px-3 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => addPackageFeature(pkgIndex)}
                    className="text-sm text-rose-400 hover:text-rose-300 underline"
                  >
                    + Add feature
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── ANALYTICS TAB ── */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Summary Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Overview Image</label>
                    <div className="flex gap-2 items-center mb-1">
                      <UploadButton
                        label="Upload"
                        onUploaded={(path) => updateAnalytics("overviewImage", path)}
                      />
                      {content.analytics.overviewImage && (
                        <img
                          src={content.analytics.overviewImage}
                          alt="preview"
                          className="h-8 w-12 object-cover rounded border border-gray-600"
                        />
                      )}
                    </div>
                    <input
                      className={inputCls}
                      value={content.analytics.overviewImage}
                      onChange={(e) => updateAnalytics("overviewImage", e.target.value)}
                      placeholder="/uploads/image.png"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Audience Insight Image</label>
                    <div className="flex gap-2 items-center mb-1">
                      <UploadButton
                        label="Upload"
                        onUploaded={(path) => updateAnalytics("audienceImage", path)}
                      />
                      {content.analytics.audienceImage && (
                        <img
                          src={content.analytics.audienceImage}
                          alt="preview"
                          className="h-8 w-12 object-cover rounded border border-gray-600"
                        />
                      )}
                    </div>
                    <input
                      className={inputCls}
                      value={content.analytics.audienceImage}
                      onChange={(e) => updateAnalytics("audienceImage", e.target.value)}
                      placeholder="/uploads/image.png"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Monthly Views</label>
                  <input
                    className={inputCls}
                    value={content.analytics.monthlyViews}
                    onChange={(e) => updateAnalytics("monthlyViews", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Monthly Likes</label>
                  <input
                    className={inputCls}
                    value={content.analytics.monthlyLikes}
                    onChange={(e) => updateAnalytics("monthlyLikes", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Female Audience %</label>
                  <input
                    className={inputCls}
                    value={content.analytics.femaleAudience}
                    onChange={(e) => updateAnalytics("femaleAudience", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Primary Age Group</label>
                  <input
                    className={inputCls}
                    value={content.analytics.primaryAge}
                    onChange={(e) => updateAnalytics("primaryAge", e.target.value)}
                  />
                </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.analytics.topVideos.map((vid, i) => (
                  <div key={i} className="border border-gray-700 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-400 mb-3">
                      Video #{i + 1}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Title</label>
                        <input
                          className={inputCls}
                          value={vid.title}
                          onChange={(e) => updateTopVideo(i, "title", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Video Thumbnail</label>
                        <div className="flex gap-2 items-center mb-1">
                          <UploadButton
                            label="Upload"
                            onUploaded={(path) => updateTopVideo(i, "image", path)}
                          />
                          {vid.image && (
                            <img
                              src={vid.image}
                              alt="preview"
                              className="h-8 w-6 object-cover rounded border border-gray-600"
                            />
                          )}
                        </div>
                        <input
                          className={inputCls}
                          value={vid.image}
                          onChange={(e) => updateTopVideo(i, "image", e.target.value)}
                          placeholder="/uploads/image.jpg"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Views</label>
                        <input
                          className={inputCls}
                          value={vid.views}
                          onChange={(e) => updateTopVideo(i, "views", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Likes</label>
                        <input
                          className={inputCls}
                          value={vid.likes}
                          onChange={(e) => updateTopVideo(i, "likes", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── CONTACT TAB ── */}
        {activeTab === "contact" && (
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className={labelCls}>Email</label>
                <input
                  className={inputCls}
                  type="email"
                  value={content.contact.email}
                  onChange={(e) => updateContact("email", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>WhatsApp Number (with country code, e.g. +62...)</label>
                <input
                  className={inputCls}
                  value={content.contact.whatsapp}
                  onChange={(e) => updateContact("whatsapp", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Instagram URL</label>
                <input
                  className={inputCls}
                  value={content.contact.instagramUrl}
                  onChange={(e) => updateContact("instagramUrl", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>TikTok Embed ID (handle without @)</label>
                <input
                  className={inputCls}
                  value={content.contact.tiktokEmbedId}
                  onChange={(e) => updateContact("tiktokEmbedId", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bottom save */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={save}
            disabled={status === "saving"}
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-3"
          >
            {status === "saving" ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
