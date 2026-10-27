import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
} from 'react-icons/fa6'

// Resolves files from /public, works with any Vite `base`.
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const profile = {
  name: 'Sebghatullah Karimi',
  firstName: 'Sebghatullah',
  lastName: 'Karimi',
  brand: 'Karimi',
  roles: ['Software Developer', 'React Developer', 'Frontend Engineer', 'Web Designer'],
  intro:
    'I am a passionate Software Developer who enjoys solving problems and creating modern digital solutions. I focus on writing clean, efficient, and maintainable code while continuously learning new technologies. My goal is to build fast, user-friendly, and impactful applications that deliver real value and great user experiences.',
  photo: asset('images/profile.jpg'),
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const socials = [
  { label: 'WhatsApp', href: 'https://wa.me/Sebghatullah_k', icon: FaWhatsapp },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/radmanish_s?igsh=dHR0aGhmeGt1YWgw',
    icon: FaInstagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sebghatullah-karimi-351741329',
    icon: FaLinkedin,
  },
  { label: 'Telegram', href: 'https://t.me/RADMANISH_S', icon: FaTelegram },
]

export const about = {
  education:
    "Completed high school and currently pursuing a Bachelor's degree in Software Engineering at Herat University. Passionate about web development, programming, and building modern software solutions.",
  experience:
    'Worked for 1 year at Rah-e Saadat Travel Agency as a Graphic Designer and Web Developer, creating digital designs and developing web solutions to support company needs.',
  bio: [
    'I am a Software Engineering student at Herat University with a passion for web development, programming, and technology. I have a strong foundation in frontend development and enjoy building responsive, user-friendly, and modern web applications.',
    'With one year of professional experience as a Graphic Designer and Web Developer at Rah-e Saadat Travel Agency, I have gained practical experience in creating digital designs, developing websites, and solving real-world technology challenges.',
    'I am continuously improving my skills in software development and exploring new technologies to become a skilled and creative software engineer. I am motivated by learning, innovation, and creating digital solutions that provide value to users and organizations.',
  ],
}

/*
 * Projects.
 * - `github` / `demo`: put the project's links here. Leave as '' and the card
 *   shows a disabled "Coming soon" button instead of a broken link.
 */
export const projects = [
  {
    title: 'Education Center Website',
    image: asset('images/project-education.png'),
    github: 'https://github.com/SEBGHATULLAH-KARIMI-1/-education-center-website/',
    demo: 'https://sebghatullah-karimi-1.github.io/-education-center-website/',
  },
  {
    title: 'Travel Agency Management System',
    image: asset('images/project-travel.jpg'),
    github: 'https://github.com/SEBGHATULLAH-KARIMI-1/AfghanMutamer/',
    demo: 'https://sebghatullah-karimi-1.github.io/AfghanMutamer/',
  },
  {
    title: 'Dashboard',
    image: asset('images/project-dashboard.png'),
    github: 'https://github.com/SEBGHATULLAH-KARIMI-1/HTML-CSS-dashboard',
    demo: 'https://sebghatullah-karimi-1.github.io/HTML-CSS-dashboard/',
  },
  {
    title: 'Task Manager',
    description: 'Add, prioritise and filter tasks with a live progress ring. Saved in the browser.',
    tags: ['JavaScript', 'localStorage', 'CSS'],
    image: asset('images/samples/task-manager.svg'),
    github: 'https://github.com/SEBGHATULLAH-KARIMI-1/task-manager',
    demo: 'https://sebghatullah-karimi-1.github.io/task-manager/',
  },
  {
    title: 'Ember Coffee Landing Page',
    description: 'Animated CSS cup, filterable menu with 3D hover cards and a reservation form.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: asset('images/samples/coffee-landing.svg'),
    github: 'https://github.com/SEBGHATULLAH-KARIMI-1/coffee-landing',
    demo: 'https://sebghatullah-karimi-1.github.io/coffee-landing/',
  },
  {
    title: 'Analytics Dashboard',
    description: 'KPI counters, an interactive SVG line chart and traffic breakdown — no chart libraries.',
    tags: ['JavaScript', 'SVG', 'CSS Grid'],
    image: asset('images/samples/analytics-dashboard.svg'),
    github: 'https://github.com/SEBGHATULLAH-KARIMI-1/analytics-dashboard',
    demo: 'https://sebghatullah-karimi-1.github.io/analytics-dashboard/',
  },
  {
    title: '3D Memory Game',
    description: '3D flip-card memory game with timer, move counter and a saved best score.',
    tags: ['CSS 3D', 'JavaScript', 'localStorage'],
    image: asset('images/samples/memory-game.svg'),
    github: 'https://github.com/SEBGHATULLAH-KARIMI-1/memory-game',
    demo: 'https://sebghatullah-karimi-1.github.io/memory-game/',
  },
]

export const skills = {
  frontend: ['HTML', 'CSS', 'Bootstrap', 'React', 'TypeScript', 'JavaScript'],
  backend: ['Java', 'PHP', 'MySQL', 'Node.js', 'Next.js', 'Python'],
}

export const stats = [
  { value: 1, suffix: '+', label: 'Year of experience' },
  { value: projects.length, suffix: '', label: 'Projects built' },
  { value: skills.frontend.length + skills.backend.length, suffix: '', label: 'Technologies' },
]
