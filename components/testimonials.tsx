"use client"

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TestimonialStory {
  quote: string
  topic: string
  note: string
}

const stories: TestimonialStory[] = [
  {
    quote:
      "Reserved for agency founder story on cutting client build time by 50% using Nextora’s FSE block patterns.",
    topic: "01 / DIGITAL AGENCY WORKFLOW",
    note: "Feedback highlights: client handoff without training calls, zero page builder maintenance, and 100/100 Core Web Vitals.",
  },
  {
    quote:
      "Reserved for eCommerce merchant story on migrating from a bloated theme to Nextora and boosting mobile checkout speed.",
    topic: "02 / WOOCOMMERCE STORE OWNER",
    note: "Feedback highlights: instant product loading, seamless checkout flow, and higher mobile conversion rates.",
  },
  {
    quote:
      "Reserved for freelance designer story on creating custom client identities with theme.json Global Styles without writing CSS.",
    topic: "03 / FREELANCE DESIGNER & CREATOR",
    note: "Feedback highlights: seamless typography styling, intuitive Site Editor, and no client-broken shortcodes.",
  },
]

const storyCount = stories.length

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

export function Testimonials() {
  const [storyIndex, setStoryIndex] = useState(0)
  const requestedRef = useRef(0)
  const slideRef = useRef<HTMLDivElement>(null)

  const getMotionTargets = useCallback<() => HTMLElement[]>(
    () => (slideRef.current ? (Array.from(slideRef.current.children) as HTMLElement[]) : []),
    [],
  )

  const slide = useSlideMotion(getMotionTargets)

  const story = stories[storyIndex]
  const number = String(storyIndex + 1).padStart(2, "0")

  // The requested index is authoritative immediately; state follows once the
  // transition reaches its replace label, so rapid clicks cannot repeat an index.
  function go(next: number) {
    const index = (next + storyCount) % storyCount
    const direction = next > requestedRef.current ? 1 : -1
    requestedRef.current = index
    slide(direction, () => setStoryIndex(requestedRef.current))
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
    <section className="section" id="testimonial" data-od-id="testimonials" onKeyDown={handleKeyDown}>
      <div className="container grid-1-2">
        <div>
          <p className="eyebrow">05 / Perspectives From The Field</p>
          <p className="meta">
            VERIFIED BUILDER STORIES
            <br />
            Agency owners · Store founders · Freelancers
          </p>
        </div>
        <div>
          <h2 data-od-id="element-20">
            Built for the people
            <br />
            <em>who build the web.</em>
          </h2>
          <div
            id="testimonial-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial placeholder ${storyIndex + 1} of 3`}
            data-od-id="testimonial-slide"
            data-motion-dynamic
            ref={slideRef}
          >
            <p className="meta" id="testimonial-topic" data-motion-dynamic>
              {story.topic}
            </p>
            <blockquote className="quote" id="testimonial-quote" data-od-id="testimonial-quote" data-motion-dynamic>
              {`\u201C${story.quote}\u201D`}
            </blockquote>
            <p className="quote-author">Agency Founder &amp; WordPress Developer Placeholder</p>
            <p className="meta" id="testimonial-note" data-motion-dynamic>
              {story.note}
            </p>
            <div className="row" style={{ marginTop: 28 }}>
              <div className="portrait-placeholder" aria-label="Customer portrait placeholder">
                ＋
              </div>
              <span className="meta">
                Verified agency review to be added
                <br />
                Digital studio founder · 40+ client sites
              </span>
            </div>
          </div>
          <div
            className="row testimonial-controls"
            role="group"
            aria-label="Testimonial navigation"
            data-od-id="testimonial-controls"
          >
            <button
              type="button"
              className="btn btn-secondary"
              id="testimonial-prev"
              aria-label="Previous testimonial"
              data-od-id="testimonial-prev"
              onClick={() => go(requestedRef.current - 1)}
            >
              ←
            </button>
            <span className="meta" id="testimonial-count" aria-live="polite" aria-atomic="true" data-motion-dynamic>{`${number} / 03`}</span>
            <button
              type="button"
              className="btn btn-secondary"
              id="testimonial-next"
              aria-label="Next testimonial"
              data-od-id="testimonial-next"
              onClick={() => go(requestedRef.current + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
