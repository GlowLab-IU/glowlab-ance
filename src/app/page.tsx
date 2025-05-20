import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomBadge as Badge } from "@/components/ui/badge";
import OurProcess from "@/components/OurProcess";
import {
  Upload,
  Shield,
  Sparkles,
  CheckCircle,
  BarChart3,
  FileText,
  Lock,
  ArrowRight,
  Database,
  UserCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50" />

          {/* Decorative elements */}
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute bottom-20 left-[10%] w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

          <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-violet-100 text-violet-800 hover:bg-violet-100 border-violet-200">
                Web3 Powered Skincare
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-indigo-700">
                Harnessing AI & Blockchain for Personalized Acne Treatment
              </h1>

              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Our platform combines cutting-edge AI diagnosis with blockchain
                verification to connect you with the most effective acne
                treatments tailored to your specific needs.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/camera" passHref>
                  <Button
                    size="lg"
                    className="bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-violet-200 text-violet-700 hover:bg-orange-100"
                >
                  Learn More
                </Button>
              </div>

              <div className="mt-12 flex justify-center">
                <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl">
                  {/* Video element */}
                  <video
                    src="/video.mp4"
                    className="object-cover w-full h-full"
                    controls // hiện thanh điều khiển play/pause/volume
                    muted={true} // nếu muốn autoPlay thì muted phải = true
                    loop={true} // nếu muốn lặp lại thì chuyển sang true
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-y">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-violet-600 mb-2">
                  98%
                </p>
                <p className="text-sm text-slate-500">Diagnosis Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-violet-600 mb-2">
                  50K+
                </p>
                <p className="text-sm text-slate-500">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-violet-600 mb-2">
                  200+
                </p>
                <p className="text-sm text-slate-500">Verified Brands</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-violet-600 mb-2">
                  85%
                </p>
                <p className="text-sm text-slate-500">Treatment Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main User/Brand Sections */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Path
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Whether you're seeking treatment or providing solutions, our
                platform connects the right people with the right products.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* User Card */}
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-violet-500 to-purple-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <UserCircle className="h-20 w-20 text-white/80" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge className="bg-violet-100 text-violet-800 hover:bg-violet-100">
                      For Patients
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Get Personalized Treatment
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Upload photos of your acne, receive AI-powered diagnosis,
                    and get matched with effective treatments verified on the
                    blockchain.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-violet-100 p-1.5 rounded-full">
                        <Upload className="h-4 w-4 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Upload Photos</h4>
                        <p className="text-xs text-slate-500">
                          Securely share images of your skin condition
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-violet-100 p-1.5 rounded-full">
                        <Sparkles className="h-4 w-4 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">AI Analysis</h4>
                        <p className="text-xs text-slate-500">
                          Get accurate diagnosis of your condition
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-violet-100 p-1.5 rounded-full">
                        <CheckCircle className="h-4 w-4 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">
                          Matched Treatments
                        </h4>
                        <p className="text-xs text-slate-500">
                          Receive personalized product recommendations
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button className="w-full bg-violet-600 hover:bg-violet-700">
                    Upload Your Photo
                  </Button>
                </CardFooter>
              </Card>

              {/* Brand Card */}
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-blue-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="h-20 w-20 text-white/80" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
                      For Brands
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Certify Your Products
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Submit your acne treatment products for expert review and
                    blockchain certification to build trust and connect with the
                    right patients.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-indigo-100 p-1.5 rounded-full">
                        <FileText className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Submit Products</h4>
                        <p className="text-xs text-slate-500">
                          Register your products on our platform
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-indigo-100 p-1.5 rounded-full">
                        <Database className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">
                          Blockchain Verification
                        </h4>
                        <p className="text-xs text-slate-500">
                          Get immutable certification of quality
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-indigo-100 p-1.5 rounded-full">
                        <BarChart3 className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">
                          Connect with Patients
                        </h4>
                        <p className="text-xs text-slate-500">
                          Reach users who need your solutions
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Register Your Brand
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <OurProcess />

        {/* Technology Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-violet-100 text-violet-800 hover:bg-violet-100 border-violet-200">
                Our Technology
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powered by Innovation
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our platform leverages cutting-edge technologies to create a
                secure, transparent, and effective ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="mb-6 w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI Diagnosis</h3>
                  <p className="text-slate-600">
                    Our proprietary AI algorithms analyze thousands of data
                    points from skin images to provide accurate diagnosis and
                    treatment recommendations.
                  </p>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium text-sm mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-violet-600" />
                        <span>98% diagnostic accuracy</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-violet-600" />
                        <span>Identifies 30+ acne subtypes</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-violet-600" />
                        <span>Personalized severity scoring</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="mb-6 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Database className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Blockchain Verification
                  </h3>
                  <p className="text-slate-600">
                    We use blockchain technology to create immutable records of
                    product certifications, ensuring transparency and trust
                    throughout the ecosystem.
                  </p>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium text-sm mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-indigo-600" />
                        <span>Tamper-proof certification</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-indigo-600" />
                        <span>Transparent verification</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-indigo-600" />
                        <span>Smart contract integration</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="mb-6 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Privacy & Security</h3>
                  <p className="text-slate-600">
                    We prioritize user privacy and data security with end-to-end
                    encryption and decentralized storage solutions.
                  </p>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium text-sm mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span>End-to-end encryption</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span>Decentralized data storage</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span>User-controlled data sharing</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-violet-50 to-indigo-50">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-violet-100 text-violet-800 hover:bg-violet-100 border-violet-200">
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Hear from patients and brands who have experienced the power of
                our platform.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/avatar.png"
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <p className="text-sm text-slate-500">Patient</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#8b5cf6"
                        stroke="none"
                        className="inline-block mr-1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-slate-600 italic">
                    "After struggling with acne for years, I finally found
                    products that actually work for my specific condition. The
                    AI analysis was incredibly accurate!"
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/avatar.png"
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Dr. Michael Chen</h4>
                      <p className="text-sm text-slate-500">Dermatologist</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#8b5cf6"
                        stroke="none"
                        className="inline-block mr-1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-slate-600 italic">
                    "As a dermatologist, I'm impressed by the accuracy of the AI
                    diagnosis. This platform is revolutionizing how we approach
                    acne treatment."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/avatar.png"
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Emma Rodriguez</h4>
                      <p className="text-sm text-slate-500">Brand Partner</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#8b5cf6"
                        stroke="none"
                        className="inline-block mr-1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-slate-600 italic">
                    "The blockchain certification has significantly increased
                    consumer trust in our products. We've seen a 40% increase in
                    sales since joining the platform."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-violet-900 text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Skin Journey?
              </h2>
              <p className="text-xl text-violet-200 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have found effective acne solutions
                through our AI-powered, blockchain-verified platform.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-violet-900 hover:bg-violet-100"
                >
                  Get Started Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-violet-700 text-white hover:bg-violet-800"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">GlowChain</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Harnessing AI & Blockchain to Deliver Transparent, Personalized
                Acne Treatment Solutions
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/upload"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Upload Acne Photo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    For Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Medical Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-slate-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-slate-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-slate-400"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-slate-400">contact@GlowChain.io</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-slate-400"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-slate-400">
                    123 Innovation Way
                    <br />
                    San Francisco, CA 94107
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} GlowChain. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="bg-slate-800 p-1.5 rounded flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-violet-400"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <path d="M3 9h18" />
                  <path d="M3 15h18" />
                  <path d="M9 3v18" />
                  <path d="M15 3v18" />
                </svg>
                <span className="text-xs text-slate-400">
                  Blockchain Verified
                </span>
              </div>
              <div className="bg-slate-800 p-1.5 rounded flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-violet-400"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                <span className="text-xs text-slate-400">HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
