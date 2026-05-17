"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

export default function LandingPage() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <main
        id="landing-shell"
        className="relative w-full bg-[#141414] overflow-hidden flex flex-col min-h-screen text-white"
      >
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-gradient-to-b from-[#282828]/70 to-transparent opacity-60 blur-3xl pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3"></div>

      <nav className="flex flex-wrap md:px-12 z-30 pt-6 pr-6 pb-6 pl-6 relative gap-x-20 gap-y-6 items-center justify-between mx-auto max-w-[90rem] w-full">
        <div className="flex items-center gap-3 group cursor-pointer mr-8">
          <div className="flex text-[#141414] bg-[#B55933] w-9 h-9 rounded-lg relative items-center justify-center shadow-lg">
            <Icon icon="solar:pen-new-square-linear" className="text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="uppercase leading-none text-2xl font-medium tracking-tight font-oswald">
              NARRAT<span className="text-[#B55933]">.AI</span>
            </span>
            <span className="text-[0.6rem] uppercase text-white/80 tracking-widest font-space">
              Content SaaS
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 mr-auto">
          <button
            onClick={() => scrollTo('features')}
            className="uppercase hover:text-[#B55933] transition-colors text-xs font-semibold text-white/80 tracking-widest cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="uppercase hover:text-[#B55933] transition-colors text-xs font-semibold text-white/80 tracking-widest cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="uppercase hover:text-[#B55933] transition-colors text-xs font-semibold text-white/80 tracking-widest cursor-pointer"
          >
            Pricing
          </button>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <Link href="/sign-in">
            <button className="uppercase hover:text-[#B55933] transition-colors text-xs font-semibold text-white/80 tracking-widest px-4 py-2 cursor-pointer">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="uppercase hover:bg-[#A1887D] transition-colors flex text-xs font-semibold text-[#141414] tracking-wider bg-[#B55933] rounded-full pt-2 pr-6 pb-2 pl-6 shadow-lg gap-x-2 items-center">
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
                <div className="h-px w-12 bg-[#B55933]"></div>
                <span className="uppercase text-xs font-semibold text-[#B55933] tracking-widest">
                  The Ultimate LinkedIn Growth Engine
                </span>
              </div>
              <h1 className="md:text-8xl lg:text-[9rem] leading-[0.85] uppercase text-6xl font-medium text-white tracking-tight font-oswald pt-2 pb-6">
                DOMINATE<br/>LINKEDIN WITH<br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#B55933] to-[#A1887D]">
                  AI CONTENT
                </span>
              </h1>
              <p className="md:text-2xl leading-tight text-xl font-medium text-white/80 tracking-tight font-space max-w-2xl mb-4">
                Stop staring at a blank page. Generate, schedule, and analyze
                high-converting LinkedIn posts in your unique voice. Built for
                creators, founders, and agencies.
              </p>
              <div className="flex gap-4">
              <Link href="/sign-up">
                  <button className="px-8 py-4 bg-[#B55933] text-[#141414] rounded-lg flex items-center gap-2 uppercase text-sm font-semibold tracking-widest hover:bg-[#A1887D] transition-all hover:shadow-xl hover:-translate-y-1">
                    Start Free Trial
                    <Icon icon="solar:arrow-right-linear" className="text-lg" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 h-[35rem] mt-1 relative w-full pr-8">
              <div className="absolute inset-0 bg-[#4E4E4E]/50 rounded-2xl rotate-3 opacity-60"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full w-full bg-[#282828] border border-[#4E4E4E] flex flex-col p-6">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#B55933]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#A1887D]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#4E4E4E]"></div>
                </div>
                <div className="flex-1 bg-[#141414] rounded-lg p-5 font-space text-sm text-white">
                  <div className="mb-4 text-[#B55933]">
                    Generating post about &quot;Leadership in AI&quot;...
                  </div>
                  <div className="space-y-3 opacity-80">
                    <div className="h-4 bg-[#3F3835] rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-[#3F3835] rounded w-full animate-pulse delay-75"></div>
                    <div className="h-4 bg-[#3F3835] rounded w-5/6 animate-pulse delay-150"></div>
                    <div className="h-4 bg-[#3F3835] rounded w-1/2 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES & HOW IT WORKS */}
        <section id="features" className="bg-[#282828] border-t border-[#4E4E4E] pt-14 pb-24">
          <div className="md:px-12 max-w-7xl mx-auto pr-6 pl-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-xs font-semibold text-[#B55933] uppercase tracking-widest mb-2 block">
                Platform Features
              </span>
              <h3 className="md:text-5xl text-4xl font-medium text-white tracking-tight font-oswald">
                Your Full-Stack LinkedIn OS
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              <div className="p-8 bg-[#3F3835] rounded-2xl border border-[#4E4E4E] hover:border-[#A1887D] transition-colors">
                <div className="w-12 h-12 bg-[#282828] text-[#B55933] rounded-xl flex items-center justify-center mb-6">
                  <Icon
                    icon="solar:magic-stick-3-linear"
                    className="text-2xl"
                  />
                </div>
                <h4 className="text-lg font-semibold font-oswald uppercase mb-3">
                  AI Voice Cloning
                </h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  Train our AI on your previous posts. It learns your exact tone,
                  formatting, and industry jargon to write posts that sound 100%
                  human.
                </p>
              </div>
              <div className="p-8 bg-[#3F3835] rounded-2xl border border-[#4E4E4E] hover:border-[#A1887D] transition-colors">
                <div className="w-12 h-12 bg-[#282828] text-white rounded-xl flex items-center justify-center mb-6">
                  <Icon icon="solar:calendar-linear" className="text-2xl" />
                </div>
                <h4 className="text-lg font-semibold font-oswald uppercase mb-3">
                  Smart Scheduling
                </h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  Generate a week&apos;s worth of content in 3 minutes. Drag and drop
                  onto our calendar and automatically publish at peak engagement
                  times.
                </p>
              </div>
              <div className="p-8 bg-[#3F3835] rounded-2xl border border-[#4E4E4E] hover:border-[#A1887D] transition-colors">
                <div className="w-12 h-12 bg-[#282828] text-white rounded-xl flex items-center justify-center mb-6">
                  <Icon icon="solar:chart-square-linear" className="text-2xl" />
                </div>
                <h4 className="text-lg font-semibold font-oswald uppercase mb-3">
                  Deep Analytics
                </h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  Track impressions, engagement rates, and follower growth.
                  Understand what topics resonate best and double down on winning
                  formats.
                </p>
              </div>
            </div>

            {/* 3 Steps */}
            <div id="how-it-works" className="md:p-12 overflow-hidden text-white bg-[#141414] border border-[#4E4E4E] rounded-3xl pt-8 pr-8 pb-8 pl-8 relative">
              <div className="blur-[6.25rem] bg-[#B55933]/20 w-96 h-96 rounded-full absolute top-0 right-0"></div>
              <div className="relative z-10 mb-12">
                <span className="uppercase block text-xs font-semibold text-[#B55933] tracking-widest mb-2">
                  How it works
                </span>
                <h3 className="md:text-5xl text-3xl font-medium tracking-tight font-oswald">
                  Go from idea to published in minutes
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div>
                  <div className="text-4xl font-oswald text-white/70 mb-4">
                    01
                  </div>
                  <h5 className="text-lg font-semibold mb-2 font-space">
                    Setup Voice Profile
                  </h5>
                  <p className="text-sm text-white/80">
                    Tell us your industry, audience, and preferred tone. The AI
                    adapts instantly.
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-oswald text-white/70 mb-4">
                    02
                  </div>
                  <h5 className="text-lg font-semibold mb-2 font-space">
                    Generate Content
                  </h5>
                  <p className="text-sm text-white/80">
                    Input a rough idea or keyword. Get fully formatted posts with
                    hooks and hashtags.
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-oswald text-white/70 mb-4">
                    03
                  </div>
                  <h5 className="text-lg font-semibold mb-2 font-space">
                    Schedule &amp; Grow
                  </h5>
                  <p className="text-sm text-white/80">
                    Review, tweak if needed, and add to your queue. Watch your
                    impressions soar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="md:px-12 max-w-7xl mx-auto pt-24 pr-6 pb-24 pl-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="uppercase block text-xs font-semibold text-white/80 tracking-widest mb-2">
              Pricing
            </span>
            <h3 className="md:text-6xl text-4xl font-medium text-white tracking-tight font-oswald">
              Simple, transparent pricing
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#282828] border border-[#4E4E4E] rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all-300">
              <div>
                <div className="text-sm font-space uppercase tracking-widest text-white/80 mb-4">
                  Starter
                </div>
                <h4 className="text-3xl font-oswald font-medium mb-2">
                  Creator
                </h4>
                <div className="text-4xl font-space font-semibold text-white mb-6">
                  $19<span className="text-lg text-white/70 font-normal">/mo</span>
                </div>
                <ul className="space-y-4 text-sm text-white/80 mb-8">
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    30 AI posts per month
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    1 LinkedIn Account
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    Basic Scheduling
                  </li>
                </ul>
              </div>
              <Link href="/sign-up">
                <button className="w-full py-4 border border-white text-white font-medium uppercase tracking-widest text-xs hover:bg-white hover:text-[#141414] transition-colors rounded-lg">
                  Get Starter
                </button>
              </Link>
            </div>

            <div className="bg-[#3F3835] text-white border border-[#4E4E4E] rounded-2xl p-8 flex flex-col justify-between transform md:-translate-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#B55933] text-[#141414] text-[0.6rem] font-semibold uppercase px-3 py-1">
                Most Popular
              </div>
              <div>
                <div className="text-sm font-space uppercase tracking-widest text-white/80 mb-4">
                  Growth
                </div>
                <h4 className="text-3xl font-oswald font-medium mb-2">
                  Professional
                </h4>
                <div className="text-4xl font-space font-semibold text-white mb-6">
                  $69<span className="text-lg text-white/70 font-normal">/mo</span>
                </div>
                <ul className="space-y-4 text-sm text-white/80 mb-8">
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    Unlimited AI posts
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    3 LinkedIn Accounts
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    Advanced Analytics
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    Custom Voice Training
                  </li>
                </ul>
              </div>
              <Link href="/sign-up">
                <button className="w-full py-4 bg-[#B55933] text-[#141414] font-medium uppercase tracking-widest text-xs hover:bg-[#A1887D] transition-colors rounded-lg">
                  Start Growth
                </button>
              </Link>
            </div>

            <div className="bg-[#282828] border border-[#4E4E4E] rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all-300">
              <div>
                <div className="text-sm font-space uppercase tracking-widest text-white/80 mb-4">
                  Agency
                </div>
                <h4 className="text-3xl font-oswald font-medium mb-2">
                  Enterprise
                </h4>
                <div className="text-4xl font-space font-semibold text-white mb-6">
                  $59<span className="text-lg text-white/70 font-normal">/mo</span>
                </div>
                <ul className="space-y-4 text-sm text-white/80 mb-8">
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    Everything in Growth
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    25 LinkedIn Accounts
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    White-label reporting
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg text-[#B55933]"
                    />
                    API Access
                  </li>
                </ul>
              </div>
              <Link href="/sign-up">
                <button className="w-full py-4 border border-white text-white font-medium uppercase tracking-widest text-xs hover:bg-white hover:text-[#141414] transition-colors rounded-lg">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="md:px-12 text-white/80 bg-[#141414] border-[#4E4E4E] border-t pt-12 pr-6 pb-12 pl-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 text-white font-oswald text-xl uppercase tracking-tight">
                NARRAT.AI
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
