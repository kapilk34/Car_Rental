import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const socials = [
  { icon: assets.facebook_logo, label: 'Facebook', href: '#' },
  { icon: assets.instagram_logo, label: 'Instagram', href: '#' },
  { icon: assets.twitter_logo, label: 'Twitter', href: '#' },
  { icon: assets.gmail_logo, label: 'Email', href: 'mailto:contact@carrental.com' },
]

const Footer = () => {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-5">

        <Link to="/" className="flex items-center gap-3 group">
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://gvu57hqxi3.ufs.sh/f/FOd38ztMu1UwdyMcIgZp70jYMIdGQuW8qnyl5fzmKCVhtATS"
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-110"
              alt="DriveSphere Logo"
            />
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Drive<span className="text-[var(--color-accent)]">Sphere</span>
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          {socials.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full 
              bg-[var(--color-card)] border border-[var(--color-border)]
              hover:border-[var(--color-accent)] hover:-translate-y-1
              hover:shadow-md transition-all duration-300"
            >
              <img
                src={icon}
                alt={label}
                className="w-4 h-4 opacity-80 group-hover:opacity-100"
              />
            </a>
          ))}
        </div>

      </div>
    </footer>
  )
}

export default Footer