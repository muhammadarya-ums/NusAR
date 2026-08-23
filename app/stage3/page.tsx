'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Ear, Volume2 } from 'lucide-react'

const shapes = [
  { name: 'CIRCLE', color: 'shape-green', graphic: 'circle', examples: ['Sun', 'Ball'] },
  { name: 'TRIANGLE', color: 'shape-orange', graphic: 'triangle', examples: ['House roof', 'Warning sign'] },
  { name: 'SQUARE', color: 'shape-blue', graphic: 'square', examples: ['Tiles', 'Window'] },
  { name: 'RECTANGLE', color: 'shape-purple', graphic: 'rectangle', examples: ['Board', 'Door'] },
]

function AudioButton({ label }: { label: string }) {
  return <button className="lesson-audio" aria-label={label} onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(label))}><Volume2 /></button>
}

function ExampleArt({ kind, index }: { kind: string; index: number }) {
  if (kind === 'Sun') return <span className="example-art sun-art" aria-hidden="true"><i /></span>
  if (kind === 'Ball') return <span className="example-art ball-art" aria-hidden="true" />
  if (kind === 'House roof') return <span className="example-art roof-art" aria-hidden="true" />
  if (kind === 'Warning sign') return <span className="example-art warning-art" aria-hidden="true">!</span>
  if (kind === 'Tiles') return <span className="example-art tiles-art" aria-hidden="true" />
  if (kind === 'Window') return <span className="example-art window-art" aria-hidden="true" />
  if (kind === 'Board') return <span className="example-art board-art" aria-hidden="true">INFORMATION</span>
  return <span className="example-art door-art" aria-hidden="true" />
}

export default function Page() {
  const [selected, setSelected] = useState('')
  const [step, setStep] = useState(3)
  const choose = (value: string) => { setSelected(value); if (value === 'Circle') window.speechSynthesis?.speak(new SpeechSynthesisUtterance('Correct! Great job!')) }

  return <main className="geometry-shell">
    <div className="leaf-corner leaf-tl" aria-hidden="true" /><div className="leaf-corner leaf-tr" aria-hidden="true" /><div className="leaf-corner leaf-bl" aria-hidden="true" /><div className="leaf-corner leaf-br" aria-hidden="true" />
    <section className="geometry-board">
      <header className="geometry-header"><span className="header-icon"><span className="eye-shape" /></span><h1>Stage 3: Space and Time – Recognizing Shapes</h1><AudioButton label="Read lesson title aloud" /></header>
      <section className="shape-grid" aria-label="Four geometric shapes">{shapes.map((shape, index) => <article className={`shape-card ${shape.color}`} key={shape.name}><span className="shape-number">{index + 1}</span><span className={`big-shape ${shape.graphic}`} aria-hidden="true" /><h2>{shape.name}</h2><p>Examples:</p><div className="examples">{shape.examples.map((example) => <div key={example}><ExampleArt kind={example} index={index} /><strong>{example}</strong></div>)}</div></article>)}</section>
      <section className="lesson-lower">
        <div className="learning-context"><div className="mascot"><span className="speech">Hi! I&apos;m Ning. Let&apos;s explore the shapes at the Heroes Monument!</span><span className="mascot-head" /><span className="mascot-body" /></div><div className="monument-scene"><div className="cloud" /><div className="monument"><span className="spire" /><span className="monument-base">TUGU PAHLAWAN<br />SURABAYA</span></div><span className="floating circle-float" /><span className="floating triangle-float" /><span className="floating square-float" /><span className="floating rectangle-float" /></div></div>
        <article className="exercise-box"><div className="exercise-label">EXERCISE</div><h2>Choose a circle shape.</h2><div className="exercise-options">{['Tire', 'Watermelon', 'Clock'].map((option) => <button key={option} className={selected === option ? 'chosen' : ''} onClick={() => choose(option)} aria-label={`Choose ${option}`}><span className={`option-art ${option.toLowerCase()}`} aria-hidden="true" />{selected === option && <span className="sr-only">Selected</span>}</button>)}</div></article>
      </section>
      <footer className="geometry-footer"><AudioButton label="Listen to the lesson" /><button className="nav-button geometry-back" onClick={() => setStep(Math.max(1, step - 1))}><ArrowLeft /> BACK</button><div className="stepper" aria-label={`Lesson step ${step} of 5`}>{[1, 2, 3, 4, 5].map((item) => <button key={item} className={item <= step ? 'active' : ''} onClick={() => setStep(item)} aria-label={`Go to step ${item}`}>{item}</button>)}</div><button className="nav-button geometry-next" onClick={() => setStep(Math.min(5, step + 1))}>NEXT <ArrowRight /></button></footer>
    </section>
  </main>
}
