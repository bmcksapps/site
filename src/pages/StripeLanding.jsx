import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StripeCheckoutButton } from "../components/StripeCheckoutButton";

export default function StripeLanding() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-6 pt-28 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">AI Writer Pro by BMCKSAPPS LLC</h1>
          <p className="text-lg text-gray-300 mb-8">
            Unlock unlimited AI-powered blog generation, creative content, and SEO tools with AI Writer Pro.
          </p>
          <p className="mb-6 text-gray-400 font-semibold">$12/month · Instant access</p>
          <StripeCheckoutButton />
          <div className="mt-10 text-sm text-gray-500">
            Have questions? Contact us at{" "}
            <a href="mailto:bmcksapps@gmail.com" className="underline">
              bmcksapps@gmail.com
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
