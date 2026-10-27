import Hero from '../components/Hero'
import SectionCards from '../components/SectionCards'
import StatsBand from '../components/StatsBand'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'

function Home() {
  return (
    <PageTransition>
      <Hero />
      <SectionCards />
      <StatsBand />
      <Footer />
    </PageTransition>
  )
}

export default Home