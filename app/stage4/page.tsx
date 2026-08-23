'use client'

import { useState } from 'react'
import { Camera, Check, ChevronRight, Eye, Hand, Volume2 } from 'lucide-react'

const previewUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-08-23%20at%2021.51.07%20%281%29-RRe3yVUIVGsV6gXTFcBxAAD9N2RAkf.jpeg'
const steps = [
  ['Scan marker', Camera], ['View 3D fish', Eye], ['Touch fish', Hand], ['Count fish', null], ['Select answer', Check],
]

function SpeakButton({ label = 'Play instructions' }: { label?: string }) {
  return <button className="ar-audio" aria-label={label} onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(label))}><Volume2 /></button>
}

export default function Page() {
  const [started, setStarted] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  return <main className="ar-shell">
    <section className="ar-board">
      <header className="ar-header">
        <div className="activity-badge"><span className="basket-mini">▦</span><span><b>AR Activity</b><strong>Kenjeran Fish Basket</strong></span></div>
        <h1>Stage 4: AR Activity – Scan and Count</h1>
        <SpeakButton label="Read AR activity title aloud" />
      </header>
      <div className="ar-layout">
        <aside className="ar-steps" aria-label="Activity steps"><h2>How to explore</h2>{steps.map(([label, Icon], index) => <button key={label as string} className={activeStep === index + 1 ? 'step active' : 'step'} onClick={() => setActiveStep(index + 1)}><span className="step-number">{index + 1}</span><span className="step-icon">{Icon ? <Icon /> : <b>123</b>}</span><strong>{label as string}</strong></button>)}</aside>
        <section className="scanner-column"><div className={`scanner ${started ? 'scanning' : ''}`}><span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" /><div className="basket-marker" aria-label="Black and white fish basket marker"><div className="basket-rim" /><div className="basket-body"><span>✿ ✿ ✿</span></div><div className="basket-base" /></div>{started && <div className="scan-line" aria-hidden="true" />}</div><p className="scan-caption">Point your camera at the marker<br />to start the AR activity!</p><button className="try-ar" onClick={() => setStarted(!started)} aria-pressed={started}>{started ? 'SCANNING' : 'TRY AR'} <ChevronRight /></button></section>
        <aside className="preview-column"><h2 className="preview-label">AR Preview</h2><div className="preview-image"><img src={previewUrl} alt="AR preview of a fish basket with three fish" /><span className="preview-count">3</span></div><div className="lumi-tip"><div className="lumi-avatar" aria-hidden="true">●</div><p><b>Hi! I&apos;m Lumi!</b><br />Scan the marker, view the fish, touch them to see the numbers, and count carefully!<br /><strong>Then, choose the correct answer.</strong></p></div><span className="lumi-name">Lumi</span></aside>
      </div>
      <footer className="ar-footer"><div className="mascot-pair" aria-hidden="true"><span>☻</span><span>☻</span></div><span className="footer-hint">Step {activeStep} of 5 · You&apos;re doing great!</span><SpeakButton label="Listen to the AR activity instructions" /></footer>
    </section>
  </main>
}

/* Source image used for the AR preview: ${previewUrl} */
