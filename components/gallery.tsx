"use client"

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface GalleryLayout {
  label: string
  category: string
  title: string
  description: string
}

const layouts: GalleryLayout[] = [
  {
    label: "SaaS & Agency Starter",
    category: "AGENCY & SAAS",
    title: "Convert visitors with high-impact layouts.",
    description:
      "Designed for tech companies, consultancies, and digital agencies: lead capture heroes, feature matrices, interactive pricing tables, and case study query loops.",
  },
  {
    label: "WooCommerce Boutique",
    category: "ECOMMERCE & DTC",
    title: "Sell products with high-converting store flows.",
    description:
      "Tailored for direct-to-consumer brands: sticky add-to-cart, product variant swatches, filtered catalogue grids, and distraction-free checkout.",
  },
  {
    label: "Modern Publication",
    category: "EDITORIAL & MEDIA",
    title: "Engage readers with magazine-grade typography.",
    description:
      "Built for publishers, newsrooms, and content creators: multi-author bylines, reading time indicators, category query loops, and newsletter signup blocks.",
  },
  {
    label: "Creative Portfolio",
    category: "PORTFOLIO & STUDIO",
    title: "Showcase creative work with visual impact.",
    description:
      "Curated for architects, photographers, and independent studios: fullscreen masonry grids, interactive project sliders, and case study layouts.",
  },
]

const slideCount = layouts.length

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

/** One owned timeline per carousel; finish the running transition before accepting the next command. */
function useSlideMotion(getTargets: () => HTMLElement[]): (direction: number, update: () => void) => void {
  const finishRef = useRef<(() => void) | null>(null)
  const getTargetsRef = useRef(getTargets)

  useEffect(() => {
    getTargetsRef.current = getTargets
  })

  useEffect(() => {
    const reducedMotion = window.matchMedia(reducedMotionQuery)
    const finish = () => {
      finishRef.current?.()
      finishRef.current = null
    }
    reducedMotion.addEventListener("change", finish)
    return () => {
      reducedMotion.removeEventListener("change", finish)
      finish()
    }
  }, [])

  return useCallback((direction: number, update: () => void) => {
    finishRef.current?.()
    finishRef.current = null
    if (window.matchMedia(reducedMotionQuery).matches) {
      update()
      return
    }
    const targets = getTargetsRef.current()
    const timeline = gsap
      .timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => ScrollTrigger.refresh(),
      })
      .addLabel("exit", 0)
      .to(targets, { x: -direction * 28, opacity: 0, duration: 0.18, stagger: 0.025 }, "exit")
      .addLabel("replace")
      .call(update, [], "replace")
      .fromTo(
        targets,
        { x: direction * 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.48, stagger: 0.06, immediateRender: false },
        "replace",
      )
      .set(targets, { clearProps: "transform,opacity" })
    finishRef.current = () => {
      timeline.progress(1)
      timeline.kill()
    }
  }, [])
}

export function Gallery() {
  const [active, setActive] = useState(0)
  const requestedRef = useRef(0)
  const mediaRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  const getMotionTargets = useCallback<() => HTMLElement[]>(() => {
    const media = mediaRef.current ? (Array.from(mediaRef.current.children) as HTMLElement[]) : []
    return copyRef.current ? [...media, copyRef.current] : media
  }, [])

  const slide = useSlideMotion(getMotionTargets)

  const layout = layouts[active]
  const number = String(active + 1).padStart(2, "0")

  // The requested index is authoritative immediately; state follows once the
  // transition reaches its replace label, so rapid clicks cannot repeat an index.
  function go(next: number) {
    const index = (next + slideCount) % slideCount
    const direction = next > requestedRef.current ? 1 : -1
    requestedRef.current = index
    slide(direction, () => setActive(requestedRef.current))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      go(requestedRef.current - 1)
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      go(requestedRef.current + 1)
    }
  }

  return (
    <section className="section gallery" id="gallery" data-od-id="gallery" onKeyDown={handleKeyDown}>
      <div className="container">
        <div className="row-between section-heading">
          <div>
            <p className="eyebrow">04 / Multi-Industry Pre-builts</p>
            <h2 data-od-id="element-18">
              One foundation.
              <br />
              <em>Tailored for every industry.</em>
            </h2>
          </div>
          <div className="row">
            <button
              className="btn btn-secondary"
              id="gallery-prev"
              aria-label="Previous gallery layout"
              data-od-id="gallery-prev"
              onClick={() => go(requestedRef.current - 1)}
            >
              ←
            </button>
            <span className="meta" id="gallery-count" aria-live="polite" data-motion-dynamic>{`${number} / 04`}</span>
            <button
              className="btn btn-secondary"
              id="gallery-next"
              aria-label="Next gallery layout"
              data-od-id="gallery-next"
              onClick={() => go(requestedRef.current + 1)}
            >
              →
            </button>
          </div>
        </div>
        <div className="grid-2-1">
          <div className={`ph-img wide gallery-media${active === 0 ? " has-preview" : ""}`} data-od-id="gallery-placeholder" ref={mediaRef}>
            {active === 0 ? (
              <img
                src="https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Nextora/landing/nextora-landing-preview.jpg"
                alt="Nextora agency and SaaS starter website preview"
                width="1242"
                height="700"
              />
            ) : (
              <>
                <span className="cross">＋</span>
                <div>
                  <strong id="gallery-label" data-motion-dynamic>{layout.label}</strong>
                  <br />
                  <span className="meta">Site preview placeholder · 16:9</span>
                </div>
              </>
            )}
          </div>
          <div className="stack gallery-copy" ref={copyRef}>
            <p className="meta" id="gallery-category" data-motion-dynamic>{`${number} / ${layout.category}`}</p>
            <h3 id="gallery-title" data-od-id="element-19" data-motion-dynamic>
              {layout.title}
            </h3>
            <p className="lead" id="gallery-description" data-motion-dynamic>
              {layout.description}
            </p>
            <p className="meta">Pre-built Gutenberg template · 1-click importable</p>
          </div>
        </div>
      </div>
    </section>
  )
}
