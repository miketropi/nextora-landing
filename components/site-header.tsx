"use client"

import { useEffect, useRef, useState } from "react"

const links = [
  ["discover", "Overview", "element-2"],
  ["impact", "Why Native", "nav-impact"],
  ["features", "Features", "element-3"],
  ["gallery", "Pre-builts", "nav-gallery"],
  ["showcase", "Showcase", "element-4"],
  ["how-to", "How It Works", "element-5"],
  ["faqs", "FAQs", "nav-faqs"],
] as const

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function navigate(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const section = document.getElementById(link.hash.slice(1))
      if (!section) return
      setIsOpen(false)
      section.setAttribute("tabindex", "-1")
      section.focus({ preventScroll: true })
    }
    document.addEventListener("click", navigate)
    const desktop = window.matchMedia("(min-width: 1101px)")
    function closeOnDesktop() {
      if (desktop.matches) setIsOpen(false)
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => {
      document.removeEventListener("click", navigate)
      desktop.removeEventListener("change", closeOnDesktop)
    }
  }, [])

  return (
    <header className="topnav" data-od-id="header" onKeyDown={(event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        toggle.current?.focus()
      }
    }}>
      <div className="container topnav-inner">
        <a className="logo" href="#home" data-od-id="brand" aria-label="Nextora home">
          <span className="brand-mark">N</span> nextora
        </a>
        <nav id="navigation" className={isOpen ? "open" : undefined} aria-label="Main navigation">
          {links.map(([id, label, designId]) => <a key={id} href={`#${id}`} data-od-id={designId}>{label}</a>)}
        </nav>
        <a className="btn btn-secondary desktop-link" href="#download" data-od-id="element-6">Get Nextora ↗</a>
        <button ref={toggle} type="button" className="btn btn-secondary menu-toggle" aria-expanded={isOpen} aria-controls="navigation" data-od-id="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  )
}
