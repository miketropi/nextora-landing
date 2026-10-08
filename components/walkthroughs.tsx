"use client"

import { useState } from "react"
import { NoticeButton } from "./notice-button"

interface Walkthrough {
  hook: string
  title: string
  subtitle: string
  description: string
}

const walkthroughs: Walkthrough[] = [
  {
    hook: "video-home",
    title: "Build a custom homepage in 15 minutes",
    subtitle: "Native block editor & visual pattern assembly",
    description:
      "Assemble a complete homepage using native WordPress blocks and pre-built patterns.",
  },
  {
    hook: "video-styles",
    title: "Brand your site via Global Styles",
    subtitle: "Typography pairings, color palettes & theme.json",
    description:
      "Customize global typography, color tokens, and layout spacing across all templates at once.",
  },
  {
    hook: "video-store",
    title: "Launch a high-converting WooCommerce shop",
    subtitle: "Product archives, mini-cart & fast checkout",
    description:
      "Configure product grids, cart slideout, and single-page checkout optimized for conversions.",
  },
  {
    hook: "video-patterns",
    title: "Speed up builds with 60+ Block Patterns",
    subtitle: "One-click insertion & section modularity",
    description:
      "Combine modular block patterns to build bespoke landing pages in a fraction of the time.",
  },
  {
    hook: "video-mobile",
    title: "Optimize for Core Web Vitals & mobile touch",
    subtitle: "Sub-second load times & responsive tuning",
    description:
      "Ensure fluid typography, fast server response, and 95+ Google PageSpeed mobile scores.",
  },
]

export function Walkthroughs() {
  const [selected, setSelected] = useState(0)
  const [previewLabel, setPreviewLabel] = useState("Open homepage walkthrough placeholder")

  const walkthrough = walkthroughs[selected]

  function select(index: number) {
    setSelected(index)
    setPreviewLabel(`Open ${walkthroughs[index].title} placeholder`)
  }

  return (
    <section className="section" id="showcase" data-od-id="video-showcase">
      <div className="container">
        <div className="row-between section-heading">
          <div>
            <p className="eyebrow">06 / Step-by-Step Walkthroughs</p>
            <h2 data-od-id="element-21">
              Master Nextora in minutes.
              <br />
              <em>Watch how it works.</em>
            </h2>
          </div>
          <p className="lead">
            A closer look at building with Nextora.
            <br />
            Select a walkthrough to explore.
          </p>
        </div>
        <div className="grid-2-1">
          <div className="walkthrough-sticky">
            <NoticeButton
              className="ph-img wide video-stage"
              id="video-preview"
              data-od-id="video-preview"
              data-motion-dynamic
              aria-label={previewLabel}
              title={walkthrough.title}
              body={`This video walkthrough demonstrates ${walkthrough.title.toLowerCase()}. The complete video course and theme documentation will be included with the official theme release.`}
            >
              <span className="play">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <path d="M7 4.5v15L19 12 7 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <span id="video-label" data-motion-dynamic>{walkthrough.title}</span>
              <span className="meta">VIDEO PLACEHOLDER · 16:9 · MEDIA TO BE ADDED</span>
            </NoticeButton>
            <p className="meta" id="video-description" data-motion-dynamic>
              {walkthrough.description}
            </p>
          </div>
          <div className="video-list" aria-label="Select a walkthrough">
            {walkthroughs.map((item, index) => (
              <button
                key={item.hook}
                className="video-item"
                aria-pressed={index === selected}
                data-video={index}
                data-od-id={item.hook}
                onClick={() => select(index)}
              >
                <span className="meta">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  {item.title}
                  <small>{item.subtitle}</small>
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <path d="M7 4.5v15L19 12 7 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
