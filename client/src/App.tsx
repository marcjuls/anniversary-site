import './App.css'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import LoveLetter from './components/LoveLetter'
import MusicPlayer from './components/MusicPlayer'
import Footer from './components/Footer'

function App() {
  return (
    <main className="site-shell">
      <Hero />
      <Timeline />
      <LoveLetter />
      <MusicPlayer />
      <Footer />
    </main>
  )
}

export default App
