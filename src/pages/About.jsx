import { aboutHeroImage, experienceImage } from '../data/images';
import { Camera, Heart, Sparkles, Users } from 'lucide-react';

const stats = [
  { label: 'Photographers', value: '500+' },
  { label: 'Shoots Delivered', value: '10K+' },
  { label: 'Photos Edited', value: '50K+' },
  { label: 'Average Rating', value: '4.9/5' },
];

export default function About() {
  return (
    <div className="fade-in">
      <div style={{ position: 'relative', height: '52vh', minHeight: 380, display: 'flex', alignItems: 'flex-end', color: 'var(--ivory)' }}>
        <img src={aboutHeroImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(21,19,15,0.1), rgba(21,19,15,0.82))' }} />
        <div className="container" style={{ position: 'relative', paddingBottom: 56 }}>
          <span className="hero-eyebrow">Our story</span>
          <h1 style={{ color: 'var(--ivory)', fontSize: 'clamp(32px, 5vw, 52px)' }}>Photography Beyond Ordinary.</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 className="section-title" style={{ marginBottom: 20 }}>Built by people who love photography.</h2>
              <p className="text-stone" style={{ lineHeight: 1.8, marginBottom: 16 }}>
                LUMORA started with a simple frustration — finding the right photographer for a moment that mattered shouldn't feel like a gamble.
                We set out to build a marketplace where quality, trust, and craft come first.
              </p>
              <p className="text-stone" style={{ lineHeight: 1.8 }}>
                Today, LUMORA connects thousands of clients with vetted photographers across India, spanning weddings, portraits, fashion,
                events, and everything in between.
              </p>
            </div>
            <img src={experienceImage} alt="" style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="grid grid-3">
            <div className="card" style={{ padding: 28 }}>
              <Sparkles size={22} className="text-bronze" style={{ marginBottom: 14 }} />
              <h3 style={{ fontSize: 18, marginBottom: 10 }}>Our Mission</h3>
              <p className="text-stone" style={{ fontSize: 14.5, lineHeight: 1.7 }}>To make discovering and booking exceptional photography effortless, transparent, and genuinely enjoyable.</p>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <Camera size={22} className="text-bronze" style={{ marginBottom: 14 }} />
              <h3 style={{ fontSize: 18, marginBottom: 10 }}>Our Vision</h3>
              <p className="text-stone" style={{ fontSize: 14.5, lineHeight: 1.7 }}>A world where every meaningful moment is captured by someone who truly understands how to tell its story.</p>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <Heart size={22} className="text-bronze" style={{ marginBottom: 14 }} />
              <h3 style={{ fontSize: 18, marginBottom: 10 }}>Why LUMORA</h3>
              <p className="text-stone" style={{ fontSize: 14.5, lineHeight: 1.7 }}>Every photographer is reviewed for craft and consistency, so you can book with confidence, every time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our philosophy</span>
              <h2 className="section-title">Photography Philosophy</h2>
            </div>
          </div>
          <p className="text-stone" style={{ maxWidth: 720, lineHeight: 1.8, fontSize: 16 }}>
            We believe the best photography doesn't interrupt a moment — it disappears into it. That's why we champion photographers who work
            quietly, observe carefully, and edit with restraint. The result is imagery that feels honest years later, not just impressive on the day.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--charcoal)', color: 'var(--ivory)' }} id="community">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow" style={{ color: 'var(--champagne)' }}>By the numbers</span>
              <h2 className="section-title" style={{ color: 'var(--ivory)' }}>A growing community</h2>
            </div>
          </div>
          <div className="stats-row">
            {stats.map((s) => (
              <div key={s.label} className="stat-block">
                <p className="stat-number" style={{ color: 'var(--champagne)' }}>{s.value}</p>
                <p style={{ color: 'rgba(246,242,234,0.7)' }}><Users size={12} style={{ marginRight: 4 }} />{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
