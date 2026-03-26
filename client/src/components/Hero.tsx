import { useEffect, useMemo, useState } from 'react'

const START_DATE = new Date('2025-04-06T00:00:00')

function getElapsedTime() {
  const now = new Date()
  const diff = Math.max(0, now.getTime() - START_DATE.getTime())

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

const Hero = () => {
  const [elapsed, setElapsed] = useState(getElapsedTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(getElapsedTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const anniversaryText = useMemo(() => {
    return 'Since April 6, 2025'
  }, [])

  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="container hero__content">
        <p className="section-tag">For my favorite person</p>
        <h1>Happy Anniversary, My Love ❤️</h1>
        <p className="hero__text">
          This little website is for you — a soft reminder of how beautiful our
          story has been, and how grateful I am for every day I get to love you.
        </p>

        <div className="timer-box">
          <p className="timer-label">{anniversaryText}</p>

          <div className="timer-grid">
            <div className="timer-card">
              <span>{elapsed.days}</span>
              <small>Days</small>
            </div>
            <div className="timer-card">
              <span>{elapsed.hours}</span>
              <small>Hours</small>
            </div>
            <div className="timer-card">
              <span>{elapsed.minutes}</span>
              <small>Minutes</small>
            </div>
            <div className="timer-card">
              <span>{elapsed.seconds}</span>
              <small>Seconds</small>
            </div>
          </div>
        </div>

        <a href="#timeline" className="primary-btn">
          Read our story
        </a>
      </div>
    </section>
  )
}

export default Hero
