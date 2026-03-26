type Memory = {
  title: string
  description: string
}

const memories: Memory[] = [
  {
    title: 'The first hello',
    description:
      'The moment everything started, even if we did not know yet how important it would become.',
  },
  {
    title: 'The first real memory',
    description:
      'A simple moment that turned into something unforgettable because it was with you.',
  },
  {
    title: 'The comfort stage',
    description:
      'When laughter felt easier, conversations became deeper, and you started feeling like home.',
  },
  {
    title: 'Still choosing you',
    description:
      'Every day since then has just made my heart more sure about you.',
  },
]

const Timeline = () => {
  return (
    <section className="section section-alt" id="timeline">
      <div className="container">
        <p className="section-tag">Our story</p>
        <h2 className="section-title">Moments I never want to forget</h2>

        <div className="timeline-grid">
          {memories.map((memory, index) => (
            <article className="memory-card" key={`${memory.title}-${index}`}>
              <div className="memory-number">{index + 1}</div>
              <h3>{memory.title}</h3>
              <p>{memory.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
