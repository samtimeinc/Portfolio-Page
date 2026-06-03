'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProjectCardProps {
  preview: string[]
  title: string
  description: string
  link: string
  className?: string
}

/**
 * ProjectCard Component
 * Displays a project with a title, description, and an image slide deck preview.
 */
const ProjectCard = ({ preview, title, description, link, className = '' }: ProjectCardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentSlide(prev => (prev + 1) % preview.length)
  }

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentSlide(prev => (prev - 1 + preview.length) % preview.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentSlide(prev => (prev + 1) % preview.length)
    } else if (isRightSwipe) {
      setCurrentSlide(prev => (prev - 1 + preview.length) % preview.length)
    }
  }

  return (
    <div className={`group ${className}`}>
      <div
        className="aspect-[16/10] bg-gray-200 rounded-3xl mb-6 overflow-hidden relative shadow-sm touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {preview.length > 0 ? (
          <>
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {preview.map((src, idx) => (
                <div key={idx} className="relative flex-shrink-0 w-full h-full">
                  <Image
                    src={src}
                    alt={`${title} preview ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Slide Deck Navigation */}
            {preview.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                  aria-label="Next slide"
                >
                  →
                </button>
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 z-10">
                  {preview.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        idx === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
            Project Preview
          </div>
        )}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all duration-500 pointer-events-none"></div>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl font-bold mb-2 block group-hover:text-blue-600 transition-colors cursor-pointer"
      >
        {title}
      </a>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default ProjectCard
