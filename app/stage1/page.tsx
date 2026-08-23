'use client'

import { useState } from 'react'
import { Ear, Eye, Volume2, ChevronLeft, ChevronRight, Waves } from 'lucide-react'

const lessons = [
  { number: 1, color: 'blue', label: 'Boat', art: 'boat', words: 'satu' },
  { number: 2, color: 'green', label: 'Fish', art: 'fish', words: 'dua' },
  { number: 3, color: 'yellow', label: 'Shells', art: 'shell', words: 'tiga' },
  { number: 4, color: 'orange', label: 'Shrimps', art: 'shrimp', words: 'empat' },
  { number: 5, color: 'red', label: 'Crabs', art: 'crab', words: 'lima' },
]

function Illustration({ type }: { type: string }) {
  if (type === 'boat') return <div className="illustration boat"><span className="mast" /><span className="sail" /><span className="hull">KELAUTAN</span><span className="wave" /></div>
  if (type === 'fish') return <div className="illustration fish"><span /><span /></div>
  if (type === 'shell') return <div className="illustration shells"><i /><i /><i /></div>
  if (type === 'shrimp') return <div className="illustration shrimps"><i /><i /><i /><i /></div>
  return <div className="illustration crabs"><i /><i /><i /><i /><i /></div>
}

function Mascots() {
  return <div className="mascots" aria-label="Cak and Ning learning together"><div className="mascot-boy"><span className="head" /><span className="cap" /><span className="body" /></div><div className="mascot-girl"><span className="head" /><span className="hijab" /><span className="body" /></div><div className="mascot-copy"><strong>Cak &amp; Ning</strong><span>Belajar Bersama</span></div></div>
}

export default function Page() {
  const [completed, setCompleted] = useState(2)
  const [active, setActive] = useState(1)

  function speak(lesson: typeof lessons[number]) {
    if ('speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${lesson.number}, ${lesson.words}, ${lesson.label}`))
    setCompleted((value) => Math.max(value, lesson.number))
  }

  function next() { setActive((value) => Math.min(value + 1, 5)); setCompleted((value) => Math.max(value, active + 1)) }
  function previous() { setActive((value) => Math.max(value - 1, 1)) }

  return <main className="lesson-shell">
    <div className="batik-edge left" aria-hidden="true" /><div className="batik-edge right" aria-hidden="true" />
    <section className="lesson-board">
      <header className="lesson-header">
        <span className="sense-icon"><Eye /></span>
        <div><p>Stage 1: Numbers</p><h1>Getting to Know Numbers 1–5</h1></div>
        <span className="sense-icon"><Ear /></span>
      </header>
      <div className="learning-area">
        <div className="lesson-cards">{lessons.map((lesson) => <article key={lesson.number} className={`number-card ${lesson.color} ${active === lesson.number ? 'selected' : ''}`} onClick={() => setActive(lesson.number)}><div className="number">{lesson.number}</div><Illustration type={lesson.art} /><button className="audio-button" aria-label={`Play number ${lesson.number}`} onClick={(event) => { event.stopPropagation(); speak(lesson) }}><Volume2 /></button></article>)}</div>
      </div>
      <footer className="lesson-footer">
        <Mascots />
        <div className="progress-area"><strong>Progress</strong><div className="progress-track" role="progressbar" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={5}><span style={{ width: `${completed / 5 * 100}%` }} /></div><small>{completed} of 5 numbers explored</small></div>
        <div className="footer-actions"><button className="previous" onClick={previous} disabled={active === 1}><ChevronLeft /> Previous</button><button className="next" onClick={next} disabled={active === 5}>Next <ChevronRight /></button></div>
      </footer>
      <div className="lesson-hint"><Waves /> Tap the speaker to hear each number</div>
    </section>
  </main>
}


