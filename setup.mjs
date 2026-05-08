#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const createFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  createDir(dir);
  fs.writeFileSync(filePath, content);
  console.log(`✓ ${path.relative(__dirname, filePath)}`);
};

const baseDir = __dirname;

// All file contents
const files = {
  'src/index.css': require('./files/index.css.txt'),
  'src/main.jsx': require('./files/main.jsx.txt'),
  'src/App.jsx': require('./files/App.jsx.txt'),
  'src/components/Common/Button.jsx': require('./files/Button.jsx.txt'),
  'src/components/Common/Card.jsx': require('./files/Card.jsx.txt'),
  'src/components/Common/Container.jsx': require('./files/Container.jsx.txt'),
  'src/components/Common/GradientBg.jsx': require('./files/GradientBg.jsx.txt'),
  'src/components/Common/index.js': require('./files/CommonIndex.js.txt'),
  'src/components/Navbar/Navbar.jsx': require('./files/Navbar.jsx.txt'),
  'src/components/Hero/Hero.jsx': require('./files/Hero.jsx.txt'),
  'src/components/Hero/TrustSection.jsx': require('./files/TrustSection.jsx.txt'),
  'src/components/About/AboutPreview.jsx': require('./files/AboutPreview.jsx.txt'),
  'src/components/Courses/CoursesSection.jsx': require('./files/CoursesSection.jsx.txt'),
  'src/components/Facilities/WhyChooseUs.jsx': require('./files/WhyChooseUs.jsx.txt'),
  'src/components/Gallery/CampusLife.jsx': require('./files/CampusLife.jsx.txt'),
  'src/components/Testimonials/Testimonials.jsx': require('./files/Testimonials.jsx.txt'),
  'src/components/Admissions/AdmissionProcess.jsx': require('./files/AdmissionProcess.jsx.txt'),
  'src/components/FAQ/FAQSection.jsx': require('./files/FAQSection.jsx.txt'),
  'src/components/CTA/FinalCTA.jsx': require('./files/FinalCTA.jsx.txt'),
  'src/components/Footer/Footer.jsx': require('./files/Footer.jsx.txt'),
  'src/pages/Home.jsx': require('./files/Home.jsx.txt'),
  'src/pages/About.jsx': require('./files/About.jsx.txt'),
  'src/pages/Courses.jsx': require('./files/Courses.jsx.txt'),
  'src/pages/Admissions.jsx': require('./files/Admissions.jsx.txt'),
  'src/pages/Facilities.jsx': require('./files/Facilities.jsx.txt'),
  'src/pages/CampusLife.jsx': require('./files/CampusLife.jsx.txt'),
  'src/pages/Contact.jsx': require('./files/Contact.jsx.txt'),
  'src/data/courses.js': require('./files/courses.data.txt'),
  'src/data/testimonials.js': require('./files/testimonials.data.txt'),
  'src/data/faq.js': require('./files/faq.data.txt'),
  'src/hooks/useScrollDirection.js': require('./files/useScrollDirection.hook.txt'),
  'src/utils/animations.js': require('./files/animations.utils.txt'),
};

// Create directory structure
[
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
].forEach(dir => createDir(path.join(baseDir, dir)));

// Load and create files
Object.entries(files).forEach(([filePath, content]) => {
  createFile(path.join(baseDir, filePath), content);
});

console.log('\n✓ Setup complete!');
console.log('\nNext steps:');
console.log('1. npm install');
console.log('2. npm run dev');

