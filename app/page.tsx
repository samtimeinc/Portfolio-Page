'use client'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import Image from 'next/image'
import { BsFillLightbulbFill } from 'react-icons/bs'
import Toast, { ToastItem } from '@/app/components/toast'
import { CgMenuGridR } from 'react-icons/cg'
import { FEATURED_PROJECTS, HIDDEN_PROJECTS } from './data/projects'
import { TECH_STACK } from './data/techStack'
import { ABOUT_ME } from './data/aboutMe'

emailjs.init({
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
})

const Module5Portfolio = () => {
  const [showMoreProjects, setShowMoreProjects] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [isAboutExpanded, setIsAboutExpanded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  })
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const addToast = (message: string) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, isExiting: false }])

    // Start exit animation 500ms before removal
    setTimeout(() => {
      setToasts(prev => prev.map(t => (t.id === id ? { ...t, isExiting: true } : t)))
    }, 4500)

    // Remove from state
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.user_name.trim()) addToast('Please leave your name')
    if (!formData.user_email.trim()) addToast('Please include your email')
    else if (!isEmailValid(formData.user_email)) addToast('Please provide a valid email format')
    if (!formData.message.trim()) addToast('Please include a message')

    if (!isFormValid) return

    setIsSubmitted(false) // Reset success state
    setSubmissionError(null) // Clear previous errors

    console.info('Form submitted!') // Log form submission attempt
    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.target as HTMLFormElement
      )
      console.log(result.text)
      setIsSubmitted(true)
      setFormData({ user_name: '', user_email: '', message: '' })
      setTimeout(() => {
        setIsSubmitted(false)
      }, 7000)
    } catch (error: any) {
      console.error('EmailJS error:', error?.text || error)
      setSubmissionError('An error has occurred. Please send an email directly to Sam.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isFormValid =
    formData.user_name.trim() !== '' &&
    isEmailValid(formData.user_email) &&
    formData.message.trim() !== ''

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      })
    }
  }
  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-purple-100 selection:text-purple-900 ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="text-xl font-bold tracking-tighter hover:text-teal-500 transition-colors cursor-pointer flex items-center gap-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <CgMenuGridR className="md:hidden text-4xl" />
            Sam Phin
          </div>
          <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <a
              href="#hero"
              onClick={e => handleScrollToSection(e, 'hero')}
              className="hover:text-teal-500 transition-colors"
            >
              Home
            </a>
            <a
              href="#projects"
              onClick={e => handleScrollToSection(e, 'projects')}
              className="hover:text-teal-500 transition-colors"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={e => handleScrollToSection(e, 'about')}
              className="hover:text-teal-500 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={e => handleScrollToSection(e, 'contact')}
              className="hover:text-teal-500 transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-6">
            <BsFillLightbulbFill
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`text-3xl cursor-pointer hover:scale-110 transition-all ${isDarkMode ? 'text-yellow-300' : 'text-gray-900 hover:text-gray-700'}`}
            />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <button
                className={`${isDarkMode ? 'bg-white text-gray-900 hover:bg-teal-500' : 'bg-gray-900 text-white hover:bg-gray-700'} px-5 py-2.5 rounded-full text-sm font-semibold  transition-all active:scale-95 shadow-sm`}
              >
                View Resume
              </button>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-20 left-0 w-full transition-all duration-300 ease-in-out border-b ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          } ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-100'}`}
        >
          <nav className="flex flex-col p-6 space-y-6 text-center font-medium">
            <a
              href="#hero"
              onClick={e => handleScrollToSection(e, 'hero')}
              className="text-lg hover:text-teal-500 transition-colors"
            >
              Home
            </a>
            <a
              href="#projects"
              onClick={e => handleScrollToSection(e, 'projects')}
              className="text-lg hover:text-teal-500 transition-colors"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={e => handleScrollToSection(e, 'about')}
              className="text-lg hover:text-teal-500 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={e => handleScrollToSection(e, 'contact')}
              className="text-lg hover:text-teal-500 transition-colors"
            >
              Contact
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="pt-4">
              <button
                className={`${isDarkMode ? 'bg-white text-gray-900 hover:bg-teal-500' : 'bg-gray-900 text-white hover:bg-gray-700'} w-full py-4 rounded-xl font-bold transition-all shadow-lg`}
              >
                View Resume
              </button>
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <h1
                className={`text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] transition-all duration-1000 ease-out ${
                  isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100px]'
                }`}
              >
                Digital Craftsman{' '}
                <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent font-extrabold">
                  designing
                </span>{' '}
                experiences.
              </h1>
              <p
                className={`text-xl mb-12 leading-relaxed max-w-2xl transition-all duration-1000 delay-300 ease-out ${
                  isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100px]'
                } ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                I specialize in building accessible, high-performance web applications using React
                and TypeScript. Let's turn your ideas into reality.
              </p>

              <div
                className={`flex flex-wrap gap-4 transition-opacity duration-1000 delay-700 ${
                  isMounted ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <a
                  href="#projects"
                  onClick={e => handleScrollToSection(e, 'projects')}
                  className={`bg-gradient-to-r from-teal-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:opacity-80 transition-all ${isDarkMode ? '' : 'shadow-xl shadow-teal-100'}`}
                >
                  Explore My Work
                </a>
                <a
                  href="#contact"
                  onClick={e => handleScrollToSection(e, 'contact')}
                  className={`${isDarkMode ? 'bg-slate-900' : 'bg-white shadow-xl shadow-teal-100'} text-${isDarkMode ? 'white' : 'gray-900'} border border-violet-700 px-8 py-4 rounded-xl font-bold transition-all hover:border-teal-500 hover:text-teal-500 `}
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-teal-50/40 to-transparent pointer-events-none"></div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`py-24 transition-colors ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50/50'}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight">Featured Projects</h2>
                <p
                  className={`max-w-md transition-colors ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  A selection of recent works showcasing technical expertise and design thinking.
                </p>
              </div>
              <button
                onClick={() => setShowMoreProjects(!showMoreProjects)}
                className="text-teal-600 font-bold hover:text-gray-600 transition-colors group flex items-center gap-2"
              >
                {showMoreProjects ? 'Show Fewer Projects' : 'See All Projects'}
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${showMoreProjects ? 'rotate-180' : 'animate-bounce'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {FEATURED_PROJECTS.map((product, index) => (
                <div key={index}>{product.project}</div>
              ))}
            </div>

            <div
              className={`grid transition-all duration-700 ease-in-out ${showMoreProjects ? 'grid-rows-[1fr] opacity-100 mt-12' : 'grid-rows-[0fr] opacity-0 pointer-events-none mt-0'}`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {HIDDEN_PROJECTS.map((product, index) => (
                    <div key={index}>{product.project}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`py-24 border-t transition-colors ${
            isDarkMode ? 'border-slate-800' : 'border-gray-100'
          }`}
        >
          <div
            className={`max-w-7xl mx-auto px-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            <h2 className="text-4xl font-bold mb-4 tracking-tight">About Me</h2>

            <div
              className={`relative transition-all duration-700 ease-in-out overflow-hidden ${isAboutExpanded ? 'max-h-[5000px]' : 'max-h-[400px]'}`}
            >
              {ABOUT_ME()}

              {!isAboutExpanded && (
                <div
                  className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t pointer-events-none ${isDarkMode ? 'from-slate-950' : 'from-white'} to-transparent`}
                />
              )}
            </div>

            <button
              onClick={() => setIsAboutExpanded(!isAboutExpanded)}
              className="mt-8 flex items-center gap-2 text-teal-600 font-bold hover:text-gray-600 transition-colors group"
            >
              {isAboutExpanded ? 'Show Less' : 'Read More'}
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isAboutExpanded ? 'rotate-180' : 'animate-bounce'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Technology Stack Carousel */}
          <div
            className={`mt-20 relative overflow-hidden py-10 border-y transition-colors ${
              isDarkMode ? 'border-slate-800 bg-slate-900/30' : 'border-gray-100 bg-gray-50/30'
            }`}
          >
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                display: flex;
                width: max-content;
                animation: marquee 40s linear infinite;
              }
            `}</style>
            <div className="animate-marquee hover:[animation-play-state:paused]">
              {/* Render twice for seamless infinite scrolling */}
              {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center mx-12 grayscale hover:grayscale-0 transition-all duration-300 group"
                >
                  <div
                    className={`h-[100px] w-[100px] flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    <tech.Icon />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-24 bg-gray-900 text-white rounded-[3rem] mx-6 mb-12 overflow-hidden"
        >
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Get In Touch</h2>
              <p className="text-gray-400">
                Have a project in mind? Let&apos;s build something amazing together.
              </p>
            </div>

            {submissionError ? (
              <div className="py-12 text-center animate-in fade-in zoom-in duration-500 text-red-400">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 text-red-500 rounded-full mb-6">
                  <span className="text-2xl">!</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Submission Failed</h3>
                <p className="text-gray-400">
                  An error has occurred. Please send an email directly to{' '}
                  <a href="mailto:phn.samg99@gmail.com" className="text-teal-400 hover:underline">
                    Sam
                  </a>
                  .
                </p>
              </div>
            ) : isSubmitted ? (
              <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/10 text-teal-400 rounded-full mb-6">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400">
                  Thank you for reaching out. I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-300">
                      Name
                    </label>
                    <input
                      required
                      name="user_name"
                      type="text"
                      id="name"
                      placeholder="Your name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-300">
                      Email
                    </label>
                    <input
                      required
                      name="user_email"
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-300">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    id="message"
                    rows={4}
                    placeholder="How can I help you?"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] bg-gradient-to-r from-teal-500 to-purple-600 text-white hover:opacity-80 shadow-teal-900/20"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`py-12 border-t transition-colors min-h-[100px] ${
          isDarkMode ? 'border-slate-800' : 'border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-gray-500 md:flex-1">
            © {currentYear} Samnang Phin. All rights reserved.
          </div>
          <button
            className="relative group flex items-center focus:outline-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            {/* Back to top label - slides out from behind */}
            <div className="absolute left-4 flex items-center gap-2 text-teal-600 font-bold whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-24 pointer-events-none">
              <div className="text-sm tracking-tight">Back to top</div>
              <div className="text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Logo - kept on top with z-index and background to hide sliding text */}
            <div
              className={`relative z-10 transition-all ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}
            >
              {isDarkMode ? (
                <Image
                  src="/logo-dark-mode.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="h-[100px] w-auto transition-all"
                />
              ) : (
                <Image
                  src="/logo-light-mode.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="h-[100px] w-auto transition-all"
                />
              )}
            </div>
          </button>
          <div className="flex items-center space-x-8 text-sm font-semibold text-gray-400 md:flex-1 md:justify-end">
            <a
              href="https://github.com/samtimeinc"
              className="hover:text-teal-500 transition-colors"
              aria-label="Visit my GitHub profile"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sam-phin-9bb6a624a"
              className="hover:text-teal-500 transition-colors"
              aria-label="Visit my LinkedIn profile"
            >
              LinkedIn
            </a>

            {/* <a
              href="#"
              className="hover:text-teal-500 transition-colors"
              aria-label="Visit my Twitter profile"
            >
              Twitter
            </a> */}
          </div>
        </div>
      </footer>

      <Toast toasts={toasts} isDarkMode={isDarkMode} />
    </div>
  )
}

export default Module5Portfolio