"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Faithful port of the animation layer of nextora-landing.html.
 *
 * Owns, in source order:
 *  - FAQ <details> open/close height animation (summary click is intercepted, native
 *    semantics preserved: `details.open` still drives the state)
 *  - hero soft-blur per-character load + per-word h2 scroll replay + content-card triggers
 *  - soft-blur character wave for button/link hover, keyboard focus, and reset on click
 *
 * React safety: the split wrappers are always restored on cleanup, on reduced-motion
 * change, and before any control mutates its own label. Text owned by the carousel /
 * testimonial / walkthrough components is never split (see DYNAMIC_TEXT).
 */

type Teardown = () => void;

/** Exact cubic-bezier evaluation, without requiring another GSAP plugin. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const sample = (t: number, a: number, b: number) =>
    3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t;
  return (x: number) => {
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 20; i++) {
      t = (lo + hi) / 2;
      if (sample(t, x1, x2) < x) lo = t;
      else hi = t;
    }
    return sample(t, y1, y2);
  };
}

/** cubic-bezier(.22, 1, .36, 1) — the signature ease of both text effects. */
const softBlurEase = cubicBezier(0.22, 1, 0.36, 1);

/** Nodes whose text is owned or replaced at runtime by the interactive components. */
const DYNAMIC_TEXT = [
  // React re-renders these labels: the mobile menu toggle swaps Menu/Close, dialog content
  // is rendered with useId ids, and the carousels/walkthrough/dialog write at runtime.
  ".menu-toggle",
  "[data-motion-dynamic]",
  "dialog",
  "#gallery-count",
  "#gallery-label",
  "#gallery-category",
  "#gallery-title",
  "#gallery-description",
  "#testimonial-slide",
  "#testimonial-count",
  "#testimonial-quote",
  "#testimonial-topic",
  "#testimonial-note",
  "#video-label",
  "#video-description",
  "#notice-title",
  "#notice-body",
].join(",");

const CONTENT_CARDS = "article, .gallery-media, .quote:not(#testimonial-quote), .video-stage";

export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const teardowns: Teardown[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // ------------------------------------------------------------------
    // FAQ: faithful details/summary height animation.
    // ------------------------------------------------------------------
    document.querySelectorAll<HTMLDetailsElement>("details").forEach((details) => {
      const summary = details.querySelector<HTMLElement>("summary");
      const answer = details.querySelector<HTMLElement>("p");
      if (!summary || !answer) return;

      const wasOpen = details.open;
      let faqTween: gsap.core.Tween | null = null;
      const clear = () => {
        gsap.set(answer, { clearProps: "height,opacity,transform,marginBottom" });
      };

      const onToggle = () => {
        ScrollTrigger.refresh();
      };

      const onReducedMotionChange = () => {
        if (!faqTween) return;
        // Finish the in-flight tween so `details.open` settles, then clear the inline props.
        faqTween.progress(1).kill();
        faqTween = null;
        clear();
        ScrollTrigger.refresh();
      };

      const onClick = (event: MouseEvent) => {
        event.preventDefault();
        if (faqTween) {
          faqTween.progress(1).kill();
          faqTween = null;
        }
        const opening = !details.open;
        if (reducedMotion.matches) {
          details.open = opening;
          ScrollTrigger.refresh();
          return;
        }
        if (opening) {
          details.open = true;
          const targetHeight = answer.scrollHeight;
          faqTween = gsap.fromTo(
            answer,
            { height: 0, opacity: 0, y: -8, marginBottom: 0 },
            {
              height: targetHeight,
              opacity: 1,
              y: 0,
              marginBottom: 24,
              duration: 0.38,
              ease: "power3.out",
              onComplete: () => {
                clear();
                faqTween = null;
                ScrollTrigger.refresh();
              },
            },
          );
        } else {
          faqTween = gsap.to(answer, {
            height: 0,
            opacity: 0,
            y: -6,
            marginBottom: 0,
            duration: 0.26,
            ease: "power2.inOut",
            onComplete: () => {
              details.open = false;
              clear();
              faqTween = null;
              ScrollTrigger.refresh();
            },
          });
        }
      };

      details.addEventListener("toggle", onToggle);
      summary.addEventListener("click", onClick);
      reducedMotion.addEventListener("change", onReducedMotionChange);

      teardowns.push(() => {
        details.removeEventListener("toggle", onToggle);
        summary.removeEventListener("click", onClick);
        reducedMotion.removeEventListener("change", onReducedMotionChange);
        if (faqTween) {
          faqTween.kill();
          faqTween = null;
        }
        details.open = wasOpen;
        clear();
      });
    });

    // ------------------------------------------------------------------
    // Hero load reveal, per-word h2 scroll replay, per-card scroll triggers.
    // Wrapped in matchMedia so reduced motion (and cleanup) resets everything.
    // ------------------------------------------------------------------
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const restores: Teardown[] = [];

      function splitText(heading: HTMLElement, characters: boolean) {
        const label = heading.getAttribute("aria-label");
        const hadClass = heading.hasAttribute("class");
        const text = heading.innerHTML.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]+>/g, "");
        heading.setAttribute("aria-label", text);
        heading.classList.add("motion-text");

        // Each original text node is kept alive and swapped back in on restore, so React's
        // own nodes (text and elements alike) keep their identity across a media change.
        const splits: Array<{ original: Text; inserted: ChildNode[] }> = [];
        const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
        const nodes: Text[] = [];
        while (walker.nextNode()) nodes.push(walker.currentNode as Text);

        nodes.forEach((node) => {
          const fragment = document.createDocumentFragment();
          (node.textContent ?? "").split(/(\s+)/).forEach((word) => {
            if (!word.trim()) {
              fragment.append(document.createTextNode(word));
              return;
            }
            const span = document.createElement("span");
            span.className = "motion-word";
            span.setAttribute("aria-hidden", "true");
            if (characters) {
              Array.from(word).forEach((letter) => {
                const char = document.createElement("span");
                char.className = "motion-char";
                char.textContent = letter;
                span.append(char);
              });
            } else {
              span.textContent = word;
            }
            fragment.append(span);
          });
          const inserted = Array.from(fragment.childNodes);
          node.replaceWith(fragment);
          splits.push({ original: node, inserted });
        });

        restores.push(() => {
          splits.forEach(({ original, inserted }) => {
            if (inserted.length === 0) return;
            const [first, ...extra] = inserted;
            // If React already replaced the split markup, leave its DOM alone.
            if (!first.isConnected) return;
            first.replaceWith(original);
            extra.forEach((node) => node.remove());
          });
          heading.classList.remove("motion-text");
          if (!hadClass) heading.removeAttribute("class");
          if (label === null) heading.removeAttribute("aria-label");
          else heading.setAttribute("aria-label", label);
        });

        return heading.querySelectorAll<HTMLElement>(characters ? ".motion-char" : ".motion-word");
      }

      const hero = document.querySelector<HTMLElement>('[data-od-id="hero-title"]');
      if (hero) {
        const letters = splitText(hero, true);

        // Hero entrance plays immediately on load, without waiting for scroll.
        const intro = gsap.timeline({
          id: "nextora-hero-reveal",
          defaults: { duration: 0.8, ease: "power3.out" },
          onComplete: () => ScrollTrigger.refresh(),
        });

        intro
          .addLabel("eyebrow", 0)
          .from("#home .hero-center > .eyebrow", { y: 12, autoAlpha: 0, duration: 0.7 }, "eyebrow")
          .addLabel("headline", 0.1)
          .fromTo(
            letters,
            { opacity: 0, y: 18, filter: "blur(14px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.95, stagger: 0.025, ease: softBlurEase },
            "headline",
          )
          .addLabel("support", 0.65)
          .from("#home .hero-center > .lead", { y: 14, autoAlpha: 0, duration: 0.75 }, "support")
          .from("#home .hero-cta", { y: 20, autoAlpha: 0, duration: 0.7 }, "support+=0.15")
          .from("#home .hero-stage", { y: 32, autoAlpha: 0, duration: 0.9, ease: "power2.out" }, "support+=0.25")
          .from("#home .compatibility", { y: 16, autoAlpha: 0, duration: 0.7, ease: "power2.out" }, "support+=0.4");
      }

      // Custom larger word-rise treatment; the hero keeps the soft-blur reveal.
      document.querySelectorAll<HTMLElement>("main > section:not(.hero)").forEach((section, index) => {
        const heading = section.querySelector<HTMLElement>("h2");
        if (!heading) return;

        const words = splitText(heading, false);
        const reveal = gsap.timeline({
          id: `nextora-heading-${index}`,
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            id: `heading-${section.id}`,
            trigger: heading,
            start: "clamp(top 84%)",
            end: "bottom top",
            toggleActions: "play complete restart reset",
          },
        });

        reveal
          .addLabel("words", 0)
          .fromTo(
            words,
            { opacity: 0, y: 42, rotationX: -35 },
            { opacity: 1, y: 0, rotationX: 0, transformPerspective: 700, duration: 0.95, stagger: 0.085 },
            "words",
          );

        // Each card gets its own trigger so mobile rows do not finish off-screen.
        section.querySelectorAll<HTMLElement>(CONTENT_CARDS).forEach((card, cardIndex) => {
          gsap.from(card, {
            y: 48,
            autoAlpha: 0,
            duration: 0.85,
            delay: (cardIndex % 2) * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              id: `content-${section.id}-${cardIndex}`,
              trigger: card,
              start: "clamp(top 90%)",
              end: "bottom top",
              toggleActions: "play complete restart reset",
            },
          });
        });
      });

      ScrollTrigger.refresh();

      return () => restores.forEach((restore) => restore());
    });

    const onPageShow = () => ScrollTrigger.refresh();
    const onPageHide = (event: PageTransitionEvent) => {
      if (!event.persisted) mm.revert();
    };

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("pagehide", onPageHide);

    // ------------------------------------------------------------------
    // Soft-blur character wave for buttons & links (hover / keyboard focus).
    // ------------------------------------------------------------------
    const hoverContext = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("a,button").forEach((control) => {
        let tween: gsap.core.Tween | null = null;
        let replacements: Array<[HTMLElement, Text]> = [];
        let clickReset: number | null = null;

        function reset() {
          if (clickReset !== null) window.clearTimeout(clickReset);
          clickReset = null;
          if (tween) {
            tween.kill();
            tween = null;
          }
          replacements.forEach(([wrapper, node]) => {
            if (wrapper.isConnected) wrapper.replaceWith(node);
          });
          replacements = [];
        }

        function reveal() {
          reset();
          if (reducedMotion.matches || control.matches(":disabled")) return;

          const walker = document.createTreeWalker(control, NodeFilter.SHOW_TEXT);
          const nodes: Text[] = [];
          while (walker.nextNode()) {
            const node = walker.currentNode as Text;
            const parent = node.parentElement;
            if (!parent) continue;
            if (!/[\p{L}\p{N}]/u.test(node.textContent ?? "")) continue;
            if (parent.closest('svg,[aria-hidden="true"],.brand-mark')) continue;
            // Leave runtime-mutated labels untouched (carousel / walkthrough / dialog).
            if (parent.closest(DYNAMIC_TEXT)) continue;
            nodes.push(node);
          }

          const chars: HTMLElement[] = [];
          nodes.forEach((node) => {
            const wrapper = document.createElement("span");
            wrapper.className = "hover-label";

            const accessible = document.createElement("span");
            accessible.className = "hover-accessible";
            accessible.textContent = node.textContent;
            wrapper.append(accessible);

            const visual = document.createElement("span");
            visual.setAttribute("aria-hidden", "true");
            (node.textContent ?? "").split(/(\s+)/).forEach((word) => {
              if (!word.trim()) {
                visual.append(document.createTextNode(word));
                return;
              }
              const span = document.createElement("span");
              span.className = "hover-word";
              Array.from(word).forEach((letter) => {
                const char = document.createElement("span");
                char.className = "hover-char";
                char.textContent = letter;
                chars.push(char);
                span.append(char);
              });
              visual.append(span);
            });
            wrapper.append(visual);

            node.replaceWith(wrapper);
            replacements.push([wrapper, node]);
          });

          if (chars.length) {
            tween = gsap.fromTo(
              chars,
              { opacity: 0, y: 6, filter: "blur(5px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.36,
                stagger: { amount: Math.min(0.22, Math.max(0.06, (chars.length - 1) * 0.018)) },
                ease: softBlurEase,
              },
            );
          }
        }

        const onPointerEnter = (event: PointerEvent) => {
          if (event.pointerType !== "touch") reveal();
        };
        const onFocus = () => {
          if (control.matches(":focus-visible")) reveal();
        };

        control.addEventListener("pointerenter", onPointerEnter);
        control.addEventListener("pointerleave", reset);
        control.addEventListener("focus", onFocus);
        control.addEventListener("blur", reset);
        // Keep the clicked wrapper attached until React's delegated handlers run.
        const onClick = () => {
          if (clickReset !== null) window.clearTimeout(clickReset);
          clickReset = window.setTimeout(reset, 0);
        };
        control.addEventListener("click", onClick, true);
        reducedMotion.addEventListener("change", reset);

        teardowns.push(() => {
          control.removeEventListener("pointerenter", onPointerEnter);
          control.removeEventListener("pointerleave", reset);
          control.removeEventListener("focus", onFocus);
          control.removeEventListener("blur", reset);
          control.removeEventListener("click", onClick, true);
          reducedMotion.removeEventListener("change", reset);
          reset();
        });
      });
    });

    return () => {
      teardowns.forEach((teardown) => teardown());
      hoverContext.revert();
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
      mm.revert();
      // GSAP revert clears properties one by one and can leave an inert empty style attribute.
      document.querySelectorAll('[style=""]').forEach((node) => node.removeAttribute("style"));
    };
  }, []);

  return null;
}
