import React from "react";

type Memory = {
  title: string;
};

const memories: Memory[] = [
  { title: "First Chat 💬" },
  { title: "First Date 🌸" },
  { title: "First Photo 📸" },
  { title: "1 Year Together ❤️" },
];

const Timeline: React.FC = () => {
  return (
    <section>
      <h2>Our Memories</h2>
      <ul>
        {memories.map((m, i) => (
          <li key={i}>{m.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default Timeline;
