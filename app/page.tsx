"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Heart, Music2, Sparkles, VolumeX } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BabyUniverse = dynamic(() => import("@/components/BabyUniverse"), {
  ssr: false,
  loading: () => <div className="scene-loading"><span className="loading-orbit" /></div>
});

const DidiPhotoCard = dynamic(() => import("@/components/DidiPhotoCard"), {
  ssr: false
});

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [copied, setCopied] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-up", { y: 38, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".letter-section", start: "top 76%", once: true }
      });
      gsap.fromTo(".wish-card", { y: 26, opacity: 0, rotate: -1.5 }, {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.85,
        stagger: 0.16,
        ease: "power2.out",
        scrollTrigger: { trigger: ".wishes-section", start: "top 78%", once: true }
      });
      gsap.to(".background-glow", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
    }, mainRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const openExperience = () => {
    setOpened(true);
    window.setTimeout(() => document.getElementById("welcome")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }), 100);
  };

  const copyGreeting = async () => {
    const greeting = "Heartiest congratulations to Rani Didi & Jiju! Seeing you both begin this miraculous chapter together as Mum and Dad fills my heart with joy. Bhanji is so blessed with two wonderful parents. Wishing your little family a lifetime of health, laughter, peace, and unconditional love ❤️";
    try {
      await navigator.clipboard.writeText(greeting);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setShowLetter(true);
    }
  };

  return (
    <main ref={mainRef} className="site-shell">
      <div className="grain" aria-hidden="true" />
      <div className="background-glow glow-one" aria-hidden="true" />
      <div className="background-glow glow-two" aria-hidden="true" />

      <header className="site-header">
        <a href="#top" className="brand" aria-label="A Little Miracle home"><span className="brand-mark"><Sparkles size={15} /></span><span>A LITTLE MIRACLE</span></a>
        <div className="header-note"><span className="tiny-star">✦</span> CELEBRATING RANI DIDI &amp; JIJU <span className="tiny-star">✦</span></div>
        <a className="header-link" href="#letter">A wish for the couple <ArrowRight size={14} /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <span className="eyebrow-line" /> TWO HEARTS, ONE BEAUTIFUL MIRACLE
          </motion.div>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            The world just<br />got a little <em>more</em><br /><span className="gold-word">magical.</span>
          </motion.h1>
          <motion.p className="hero-subtitle" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.8 }}>
            Warmest congratulations to RANI DIDI &amp; JIJU on the arrival of your little miracle, BHANJI.
          </motion.p>
          <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }}>
            <button className="button button-primary" onClick={openExperience}>Open your little surprise <ArrowRight size={16} /></button>
            <a className="quiet-link" href="#letter"><span className="play-dot"><Heart size={13} fill="currentColor" /></span> A note from me</a>
          </motion.div>
          <motion.div className="hero-footnote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}><span className="footnote-dot" /> A tiny website for a lifetime of love</motion.div>
        </div>

        <div className="hero-art" aria-hidden="false">
          <div className="art-halo halo-outer" />
          <div className="art-halo halo-inner" />
          <BabyUniverse />
          <div className="floating-caption caption-top"><span>✧</span> A LITTLE MIRACLE</div>
          <div className="floating-caption caption-bottom">MADE OF LOVE <span>♡</span></div>
          <div className="orbit-label label-one">∞ <span>LOVE, WITHOUT END</span></div>
          <div className="orbit-label label-two">01 <span>THE BEGINNING</span></div>
        </div>

        <div className="hero-side-note"><span>SCROLL TO FEEL THE MAGIC</span><ArrowDown size={14} /></div>
        <div className="hero-bottom-rule"><span>FOR RANI DIDI &amp; JIJU</span><span className="rule-line" /><span>WITH ALL MY LOVE, ALWAYS</span></div>
      </section>

      <section className="welcome-section" id="welcome">
        <div className="section-kicker"><span>01</span><span className="kicker-rule" /> A NEW CHAPTER FOR A WONDERFUL COUPLE</div>
        <div className="welcome-header-center">
          <p className="small-script">Two hearts united in love, now blessed with a third</p>
          <h2>Some miracles are <em>smaller</em> than our hands,<br />but <span>larger than life.</span></h2>
        </div>

        <div className="welcome-photo-stage">
          <div className="photo-stage-glow" aria-hidden="true" />
          <DidiPhotoCard />
        </div>

        <div className="welcome-message-center" id="letter">
          <div className="ornament-star">✳</div>
          <p className="welcome-lead">Dear RANI DIDI &amp; JIJU,</p>
          <p>Watching the two of you embark on this breathtaking journey into parenthood is the most heartwarming blessing! You have always been the most wonderful, loving couple, and seeing you step into this new world as Mum and Dad brings tears of pure joy.</p>
          <p>And dearest BHANJI, you have arrived into the warmest embrace. You have the kindest mother and the most caring father — and together, they are going to give you the most magical life.</p>
          <button className="text-link" onClick={() => setShowLetter((value) => !value)}>{showLetter ? "Close my blessing letter" : "A special blessing for both of you"} <ArrowRight size={15} /></button>
          <AnimatePresence initial={false}>
            {showLetter && <motion.div className="expanded-letter" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}><div><p>I pray that your bond as husband and wife grows even sweeter and stronger with every shared midnight feed, every little milestone, and every sleepy cuddle. May your home always be a sanctuary of comfort, patience on the exhausting days, and boundless happiness.</p><p>Congratulations on your greatest blessing yet. I am sending all my prayers, love, and respect to both of you, and an endless stream of blessings to little Bhanji. This is your most beautiful adventure yet. <span className="inline-heart">♥</span></p><span className="letter-signoff">With all my love and blessings, always.</span></div></motion.div>}
          </AnimatePresence>
        </div>
        <div className="welcome-bottom-note"><span className="tiny-star">✦</span> THE TINIEST FEET LEAVE THE BIGGEST FOOTPRINTS ON OUR HEARTS <span className="tiny-star">✦</span></div>
      </section>

      <section className="wishes-section">
        <div className="section-kicker"><span>02</span><span className="kicker-rule" /> BLESSINGS FOR THE COUPLE &amp; BHANJI</div>
        <div className="wishes-intro"><h2>For all the magic<br />in your <em>journey ahead.</em></h2><p>Heartfelt blessings for your home, your bond together as a couple, and the sweet life BHANJI will grow into.</p></div>
        <div className="wish-grid">
          <article className="wish-card wish-lavender"><span className="wish-number">01 / TOGETHERNESS</span><div className="wish-illustration moon-icon"><span className="moon-shape">☾</span><span className="starlet starlet-a">✦</span><span className="starlet starlet-b">✧</span></div><h3>Strength &amp;<br />sweet patience.</h3><p>May every late-night task turn into a shared smile, and may this new chapter deepen the love, laughter, and partnership between you two.</p></article>
          <article className="wish-card wish-cream"><span className="wish-number">02 / WARMTH</span><div className="wish-illustration heart-icon"><Heart size={43} strokeWidth={1.1} /><span className="heart-spark">✧</span></div><h3>A home filled<br />with pure joy.</h3><p>May your days be blessed with gentle mornings, tiny happy giggles, peaceful nights, and memories that become your family&apos;s greatest treasures.</p></article>
          <article className="wish-card wish-rose"><span className="wish-number">03 / ABUNDANCE</span><div className="wish-illustration star-icon"><Sparkles size={43} strokeWidth={1.1} /><span className="star-orbit" /></div><h3>Love, health<br />&amp; protection.</h3><p>May your little family always be wrapped in good health, prosperity, endless warmth, and a blessing that shields you wherever life leads.</p></article>
        </div>
      </section>

      <section className="finale-section">
        <div className="finale-stars" aria-hidden="true"><span>✦</span><span>✧</span><span>·</span><span>✦</span><span>✧</span><span>·</span><span>✦</span></div>
        <div className="finale-orb"><div className="finale-orb-core">♡</div><span className="finale-orbit finale-orbit-a" /><span className="finale-orbit finale-orbit-b" /></div>
        <p className="small-script">And so, a beautiful family story begins…</p>
        <h2>Two soulmates.<br /><em>One little universe.</em></h2>
        <p className="finale-copy">RANI DIDI &amp; JIJU — Wishing you both days filled with softness, shared laughter that fills every corner of your home, and a love that makes every little moment with Bhanji feel completely extraordinary.</p>
        <button className="button button-light" onClick={copyGreeting}>{copied ? "My love & wish, copied ✨" : "Keep our little wish close"} <Heart size={15} /></button>
        <div className="finale-signature">MADE WITH <Heart size={12} fill="currentColor" /> AND A WHOLE LOT OF LOVE FOR RANI DIDI &amp; JIJU</div>
      </section>

      <footer className="site-footer"><a href="#top" className="brand footer-brand"><span className="brand-mark"><Sparkles size={14} /></span><span>A LITTLE MIRACLE</span></a><span>For RANI DIDI, JIJU &amp; BHANJI</span><a href="#top" className="back-top">BACK TO THE STARS ↑</a></footer>
      <div className="mobile-love-note"><Heart size={12} fill="currentColor" /> made with all my love for Rani Didi, Jiju &amp; Bhanji</div>
    </main>
  );
}
