"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

export default function LandingPage() {
  return (
      <main
        id="landing-shell"
        className="relative w-full bg-[#f4f4f5] overflow-hidden flex flex-col min-h-screen text-neutral-900"
      >
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-gradient-to-b from-white/60 to-transparent opacity-50 blur-3xl pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3"></div>

      <nav className="flex flex-wrap md:px-12 z-30 pt-6 pr-6 pb-6 pl-6 relative gap-x-20 gap-y-6 items-center justify-between mx-auto max-w-[90rem] w-full">
        <div className="flex items-center gap-3 group cursor-pointer mr-8">
          <div className="flex text-white bg-blue-600 w-9 h-9 rounded-lg relative items-center justify-center shadow-lg">
            <Icon icon="solar:pen-new-square-linear" className="text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="uppercase leading-none text-2xl font-medium tracking-tight font-oswald">
              LINKED<span className="text-blue-600">.AI</span>
            </span>
            <span className="text-[0.6rem] uppercase text-neutral-700 tracking-widest font-space">
              Content SaaS
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 mr-auto">
          <a
            href="#"
            className="uppercase hover:text-neutral-900 transition-colors text-xs font-semibold text-neutral-600 tracking-widest"
          >
            Features
          </a>
          <a
            href="#"
            className="uppercase hover:text-neutral-900 transition-colors text-xs font-semibold text-neutral-600 tracking-widest"
          >
            How It Works
          </a>
          <a
            href="#"
            className="uppercase hover:text-neutral-900 transition-colors text-xs font-semibold text-neutral-600 tracking-widest"
          >
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <Link href="/dashboard">
            <button className="uppercase hover:text-neutral-900 transition-colors text-xs font-semibold text-neutral-600 tracking-widest px-4 py-2 cursor-pointer">
              Sign In
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="uppercase hover:bg-neutral-800 transition-colors flex text-xs font-semibold text-white tracking-wider bg-neutral-900 rounded-full pt-2 pr-6 pb-2 pl-6 shadow-lg gap-x-2 items-center">
              Get Started
              <Icon icon="solar:arrow-right-linear" className="text-sm" />
            </button>
          </Link>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto z-10 relative">
        {/* HERO */}
        <section className="md:px-12 md:pb-10 max-w-[90rem] mr-auto ml-auto pt-12 pr-6 pb-24 pl-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16 gap-y-8 items-start">
            <div className="lg:col-span-7 flex flex-col gap-y-8">
              <div className="flex gap-4 items-center">
                <div className="h-px w-12 bg-blue-400"></div>
                <span className="uppercase text-xs font-semibold text-blue-500 tracking-widest">
                  The Ultimate LinkedIn Growth Engine
                </span>
              </div>
              <h1 className="md:text-8xl lg:text-[9rem] leading-[0.85] uppercase text-6xl font-medium text-neutral-900 tracking-tight font-oswald pt-2 pb-6">
                DOMINATE<br/>LINKEDIN WITH<br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-neutral-900">
                  AI CONTENT
                </span>
              </h1>
              <p className="md:text-2xl leading-tight text-xl font-medium text-neutral-600 tracking-tight font-space max-w-2xl mb-4">
                Stop staring at a blank page. Generate, schedule, and analyze
                high-converting LinkedIn posts in your unique voice. Built for
                creators, founders, and agencies.
              </p>
              <div className="flex gap-4">
              <Link href="/dashboard">
                  <button className="px-8 py-4 bg-neutral-900 text-white rounded-lg flex items-center gap-2 uppercase text-sm font-semibold tracking-widest hover:bg-neutral-800 transition-all hover:shadow-xl hover:-translate-y-1">
                    Start Free Trial
                    <Icon icon="solar:arrow-right-linear" className="text-lg" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 h-[35rem] mt-1 relative w-full pr-8">
              <div className="absolute inset-0 bg-blue-200/50 rounded-2xl rotate-3 opacity-60"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full w-full bg-[#1a1a1a] border border-neutral-800 flex flex-col p-6">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-[#222222] rounded-lg p-5 font-space text-sm text-neutral-300">
                  <div className="mb-4 text-blue-400">
                    Generating post about &quot;Leadership in AI&quot;...
                  </div>
                  <div className="space-y-3 opacity-80">
                    <div className="h-4 bg-[#333333] rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-[#333333] rounded w-full animate-pulse delay-75"></div>
                    <div className="h-4 bg-[#333333] rounded w-5/6 animate-pulse delay-150"></div>
                    <div className="h-4 bg-[#333333] rounded w-1/2 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES & HOW IT WORKS */}
        <section className="bg-white border-t border-neutral-200 pt-14 pb-24">
          <div className="md:px-12 max-w-7xl mx-auto pr-6 pl-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2 block">
                Platform Features
              </span>
              <h3 className="md:text-5xl text-4xl font-medium text-neutral-900 tracking-tight font-oswald">
                Your Full-Stack LinkedIn OS
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-300 transition-colors">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Icon
                    icon="solar:magic-stick-3-linear"
                    className="text-2xl"
                  />
                </div>
                <h4 className="text-lg font-semibold font-oswald uppercase mb-3">
                  AI Voice Cloning
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Train our AI on your previous posts. It learns your exact tone,
                  formatting, and industry jargon to write posts that sound 100%
                  human.
                </p>
              </div>
              <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-300 transition-colors">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Icon icon="solar:calendar-linear" className="text-2xl" />
                </div>
                <h4 className="text-lg font-semibold font-oswald uppercase mb-3">
                  Smart Scheduling
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Generate a week&apos;s worth of content in 3 minutes. Drag and drop
                  onto our calendar and automatically publish at peak engagement
                  times.
                </p>
              </div>
              <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-300 transition-colors">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Icon icon="solar:chart-square-linear" className="text-2xl" />
                </div>
                <h4 className="text-lg font-semibold font-oswald uppercase mb-3">
                  Deep Analytics
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Track impressions, engagement rates, and follower growth.
                  Understand what topics resonate best and double down on winning
                  formats.
                </p>
              </div>
            </div>

            {/* 3 Steps */}
            <div className="md:p-12 overflow-hidden text-white bg-neutral-900 rounded-3xl pt-8 pr-8 pb-8 pl-8 relative">
              <div className="blur-[6.25rem] bg-blue-500/20 w-96 h-96 rounded-full absolute top-0 right-0"></div>
              <div className="relative z-10 mb-12">
                <span className="uppercase block text-xs font-semibold text-blue-400 tracking-widest mb-2">
                  How it works
                </span>
                <h3 className="md:text-5xl text-3xl font-medium tracking-tight font-oswald">
                  Go from idea to published in minutes
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div>
                  <div className="text-4xl font-oswald text-neutral-700 mb-4">
                    01
                  </div>
                  <h5 className="text-lg font-semibold mb-2 font-space">
                    Setup Voice Profile
                  </h5>
                  <p className="text-sm text-neutral-400">
                    Tell us your industry, audience, and preferred tone. The AI
                    adapts instantly.
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-oswald text-neutral-700 mb-4">
                    02
                  </div>
                  <h5 className="text-lg font-semibold mb-2 font-space">
                    Generate Content
                  </h5>
                  <p className="text-sm text-neutral-400">
                    Input a rough idea or keyword. Get fully formatted posts with
                    hooks and hashtags.
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-oswald text-neutral-700 mb-4">
                    03
                  </div>
                  <h5 className="text-lg font-semibold mb-2 font-space">
                    Schedule &amp; Grow
                  </h5>
                  <p className="text-sm text-neutral-400">
                    Review, tweak if needed, and add to your queue. Watch your
                    impressions soar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="md:px-12 max-w-7xl mx-auto pt-24 pr-6 pb-24 pl-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="uppercase block text-xs font-semibold text-neutral-500 tracking-widest mb-2">
              Pricing
            </span>
            <h3 className="md:text-6xl text-4xl font-medium text-neutral-900 tracking-tight font-oswald">
              Simple, transparent pricing
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all-300">
              <div>
                <div className="text-sm font-space uppercase tracking-widest text-neutral-500 mb-4">
                  Starter
                </div>
                <h4 className="text-3xl font-oswald font-medium mb-2">
                  Creator
                </h4>
                <div className="text-4xl font-space font-semibold text-neutral-900 mb-6">
                  $97<span className="text-lg text-neutral-400 font-normal">/mo</span>
                </div>
                <ul className="space-y-4 text-sm text-neutral-600 mb-8">
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-neutral-900"
                    />
                    30 AI posts per month
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-neutral-900"
                    />
                    1 LinkedIn Account
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-neutral-900"
                    />
                    Basic Scheduling
                  </li>
                </ul>
              </div>
              <Link href="/sign-up">
                <button className="w-full py-4 border border-neutral-900 text-neutral-900 font-medium uppercase tracking-widest text-xs hover:bg-neutral-900 hover:text-white transition-colors rounded-lg">
                  Get Starter
                </button>
              </Link>
            </div>

            <div className="bg-neutral-900 text-white border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between transform md:-translate-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[0.6rem] font-semibold uppercase px-3 py-1">
                Most Popular
              </div>
              <div>
                <div className="text-sm font-space uppercase tracking-widest text-neutral-400 mb-4">
                  Growth
                </div>
                <h4 className="text-3xl font-oswald font-medium mb-2">
                  Professional
                </h4>
                <div className="text-4xl font-space font-semibold text-white mb-6">
                  $197<span className="text-lg text-neutral-500 font-normal">/mo</span>
                </div>
                <ul className="space-y-4 text-sm text-neutral-300 mb-8">
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-blue-400"
                    />
                    Unlimited AI posts
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-blue-400"
                    />
                    3 LinkedIn Accounts
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-blue-400"
                    />
                    Advanced Analytics
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-blue-400"
                    />
                    Custom Voice Training
                  </li>
                </ul>
              </div>
              <Link href="/sign-up">
                <button className="w-full py-4 bg-blue-600 text-white font-medium uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors rounded-lg">
                  Start Growth
                </button>
              </Link>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all-300">
              <div>
                <div className="text-sm font-space uppercase tracking-widest text-neutral-500 mb-4">
                  Agency
                </div>
                <h4 className="text-3xl font-oswald font-medium mb-2">
                  Enterprise
                </h4>
                <div className="text-4xl font-space font-semibold text-neutral-900 mb-6">
                  $497<span className="text-lg text-neutral-400 font-normal">/mo</span>
                </div>
                <ul className="space-y-4 text-sm text-neutral-600 mb-8">
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-neutral-900"
                    />
                    Everything in Growth
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-neutral-900"
                    />
                    25 LinkedIn Accounts
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-neutral-900"
                    />
                    White-label reporting
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-neutral-900"
                    />
                    API Access
                  </li>
                </ul>
              </div>
              <Link href="/sign-up">
                <button className="w-full py-4 border border-neutral-900 text-neutral-900 font-medium uppercase tracking-widest text-xs hover:bg-neutral-900 hover:text-white transition-colors rounded-lg">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="md:px-12 text-neutral-400 bg-neutral-900 border-neutral-800 border-t pt-12 pr-6 pb-12 pl-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 text-white font-oswald text-xl uppercase tracking-tight">
                LINKED.AI
              </div>
              <p className="text-sm max-w-xs leading-relaxed">
                The AI operating system for modern LinkedIn creators and B2B
                founders.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
