#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = __dirname;

const createDirSync = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const createFileSync = (filePath, content) => {
  const dir = path.dirname(filePath);
  createDirSync(dir);
  fs.writeFileSync(filePath, content, 'utf-8');
  const rel = path.relative(baseDir, filePath);
  console.log(`✓ ${rel}`);
};

// Create all directories first
const directories = [
  'src',
  'src/components',
  'src/components/Navbar',
  'src/components/Hero',
  'src/components/About',
  'src/components/Courses',
  'src/components/Facilities',
  'src/components/Testimonials',
  'src/components/Gallery',
  'src/components/Admissions',
  'src/components/FAQ',
  'src/components/CTA',
  'src/components/Footer',
  'src/components/Common',
  'src/pages',
  'src/assets',
  'src/data',
  'src/hooks',
  'src/utils',
];

directories.forEach(dir => {
  createDirSync(path.join(baseDir, dir));
});

// ===== FILE CONTENTS (All embedded) =====

// CSS
const indexCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-white text-slate-900;
  }
}

@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
  }
  .glass {
    @apply bg-white/10 backdrop-blur-md border border-white/20;
  }
  .gradient-blue-purple {
    @apply bg-gradient-to-br from-blue-50 via-purple-50 to-white;
  }
  .section-padding {
    @apply py-16 md:py-24;
  }
  .premium-shadow {
    @apply shadow-lg shadow-slate-200/50;
  }
  .smooth-transition {
    @apply transition-all duration-300 ease-out;
  }
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}`;

// Main entry
const mainJSX = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

// App
const appJSX = `import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Admissions from './pages/Admissions'
import Facilities from './pages/Facilities'
import CampusLife from './pages/CampusLife'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/campus-life" element={<CampusLife />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}`;

// Common Components
const buttonJSX = `export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const baseStyles = 'font-medium transition-all duration-300 ease-out rounded-lg inline-flex items-center justify-center whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={\`\${baseStyles} \${variants[variant]} \${sizes[size]} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
}`;

const cardJSX = `export default function Card({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) {
  const baseStyles = 'rounded-2xl transition-all duration-300 ease-out';
  
  const variants = {
    default: 'bg-white border border-slate-100 shadow-md hover:shadow-lg',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20',
    gradient: 'bg-gradient-to-br from-blue-50 via-purple-50 to-white border border-slate-100',
    premium: 'bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/75',
  };

  return (
    <div
      className={\`\${baseStyles} \${variants[variant]} \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
}`;

const containerJSX = `export default function Container({ 
  children, 
  size = 'lg',
  className = '',
  ...props 
}) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
  };

  return (
    <div
      className={\`\${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
}`;

const gradientBgJSX = `export default function GradientBg() {
  return (
    <>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" />
    </>
  );
}`;

const commonIndexJS = `export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Container } from './Container';
export { default as GradientBg } from './GradientBg';`;

// Data files
const coursesJS = `export const courses = [
  {
    id: 'bca',
    title: 'Bachelor of Computer Applications',
    shortTitle: 'BCA',
    description: 'Learn programming, software development, databases, web development, and emerging technologies.',
    duration: '3 Years',
    icon: '💻',
    outcomes: ['Software Developer', 'Data Analyst', 'Web Developer', 'IT Support'],
  },
  {
    id: 'bba',
    title: 'Bachelor of Business Administration',
    shortTitle: 'BBA',
    description: 'Develop business leadership, entrepreneurship, finance, marketing, and HR management skills.',
    duration: '3 Years',
    icon: '📊',
    outcomes: ['Marketing Executive', 'HR Executive', 'Entrepreneur', 'Business Analyst'],
  },
  {
    id: 'bcom',
    title: 'Bachelor of Commerce',
    shortTitle: 'B.Com',
    description: 'Master accounting, taxation, finance, economics, and banking fundamentals.',
    duration: '3 Years',
    icon: '💰',
    outcomes: ['Accountant', 'Banking Professional', 'Tax Consultant', 'CA Preparation'],
  },
];`;

const testimonialsJS = `export const testimonials = [
  {
    id: 1,
    name: 'Aditya Kumar',
    course: 'BCA',
    text: 'Sri Maata Degree College provided me with industry-relevant knowledge and hands-on experience.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    course: 'BBA',
    text: 'The placement support and career guidance helped me secure an excellent position.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Rajesh Patel',
    course: 'B.Com',
    text: 'Great college with experienced faculty and comprehensive curriculum.',
    rating: 5,
  },
];`;

const faqJS = `export const faqs = [
  {
    id: 1,
    question: 'What courses are offered?',
    answer: 'We offer BCA, BBA, and B.Com programs designed for industry success.',
  },
  {
    id: 2,
    question: 'What is the admission eligibility?',
    answer: '12th pass with minimum 50% marks from any recognized board.',
  },
  {
    id: 3,
    question: 'How can I apply?',
    answer: 'Apply online through our website or visit in person during admission period.',
  },
];`;

// Hooks
const useScrollDirectionJS = `import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
}`;

// Utils
const animationsJS = `export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

export const slideUpVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};`;

// Pages & Components - I'll create simplified versions
const homepageJSX = `import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import TrustSection from '../components/Hero/TrustSection';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustSection />
      <Footer />
    </>
  );
}`;

const aboutPageJSX = `import Navbar from '../components/Navbar/Navbar';
import { Container } from '../components/Common';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white via-blue-50 to-white">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl font-bold text-slate-900">About Us</h1>
            <p className="text-xl text-slate-600 mt-4">Coming soon - Under Development</p>
          </motion.div>
        </Container>
      </section>
      <Footer />
    </>
  );
}`;

const navbarJSX = `import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button, Container } from '../Common';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScrollDirection();

  return (
    <nav className={\`fixed w-full z-50 transition-all \${isScrolled ? 'bg-white/95 shadow-md' : 'bg-transparent'}\`}>
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-blue-600">SMD</Link>
          <div className="hidden lg:flex gap-8">
            {['Home', 'About', 'Courses', 'Admissions'].map(link => (
              <Link key={link} to={link === 'Home' ? '/' : \`/\${link.toLowerCase()}\`} className="text-slate-600 hover:text-blue-600">
                {link}
              </Link>
            ))}
          </div>
          <Button className="hidden lg:block">Apply Now</Button>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </Container>
    </nav>
  );
}`;

const heroJSX = `import { motion } from 'framer-motion';
import { Button, Container, GradientBg } from '../Common';
import { slideUpVariants, containerVariants } from '../../utils/animations';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white pt-32 pb-20 relative overflow-hidden">
      <GradientBg />
      <Container>
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={slideUpVariants} className="space-y-8">
            <h1 className="text-6xl font-bold leading-tight">
              Build Your Future With <span className="gradient-text">Industry-Focused</span> Programs
            </h1>
            <p className="text-xl text-slate-600">
              Sri Maata Degree College empowers students with modern education in commerce, management, and computer applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">Apply Now <ArrowRight size={20} /></Button>
              <Button variant="outline" size="lg" className="gap-2"><Download size={20} /> Brochure</Button>
            </div>
          </motion.div>
          <motion.div variants={containerVariants} className="relative h-96 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl opacity-20" />
            <div className="absolute top-0 right-0 bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-3xl font-bold text-blue-600">1000+</p>
              <p className="text-slate-600">Active Students</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}`;

const trustSectionJSX = `import { motion } from 'framer-motion';
import { Container, Card } from '../Common';
import { itemVariants, containerVariants } from '../../utils/animations';

export default function TrustSection() {
  const items = [
    { icon: '🎓', label: 'VSKU Affiliated' },
    { icon: '⭐', label: 'NAAC Accreditation' },
    { icon: '🏆', label: 'Academic Excellence' },
    { icon: '💼', label: 'Career-Focused' },
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card variant="premium" className="text-center p-8">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold">{item.label}</h3>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}`;

const footerJSX = `import { Container } from '../Common';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <Container>
        <div className="py-16 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SMD College</h3>
            <p className="text-slate-300">Excellence in Education</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-white">About</Link></li>
              <li><Link to="/courses" className="text-slate-300 hover:text-white">Courses</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-slate-300">Hospet, Karnataka</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Facebook size={20} className="cursor-pointer" />
              <Twitter size={20} className="cursor-pointer" />
              <Linkedin size={20} className="cursor-pointer" />
              <Instagram size={20} className="cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 pb-8 text-center text-slate-400">
          <p>&copy; 2025 Sri Maata Degree College. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}`;

// Create all files
createFileSync(path.join(baseDir, 'src/index.css'), indexCSS);
createFileSync(path.join(baseDir, 'src/main.jsx'), mainJSX);
createFileSync(path.join(baseDir, 'src/App.jsx'), appJSX);
createFileSync(path.join(baseDir, 'src/components/Common/Button.jsx'), buttonJSX);
createFileSync(path.join(baseDir, 'src/components/Common/Card.jsx'), cardJSX);
createFileSync(path.join(baseDir, 'src/components/Common/Container.jsx'), containerJSX);
createFileSync(path.join(baseDir, 'src/components/Common/GradientBg.jsx'), gradientBgJSX);
createFileSync(path.join(baseDir, 'src/components/Common/index.js'), commonIndexJS);
createFileSync(path.join(baseDir, 'src/data/courses.js'), coursesJS);
createFileSync(path.join(baseDir, 'src/data/testimonials.js'), testimonialsJS);
createFileSync(path.join(baseDir, 'src/data/faq.js'), faqJS);
createFileSync(path.join(baseDir, 'src/hooks/useScrollDirection.js'), useScrollDirectionJS);
createFileSync(path.join(baseDir, 'src/utils/animations.js'), animationsJS);
createFileSync(path.join(baseDir, 'src/components/Navbar/Navbar.jsx'), navbarJSX);
createFileSync(path.join(baseDir, 'src/components/Hero/Hero.jsx'), heroJSX);
createFileSync(path.join(baseDir, 'src/components/Hero/TrustSection.jsx'), trustSectionJSX);
createFileSync(path.join(baseDir, 'src/components/Footer/Footer.jsx'), footerJSX);
createFileSync(path.join(baseDir, 'src/pages/Home.jsx'), homepageJSX);
createFileSync(path.join(baseDir, 'src/pages/About.jsx'), aboutPageJSX);
createFileSync(path.join(baseDir, 'src/pages/Courses.jsx'), aboutPageJSX.replace('About', 'Courses'));
createFileSync(path.join(baseDir, 'src/pages/Admissions.jsx'), aboutPageJSX.replace('About', 'Admissions'));
createFileSync(path.join(baseDir, 'src/pages/Facilities.jsx'), aboutPageJSX.replace('About', 'Facilities'));
createFileSync(path.join(baseDir, 'src/pages/CampusLife.jsx'), aboutPageJSX.replace('About', 'Campus Life'));
createFileSync(path.join(baseDir, 'src/pages/Contact.jsx'), aboutPageJSX.replace('About', 'Contact'));

console.log('\n✅ Setup complete!');
console.log('\nNext: npm install && npm run dev');
