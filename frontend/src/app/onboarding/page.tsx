"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useUser } from "@/hooks/useUser";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { updateUser, isUpdating } = useUser();
  const [formData, setFormData] = useState({
    full_name: "",
    industry: "",
    target_audience: "",
    tone: "Professional & Authoritative",
  });

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleFinish = async () => {
    try {
      await updateUser(formData);
      router.push("/dashboard");
    } catch {
      // toast is handled in the hook
    }
  };

  const handleSkip = () => {
    nextStep();
  };

  return (
    <main className="fixed inset-0 z-50 bg-neutral-50 flex flex-col items-center justify-center p-6">
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-200">
        <div
          id="progress-bar"
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        ></div>
      </div>

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden relative">
        {/* Step 1: Welcome */}
        {currentStep === 1 && (
          <div className="p-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="solar:hand-stars-linear" className="text-3xl" />
            </div>
            <h2 className="text-3xl font-oswald font-medium mb-3 tracking-tight">
              Welcome to LINKED.AI
            </h2>
            <p className="text-neutral-500 mb-8">
              Let&apos;s set up your profile so our AI can write exactly like you do.
            </p>
            <button
              onClick={nextStep}
              className="w-full py-3 bg-neutral-900 text-white rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-neutral-800"
            >
              Let&apos;s Go
            </button>
          </div>
        )}

        {/* Step 2: Voice Profile */}
        {currentStep === 2 && (
          <div className="p-10 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-oswald font-medium mb-2 tracking-tight">
              Your Voice Profile
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              Tell us about your professional brand.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Full Name / Creator Name
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="e.g. B2B SaaS, Marketing, AI"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={formData.target_audience}
                  onChange={(e) =>
                    setFormData({ ...formData, target_audience: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="e.g. Founders, Marketers, Junior Devs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Tone of Voice
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) =>
                    setFormData({ ...formData, tone: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:ring-2 focus:ring-blue-600 outline-none appearance-none"
                >
                  <option>Professional & Authoritative</option>
                  <option>Casual & Conversational</option>
                  <option>Bold & Direct</option>
                  <option>Educational & Helpful</option>
                </select>
              </div>
            </div>
            <button
              onClick={nextStep}
              className="w-full mt-8 py-3 bg-neutral-900 text-white rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-neutral-800"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Connect LinkedIn */}
        {currentStep === 3 && (
          <div className="p-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-[#0A66C2]/10 text-[#0A66C2] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Icon icon="mdi:linkedin" className="text-4xl" />
            </div>
            <h2 className="text-2xl font-oswald font-medium mb-3 tracking-tight">
              Connect LinkedIn
            </h2>
            <p className="text-sm text-neutral-500 mb-8">
              Link your account to enable auto-publishing and deep analytics.
            </p>
            <button
              onClick={() => {
                // Mock link click or proceed to API
                window.location.href = "http://localhost:8000/api/v1/linkedin/connect";
              }}
              className="w-full py-3 bg-[#0A66C2] text-white rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-[#084e96] mb-3 flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:linkedin" className="text-lg" /> Connect Account
            </button>
            <button
              onClick={handleSkip}
              className="text-xs text-neutral-400 hover:text-neutral-700 underline underline-offset-2"
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Step 4: Done */}
        {currentStep === 4 && (
          <div className="p-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="solar:check-circle-linear" className="text-4xl" />
            </div>
            <h2 className="text-3xl font-oswald font-medium mb-3 tracking-tight">
              You&apos;re All Set!
            </h2>
            <p className="text-sm text-neutral-500 mb-8">
              Your AI assistant is ready to help you dominate LinkedIn.
            </p>
            <button
              onClick={handleFinish}
              disabled={isUpdating}
              className="w-full py-3 bg-neutral-900 text-white rounded-lg font-semibold uppercase tracking-widest text-xs hover:bg-neutral-800 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Go to Dashboard"}{" "}
              <Icon icon="solar:arrow-right-linear" className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
