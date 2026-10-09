import { ArchitectureStory } from "@/components/architecture-story"
import { Gallery } from "@/components/gallery"
import { NoticeButton } from "@/components/notice-button"
import { PageMotion } from "@/components/page-motion"
import { SiteHeader } from "@/components/site-header"
import { Testimonials } from "@/components/testimonials"
import { Walkthroughs } from "@/components/walkthroughs"

export default function Home() {
  return (
    <>
      <a className="skip" href="#discover" data-od-id="element-1">
        {"Skip to content"}
      </a>
      <SiteHeader />
      <main id="content">
        <section className="section hero" id="home" data-od-id="hero">
          <div className="container">
            <div className="hero-center">
              <p className="eyebrow">
                {"FULL SITE EDITING · BLOCK-NATIVE · ZERO PAGE BUILDER BLOAT"}
              </p>
              <h1 data-od-id="hero-title">
                {"Build bespoke WordPress sites."}
                <br />
                <em>
                  {"Without the bloat."}
                </em>
              </h1>
              <p className="lead">
                {"Design agency-grade client sites, high-converting WooCommerce stores, and editorial publications natively in Gutenberg. No slow page builders, no code lock-in, and instant 99+ Core Web Vitals."}
              </p>
              <div className="hero-cta">
                <a className="btn btn-primary btn-arrow" href="#download" data-od-id="hero-cta">
                  {"Get Nextora Theme"}
                </a>
                <a className="btn btn-ghost" href="#gallery" data-od-id="element-7">
                  {"Explore Pre-builts ↗"}
                </a>
              </div>
            </div>
            <div className="hero-stage" data-od-id="hero-media">
              <div className="stage-caption">
                <span>{"01 / NEXTORA IN ACTION"}</span>
                <span>{"DESIGN · NAVIGATION · COMMERCE"}</span>
              </div>
              <ArchitectureStory />
            </div>
            <div className="compatibility">
              <span className="meta">
                {"OPTIMIZED FOR THE MODERN WORDPRESS STACK"}
              </span>
              <span>
                {"WordPress 6.7+"}
              </span>
              <span>
                {"Full Site Editing"}
              </span>
              <span>
                {"WooCommerce 9.0+"}
              </span>
              <span>
                {"Mega Menu Ready"}
              </span>
              <span>
                {"99+ PageSpeed"}
              </span>
            </div>
          </div>
        </section>
        <section className="section" id="discover" data-od-id="discover">
          <div className="container grid-1-2">
            <p className="eyebrow">
              {"01 / Native WordPress Revolution"}
            </p>
            <div>
              <h2 data-od-id="discover-title">
                {"Ditch heavy page builders."}
                <br />
                <em>
                  {"Embrace pure Gutenberg."}
                </em>
              </h2>
              <p className="lead" style={{"marginTop": "24px"}}>
                {"For years, building custom WordPress websites meant relying on bloated page builder plugins, heavy shortcode layers, and constant maintenance headaches. Nextora harnesses native Full Site Editing: instantaneous visual editing, semantic core markup, and limitless design freedom—with zero page builder bloat."}
              </p>
              <a className="btn btn-ghost btn-arrow" href="#features" style={{"marginTop": "24px"}} data-od-id="element-8">
                {"Explore the builder toolkit"}
              </a>
            </div>
          </div>
        </section>
        <section className="section impact" id="impact" data-od-id="impact">
          <div className="container">
            <div className="row-between section-heading">
              <div>
                <p className="eyebrow">
                  {"02 / Engineered For Builders"}
                </p>
                <h2 data-od-id="element-9">
                  {"Built for speed."}
                  <br />
                  <em>
                    {"Engineered for client handoffs."}
                  </em>
                </h2>
              </div>
              <p className="lead">
                {"A clean architectural foundation designed for freelancers,"}
                <br />
                {"agencies, and store owners who demand perfection."}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-[var(--gap-lg)] min-[921px]:grid-cols-3">
              <article className="feature card-rule" data-od-id="impact-edit">
                <span className="meta">
                  {"01 — TRUE FULL SITE EDITING"}
                </span>
                <h3 data-od-id="element-10">
                  {"Edit every template visually."}
                </h3>
                <p>
                  {"Headers, footers, single post layouts, archive query loops, and 404 pages are all editable directly in the WordPress Site Editor without touching PHP code."}
                </p>
              </article>
              <article className="feature card-rule" data-od-id="impact-style">
                <span className="meta">
                  {"02 — GLOBAL DESIGN TOKENS"}
                </span>
                <h3 data-od-id="element-11">
                  {"Change your brand once. Applied everywhere."}
                </h3>
                <p>
                  {"Powered by WordPress theme.json. Swap color palettes, fluid typography clamps, border radii, and layout spacing across your entire website in seconds."}
                </p>
              </article>
              <article className="feature card-rule" data-od-id="impact-own">
                <span className="meta">
                  {"03 — ZERO VENDOR LOCK-IN"}
                </span>
                <h3 data-od-id="element-12">
                  {"Clean Gutenberg blocks that never break."}
                </h3>
                <p>
                  {"Your content lives as clean, standard WordPress core blocks. If you ever change themes down the road, your content remains intact with zero orphan shortcodes."}
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="section" id="features" data-od-id="features">
          <div className="container">
            <div className="row-between section-heading">
              <div>
                <p className="eyebrow">
                  {"03 / The Builder Toolkit"}
                </p>
                <h2 data-od-id="element-13">
                  {"Everything you need to ship."}
                  <br />
                  <em>
                    {"Nothing you don't."}
                  </em>
                </h2>
              </div>
              <p className="lead">
                {"Production-ready block patterns, WooCommerce-native templates,"}
                <br />
                {"and responsive controls designed for real-world projects."}
              </p>
            </div>
            <div className="grid-2 feature-grid">
              <article className="card" data-od-id="feature-editing">
                <div className="feature-demo feature-demo-image">
                  <img
                    src="https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Nextora/landing/blocks.webp"
                    alt="Nextora block pattern inserter with pre-composed page layouts"
                    width="800"
                    height="352"
                    loading="lazy"
                  />
                </div>
                <span className="meta">
                  {"01 / 60+ CURATED PATTERNS"}
                </span>
                <h3 data-od-id="element-14">
                  {"Drag, drop, and publish in minutes."}
                </h3>
                <p>
                  {"Pre-assembled hero sections, interactive pricing tables, feature grids, team bios, and call-to-actions ready to drop in with one click from the WordPress inserter."}
                </p>
              </article>
              <article className="card" data-od-id="feature-commerce">
                <div className="feature-demo feature-demo-image">
                  <img
                    src="https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Nextora/landing/woo.webp"
                    alt="Nextora WooCommerce store builder with product, cart, and checkout layouts"
                    width="800"
                    height="352"
                    loading="lazy"
                  />
                </div>
                <span className="meta">
                  {"02 / COMMERCE WITHOUT COMPROMISE"}
                </span>
                <h3 data-od-id="element-15">
                  {"High-converting WooCommerce stores."}
                </h3>
                <p>
                  {"Custom product archives, product single layouts, ajax mini-cart slideout, and streamlined distraction-free checkout designed to maximize sales and load in under a second."}
                </p>
              </article>
              <article className="card card-rule" data-od-id="feature-responsive">
                <span className="meta">
                  {"03 / FLUID RESPONSIVE SYSTEM"}
                </span>
                <h3 data-od-id="element-16">
                  {"Fluid typography and mobile-first rhythm."}
                </h3>
                <p>
                  {"Fluid clamp() type scales, adaptive container grids, and touch-optimized navigation menus ensure pixel-perfect rendering across iPhones, Android, tablets, and ultrawides."}
                </p>
              </article>
              <article className="card card-rule" data-od-id="feature-accessibility">
                <span className="meta">
                  {"04 / PERFORMANCE & ACCESSIBILITY"}
                </span>
                <h3 data-od-id="element-17">
                  {"99+ PageSpeed score & WCAG 2.1 AA."}
                </h3>
                <p>
                  {"Zero jQuery, zero bulky CSS frameworks, and under 25KB critical asset footprint. Built with strict semantic HTML, aria landmarks, and accessible keyboard focus."}
                </p>
              </article>
            </div>
          </div>
        </section>
        <Gallery />
        <Testimonials />
        <Walkthroughs />
        <section className="section" id="how-to" data-od-id="how-to">
          <div className="container">
            <div className="row-between section-heading">
              <div>
                <p className="eyebrow">
                  {"07 / The 3-Step Setup Flow"}
                </p>
                <h2 data-od-id="element-22">
                  {"From fresh install"}
                  <br />
                  <em>
                    {"to live site in 3 steps."}
                  </em>
                </h2>
              </div>
              <p className="lead">
                {"A familiar workflow."}
                <br />
                {"A distinctly personal result."}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-[var(--gap-lg)] min-[921px]:grid-cols-3">
              <article className="feature card-rule" data-od-id="step-compose">
                <span className="step-num">
                  {"01"}
                </span>
                <h3 data-od-id="element-23">
                  {"Activate Nextora & insert starter patterns."}
                </h3>
                <p>
                  {"Install the theme ZIP in your WordPress dashboard. Jumpstart your pages by choosing from 60+ pre-composed block patterns or starting with a complete pre-built template."}
                </p>
              </article>
              <article className="feature card-rule" data-od-id="step-shape">
                <span className="step-num">
                  {"02"}
                </span>
                <h3 data-od-id="element-24">
                  {"Set your brand via Global Styles."}
                </h3>
                <p>
                  {"Open the WordPress Site Editor. Adjust your brand typography, color palette, button styling, and layout widths in Global Styles—applied instantly across all templates."}
                </p>
              </article>
              <article className="feature card-rule" data-od-id="step-publish">
                <span className="step-num">
                  {"03"}
                </span>
                <h3 data-od-id="element-25">
                  {"Add content & launch with 99+ PageSpeed."}
                </h3>
                <p>
                  {"Edit text and imagery directly on the canvas. Preview across tablet and mobile, then publish with confidence knowing your site passes Google Core Web Vitals with flying colors."}
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="section" id="faqs" data-od-id="faqs">
          <div className="container grid-1-2">
            <div>
              <p className="eyebrow">
                {"08 / Clear Answers for Builders"}
              </p>
              <h2 data-od-id="element-26">
                {"Frequently asked"}
                <br />
                <em>
                  {"questions."}
                </em>
              </h2>
            </div>
            <div>
              <details data-od-id="faq-nextora" open>
                <summary data-od-id="element-27">
                  {"What makes Nextora different from traditional WordPress themes?"}
                </summary>
                <p>
                  {"Nextora is a modern Full Site Editing (FSE) block theme designed for WordPress 6.0+. Unlike traditional themes that rely on rigid PHP templates and complex customizer menus, Nextora allows you to visually edit every template part—headers, footers, single posts, and archives—directly in the native WordPress Site Editor."}
                </p>
              </details>
              <details data-od-id="faq-builder">
                <summary data-od-id="element-28">
                  {"Do I need Elementor, Divi, or another page builder plugin?"}
                </summary>
                <p>
                  {"No third-party page builder is required. Nextora runs 100% on native WordPress Gutenberg blocks. This eliminates heavy plugin bloat, reduces HTTP requests, drastically improves loading speeds, and saves you hundreds of dollars in annual builder subscription fees."}
                </p>
              </details>
              <details data-od-id="faq-commerce">
                <summary data-od-id="element-29">
                  {"How does Nextora handle WooCommerce integration?"}
                </summary>
                <p>
                  {"Nextora includes deeply integrated, WooCommerce-native block templates. Shop archives, product detail pages, mini-cart slideouts, and checkout templates automatically inherit your theme's global typography and color palette for a seamless, high-converting shopping experience."}
                </p>
              </details>
              <details data-od-id="faq-styles">
                <summary data-od-id="element-30">
                  {"Can I customize fonts, colors, and layout widths without code?"}
                </summary>
                <p>
                  {"Yes! Everything is powered by WordPress Global Styles (Styles sidebar in the Site Editor). You can choose font pairings, change color palettes, adjust container widths, and tune block spacing visually with immediate live feedback and zero CSS knowledge."}
                </p>
              </details>
              <details data-od-id="faq-performance">
                <summary data-od-id="faq-summary-performance">
                  {"Will Nextora help my website pass Google Core Web Vitals?"}
                </summary>
                <p>
                  {"Yes. Nextora is engineered for performance: zero jQuery, zero bulky third-party JavaScript frameworks, conditional CSS asset loading, inline SVG icons, and fluid responsive typography. Most sites achieve 95–100 PageSpeed scores right out of the box."}
                </p>
              </details>
              <details data-od-id="faq-clients">
                <summary data-od-id="faq-summary-clients">
                  {"Can I use Nextora for client websites as an agency or freelancer?"}
                </summary>
                <p>
                  {"Absolutely. Nextora is licensed under GPLv2 and designed for client handoffs. Because it uses standard Gutenberg blocks, clients can easily edit their own text and images without breaking complex layouts or calling you for routine updates."}
                </p>
              </details>
              <details data-od-id="faq-content">
                <summary data-od-id="element-31">
                  {"What happens if I change themes or update WordPress in the future?"}
                </summary>
                <p>
                  {"Because Nextora adheres strictly to WordPress core block standards, there is zero vendor lock-in. Your content is stored as clean semantic Gutenberg blocks—not encrypted database records or deprecated shortcodes. Future WordPress updates are fully supported."}
                </p>
              </details>
              <details data-od-id="faq-download">
                <summary data-od-id="element-32">
                  {"Where can I download the Nextora theme package and documentation?"}
                </summary>
                <p>
                  {"Nextora is currently available as a preview release. The production theme ZIP package, demo import files, and comprehensive documentation will be available directly on our download portal."}
                </p>
              </details>
            </div>
          </div>
        </section>
        <section className="section cta" id="download" data-od-id="call-to-action">
          <div className="container hero-center">
            <p className="eyebrow">
              {"JOIN HUNDREDS OF MODERN WORDPRESS BUILDERS"}
            </p>
            <h2 data-od-id="element-33">
              {"Build faster."}
              <br />
              <em>
                {"Ship client sites with confidence."}
              </em>
            </h2>
            <p className="lead" style={{"margin": "24px auto 32px"}}>
              {"A modern Full Site Editing block theme designed for speed, flexibility, and zero bloat."}
              <br />
              {"Experience native WordPress the way it was meant to be."}
            </p>
            <NoticeButton id="download-button" className="btn btn-primary btn-arrow" data-od-id="download-button" title="Get Nextora Theme" body="The Nextora production theme package (ZIP), 60+ block patterns, and documentation are finalizing for release. Early access will open shortly.">Get Nextora Theme</NoticeButton>
            <p className="meta" style={{"marginTop": "20px"}}>
              {"Compatible with WordPress 6.7+ · WooCommerce 9.0+ · GPL Licensed · Theme package coming soon"}
            </p>
          </div>
        </section>
      </main>
      <footer className="pagefoot" data-od-id="footer">
        <div className="container">
          <div className="row-between">
            <a className="logo" href="#home" data-od-id="footer-brand">
              {"nextora"}
            </a>
            <p>
              {"Built natively for Gutenberg."}
              <br />
              {"Ready for what’s next."}
            </p>
            <nav className="row" aria-label="Footer navigation">
              <a href="#discover" data-od-id="element-34">
                {"Overview"}
              </a>
              <a href="#features" data-od-id="footer-features">
                {"Features"}
              </a>
              <a href="#gallery" data-od-id="footer-gallery">
                {"Pre-builts"}
              </a>
              <a href="#showcase" data-od-id="element-35">
                {"Walkthroughs"}
              </a>
              <a href="#faqs" data-od-id="element-36">
                {"FAQs"}
              </a>
            </nav>
          </div>
          <hr className="rule" style={{"margin": "36px 0 24px"}} />
          <div className="row-between">
            <span>
              {"© 2026 Nextora · Native WordPress Block Theme"}
            </span>
            <a href="https://beplusthemes.com" target="_blank" rel="noopener" data-od-id="element-37">
              {"Created by beplusthemes ↗"}
            </a>
            <a href="#home" data-od-id="element-38">
              {"Back to top ↑"}
            </a>
          </div>
        </div>
      </footer>
      <PageMotion />
    </>
  )
}
