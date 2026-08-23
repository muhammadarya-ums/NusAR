'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'

const exercises = [
  { question: '1 + 2 = ?', answer: 3, options: [1, 2, 3], color: 'mint' },
  { question: '2 + 2 = ?', answer: 4, options: [3, 4, 2], color: 'sun' },
  { question: '3 + 1 = ?', answer: 4, options: [3, 4, 5], color: 'mint' },
]

function Clover({ tone = 'green' }: { tone?: 'green' | 'yellow' }) {
  return <span className={`clover ${tone}`} aria-hidden="true"><i /><i /><i /><i /></span>
}

function CloverRow({ count, mixed = false }: { count: number; mixed?: boolean }) {
  return <div className="clover-row">{Array.from({ length: count }, (_, index) => <Clover key={index} tone={mixed && index % 2 ? 'yellow' : 'green'} />)}</div>
}

function AudioButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button className="audio-button" aria-label={label} onClick={onClick}><Volume2 /></button>
}

function speak(text: string) {
  if ('speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
}

export default function Page() {
  const [selected, setSelected] = useState<number[]>([])
  const [step, setStep] = useState(2)

  function choose(exerciseIndex: number, value: number) {
    setSelected((current) => [...current.filter((item) => item !== exerciseIndex), exerciseIndex])
    if (value === exercises[exerciseIndex].answer) speak('Correct! Great job!')
  }

  return <main className="addition-shell">
    <div className="batik-corner top-left" aria-hidden="true" /><div className="batik-corner top-right" aria-hidden="true" />
    <div className="batik-corner bottom-left" aria-hidden="true" /><div className="batik-corner bottom-right" aria-hidden="true" />
    <section className="addition-board">
      <header className="addition-header"><h1>Stage 2: Arithmetic Operation - Addition</h1><AudioButton label="Read lesson title aloud" onClick={() => speak('Stage 2: Arithmetic Operation. Addition.')} /></header>
      <section className="main-equation" aria-label="Two plus three equals five">
        <div className="equation-card green-card"><CloverRow count={2} /><strong>2</strong></div><span className="operator">+</span><div className="equation-card yellow-card"><CloverRow count={3} /><strong>3</strong></div><span className="operator">=</span><div className="equation-card result-card"><CloverRow count={5} mixed /><strong>5</strong></div>
      </section>
      <section className="exercise-grid" aria-label="Addition exercises">{exercises.map((exercise, index) => <article className={`exercise-card ${exercise.color}`} key={exercise.question}><header><h2>{exercise.question}</h2><AudioButton label={`Hear ${exercise.question}`} onClick={() => speak(exercise.question.replace('?', 'what is the answer?'))} /></header><div className="answer-options">{exercise.options.map((option) => <button key={option} className={selected.includes(index) && option === exercise.answer ? 'correct' : ''} onClick={() => choose(index, option)} aria-label={`Answer ${option}`}><CloverRow count={option} /><strong>{option}</strong></button>)}</div></article>)}</section>
      <footer className="addition-footer"><button className="nav-button back" onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1}><ChevronLeft /> Back</button><div className="progress-steps" aria-label={`Lesson step ${step} of 5`}>{[1, 2, 3, 4, 5].map((item) => <button key={item} className={item <= step ? 'active' : ''} onClick={() => setStep(item)} aria-label={`Go to step ${item}`}>{item}</button>)}</div><button className="nav-button next" onClick={() => setStep((value) => Math.min(5, value + 1))} disabled={step === 5}>Next <ChevronRight /></button></footer>
    </section>
  </main>
}
