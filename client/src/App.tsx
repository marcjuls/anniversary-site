import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import LoveLetter from "./components/LoveLetter";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-midnight text-pearl">
      <Hero />
      <Timeline />
      <LoveLetter />
      <MusicPlayer />
      <Footer />
    </main>
  );
}

export default App;
