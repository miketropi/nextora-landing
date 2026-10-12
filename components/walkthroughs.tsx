"use client"

import { useState } from "react"

interface Walkthrough {
  hook: string
  title: string
  subtitle: string
  description: string
  videoSrc: string
  videoWidth: number
  videoHeight: number
}

const videoBase = "https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Nextora/landing/"

const walkthroughs: Walkthrough[] = [
  {
    hook: "video-colors",
    title: "Find your site's color direction",
    subtitle: "Preset colors & live front-end preview",
    description: "Explore Nextora's preset colors on the front end and see your site's look change in context.",
    videoSrc: `${videoBase}frontend-switch-preset-colors.mp4`,
    videoWidth: 1780,
    videoHeight: 1080,
  },
  {
    hook: "video-megamenu",
    title: "Build richer site navigation",
    subtitle: "Mega menu & organized visitor pathways",
    description: "See Nextora's mega menu in action, with room to organize links and guide visitors through your site.",
    videoSrc: `${videoBase}megamenu-ready.mp4`,
    videoWidth: 1738,
    videoHeight: 1080,
  },
  {
    hook: "video-store",
    title: "Bring your WooCommerce store to life",
    subtitle: "Native storefront integration",
    description: "Explore Nextora's native WooCommerce experience, designed to make your store feel like part of your site.",
    videoSrc: `${videoBase}native-woocommerce.mp4`,
    videoWidth: 1780,
    videoHeight: 1080,
  },
  {
    hook: "video-import",
    title: "Import a ready-made page",
    subtitle: "One-click import & flexible layouts",
    description: "Import a ready-made page in one click, then make the layout your own.",
    videoSrc: `${videoBase}one-click-import-page.mp4`,
    videoWidth: 1716,
    videoHeight: 1080,
  },
  {
    hook: "video-search",
    title: "Help visitors discover content",
    subtitle: "Spotlight search & focused results",
    description: "See Nextora's spotlight search in action and give visitors a focused way to find content.",
    videoSrc: `${videoBase}spotlight-search.mp4`,
    videoWidth: 1192,
    videoHeight: 1080,
  },
]

export function Walkthroughs() {
  const [selected, setSelected] = useState(0)
  const walkthrough = walkthroughs[selected]

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
            <div className="walkthrough-video-stage" id="video-preview" data-od-id="video-preview" data-motion-dynamic>
              <video
                key={walkthrough.hook}
                controls
                muted
                playsInline
                preload="metadata"
                width={walkthrough.videoWidth}
                height={walkthrough.videoHeight}
                aria-label={`${walkthrough.title} walkthrough`}
              >
                <source src={walkthrough.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
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
                onClick={() => setSelected(index)}
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
