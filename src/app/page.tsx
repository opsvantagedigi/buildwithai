import React from 'react'
import Hero from '../components/landing/Hero'
import ValueProps from '../components/landing/ValueProps'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import Templates from '../components/landing/Templates'
import Testimonials from '../components/landing/Testimonials'
import CTA from '../components/landing/CTA'
import Footer from '../components/landing/Footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#071029] text-white">
      <Hero />
      <ValueProps />
      <Features />
      <HowItWorks />
      <Templates />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}

