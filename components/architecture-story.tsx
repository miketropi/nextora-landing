"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const videoBase = "https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Nextora/landing/"

const stories = [
  { id: "colors", label: "01 / Preset Colors", title: "Find your site's color direction.", detail: "Explore Nextora's preset colors on the front end and see your site's look change in context.", tags: ["Preset colors", "Live preview"], videoSrc: `${videoBase}frontend-switch-preset-colors.mp4`, videoWidth: 1780, videoHeight: 1080 },
  { id: "megamenu", label: "02 / Mega Menu", title: "Make room for richer navigation.", detail: "See Nextora's mega menu in action, with room to organize links and guide visitors through your site.", tags: ["Mega menu", "Site navigation"], videoSrc: `${videoBase}megamenu-ready.mp4`, videoWidth: 1738, videoHeight: 1080 },
  { id: "commerce", label: "03 / Native WooCommerce", title: "Bring your storefront to life.", detail: "Explore Nextora's native WooCommerce experience, designed to make your store feel like part of your site.", tags: ["WooCommerce", "Native integration"], videoSrc: `${videoBase}native-woocommerce.mp4`, videoWidth: 1780, videoHeight: 1080 },
  { id: "import", label: "04 / Page Import", title: "Start with a page, not a blank canvas.", detail: "Import a ready-made page in one click, then make the layout your own.", tags: ["One-click import", "Ready-made pages"], videoSrc: `${videoBase}one-click-import-page.mp4`, videoWidth: 1716, videoHeight: 1080 },
  { id: "search", label: "05 / Spotlight Search", title: "Put discovery in the spotlight.", detail: "See Nextora's spotlight search in action and give visitors a focused way to find content.", tags: ["Spotlight search", "Content discovery"], videoSrc: `${videoBase}spotlight-search.mp4`, videoWidth: 1192, videoHeight: 1080 },
] as const

export function ArchitectureStory() {
  const [active, setActive] = useState(0)
  const advance = useCallback(() => setActive((index) => (index + 1) % stories.length), [])

  return (
    <div className="architecture-story" aria-label="Five video demonstrations of Nextora">
      <div className="architecture-scenes" aria-live="off">
        {stories.map((story, index) => {
          const isActive = index === active
          return (
            <article className={`architecture-scene${isActive ? " is-active" : ""}`} key={story.id} aria-hidden={!isActive}>
              <div className="architecture-copy">
                <span className="architecture-kicker">{story.label}</span>
                <h2>{story.title}</h2>
                <p>{story.detail}</p>
                <div className="architecture-tags">{story.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              {isActive ? <StoryVideo key={story.id} story={story} onEnded={advance} /> : <div className="story-video-column" aria-hidden="true"><div className="story-video-stage" /><div className="story-video-message" /></div>}
            </article>
          )
        })}
      </div>
      <div className="architecture-nav" aria-label="Video demonstration slides">
        <span className="architecture-count num">{String(active + 1).padStart(2, "0")} / 05</span>
        <div className="architecture-tabs">{stories.map((story, index) => <button key={story.id} type="button" className={index === active ? "is-active" : undefined} aria-label={`Show ${story.label}`} aria-pressed={index === active} onClick={() => setActive(index)}><span /></button>)}</div>
        <span className="architecture-status">VIDEO DEMOS</span>
      </div>
    </div>
  )
}

function StoryVideo({ story, onEnded }: { story: (typeof stories)[number]; onEnded: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotionRef = useRef(false)
  const wasPlayingBeforeHideRef = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [playGuidance, setPlayGuidance] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let cancelled = false
    reducedMotionRef.current = motion.matches
    const attemptPlay = () => { if (!cancelled && !motion.matches && !document.hidden) void video.play().catch(() => { if (!cancelled) setPlayGuidance(true) }) }
    const loadedData = () => { if (!cancelled) setLoaded(true) }
    const play = () => { if (!cancelled) setPlayGuidance(false) }
    const error = () => { if (!cancelled) { setLoaded(true); setFailed(true) } }
    const ended = () => { if (!document.hidden && !reducedMotionRef.current) onEnded() }
    const visibility = () => { if (document.hidden) { wasPlayingBeforeHideRef.current = !video.paused && !video.ended; video.pause() } else if (wasPlayingBeforeHideRef.current && !motion.matches) { wasPlayingBeforeHideRef.current = false; attemptPlay() } }
    const motionChange = (event: MediaQueryListEvent) => { reducedMotionRef.current = event.matches; if (event.matches) { wasPlayingBeforeHideRef.current = false; video.pause() } }
    video.addEventListener("loadeddata", loadedData); video.addEventListener("play", play); video.addEventListener("error", error); video.addEventListener("ended", ended); document.addEventListener("visibilitychange", visibility); motion.addEventListener("change", motionChange); attemptPlay()
    return () => { cancelled = true; video.pause(); video.removeEventListener("loadeddata", loadedData); video.removeEventListener("play", play); video.removeEventListener("error", error); video.removeEventListener("ended", ended); document.removeEventListener("visibilitychange", visibility); motion.removeEventListener("change", motionChange) }
  }, [onEnded])

  const message = !loaded ? "Loading demo…" : playGuidance ? "Press play to watch this demo." : null
  return <div className="story-video-column"><div className="story-video-stage"><video ref={videoRef} muted playsInline controls preload="metadata" width={story.videoWidth} height={story.videoHeight} aria-label={story.title}><source src={story.videoSrc} type="video/mp4" />Your browser does not support the video tag.</video></div><div className="story-video-message" aria-live="polite">{failed ? <span>This demo could not be loaded. <a href={story.videoSrc}>Open video</a></span> : message}</div></div>
}
