import './index.css';
import { Routes, Route } from 'react-router-dom';
import useScrollReveal from './hooks/useScrollReveal';
import ScrollProgress from './components/ScrollProgress';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Pillars from './components/Pillars';
import Pathway from './components/Pathway';
import Proficiency from './components/Proficiency';
import Competitions from './components/Competitions';
import Comparison from './components/Comparison';
import CurriculumTimeline from './components/CurriculumTimeline';
import Assessment from './components/Assessment';
import Features from './components/Features';
import Outcomes from './components/Outcomes';
import Delivery from './components/Delivery';
import Enrollment from './components/Enrollment';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SampleTest from './pages/SampleTest';

function HomePage() {
  useScrollReveal();

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Pillars />
      <Pathway />
      <Proficiency />
      <Competitions />
      <Comparison />
      <CurriculumTimeline />
      <Assessment />
      <Features />
      <Outcomes />
      <Delivery />
      <Enrollment />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sample-test" element={<SampleTest />} />
    </Routes>
  );
}

export default App;
