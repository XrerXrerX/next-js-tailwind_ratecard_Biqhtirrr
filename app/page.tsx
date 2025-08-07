/** @format */

"use client";

import { useState } from "react";
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

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile");
  const [emailCopied, setEmailCopied] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("dikihidayat.dh@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

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
              <span className="text-xl font-bold text-amber-800">
                @biqhtirrr
              </span>
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
        <section className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-rose-400 to-amber-400 p-1 cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <img
                  src="/image.jpg"
                  alt="@biqhtirrr"
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
            onClick={() =>
              window.open(
                "https://www.tiktok.com/@biqhtirrr?is_from_webapp=1&sender_device=pc",
                "_blank"
              )
            }
            className="text-4xl md:text-5xl font-bold text-amber-800 mb-4 cursor-pointer hover:text-rose-600 transition-colors duration-300"
          >
            @biqhtirrr
          </h1>
          <p className="text-xl text-amber-600 mb-6 max-w-2xl mx-auto">
            TikTok Content Creator & Lifestyle Influencer
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge
              variant="secondary"
              className="bg-rose-100 text-rose-700 hover:bg-rose-200"
            >
              <Users className="w-4 h-4 mr-1" />
              170.9K Followers
            </Badge>
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-700 hover:bg-amber-200"
            >
              <Eye className="w-4 h-4 mr-1" />
              23M Monthly Views
            </Badge>
            <Badge
              variant="secondary"
              className="bg-rose-100 text-rose-700 hover:bg-rose-200"
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              8.2% Engagement
            </Badge>
          </div>
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
                    Hi , saya Andien, seorang influencer di TikTok dengan lebih
                    dari{" "}
                    <span className="font-bold text-emerald-600">
                      170.9K followers
                    </span>{" "}
                    dan total{" "}
                    <span className="font-bold text-emerald-600">
                      7.6M Likes
                    </span>
                    . Saya siap untuk bekerja sama dengan brand dan kreator lain
                    untuk membuat konten yang kreatif dan menarik! 🚀
                  </p>
                  <div className="space-y-4">
                    {/* <div className="flex items-center text-amber-600">
                      <Calendar className="w-5 h-5 mr-3 text-rose-500" />
                      <span>Content Creator since 2022</span>
                    </div> */}
                    <div className="flex items-center text-amber-600">
                      <Star className="w-5 h-5 mr-3 text-rose-500" />
                      <span>Specialized in Beauty & Lifestyle</span>
                    </div>
                    <div className="flex items-center text-amber-600">
                      <TrendingUp className="w-5 h-5 mr-3 text-rose-500" />
                      <span>Average 100K views per video</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-rose-100 to-amber-100">
                  <CardTitle className="text-amber-800">
                    Audience Demographics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-amber-700">
                          Female
                        </span>
                        <span className="text-sm text-amber-600">66%</span>
                      </div>
                      <div className="w-full bg-rose-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-rose-400 to-rose-500 h-2 rounded-full"
                          style={{ width: "66%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-amber-700">
                          male
                        </span>
                        <span className="text-sm text-amber-600">30%</span>
                      </div>
                      <div className="w-full bg-rose-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-rose-400 to-rose-500 h-2 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-amber-700">
                          Age 18-24
                        </span>
                        <span className="text-sm text-amber-600">45%</span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-amber-700">
                          Age 25-34
                        </span>
                        <span className="text-sm text-amber-600">39%</span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full"
                          style={{ width: "39%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-amber-700">
                          Age 36-55+
                        </span>
                        <span className="text-sm text-amber-600">15%</span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                    {/* <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-amber-700">
                          Indonesia
                        </span>
                        <span className="text-sm text-amber-600">77%</span>
                      </div>
                      <div className="w-full bg-rose-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-rose-400 to-amber-400 h-2 rounded-full"
                          style={{ width: "77%" }}
                        ></div>
                      </div>
                    </div> */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
                Rate Card
              </h2>
              <p className="text-xl text-amber-600 max-w-2xl mx-auto">
                Professional content creation packages ✨
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Single Video Package */}
              <Card className="border-rose-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="bg-gradient-to-r from-rose-400 to-rose-500 text-white text-center rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">
                    Single Video
                  </CardTitle>
                  <p className="text-rose-100">Perfect for your brand 🚀</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-amber-800 mb-2">
                      Rp 2.250.000
                    </div>
                    <div className="text-amber-600">per video content</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                      1 TikTok video (30-60 seconds)
                    </li>
                    <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                      Professional editing & effects
                    </li>
                    <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                      2 revisions included
                    </li>
                    <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                      Code boost free 30 days included
                    </li>
                    {/* <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                      Content ownership rights
                    </li> */}
                  </ul>

                  <Button
                    onClick={() =>
                      window.open("https://wa.me/+6289612716535", "_blank")
                    }
                    className="w-full bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    Choose Package
                  </Button>
                </CardContent>
              </Card>

              {/* Triple Video Package */}
              <Card className="border-amber-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-1 text-sm font-semibold">
                    MOST POPULAR
                  </Badge>
                </div>
                <CardHeader className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-center rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">
                    Triple Video Package
                  </CardTitle>
                  <p className="text-amber-100">
                    Best value for campaign series
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-amber-800 mb-2">
                      Rp 6.200.000
                    </div>
                    <div className="text-amber-600">3 video contents</div>
                    <div className="text-sm text-rose-600 font-medium mt-1">
                      Save Rp 550.000!
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                      3 TikTok videos (30-60 seconds each)
                    </li>
                    <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                      Professional editing & effects
                    </li>
                    <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                      3 revisions per video included
                    </li>
                    <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                      Code boost free 80 days included
                    </li>
                    {/* <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                      Detailed analytics report
                    </li> */}
                    {/* <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                      Content ownership rights
                    </li> */}
                    {/* <li className="flex items-center text-amber-700">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                      1 Instagram Story bonus
                    </li> */}
                  </ul>

                  <Button
                    onClick={() =>
                      window.open("https://wa.me/+6289612716535", "_blank")
                    }
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    Choose Package
                  </Button>
                </CardContent>
              </Card>
              {/* fifth Video Package */}
              <Card className="border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 text-white text-center rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">
                    Fifth Video Package
                  </CardTitle>
                  <p className="text-purple-100">
                    Best value for raising your brand awareness
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-purple-800 mb-2">
                      Rp 9.500.000
                    </div>
                    <div className="text-purple-600">5 video contents</div>
                    <div className="text-sm text-rose-600 font-medium mt-1">
                      Save Rp 1.750.000!
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-purple-700">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      5 TikTok videos (30-60 seconds each)
                    </li>
                    <li className="flex items-center text-purple-700">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Professional editing & effects
                    </li>
                    <li className="flex items-center text-purple-700">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      4 revisions per video included
                    </li>
                    <li className="flex items-center text-purple-700">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                      Code boost free 80 days included
                    </li>
                    {/* <li className="flex items-center text-purple-700">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Detailed analytics report
                    </li> */}
                    {/* <li className="flex items-center text-purple-700">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Content ownership rights
                    </li> */}
                    {/* <li className="flex items-center text-purple-700">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      1 Instagram Story bonus
                    </li> */}
                  </ul>

                  <Button
                    onClick={() =>
                      window.open("https://wa.me/+6289612716535", "_blank")
                    }
                    className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    Choose Package
                  </Button>
                </CardContent>
              </Card>
              {/* custom Video Package */}
              <Card className="border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                <CardHeader className="bg-gradient-to-r from-sky-400 to-sky-500 text-white text-center rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">
                    Custom Video Package
                  </CardTitle>
                  <p className="text-sky-100">tell me more what you need</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-sky-800 mb-2">
                      Chat Us Now !
                    </div>
                    <div className="text-sky-600">depends on your needs</div>
                  </div>

                  <Button
                    onClick={() =>
                      window.open("https://wa.me/+6289612716535", "_blank")
                    }
                    className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    Consultation Now !
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <Card className="border-rose-200 bg-gradient-to-r from-rose-50 to-amber-50 max-w-3xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-4">
                    Package Includes
                  </h3>
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
                  <CardTitle className="text-amber-800">
                    Overview Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/overview.png"
                    alt="Analytics Dashboard"
                    className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    onClick={() => openModal("/overview.png")}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-rose-50 rounded-lg">
                      <div className="text-2xl font-bold text-rose-600">
                        23M
                      </div>
                      <div className="text-sm text-amber-600">
                        Monthly Views
                      </div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">
                        1.2M
                      </div>
                      <div className="text-sm text-amber-600">
                        Monthly Likes
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-amber-800">
                    Audience Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/audience.png"
                    alt="Audience Demographics"
                    className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    onClick={() => openModal("/audience.png")}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-rose-50 rounded-lg">
                      <div className="text-2xl font-bold text-rose-600">
                        66%
                      </div>
                      <div className="text-sm text-amber-600">
                        Female Audience
                      </div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">
                        18-24
                      </div>
                      <div className="text-sm text-amber-600">
                        Primary Age Group
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-rose-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-amber-800">
                  Most View Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6 justify-center items-center">
                  <div className="text-center flex flex-col items-center">
                    <img
                      src="/11m.jpg"
                      alt="Beauty Campaign"
                      className="w-48 h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                      onClick={() =>
                        window.open(
                          "https://www.tiktok.com/@biqhtirrr?is_from_webapp=1&sender_device=pc",
                          "_blank"
                        )
                      }
                    />
                    <h4 className="font-semibold text-amber-800 mb-2">
                      Most View Content
                    </h4>
                    <div className="text-sm text-amber-600 space-y-1">
                      <div>11M+ Views</div>
                      <div>541K Likes</div>
                      {/* <div>12% Engagement</div> */}
                    </div>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <img
                      src="/48m.jpg"
                      alt="Beauty Campaign"
                      className="w-48 h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                      onClick={() =>
                        window.open(
                          "https://www.tiktok.com/@biqhtirrr?is_from_webapp=1&sender_device=pc",
                          "_blank"
                        )
                      }
                    />
                    <h4 className="font-semibold text-amber-800 mb-2">
                      second Most View Content
                    </h4>
                    <div className="text-sm text-amber-600 space-y-1">
                      <div>4.8M+ Views</div>
                      <div>174K Likes</div>
                      {/* <div>12% Engagement</div> */}
                    </div>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <img
                      src="/47m.jpg"
                      alt="Beauty Campaign"
                      className="w-48 h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                      onClick={() =>
                        window.open(
                          "https://www.tiktok.com/@biqhtirrr?is_from_webapp=1&sender_device=pc",
                          "_blank"
                        )
                      }
                    />
                    <h4 className="font-semibold text-amber-800 mb-2">
                      third Most View Content
                    </h4>
                    <div className="text-sm text-amber-600 space-y-1">
                      <div>4.7M+ Views</div>
                      <div>271K Likes</div>
                      {/* <div>12% Engagement</div> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Contact Section */}
        <section className="text-center">
          <Card className="border-rose-200 bg-gradient-to-r from-rose-100 to-amber-100 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">
                Ready to Collaborate?
              </h3>
              <p className="text-amber-600 mb-6 max-w-2xl mx-auto">
                Let's create amazing content together! Reach out to discuss your
                project and get started.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={copyEmail}
                  className="bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white"
                >
                  {emailCopied ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Mail className="w-4 h-4 mr-2" />
                  )}
                  {emailCopied ? "Email Copied!" : "Email Me"}
                </Button>
                <Button
                  onClick={() =>
                    window.open("https://wa.me/+6289612716535", "_blank")
                  }
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/andienads/",
                      "_blank"
                    )
                  }
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
              <h3 className="text-2xl font-bold text-amber-800 mb-6">
                Check Out My TikTok Content
              </h3>
              <div className="flex justify-center">
                <blockquote
                  className="tiktok-embed"
                  cite="https://www.tiktok.com/@biqhtirrr"
                  data-unique-id="biqhtirrr"
                  data-embed-type="creator"
                  style={{ maxWidth: "780px", minWidth: "288px" }}
                >
                  <section>
                    <a
                      target="_blank"
                      href="https://www.tiktok.com/@biqhtirrr?refer=creator_embed"
                    >
                      @biqhtirrr
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
              <span className="text-lg font-bold text-amber-800">
                @biqhtirrr
              </span>
            </div>
            <p className="text-amber-600 text-sm">
              © 2024 @biqhtirrr. All rights reserved. | Professional TikTok
              Content Creator
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
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
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
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-rose-100 md:hidden">
        <div className="flex justify-around py-2">
          {["profile", "ratecard", "analytics"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                activeSection === section
                  ? "text-rose-600 bg-rose-50"
                  : "text-amber-700"
              }`}
            >
              {section === "profile" && <Users className="w-5 h-5 mb-1" />}
              {section === "ratecard" && <Star className="w-5 h-5 mb-1" />}
              {section === "analytics" && (
                <TrendingUp className="w-5 h-5 mb-1" />
              )}
              <span className="text-xs capitalize">{section}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
