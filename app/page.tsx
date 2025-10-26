import { Navbar } from '../components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { PlatformStats } from '../components/PlatformStats'
import { HowItWorks } from '../components/HowItWorks'
import { ProblemSolution } from '../components/ProblemSolution'
import { Benefits } from '../components/Benefits'
import { FAQ } from '../components/FAQ'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <PlatformStats />
      <HowItWorks />
      <ProblemSolution />
      <Benefits />
      <FAQ />
      <Footer />
    </main>
  )
}
