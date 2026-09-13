> **Editorial note (merge):** this file previously existed alongside a
> second document, `proposal(NEW2).md`, which described itself as "Part 2"
> — additional, stricter requirements layered on top of everything below,
> never replacing it. The two are now merged into this single file so
> there is one authoritative proposal, not two. Part 2's own content
> follows Part 1 below, under its own heading, unedited in substance.
>
> One part of the original `proposal(NEW2).md` was **not** merged in here:
> its §44, a dated audit of the live deployment (concrete bugs found on
> 2026-09-13 — broken pages, non-functional contact form, untranslated
> content, etc.). That's current status, not a specification, so it lives
> in `NOTES.md` → "Critical audit findings (13 Sep 2026)" instead, where
> outstanding issues belong.

---

# Техническое задание — FORMA.in.th

## 🎯 МИССИЯ
Создать премиум сайт архитектурного бюро проектирования и строительства вилл на Koh Phangan (Таиланд).  
Сайт должен выглядеть как дорогой editorial архитектурный журнал, конвертировать посетителей в лиды,  
собирать органический трафик через SEO/GEO и работать на 4 языках (EN/RU/TH/HE).

## 🏗 ЧТО ДЕЛАЕМ
- Полноценный многостраничный сайт с блочной landing-page структурой
- Telegram и WhatsApp боты для сбора заявок (intake funnel)
- SEO/GEO оптимизация для органического трафика
- 4 языка с отдельными URL, Hebrew RTL
- 13 услуг с отдельными landing страницами
- Premium дизайн: editorial aesthetic, крупные фото, слайдеры

## 🛣 ROADMAP
1. Brand shell + design system
2. Global layout (header/footer/nav)
3. Homepage + service template
4. 13 service pages + projects + about + process + locations
5. Bot integration (Telegram + WhatsApp)
6. SEO/schema/hreflang/sitemap/llms.txt
7. 4 languages (EN/RU/TH/HE)
8. Performance optimization (CWV)
9. QA + тестирование
10. Launch checklist

## ✅ ТЕСТИРОВАНИЕ — ОБЯЗАТЕЛЬНО ДЛЯ ВСЕГО
- **Каждая страница**: title, H1, meta, canonicals, hreflang, schema, alt text
- **Все ссылки**: 0 broken, 0 orphan, передают вес
- **Core Web Vitals**: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- **Адаптивность**: mobile (320-430px), tablet, desktop (1440-1920px)
- **4 языка**: контент полный, Hebrew true RTL, Thai ICU line-breaking
- **Боты**: 13 услуг × 5 локаций × 4 языка — 0 dead ends
- **Формы**: валидация, успех/ошибка, spam protection
- **Доступность**: axe-core 0 critical/serious, keyboard nav, focus visible
- **Lighthouse**: Performance ≥ 90, SEO 100, A11y ≥ 95

---

# Техническое задание — FORMA.in.th
## Архитектурное бюро проектирования и строительства вилл, Koh Phangan

*Источник: Claude Master Brief*

| Section | Requirement | Detailed specification | Acceptance criteria |  |
|---|---|---|---|---|
| 0. ROLE | Act as lead product designer + senior frontend engineer + technical SEO/GEO architect + premium copywriter. | Build the site as a finished premium architecture/design-build product, not a generic template. Make reasonable decisions without repeatedly asking for approval. Never leave lorem ipsum or unfinished placeholder copy. | A complete runnable site exists with coherent design, content structure, SEO, responsive behavior and CMS-ready architecture. |  |
| 1. GOAL | Primary objective | Create a premium architecture, interior design, villa design, construction and project-management studio website for Koh Phangan, Thailand. Position the company above ordinary contractors: architecture + design + build + supervision + project management. | The site immediately communicates premium positioning, Koh Phangan expertise, full-service capability and trust. |  |
| 1. GOAL | Audience | Villa owners, investors, expats, international clients, hospitality operators and developers looking for high-end design/build on Koh Phangan. | Copy and UX answer commercial questions: what, where, why us, process, portfolio, budget/contact. |  |
| 2. POSITIONING | Brand voice | Quiet luxury, architectural, confident, intelligent, tropical, human. Avoid cheap sales language, exaggerated claims, fake awards and generic contractor phrases. | All copy sounds premium and specific; no hype or keyword stuffing. |  |
| 2. POSITIONING | Core proposition | Design and build exceptional spaces on Koh Phangan — architecture, interiors, construction and project management under one roof. | This idea is reflected in hero, About, Services and CTAs. |  |
| 3. MENU | Primary desktop navigation | Home \| Services \| Projects \| About \| Process \| Locations \| Journal \| Contact. Services and Locations use mega/dropdown navigation. | All top-level items visible and usable; active state is clear. |  |
| 3. MENU | Services submenu | Architecture; Villa Design; Interior Design; Construction; Renovation; Project Management; Construction Supervision; Technical Supervision; Landscape Design; Permits & Planning; Turnkey Projects. | Each service has a dedicated SEO-ready page/template. |  |
| 3. MENU | Locations submenu | Koh Phangan; Thong Sala; Haad Rin; Sri Thanu; Chaloklum; Baan Tai; Haad Yao; Haad Salad; other areas as relevant. | Location pages are useful, unique and not doorway-page spam. |  |
| 3. MENU | Header CTA | Primary CTA: “Start a Project”. Secondary contact option: “Contact”. | CTA remains visible on desktop; mobile header has compact CTA/contact action. |  |
| 3. MENU | Mobile menu | Full-screen or large drawer menu with Services and Locations accordions, language selector and Start a Project CTA. | Keyboard/touch accessible; closes predictably; no layout shift. |  |
| 4. HOMEPAGE | Hero H1 | Use a concise premium H1 such as “Architecture & Design-Build on Koh Phangan”. If brand naming changes, adapt naturally. | One H1 only; visible immediately; includes primary commercial intent without stuffing. |  |
| 4. HOMEPAGE | Hero supporting copy | “Architecture, interiors and construction for distinctive villas and spaces in Koh Phangan, Thailand — from concept and planning to completion.” | 2 lines desktop / 3–4 lines mobile maximum; readable over image. |  |
| 4. HOMEPAGE | Hero CTAs | “View Projects” + “Start a Project”. | Both CTAs lead to meaningful destinations. |  |
| 4. HOMEPAGE | Intro section | Explain in 80–140 words who the studio is, what it does and why Koh Phangan expertise matters. | Original copy; no generic AI filler. |  |
| 4. HOMEPAGE | Services section | Show 6–8 priority services with short 1–2 sentence descriptions and links. | Cards are scannable and link to service pages. |  |
| 4. HOMEPAGE | Featured projects | Show 3–6 strongest projects with image, name, type, location and service tags. | Each card links to a dedicated project page. |  |
| 4. HOMEPAGE | Process | Present a 5–7 step process: Discovery → Concept → Design Development → Planning/Permits → Construction → Supervision → Handover. | Process is visually clear and internally linked. |  |
| 4. HOMEPAGE | Why us | Explain local knowledge, integrated workflow, design quality, technical coordination, transparency and project control. Only claims that can be supported. | No invented credentials or fake statistics. |  |
| 4. HOMEPAGE | Locations | Short Koh Phangan service-area block with links to priority locations. | Useful local SEO without repetitive location stuffing. |  |
| 4. HOMEPAGE | Journal | Feature 3 latest/high-value articles. | Articles have unique titles, summaries and links. |  |
| 4. HOMEPAGE | Final CTA | Headline: “Have a project in mind?” Supporting line about discussing land, renovation, villa, interior or full build. CTA: “Start a Project”. | Strong but understated conversion block. |  |
| 5. SERVICES | Service page structure | H1 → 40–60 word direct answer/featured-snippet block → intro → scope → process → deliverables → related projects → FAQ → CTA. | Every core service follows the same high-quality template while retaining unique copy. |  |
| 5. SERVICES | Architecture copy | Explain concept architecture, site response, spatial planning, climate, orientation, materials, technical coordination and design development. | Specific to tropical island conditions; no unsupported legal claims. |  |
| 5. SERVICES | Villa Design copy | Focus on bespoke villas, views, privacy, indoor/outdoor living, natural ventilation, landscape integration and construction practicality. | Commercial intent answered directly. |  |
| 5. SERVICES | Interior Design copy | Cover concept, material palette, lighting, furniture, built-ins, kitchens/bathrooms, styling and coordination. | Clearly differentiated from architecture. |  |
| 5. SERVICES | Construction copy | Explain build delivery, quality control, coordination, schedule, materials, subcontractors and site management. | Do not promise exact timelines/costs without project data. |  |
| 5. SERVICES | Renovation copy | Cover assessment, redesign, upgrades, structural/technical coordination, interiors and phased works. | Suitable for existing villas/hospitality properties. |  |
| 5. SERVICES | Project Management copy | Cover budget coordination, schedule, procurement, contractor/subcontractor coordination, reporting and client communication. | Clear distinction from construction supervision. |  |
| 5. SERVICES | Supervision copy | Cover site inspections, quality checks, design compliance, progress monitoring, snagging and reporting. | No fake certifications. |  |
| 5. SERVICES | Landscape copy | Tropical landscape, pool areas, planting, paths, outdoor living, drainage and integration with architecture. | Architecture/landscape relationship is explicit. |  |
| 5. SERVICES | Permits & Planning | Describe planning/permit coordination carefully; never imply government authority or guaranteed approvals. | Legal wording is cautious and jurisdiction-aware. |  |
| 5. SERVICES | Turnkey Projects | Position as integrated design-to-delivery service. | Clearly connects architecture, interiors, construction and management. |  |
| 6. PROJECTS | Portfolio index | Filters/tags: Architecture, Villa, Interior, Renovation, Construction, Landscape, Hospitality. Include location and project status when useful. | Fast, visual portfolio with SEO-friendly project titles. |  |
| 6. PROJECTS | Project template | Hero image → project facts → concept/story → design → materials → construction → gallery → services → location → CTA. | Every project page can rank independently and remains useful without invented details. |  |
| 7. ABOUT | About page | Tell the studio story, philosophy, local knowledge, multidisciplinary approach and quality principles. | Human, credible and concise. |  |
| 7. ABOUT | Team | Create team/member blocks only when real people/data are supplied. | Never invent names, qualifications, awards or experience. |  |
| 8. PROCESS | Process page | Detailed 6–8 stage workflow from first call/site review to handover and aftercare. | Each stage has purpose, client input, outputs and next step. |  |
| 9. LOCATIONS | Local SEO model | Create only genuinely useful location pages with unique local context, services, access/logistics considerations and relevant projects. | No mass-generated doorway pages. |  |
| 10. JOURNAL | Content clusters | Build clusters around villa design, tropical architecture, construction on Koh Phangan, renovation, materials, permits/planning, sustainability, investment/design considerations. | Articles answer real search questions and link into commercial pages. |  |
| 11. DESIGN | Visual direction | Premium tropical architecture editorial aesthetic: large photography, generous whitespace, refined typography, restrained palette, precise grids, natural textures, subtle motion. | Looks like a high-end architecture studio, not a local contractor directory. |  |
| 11. DESIGN | Color palette | Base: warm off-white/stone; text: near-black/charcoal; accents: muted natural green/olive, sand or bronze used sparingly. Avoid loud gradients/neon. | Contrast passes accessibility and palette remains restrained. |  |
| 11. DESIGN | Typography | Use one refined display serif or architectural editorial face plus a highly legible modern sans. Keep font count low. | Strong hierarchy, excellent Cyrillic/Thai/Hebrew support or language-specific fallback. |  |
| 11. DESIGN | Grid | 12-column desktop grid, 8-column tablet, 4-column mobile; consistent max-width and spacing scale. | No arbitrary margins; alignment feels architectural. |  |
| 11. DESIGN | Photography | Prioritize full-bleed architecture, material closeups, human-scale moments, tropical context, plans/renders when licensed. | Never copy competitor images. Temporary assets must be licensed, generated, owned or explicitly permitted. |  |
| 11. DESIGN | Motion | Subtle reveal, image scale/parallax only where performant; respect prefers-reduced-motion. | Motion enhances hierarchy without slowing interaction. |  |
| 12. RESPONSIVE | Desktop | Design at 1440px and 1920px reference widths; test intermediate widths. | No stretched or empty-looking layouts. |  |
| 12. RESPONSIVE | Mobile | Design mobile-first at 360/390/430px; prioritize typography, image crop, CTA and navigation. | No horizontal scrolling; no tiny text; tap targets >=44px. |  |
| 12. RESPONSIVE | Hebrew RTL | Implement true dir=rtl for Hebrew: navigation, grids, text alignment, icons where directional, forms and spacing must behave naturally. | Hebrew is not a mirrored visual hack; layout remains intentional. |  |
| 13. LANGUAGES | URL structure | Use separate language paths, e.g. /en/, /ru/, /th/, /he/ or equivalent chosen architecture. English is canonical/base language. | Each translated page has stable equivalent URLs and correct hreflang. |  |
| 13. LANGUAGES | Translation quality | Do not machine-translate blindly. Preserve meaning, tone, terminology and search intent per language. | Russian, Thai and Hebrew read natively; metadata also translated. |  |
| 14. SEO | Title/meta | Unique title and meta description for every indexable page. Primary intent near beginning, brand/location naturally included. | No duplicates; sensible lengths; compelling SERP copy. |  |
| 14. SEO | H1/H2 | One H1 per page; H2/H3 structure follows user questions and semantic hierarchy. | No headings used only for styling. |  |
| 14. SEO | Featured snippets | Important commercial/service pages begin with a direct 40–60 word answer to the primary query, followed by expanded explanation. | Answer is self-contained, natural and not duplicated from title/meta. |  |
| 14. SEO | Internal linking | Link service ↔ project ↔ location ↔ journal ↔ process pages contextually. | Important pages reachable within 2–3 clicks where logical. |  |
| 14. SEO | Schema | Use Organization, WebSite, WebPage, Service, BreadcrumbList, Article, ImageObject and LocalBusiness/ProfessionalService only when accurate. FAQPage only where valid and useful. | JSON-LD validates and contains no fake fields. |  |
| 14. SEO | Technical | Canonical, hreflang, sitemap.xml, robots.txt, clean URLs, Open Graph, favicon, 404, redirects and indexation controls. | No accidental noindex/canonical conflicts. |  |
| 15. GEO/AI | AI-citability | Write concise factual blocks answering who, what, where, services, process, project types and expertise. Keep important facts in crawlable HTML. | AI systems can extract accurate answers without relying on JS-only UI. |  |
| 15. GEO/AI | Entity consistency | Brand name, location, services, social profiles and contact details must be consistent site-wide. | One canonical entity identity. |  |
| 15. GEO/AI | Trust/citations | Where factual claims, regulations or technical statements are made, use authoritative sources when appropriate. | No unsupported “best”, “#1”, award or certification claims. |  |
| 16. PERFORMANCE | Core Web Vitals | Optimize LCP, INP and CLS; lazy-load below-fold media; use responsive images and modern formats; minimize JS. | Target excellent Lighthouse/Core Web Vitals on representative mobile and desktop pages. |  |
| 16. PERFORMANCE | Images | Generate srcset/sizes, WebP/AVIF where supported, proper dimensions, lazy loading below fold and priority loading for hero. | No oversized images or layout shift. |  |
| 16. PERFORMANCE | Fonts | Self-host or use a reliable optimized strategy; preload only critical fonts; avoid unnecessary weights. | Fast first render; no excessive font requests. |  |
| 17. ACCESSIBILITY | Accessibility | Semantic HTML, keyboard navigation, visible focus, alt text, contrast, labels, reduced motion, logical heading order. | Core pages usable by keyboard and screen reader. |  |
| 18. CMS | Editable content | Projects, services, journal articles, locations, team, FAQs, SEO fields and navigation should be manageable without code where practical. | Content model is reusable and scalable. |  |
| 19. FORMS | Lead form | Fields: Name, Email/WhatsApp, Project Type, Location, Approximate Scope/Budget (optional), Message, preferred contact method. | Accessible, spam-protected, validation, success/error states and privacy notice. |  |
| 20. FOOTER | Footer | Short positioning statement, navigation, services, locations, contact, social links, language switcher and legal/privacy. | Consistent on every page; no SEO keyword dump. |  |
| 21. SOCIAL | Entity ecosystem | Prepare consistent official links/handles for Instagram, YouTube, TikTok, LinkedIn, Google Business Profile and relevant local directories once accounts exist. | Profiles use matching brand/entity data and link back to site. |  |
| 22. CODE | Engineering quality | Componentized architecture; reusable Header, Footer, Button, Card, Section, Breadcrumbs, FAQ, ProjectCard, ServiceCard, LanguageSwitcher and SEO components. | No duplicated page markup where a template/component is appropriate. |  |
| 22. CODE | No dead ends | All nav links, buttons and forms must work. No placeholder routes, lorem ipsum or fake content. | Automated link check + manual QA pass. |  |
| 23. QA | Browsers/devices | Test latest Chrome, Safari, Firefox; iOS Safari and Android Chrome; desktop and mobile. | No critical visual/functionality regressions. |  |
| 23. QA | SEO launch checklist | Crawl test, sitemap, robots, canonicals, hreflang, titles, descriptions, H1s, broken links, image alts, schema, Open Graph, 404/redirects, analytics/Search Console readiness. | Launch only after P0 issues are zero. |  |
| 24. WORKFLOW | Execution order | 1 Brand shell → 2 design system → 3 global layout → 4 homepage → 5 service template/pages → 6 projects → 7 about/process/locations → 8 journal → 9 languages → 10 SEO/schema → 11 performance/accessibility → 12 QA. | Work incrementally and keep the project runnable after every phase. |  |
| 24. WORKFLOW | Decision rule | When details are missing, choose the most premium, technically sound and SEO-safe option. Do not block progress with unnecessary questions. Flag assumptions in a final NOTES.md. | Claude completes the build and reports assumptions, TODOs and validation results. |  |
| 25. COPY | Do not duplicate competitors | Use competitor sites only for market understanding and information architecture inspiration. Never copy text, images, layouts or distinctive wording. | All copy and visuals are original/licensed. |  |
| 25. COPY | No keyword stuffing | Write for humans first. Use exact search terms only where natural. | Readable copy; semantic coverage through useful content. |  |
| 26. DELIVERABLE | Final output | Production-ready site code + content + reusable templates + SEO metadata + schema + multilingual architecture + README + content inventory + launch checklist. | Another developer can run, understand and deploy the project from README. |  |
| 5. COPYWRITING | Copy quality standard | Every important page must read like premium human-written architecture copy: specific, sensory but restrained, commercially useful, locally relevant, fact-based and free of filler. No generic phrases such as “we turn dreams into reality” unless rewritten into something specific. | Copy passes human editorial review; every section answers a real client question. |  |
| 5. COPYWRITING | Landing-page rhythm | Build pages as conversion-oriented editorial landing pages: hero → direct answer → visual proof → services/scope → benefits → process → portfolio → pricing guidance → FAQ → CTA. Use varied block lengths and strong visual hierarchy. | No page is a wall of text; every major section has a clear purpose. |  |
| 5. COPYWRITING | All-language production | Create complete English master copy first, then professional Russian, Thai and Hebrew versions. Do not machine-translate literally. Preserve meaning, intent, CTA hierarchy, terminology and local naturalness. | No mixed languages, untranslated UI, broken punctuation or placeholder text. |  |
| 5. COPYWRITING | Hebrew RTL | Hebrew pages must use true RTL layout: direction, alignment, breadcrumbs, menus, sliders, forms, icons where directional, spacing and typography. | Hebrew is visually native RTL, not English layout with Hebrew text pasted in. |  |
| 5. COPYWRITING | FAQ depth | Core pages require 6–10 useful FAQs. Questions should reflect real buyer concerns: process, timelines, design scope, permits, construction, supervision, renovation, budget and site conditions. | Answers are direct, 40–120 words where appropriate, unique per page and not duplicated site-wide. |  |
| 5. COPYWRITING | Pricing guidance | Include an “Indicative budget / What affects the cost?” section where exact pricing is unavailable. Never invent fixed prices. Explain variables such as size, terrain, design complexity, materials, site access, renovation condition, specification and scope. | Pricing copy is transparent and useful without making unsupported claims. |  |
| 5. COPYWRITING | CTA microcopy | Use contextual CTAs: Start a Project, Discuss Your Site, Request a Consultation, Explore Projects, Ask About Your Project. Avoid repetitive “Learn More” everywhere. | CTAs match user intent and lead to relevant next steps. |  |
| 6. CONTENT ARCHITECTURE | Keyword mapping | Assign one primary search intent and primary keyword cluster to every indexable page. Secondary terms support the topic naturally. | No two core pages compete for the same primary intent. |  |
| 6. CONTENT ARCHITECTURE | Entity language | Consistently connect brand + architecture + design-build + Koh Phangan + Thailand + services + projects. Use natural entity relationships rather than keyword stuffing. | Search engines and AI systems can clearly identify who the company is, what it does and where. |  |
| 6. CONTENT ARCHITECTURE | Internal links | Every page should have meaningful contextual links to parent service, related services, projects, locations and relevant journal articles. | No orphan core pages; links use descriptive anchor text. |  |
| 7. VISUAL DESIGN | Overall aesthetic | Light premium tropical architecture: warm white/ivory base, stone/sand neutrals, restrained dark typography, subtle natural accents. Editorial architecture-magazine feel rather than real-estate template. | Visual system feels luxurious, calm, contemporary and Koh Phangan-specific. |  |
| 7. VISUAL DESIGN | Hero image slider | Use a large cinematic hero slider with 3–5 high-quality architecture/tropical images. Include subtle transitions, pagination/progress, accessible controls and text overlay with gradient only when necessary. | Slider feels premium and does not hurt LCP or accessibility. |  |
| 7. VISUAL DESIGN | Editorial image blocks | Alternate full-bleed imagery, split image/text, asymmetrical grids, project mosaics, horizontal galleries and restrained cards. Avoid repeating the same 3-card grid in every section. | Each page has visual rhythm and varied composition. |  |
| 7. VISUAL DESIGN | Temporary imagery | Until final photography is supplied, use legally permitted stock/demo/generated images matching tropical architecture, villas, interiors, landscape and construction. Keep image sources replaceable through CMS/assets. Never copy competitor images. | All temporary images can be swapped without changing layout or code. |  |
| 7. VISUAL DESIGN | Image captions | Where useful, add small editorial captions: project type, location, design focus or material. Avoid decorative captions that add no information. | Captions improve context and project credibility. |  |
| 7. VISUAL DESIGN | Motion | Use subtle scroll reveal, image transitions and hover effects. Respect prefers-reduced-motion. No excessive parallax or distracting animation. | Motion enhances premium feel without reducing usability or performance. |  |
| 8. PAGE BLOCKS | Reusable section system | Build reusable blocks: Hero, Direct Answer, Intro, Service Grid, Split Image/Text, Project Slider, Project Mosaic, Process Steps, Feature List, Materials, Budget Guidance, FAQ Accordion, Testimonial/Proof (real only), Location Grid, Journal Cards, CTA Banner, Contact Form. | Blocks are reusable across templates and editable without rewriting layout code. |  |
| 9. PERFORMANCE | Slider performance | Lazy-load non-first images, use responsive srcset/sizes, modern formats, preload only the LCP image, pause offscreen sliders and avoid oversized background images. | Core Web Vitals remain strong on mobile despite visual richness. |  |
| 10. QA | Content QA | Before launch check every page in all four languages for missing copy, broken links, duplicate text, wrong language, awkward translation, heading hierarchy, metadata, schema, alt text and CTA destinations. | Zero known content or language defects in launch checklist. |  |
| GOOGLE WEBMASTER / SEARCH REQUIREMENTS |  |  |  |  |
| Google compliance | Implement clean, crawlable, indexable architecture aligned with current Google Search Essentials and webmaster best practices. Never use deceptive SEO, doorway pages, hidden text, keyword stuffing, cloaking, autogenerated thin pages or manipulative markup. | P0 | Validate with Search Console, Rich Results Test, URL Inspection, Lighthouse/PageSpeed and manual crawl before launch. |  |
| Structured data / Schema | Implement valid JSON-LD where appropriate: Organization, WebSite, WebPage, BreadcrumbList, Service, Article, LocalBusiness/ProfessionalService only when accurate, ImageObject, Person and FAQPage only where eligible/appropriate. Use visible page content as the source of truth. | P0 | No schema errors; no fabricated reviews, ratings, prices, awards or business facts. |  |
| Schema placement | Every indexable HTML page must have its required JSON-LD/schema implementation available in the page source. Keep reusable global entities in the shared layout and page-specific entities in the page template. | P0 | Inspect page source on representative pages in every language. |  |
| FAQ / answer blocks | Place a concise direct-answer / featured-snippet-style block near the top of relevant pages, followed by deeper explanatory content. Do not label it as a guaranteed Google Featured Snippet. | P0 | Each major service/category page has a 40–60 word direct answer targeting the primary intent. |  |
| Footer SEO block | Create a useful, human-readable footer information block with concise brand description, core services, Koh Phangan/location relevance, navigation and contact information. Do not create a keyword-stuffed footer. | P1 | Footer is visible, useful and consistent across languages; links are crawlable. |  |
| Internal linking | Use contextual links between services, projects, locations, process, journal and contact pages. Anchor text must describe the destination naturally. | P0 | No orphan core pages; important pages reachable within a small crawl depth. |  |
| Sitemap / robots | Generate XML sitemap(s) for canonical indexable URLs, language alternates where applicable, and a correct robots.txt. Exclude admin, search, duplicate and non-indexable URLs. | P0 | Sitemap parses correctly and every important canonical URL is discoverable. |  |
| Canonical / hreflang | Every indexable page has a self-referencing canonical and correct hreflang cluster for EN/RU/TH/HE where translations exist. Hebrew uses correct RTL rendering but normal URL conventions. | P0 | No conflicting canonicals; hreflang reciprocal and language/region values are valid. |  |
| Mobile-first implementation | Design and build mobile-first. Desktop must be a deliberate expansion of the mobile layout, not a shrunken desktop page. | P0 | Test common iPhone/Android widths, tablet and desktop; no horizontal overflow. |  |
| Mobile landing pages | Every major landing page keeps its rich block structure on mobile. Reorder content logically, convert grids to stacked cards/carousels, keep CTAs reachable, preserve image quality and hierarchy. | P0 | Mobile pages look premium and complete rather than compressed or stripped-down. |  |
| Mobile navigation | Use a polished mobile menu with clear hierarchy, expandable Services/Locations sections, language switcher and prominent contact CTA. | P0 | Menu opens quickly, traps focus appropriately, closes predictably and is usable one-handed. |  |
| Responsive sliders | Hero/project sliders must use responsive images, touch/swipe gestures, accessible controls, lazy loading below the fold and no layout shift. | P0 | No CLS caused by sliders; swipe and keyboard controls work; reduced-motion preference respected. |  |
| Landing-page richness | Homepage, category/service pages and supporting pages must use multiple purposeful blocks rather than one text column. Blocks should alternate editorial copy, imagery, cards, process, proof, FAQ, pricing guidance and CTAs. | P0 | Each major landing page feels complete, premium and conversion-oriented without filler. |  |
| Page-specific block strategy | Do not copy the exact same block order onto every page. Reuse components but vary composition according to search intent and conversion goal. | P1 | Homepage, service, project, location, about and article templates each have distinct compositions. |  |
| Performance budget | Beautiful visuals must remain performant. Use AVIF/WebP, responsive srcset/sizes, explicit dimensions, preload only critical hero assets, lazy-load below-fold images, minimize JS and avoid heavy animation libraries unless justified. | P0 | Meet strong Core Web Vitals targets in production conditions; no obvious render-blocking bloat. |  |
| Accessibility | Use semantic HTML, heading hierarchy, alt text, keyboard access, visible focus, sufficient contrast, labels, accessible carousel controls and prefers-reduced-motion. | P0 | No critical accessibility failures in automated and manual QA. |  |
| Search Console launch checklist | Before launch: verify domain, inspect representative URLs, submit sitemap, check indexing directives, canonical/hreflang, structured data, mobile usability and Core Web Vitals. | P0 | Launch checklist completed and documented. |  |
| Information Architecture | Do not use Home as the primary visible navigation label. The root URL / is the master Services landing page that explains everything the company does. | P0 |  |  |
| Services Scope | Include Eco Construction and Concrete Construction Turnkey as dedicated services with full landing pages in all four languages. | P0 |  |  |
| Landing Strategy | The root Services page and all core service/category pages must be long-form, premium landing pages composed of multiple distinct useful sections, not thin directory pages. | P0 |  |  |
| NON-NEGOTIABLE PREMIUM + PERFORMANCE | Ultra high-premium website, mobile-first priority, exceptional speed. |  |  |  |
| Visual standard | Editorial, cinematic, restrained architecture aesthetic; never generic contractor, real-estate or SaaS. |  |  |  |
| Mobile standard | Mobile-first is the primary design target; validate 320–430px, iOS Safari and Android Chrome. |  |  |  |
| Performance standard | Exceptional speed; optimize LCP, CLS, INP, images, fonts, JavaScript, CSS and third-party scripts from the beginning. |  |  |  |
| Living background | CSS-only slow atmospheric neutral gradient animation; almost imperceptible; no JS/canvas/WebGL/video; respect prefers-reduced-motion. |  |  |  |
| Hero standard | Only LCP hero image may be critically preloaded; all other imagery responsive and lazy-loaded. |  |  |  |
| 26 | TECHNICAL ARCHITECTURE | Static-first / no CMS | Build the first production version as a static site without installing a CMS, admin panel or database. Claude may choose the most appropriate static-capable stack (plain HTML/CSS/JS, Astro, Vite, or another technically justified approach). Core SEO content must exist in crawlable HTML and the architecture must remain scalable and easy to migrate to a CMS later if needed. | No CMS/admin/database; production build is deployable as static assets; no critical content depends on client-side JS. |
| 27 | TECHNICAL ARCHITECTURE | Framework freedom | Do not force a specific frontend technology. Choose the lightest production-grade architecture that supports reusable components, multilingual pages, static generation, SEO, performance and QA. Avoid unnecessary dependencies. | Architecture decision is documented in README and justified by performance, maintainability and SEO. |
| 28 | COPYWRITING | 10/10 editorial quality | All copy must be exceptionally polished, original, information-dense and human-readable. Use precise vocabulary, varied sentence rhythm, strong semantic coverage and premium architectural/editorial tone. Minimize filler, clichés, stop-phrases and repetitive constructions. Avoid artificial keyword density or forced exact-match repetition. | Human editorial pass finds no generic AI filler, repetitive paragraphs, awkward keyword stuffing or low-value sections. |
| 29 | COPYWRITING | Readability / semantic density | Aim for high information value per sentence while remaining easy to scan. Use short and medium paragraphs, strong subheads, bold emphasis where useful, numbered lists, bullet lists, tables, callouts and visual breaks. Academic/lexical richness must remain natural; do not optimize for a numeric “keyword stuffing” or “academic nausea” score. | Text is sophisticated but accessible; sections are visually scannable and every block has a clear purpose. |
| 30 | COPYWRITING | Featured snippet / Direct Answer | Relevant pages must begin with a concise 40–60 word self-contained answer to the primary query, followed by deeper expert explanation. The block must be factually supportable and written naturally; it is an optimization target, not a guarantee of Google placement. | Every major service/category/location page has an appropriate direct-answer block. |
| 31 | COPYWRITING | FAQ coverage | Every major navigation/service/location page must include a useful FAQ section tailored to that page. Questions must cover real client concerns, scope, process, timing factors, permits, budget, materials, site conditions and next steps where relevant. | 6–10+ unique FAQs on major commercial pages; no copied site-wide FAQ sets. |
| 32 | COPYWRITING | Pricing examples | Where the business can support pricing, include an indicative “Budget / Example costs” section or table with clear qualifiers. Never invent prices. When verified prices are unavailable, explain cost drivers and provide a consultation CTA instead. | Every pricing statement is traceable to verified data or explicitly labeled indicative guidance. |
| 33 | COPYWRITING | Visual copy formatting | Copy should be designed as part of the visual system: elegant spacing, short paragraphs, meaningful lists, tables, pull quotes/callouts where useful, and restrained emoji use only where it improves scanning or brand character. Emojis must never make the site look childish or reduce the luxury positioning. | Long pages are visually beautiful and easy to scan on mobile and desktop. |
| 34 | COPYWRITING | Uniqueness / anti-duplication | Every page must have a distinct primary intent and original copy. Do not spin or lightly rewrite the same paragraphs across services, locations or languages. Use local, technical and project-specific detail to create genuine differentiation. | No material duplicate copy across core pages; each page adds unique information. |
| 35 | CMS | No CMS / no admin in v1 | Do not install or build a CMS/admin panel in the first version. Content is generated and maintained through the source/content files. Keep data structures and components clean so a CMS can be introduced later without rebuilding the frontend. | No CMS package, admin route or database is required to deploy or edit the initial production site. |
| FINAL IMPLEMENTATION ADDITIONS — SEMANTIC SEO + TELEGRAM + WHATSAPP |  |  |  |  |
| SEMANTIC SEO | Use Keyword Map as source of truth. One main search intent per URL; primary keyword + semantic cluster distributed naturally across Title/H1/hero/direct answer/H2/FAQ/body/internal links. |  |  |  |
| 13 SERVICES | Website navigation and bots must expose all 13 services. Grouping in menus is allowed, but no service may disappear. |  |  |  |
| LOCATIONS | Koh Phangan, Koh Samui, Koh Tao, Bali. Location pages need unique local expertise and must not be doorway copies. |  |  |  |
| BOT PURPOSE | Bots are structured project-intake funnels, not generic AI chats. |  |  |  |
| BOT FLOW | Language → Service → Location → Project Type → Description → Budget optional → Timeline optional → Photos/files → Contact → Review/Edit → Submit → Human handoff. |  |  |  |
| WHATSAPP | Implement through official WhatsApp Business/Cloud API or approved provider. |  |  |  |
| TELEGRAM | Implement through official Telegram Bot API. |  |  |  |
| ATTACHMENTS | Allow multiple photos/plans/inspiration/files where supported; validate type/size and provide fallback if upload fails. |  |  |  |
| LEAD DATA | service, location, project type, description, budget, timeline, name/contact, channel, language, attachments, source URL/campaign, timestamp. |  |  |  |
| CONTEXTUAL CTA | Service-page CTA preselects that service in the bot; location page may preselect location. |  |  |  |
| SECURITY | Protect secrets, validate webhooks, rate-limit, sanitize input, validate uploads, avoid sensitive logging. |  |  |  |
| QA | Test every service, location, language, back/edit/restart path, attachment path, submission and human handoff before launch. |  |  |  |

---
## Дополнительная таблица требований (DeepSeek)

| Section | Item | Requirement | Specification | Criteria | Priority |
|---------|------|-------------|---------------|---------|----------|
| **0. MISSION** | Lead product designer | Act as lead product designer | Premium tropical architecture editorial aesthetic; magazine-quality | Site feels like high-end architecture studio within 5 seconds | P0 |
| **0. MISSION** | Senior frontend engineer | Act as senior frontend engineer | Static-first; no CMS; minimal JS; componentized | No critical content depends on JS; deployable as static | P0 |
| **0. MISSION** | Technical SEO / GEO architect | Act as SEO/GEO architect | Google + Yandex + AI search; schema; hreflang; internal linking; local SEO | All P0 SEO checks pass | P0 |
| **0. MISSION** | Premium copywriter | Act as premium architecture copywriter | Specific sensory restrained commercially useful locally relevant fact-based | Passes human editorial review | P0 |
| **0. MISSION** | Conversion strategist | Act as conversion strategist | CTA hierarchy; lead bots; consultative conversion | Every commercial page has clear next step | P0 |
| **0. MISSION** | Truth rule | Never invent facts | No clients; awards; prices; reviews; team; guarantees; locations; credentials; projects | All facts traceable or marked [[VERIFY]] | P0 |
| **0. MISSION** | Missing data protocol | Handle missing facts gracefully | Explain factors not numbers; [[VERIFY: ...]] in source | No gap reads as a gap | P0 |
| **0. MISSION** | Autonomous progress | Do not block on missing details | Choose most premium technically-sound SEO-safe option; flag in NOTES.md | Build completes; assumptions documented | P0 |
| **1. POSITIONING** | Business type | Premium architecture design-build studio | Architecture + interiors + construction + project management under one roof | Positioned above ordinary contractors | P0 |
| **1. POSITIONING** | Primary location | Koh Phangan Thailand | Island expertise; tropical climate; logistics; local regulations context | Local knowledge visible on Home About Locations | P0 |
| **1. POSITIONING** | Core proposition | Design and build exceptional spaces on Koh Phangan — architecture interiors construction a... | Reflected in hero About Services CTAs | Phrase or paraphrase on Home | P0 |
| **1. POSITIONING** | Brand voice | Quiet luxury; architectural; confident; intelligent; tropical; human | No hype; no fake awards; no generic contractor phrases | Copy passes editorial review | P0 |
| **1. POSITIONING** | What we are not | Not an ordinary contractor; not a directory listing; not real-estate template | Premium above commodity | P0 | Subtle differentiation |
| **2. AUDIENCE** | Villa owners | Build/renovate premium villa | Entry via /services/villa-design/ /services/renovation/ | Persona addressed | P0 |
| **2. AUDIENCE** | Investors | Build asset; manage risk | Entry via /services/turnkey-projects/ /services/project-management/ | Persona addressed | P0 |
| **2. AUDIENCE** | Expats | Build home on island | Entry via / | Persona addressed | P0 |
| **2. AUDIENCE** | International clients | Remote project delivery | Entry via /process/ /about/ | Persona addressed | P1 |
| **2. AUDIENCE** | Hospitality operators | Boutique resort / villa rental development | Entry via /services/villa-design/ /services/landscape-design/ | Persona addressed | P1 |
| **2. AUDIENCE** | Developers | Multi-villa / mixed-use | Entry via /services/concrete-construction/ /services/project-management/ | Persona addressed | P1 |
| **3. COMMERCIAL** | Design only | Architecture + interiors only | Defined deliverables | Scope clear | P0 |
| **3. COMMERCIAL** | Design + build | Integrated design-build | Single team; single accountability | Value clear | P0 |
| **3. COMMERCIAL** | Turnkey | Concept to handover | Full package | Clear scope | P0 |
| **3. COMMERCIAL** | Renovation | Existing villa upgrade | Assessment + design + execution | Scope clear | P0 |
| **3. COMMERCIAL** | Supervision only | Independent site supervision | Quality control + reporting | Scope clear | P1 |
| **3. COMMERCIAL** | Project management only | PM without construction | Coordination; schedule; budget | Scope clear | P1 |
| **3. COMMERCIAL** | Eco construction | Sustainable building | Materials; passive cooling; energy; water | Scope clear | P0 |
| **3. COMMERCIAL** | Concrete turnkey | Reinforced concrete design-build | Concept to handover | Scope clear | P0 |
| **3. COMMERCIAL** | Pipeline | Discovery -> Concept -> Design Development -> Permits -> Build -> Supervision -> Handover ... | Reflected in process page and bot payload | Payload supports pipeline | P1 |
| **4. IA** | / = Services landing | Root is master Services landing; label = Services not Home | Comprehensive overview of all services | P0 | P0 |
| **4. IA** | Architecture | /services/architecture/ | Architecture design | Primary intent: architect Koh Phangan | P0 |
| **4. IA** | Villa Design | /services/villa-design/ | Bespoke villa design | Primary intent: villa design Koh Phangan | P0 |
| **4. IA** | Interior Design | /services/interior-design/ | Interior design | Primary intent: interior design Koh Phangan | P0 |
| **4. IA** | Construction | /services/construction/ | Villa/build construction | Primary intent: villa construction Koh Phangan | P0 |
| **4. IA** | Renovation | /services/renovation/ or /services/renovation-remodeling/ | Renovation & transformation | Primary intent: villa renovation Koh Phangan | P0 |
| **4. IA** | Project Management | /services/project-management/ | PM | Primary intent: project management Koh Phangan | P0 |
| **4. IA** | Construction Supervision | /services/construction-supervision/ | Site/construction supervision | Primary intent: construction supervision Koh Phangan | P0 |
| **4. IA** | Technical Supervision | /services/technical-supervision/ | Technical coordination | Primary intent: technical supervision Koh Phangan | P0 |
| **4. IA** | Landscape Design | /services/landscape-design/ | Landscape & outdoor | Primary intent: landscape design Koh Phangan | P0 |
| **4. IA** | Permits & Planning | /services/permits-planning/ or /services/planning-permits/ | Planning/permit support | Primary intent: building permits Koh Phangan | P0 |
| **4. IA** | Turnkey Projects | /services/turnkey-projects/ | Integrated design-build | Primary intent: turnkey villa Koh Phangan | P0 |
| **4. IA** | Eco Construction | /services/eco-construction/ | Sustainable building | Primary intent: eco construction Koh Phangan | P0 |
| **4. IA** | Concrete Construction Turnkey | /services/concrete-construction/ or /services/concrete-construction-turnkey/ | Concrete design-build | Primary intent: concrete construction Koh Phangan | P0 |
| **4. IA** | Projects | /projects/ | Portfolio index | Primary intent: architecture portfolio Koh Phangan | P0 |
| **4. IA** | About | /about/ | Studio story | Primary intent: architecture studio Koh Phangan | P0 |
| **4. IA** | Process | /process/ | How projects work | Primary intent: architecture construction process | P0 |
| **4. IA** | Locations hub | /locations/ | Service area | Primary intent: architecture services Koh Phangan | P0 |
| **4. IA** | Koh Phangan | /locations/koh-phangan/ | Island-wide | Primary intent: architecture Koh Phangan | P0 |
| **4. IA** | Koh Samui | /locations/koh-samui/ | Expansion | Primary intent: architect Koh Samui | P0 |
| **4. IA** | Koh Tao | /locations/koh-tao/ | Expansion | Primary intent: architect Koh Tao | P0 |
| **4. IA** | Bali | /locations/bali/ | Expansion | Primary intent: architect Bali | P0 |
| **4. IA** | Thong Sala | /locations/thong-sala/ | Local | Secondary | P1 |
| **4. IA** | Sri Thanu | /locations/sri-thanu/ | Local | Secondary | P1 |
| **4. IA** | Haad Rin | /locations/haad-rin/ | Local | Secondary | P1 |
| **4. IA** | Chaloklum | /locations/chaloklum/ | Local | Secondary | P1 |
| **4. IA** | Journal | /journal/ | Editorial hub | Primary intent: architecture design knowledge | P1 |
| **4. IA** | Contact | /contact/ | Lead conversion | Primary intent: contact architecture studio | P0 |
| **4. IA** | Eco Construction | /services/eco-construction/ | P0 service | Full SEO landing page + FAQ + CTA + schema | P0 |
| **4. IA** | Concrete Construction Turnkey | /services/concrete-construction/ | P0 service | Full SEO landing page + FAQ + budget guidance + CTA + schema | P0 |
| **4. IA** | Desktop primary | Services · Projects · About · Process · Locations · Journal · Contact | Services and Locations have dropdown/mega-menu | All visible; active state clear | P0 |
| **4. IA** | Services submenu | Architecture; Villa Design; Interior Design; Construction; Renovation; Project Management;... | 13 services exposed | All 13 in nav (grouping allowed but none disappear) | P0 |
| **4. IA** | Locations submenu | Koh Phangan; Thong Sala; Haad Rin; Sri Thanu; Chaloklum; Baan Tai; Haad Yao; Haad Salad |  | P0 |  |
| **4. IA** | Header CTA | Start a Project (primary); Contact (secondary) | Always visible desktop; sticky mobile | Reachable in 1 interaction | P0 |
| **4. IA** | Mobile menu | Full-screen or large drawer; Services and Locations accordions; language selector; Start a... | Keyboard/touch accessible; closes predictably | No layout shift | P0 |
| **4. IA** | Language switcher | EN / RU / TH / HE | Preserves current page | Correct hreflang | P0 |
| **5. DESIGN** | Aesthetic | Premium tropical architecture editorial; large photography; whitespace; refined typography... | Architecture-magazine feel; not real-estate template | Premium within 5 seconds | P0 |
| **5. DESIGN** | Anti-patterns | No contractor look; no real-estate template; no SaaS; no loud gradients; no neon |  | P0 |  |
| **5. DESIGN** | Base | Warm off-white / stone / ivory | #F7F4EF or similar | Not clinical pure white | P0 |
| **5. DESIGN** | Text | Near-black / charcoal | #141210 or similar | Contrast >= 4.5:1 | P0 |
| **5. DESIGN** | Accent 1 | Muted natural green / olive | #5A5F45 or similar | Used sparingly | P0 |
| **5. DESIGN** | Accent 2 | Sand / bronze / terracotta | #B8714A or similar | Used sparingly | P0 |
| **5. DESIGN** | Line | Subtle warm divider | #E5DED4 | P0 |  |
| **5. DESIGN** | Display | Refined architectural display serif (Fraunces GT Sectra Playfair Display) | Large headings | Licensed and web-safe | P0 |
| **5. DESIGN** | Body | Highly legible modern sans (Inter Söhne) | Body and UI | Multilingual support | P0 |
| **5. DESIGN** | Thai fallback | IBM Plex Sans Thai or Noto Sans Thai | Thai pages | P0 |  |
| **5. DESIGN** | Hebrew fallback | Heebo or Assistant | Hebrew pages | P0 |  |
| **5. DESIGN** | Scale | H1 72-96 desktop / 40-48 mobile; H2 48-56 / 32; H3 32 / 24; Body L 20; Body M 17 | Clear hierarchy | P0 |  |
| **5. DESIGN** | Desktop 12-col; tablet 8-col; mobile 4-col | Max content width consistent; generous whitespace | No arbitrary margins | P0 |  |
| **5. DESIGN** | Architectural asymmetry where useful | Intentional composition | P1 |  |  |
| **5. DESIGN** | Button | Primary + secondary + ghost + text-link | Sharp radius (editorial) | Clear states | P0 |
| **5. DESIGN** | Cards | Image-led; minimal borders/shadows; subtle hover |  | P0 |  |
| **5. DESIGN** | Header | Transparent on hero; solid on scroll | Sticky | P0 |  |
| **5. DESIGN** | Footer | 4-col desktop; accordion mobile | Max 30 links | P0 |  |
| **5. DESIGN** | FAQ | Accordion; large tap target; ARIA |  | P0 |  |
| **5. DESIGN** | Slider | Swipe + keyboard + arrows + progress | No CLS | P0 |  |
| **5. DESIGN** | Form | Focus ring visible; labels persistent |  | P0 |  |
| **5. DESIGN** | Breadcrumbs | Inline; schema | Inner pages | P1 |  |
| **5. DESIGN** | Mega-menu | Services and Locations | Columns + featured image |  | P0 |
| **5. DESIGN** | Pull Quote | Editorial emphasis |  | P1 |  |
| **5. DESIGN** | Process Timeline | Numbered stages | Mobile vertical | P0 |  |
| **5. DESIGN** | CTA Banner | Full-bleed or split | High contrast but elegant | P0 |  |
| **5. DESIGN** | Subtle reveal hover transitions | 150-500ms; ease-out | Respect prefers-reduced-motion | P0 |  |
| **5. DESIGN** | Limits | No scroll-jacking; no mobile parallax; max 2 animated per viewport |  | P0 |  |
| **5. DESIGN** | CSS-only atmospheric gradient | Slow translucent warm-neutral gradient 30-60s; almost imperceptible; no JS/canvas/WebGL/vi... | Elegant; no measurable layout shift | P0 |  |
| **5. DESIGN** | Style | Full-bleed architecture; material closeups; human-scale moments; tropical context; plans/r... | Editorial crop; warm neutral grading | P0 |  |
| **5. DESIGN** | Sources | Licensed/owned/generated/permitted only; never competitor images | Replaceable via CMS/assets | All assets licensed | P0 |
| **5. DESIGN** | Captions | Small editorial captions: project type location design focus material | Informative not decorative | P1 |  |
| **5. DESIGN** | Optimization | AVIF/WebP; srcset 5 widths; sizes per breakpoint; explicit width/height; lazy below fold; ... |  | P0 |  |
| **6. BLOCKS** | Hero Slider | Full-width cinematic; H1; 1-2 line value; primary + secondary CTA; slide progress | 3-5 slides; first LCP-optimized | P0 |  |
| **6. BLOCKS** | Direct Answer | 40-60 words answering primary question | Immediately below hero | P0 |  |
| **6. BLOCKS** | Editorial Intro | Strong heading + 80-140 word paragraph + optional image | Magazine typography | P0 |  |
| **6. BLOCKS** | Service Grid | 6-12 services with concise descriptions and links | Prioritize 6-8 on homepage | P0 |  |
| **6. BLOCKS** | Split Image + Text | Large image one side; editorial copy + CTA other | Alternate alignment | P0 |  |
| **6. BLOCKS** | Project Slider | Large project images; name; location; type; short description; View Project | 3-6 projects; drag/swipe + keyboard | P0 |  |
| **6. BLOCKS** | Project Mosaic | Mixed-size cards with strong imagery | Varied aspect ratios | P0 |  |
| **6. BLOCKS** | Process Timeline | 5-7 numbered stages with descriptions | Mobile vertical | P0 |  |
| **6. BLOCKS** | Why Us / Principles | 4-6 principles with evidence or explanation | No generic claims | P0 |  |
| **6. BLOCKS** | Materials / Design Approach | Palette climate response craft lighting landscape indoor/outdoor | Editorial storytelling | P0 |  |
| **6. BLOCKS** | Budget Guidance | Indicative logic + factors + CTA | Never fabricated prices | P0 |  |
| **6. BLOCKS** | FAQ Accordion | 6-10 unique Q + concise A | Unique per page | P0 |  |
| **6. BLOCKS** | Location Block | Context image + service-area text + links | Not doorway | P0 |  |
| **6. BLOCKS** | Journal Cards | 3-6 articles with category title excerpt reading time | Topic clusters | P1 |  |
| **6. BLOCKS** | Trust / Proof | Real testimonials completed projects credentials partners process evidence | Verified only | P0 |  |
| **6. BLOCKS** | Final CTA | Large editorial statement + support + Start a Project | Context-specific headline | P0 |  |
| **6. BLOCKS** | Contact Form | Name; email/phone; project type; location; approximate size; stage; budget range optional;... | Short enough to complete | P0 |  |
| **6. BLOCKS** | Footer | Nav; services; locations; languages; contact; socials; legal; copyright | Consistent across languages | P0 |  |
| **7. TEMPLATES** | Order | Hero + direct answer + intro + services + projects + process + locations + FAQ + final CTA | H1: Architecture & Design-Build on Koh Phangan | All blocks present | P0 |
| **7. TEMPLATES** | Order | Hero + direct answer + scope + process + deliverables + projects + FAQ + CTA | Unique H1/title/meta | P0 |  |
| **7. TEMPLATES** | Order | Hero + facts + concept + scope + services + gallery + outcome + CTA | Unique metadata; breadcrumbs; ImageObject | P0 |  |
| **7. TEMPLATES** | Order | Story + philosophy + expertise + local knowledge + team(real) + proof + CTA | Organization/Person schema only if valid | P0 |  |
| **7. TEMPLATES** | Order | Discovery -> Concept -> Design -> Approvals -> Budget -> Build -> Supervision -> Handover | 7 stages; responsibilities; approvals; communication | P0 |  |
| **7. TEMPLATES** | Order | Local intro + services + projects + process + FAQ + CTA | Unique local value | P0 |  |
| **7. TEMPLATES** | Order | Featured articles + categories + topic clusters | Fast cards | P1 |  |
| **7. TEMPLATES** | Order | Title + direct answer + body + images + author/date + related + CTA | Article schema where valid | P1 |  |
| **7. TEMPLATES** | Order | Contact options + form + location + expectations + CTA | Keyboard-aware form | P0 |  |
| **8. COPY** | English first | Canonical base | RU/TH/HE adapted natively | No literal machine translation | P0 |
| **8. COPY** | One per page | Natural phrasing |  | P0 |  |
| **8. COPY** | Service + location + value proposition naturally |  | P0 |  |  |
| **8. COPY** | Exact only where natural; intent first |  | P0 |  |  |
| **8. COPY** | Cover entities; buyer questions; deliverables; process; outcomes |  | P0 |  |  |
| **8. COPY** | Premium; calm; confident; concise; specific; commercially useful |  | P0 |  |  |
| **8. COPY** | Koh Phangan naturally; local knowledge; island business context; climate; logistics |  | P0 |  |  |
| **8. COPY** | we turn dreams into reality; unparalleled; one-stop solution; take your business to the next level; state-of-the-art; cutting-edge; world-class (unless verified); best in (unless verified); #1 (unless verified) | Enforce in CI | 0 matches | P0 |  |
| **8. COPY** | Explain factors; never invent fixed prices |  | P0 |  |  |
| **8. COPY** | Varied contextual: Start a Project; Discuss Your Site; Request a Consultation; Explore Projects; Ask About Your Project | No repeated Learn More | P0 |  |  |
| **8. COPY** | Brand + architecture + design-build + Koh Phangan + Thailand + services + projects |  | P0 |  |  |
| **8. COPY** | 6-10 useful unique per major page; scope process timing permits budget materials site conditions next steps | 40-120 words per answer | P0 |  |  |
| **8. COPY** | 40-60 words near top of relevant pages | Self-contained | P0 |  |  |
| **8. COPY** | Home 800-1400; Architecture 1000-1800; Villa Design 1000-1800; Interior 1000-1800; Construction 1200-2000; Renovation 1000-1800; PM 900-1600; Supervision 900-1600; Landscape 900-1600; Turnkey 1200-2000; About 900-1500; Process 900-1600; Locations 700-1200; Contact 500-900; Service pages 1500-3000+ when topic supports; Strategic commercial pages 3000-4500 | Never pad for length | P0 |  |  |
| **8. COPY** | All facts traceable or [[VERIFY]] |  | P0 |  |  |
| **9. LANGUAGE** | Canonical / x-default |  | P0 |  |  |
| **9. LANGUAGE** | /ru/ | Native; Yandex-aware; separate RU keyword cluster |  | P0 |  |
| **9. LANGUAGE** | /th/ | ICU line-breaking; Thai fonts; local search behavior |  | P0 |  |
| **9. LANGUAGE** | /he/ | dir=rtl lang=he; true RTL |  | P0 |  |
| **9. LANGUAGE** | Mirror layout where direction matters; text-align start; margin-inline; bdi for numbers/URLs/email/phone; icons directional mirrored; forms aligned start |  | P0 |  |  |
| **9. LANGUAGE** | Reciprocal + x-default |  | P0 |  |  |
| **9. LANGUAGE** | Glossary EN->RU/TH/HE for architecture terms |  | P1 |  |  |
| **10. SEO** | One primary keyword cluster per indexable page |  | P0 |  |  |
| **10. SEO** | Primary near front; brand/location natural; unique |  | P0 |  |  |
| **10. SEO** | Topic + differentiator + local + action; unique |  | P0 |  |  |
| **10. SEO** | Natural human-readable aligned with intent |  | P0 |  |  |
| **10. SEO** | Short stable lowercase hyphenated |  | P0 |  |  |
| **10. SEO** | Self-referencing |  | P0 |  |  |
| **10. SEO** | Canonical indexable only |  | P0 |  |  |
| **10. SEO** | Minimal; sitemap referenced |  | P0 |  |  |
| **10. SEO** | Organization WebSite WebPage BreadcrumbList Service Article ImageObject LocalBusiness/ProfessionalService(only if accurate) Person FAQPage(only where eligible) |  | P0 |  |  |
| **10. SEO** | Parent-child-sibling-project-journal-process |  | P0 |  |  |
| **10. SEO** | No two pages same primary intent |  | P0 |  |  |
| **10. SEO** | Only genuine unique intent | No doorway pages | P0 |  |  |
| **10. SEO** | Describe image; no keyword stuffing |  | P0 |  |  |
| **10. SEO** | Webmaster; region; Metrica goals |  | P0 |  |  |
| **10. SEO** | <= 70 chars |  | P0 |  |  |
| **10. SEO** | 150-200 chars |  | P0 |  |  |
| **10. SEO** | Card for location |  | P1 |  |  |
| **10. SEO** | Consistent NAP + GBP + Wikidata if applicable |  | P1 |  |  |
| **11. GEO** | Publish at /llms.txt |  | P0 |  |  |
| **11. GEO** | Allow GPTBot ClaudeBot PerplexityBot Google-Extended CCBot |  | P0 |  |  |
| **11. GEO** | One page per entity with full definition |  | P0 |  |  |
| **11. GEO** | Visible in HTML not hidden |  | P0 |  |  |
| **11. GEO** | Service timeline included excluded |  | P0 |  |  |
| **11. GEO** | X is ... 40-80 words top |  | P0 |  |  |
| **11. GEO** | Organization + sameAs + knowsAbout + areaServed + serviceType |  | P0 |  |  |
| **11. GEO** | Facts identical across 4 languages |  | P0 |  |  |
| **12. PERF** | p75 mobile |  | P0 |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P1 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P1 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **12. PERF** |  | P0 |  |  |  |
| **13. A11Y** |  | P0 |  |  |  |
| **13. A11Y** |  | P0 |  |  |  |
| **13. A11Y** |  | P0 |  |  |  |
| **13. A11Y** |  | P0 |  |  |  |
| **13. A11Y** |  | P0 |  |  |  |
| **13. A11Y** |  | P0 |  |  |  |
| **13. A11Y** |  | P0 |  |  |  |
| **13. A11Y** |  | P0 |  |  |  |
| **14. TECH** | Static-capable (Astro Vite plain HTML/CSS/JS or justified alt) | Documented in README | Deployable as static; no CMS/admin/database | P0 |  |
| **14. TECH** | SSG/SSR for SEO-critical | Core content in crawlable HTML |  | P0 |  |
| **14. TECH** | No admin; no DB; content in source/data files | Easy to migrate later | P0 |  |  |
| **14. TECH** | Minimal; documented |  | P0 |  |  |
| **14. TECH** | Static hosting CDN clean routes redirects headers caching | No app server required | P0 |  |  |
| **14. TECH** | Structured; CMS-ready |  | P1 |  |  |
| **14. TECH** | Validate sanitize; protect forms; no client secrets |  | P0 |  |  |
| **14. TECH** | Block merge on regression |  | P0 |  |  |
| **15. BOT** | Structured project intake; not generic AI chat |  | P0 |  |  |
| **15. BOT** | Language -> Service -> Location -> Project type -> Description -> Budget(opt) -> Timeline(opt) -> Files -> Contact -> Review/Edit -> Submit -> Handoff |  | P0 |  |  |
| **15. BOT** | 13 services: Architecture; Villa Design; Interior Design; Construction; Renovation & Remodeling; Project Management; Construction Supervision; Technical Supervision; Landscape Design; Planning & Permits; Turnkey Projects; Eco Construction; Concrete Construction | Exact parity with site |  | P0 |  |
| **15. BOT** | Koh Phangan; Koh Samui; Koh Tao; Bali; Other / Not decided | Exact parity | P0 |  |  |
| **15. BOT** | Villa/Residence; Hospitality; Commercial; Renovation; Land/New Build; Other |  | P0 |  |  |
| **15. BOT** | Official Telegram Bot API |  | P0 |  |  |
| **15. BOT** | Official WhatsApp Business/Cloud API or approved provider |  | P0 |  |  |
| **15. BOT** | Multiple photos/plans/screenshots/inspiration/docs; validate type/size; fallback if upload fails |  | P0 |  |  |
| **15. BOT** | timestamp channel language service location project_type description budget timeline name contact attachments source URL campaign | CRM-ready | P1 |  |  |
| **15. BOT** | Service page preselects service; location page may preselect location; preserve UTM |  | P0 |  |  |
| **15. BOT** | Protect secrets; validate webhooks; rate-limit; sanitize; validate uploads; avoid sensitive logging |  | P0 |  |  |
| **15. BOT** | EN/RU/TH/HE localized; Hebrew RTL-safe |  | P0 |  |  |
| **15. BOT** | Available at every stage |  | P0 |  |  |
| **15. BOT** | 13 services x 5 locations x 4 languages + edits/back/restart/attachments/submit/handoff | 0 dead ends | P0 |  |  |
| **16. ANALYTICS** | page_view scroll_75 cta_click form_start form_submit form_error bot_start bot_step bot_attachment bot_submit bot_handoff whatsapp_click telegram_click phone_click email_click language_switch article_read_75 project_view |  | P0 |  |  |
| **16. ANALYTICS** | Goals for form bot_start bot_submit call whatsapp |  | P0 |  |  |
| **16. ANALYTICS** | Verify; inspect; submit sitemap |  | P0 |  |  |
| **16. ANALYTICS** | Verify; submit |  | P1 |  |  |
| **16. ANALYTICS** | 30 keyword rank tracking before launch |  | P1 |  |  |
| **16. ANALYTICS** | Weekly automated Looker Studio |  | P1 |  |  |
| **17. COMPLIANCE** | Accept/Reject/Settings; blocks GA/Meta until consent |  | P0 |  |  |
| **17. COMPLIANCE** | PDPA + GDPR aware |  | P0 |  |  |
| **17. COMPLIANCE** | Consent marketing; legitimate interest analytics with opt-out |  | P0 |  |  |
| **17. COMPLIANCE** | Leads and uploaded files |  | P0 |  |  |
| **17. COMPLIANCE** | Telegram WhatsApp/Meta hosting analytics |  | P0 |  |  |
| **17. COMPLIANCE** | Access/deletion request form |  | P0 |  |  |
| **17. COMPLIANCE** | Auto-delete N days; no public URLs |  | P0 |  |  |
| **17. COMPLIANCE** | Services payment IP responsibility |  | P0 |  |  |
| **17. COMPLIANCE** | Page with contact |  | P1 |  |  |
| **18. EEAT** | /about/authors/[slug]/; Person schema; sameAs |  | P0 |  |  |
| **18. EEAT** | /editorial-policy/ |  | P0 |  |  |
| **18. EEAT** | Team experience location licenses (real) |  | P0 |  |  |
| **18. EEAT** | Address phone email map legal entity |  | P0 |  |  |
| **18. EEAT** | Verified sources only |  | P0 |  |  |
| **18. EEAT** | Real projects with photos dates client (where allowed) |  | P1 |  |  |
| **18. EEAT** | Authoritative sources in Journal >= 2 per article |  | P1 |  |  |
| **18. EEAT** | dateModified in schema and UI |  | P0 |  |  |
| **18. EEAT** | Privacy Terms Cookies PDPA Accessibility |  | P0 |  |  |
| **19. LINKING** | Programmatic build: URLs + types + topics |  | P0 |  |  |
| **19. LINKING** | Parent hub; 2-3 siblings; 2-3 projects; 1 location; 1-2 journal; contact |  | P0 |  |  |
| **19. LINKING** | 2-3 services; 1 location; 2 siblings; contact |  | P0 |  |  |
| **19. LINKING** | 3-5 services; 2-3 projects; contact |  | P0 |  |  |
| **19. LINKING** | 2-3 services; 1-2 projects; 1 location; related journal |  | P0 |  |  |
| **19. LINKING** | 0 orphan commercial |  | P0 |  |  |
| **19. LINKING** | Important pages <= 3 clicks from root |  | P0 |  |  |
| **19. LINKING** | Varied descriptive; not exact-match every time |  | P0 |  |  |
| **19. LINKING** | Max 30 links; no keyword dump |  | P0 |  |  |
| **20. TESTS** | Production build passes |  | P0 |  |  |
| **20. TESTS** | tsc --noEmit |  | P0 |  |  |
| **20. TESTS** | JS/CSS budgets enforced |  | P0 |  |  |
| **20. TESTS** | 0 errors |  | P0 |  |  |
| **20. TESTS** | Exactly 1 per page |  | P0 |  |  |
| **20. TESTS** | No skips |  | P0 |  |  |
| **20. TESTS** | 0 matches |  | P0 |  |  |
| **20. TESTS** | 0 matches |  | P0 |  |  |
| **20. TESTS** | +/-20% of norm |  | P0 |  |  |
| **20. TESTS** | Title H1 meta first paragraph |  | P0 |  |  |
| **20. TESTS** | 40-60 words in top block |  | P0 |  |  |
| **20. TESTS** | 6+ unique commercial |  | P0 |  |  |
| **20. TESTS** | 0 dups |  | P0 |  |  |
| **20. TESTS** | Present non-empty non-stuffed |  | P0 |  |  |
| **20. TESTS** | Self-reference |  | P0 |  |  |
| **20. TESTS** | Reciprocal valid |  | P0 |  |  |
| **20. TESTS** | Canonical indexable only |  | P0 |  |  |
| **20. TESTS** | Valid 0 errors |  | P0 |  |  |
| **20. TESTS** | 0 |  | P0 |  |  |
| **20. TESTS** | 0 broken 0 orphan |  | P0 |  |  |
| **20. TESTS** | <= 3 important |  | P0 |  |  |
| **20. TESTS** | 0 missing all 4 languages |  | P0 |  |  |
| **20. TESTS** | dir=rtl lang=he |  | P0 |  |  |
| **20. TESTS** | No broken headings |  | P0 |  |  |
| **20. TESTS** | 0 blocks |  | P0 |  |  |
| **20. TESTS** | 0 critical/serious |  | P0 |  |  |
| **20. TESTS** | All interactive |  | P0 |  |  |
| **20. TESTS** | All interactive |  | P0 |  |  |
| **20. TESTS** | LCP <= 2.5s INP <= 200ms CLS <= 0.1 Perf >= 90 |  | P0 |  |  |
| **20. TESTS** | Hero <= 250 KB others <= 150 KB |  | P0 |  |  |
| **20. TESTS** | 0 dead links |  | P0 |  |  |
| **20. TESTS** | Validation success error |  | P0 |  |  |
| **20. TESTS** | Open close Escape focus trap |  | P0 |  |  |
| **20. TESTS** | Preserves page |  | P0 |  |  |
| **20. TESTS** | 13 services x 5 locations x 4 languages |  | P0 |  |  |
| **20. TESTS** | Type/size/error |  | P0 |  |  |
| **20. TESTS** | 6 breakpoints x 4 languages |  | P1 |  |  |
| **20. TESTS** | 0 errors all templates |  | P0 |  |  |
| **20. TESTS** | Representative indexed |  | P0 |  |  |
| **20. TESTS** | Footer/contact/schema |  | P0 |  |  |
| **21. CONTENT OPS** | 2 articles/month; topics from clusters |  | P1 |  |  |
| **21. CONTENT OPS** | Review every 6 months; update dateModified |  | P1 |  |  |
| **21. CONTENT OPS** | Monthly report on dropping > 5 |  | P1 |  |  |
| **21. CONTENT OPS** | URL intent keyword word count schema last updated owner |  | P1 |  |  |
| **21. CONTENT OPS** | Quarterly |  | P1 |  |  |
| **21. CONTENT OPS** | No traffic + no links 12 months -> merge/noindex/delete |  | P1 |  |  |
| **21. CONTENT OPS** | Draft -> Fact-check -> Edit -> SEO review -> Publish |  | P1 |  |  |
| **22. QA DOD** | Premium editorial visual system; consistent typography spacing; varied layouts; no template feel |  | P0 |  |  |
| **22. QA DOD** | Complete copy CTA FAQs internal links; no filler; no fabricated claims |  | P0 |  |  |
| **22. QA DOD** | Titles H1 meta canonicals sitemap robots hreflang schema hierarchy verified |  | P0 |  |  |
| **22. QA DOD** | No overflow clipping broken grids unreadable type |  | P0 |  |  |
| **22. QA DOD** | Menus forms links sliders language switcher CTAs work |  | P0 |  |  |
| **22. QA DOD** | LCP INP CLS optimized; media compressed; minimal JS; Lighthouse passed |  | P0 |  |  |
| **22. QA DOD** | Keyboard focus labels headings alt reduced motion verified |  | P0 |  |  |
| **22. QA DOD** | EN/RU/TH/HE complete; Hebrew true RTL; no untranslated fragments |  | P0 |  |  |
| **22. QA DOD** | Re-test shared components after template change |  | P0 |  |  |
| **22. QA DOD** | No P0/P1 defects; production build passes; sitemap/robots/canonicals validated; launch checklist done |  | P0 |  |  |
| **23. DELIVERABLES** | Production-ready static site |  | P0 |  |  |
| **23. DELIVERABLES** | Complete core copy all pages all languages |  | P0 |  |  |
| **23. DELIVERABLES** | Metadata schema internal linking sitemap robots |  | P0 |  |  |
| **23. DELIVERABLES** | README NOTES.md content inventory launch checklist |  | P0 |  |  |
| **23. DELIVERABLES** | Telegram + WhatsApp integrated; documented |  | P0 |  |  |
| **23. DELIVERABLES** | Automated test suite + CI config |  | P0 |  |  |
| **23. DELIVERABLES** | NOTES.md listing all [[VERIFY]] items |  | P0 |  |  |
| **24. ROOT PAGE** | Root = Services landing | Root URL / is master Services landing; label Services not Home | Do not create competing /services/ hub | P0 | Preserve unless explicitly instructed otherwise |
| **25. NAVIGATION** | Services first | Primary visible nav begins with Services |  | P0 |  |
| **26. NEW SERVICES** | First-class service | Full landing page: direct answer + principles + materials + passive design + energy/water ... | No thin page; no greenwashing | P0 |  |
| **26. NEW SERVICES** | First-class service | Full landing page: direct answer + scope + architecture-to-build process + structural/tech... | No invented prices; no fake engineering credentials | P0 |  |
| **27. LOCATIONS** | Koh Samui Koh Tao Bali | Only where genuine service exists | Unique local expertise; no doorway copies | P0 |  |
| **- Сайт должен выглядеть как дорогой editorial/luxury brand** |  |  |  |  |  |
| **- Крупная типографика** | generous whitespace |  |  |  |  |
| **- Cinematic hero с 3-5 кадрами** |  |  |  |  |  |
| **- Reusable компоненты: Hero** | Service Grid | Split Image/Text | Project Slider | Process Timeline | FAQ Accordion |
| **- Mobile-first разработка (360-430px база** |  |  |  |  |  |
| **- LCP ≤ 2.5s** | CLS ≤ 0.1 (Core Web Vitals) |  |  |  |  |
| **- Images: AVIF/WebP** | lazy-load | preload только hero |  |  |  |
| **- Минимум JS** |  |  |  |  |  |
| **- Semantic HTML + JSON-LD schema (Organization** | BreadcrumbList | FAQPage | Article) |  |  |
| **- Internal link graph — все страницы связаны** |  |  |  |  |  |
| **- Security: sanitize input** | validate uploads |  |  |  |  |
| **- EN (канонический / x-default): /** | /projects/... |  |  |  |  |
| **- RU: /ru/** | /ru/projects/... |  |  |  |  |
| **- TH: /th/** | /th/projects/... |  |  |  |  |
| **- HE (RTL): /he/** | /he/projects/... |  |  |  |  |
| **- Каждый язык — полноценная копия контента** |  |  |  |  |  |
| **- Hebrew: true RTL layout (dir=rtl** | forms | icons) |  |  |  |
| **- Thai: ICU line-breaking** |  |  |  |  |  |
| **- Единая структура URL** |  |  |  |  |  |
| **- **Временные изображения**: тематические placeholders (архитектура** | виллы) из лицензированных источников или web.archive |  |  |  |  |
| **- **Hero слайдер**: 3-5 полноэкранных изображений с плавными переходами** | H1 поверх |  |  |  |  |
| **- **Project/Portfolio слайдер**: swipe + keyboard + pagination** |  |  |  |  |  |
| **- **Editorial gallery**: full-bleed** | project mosaics | alternate горизонтальные блоки |  |  |  |
| **- **Все изображения**: AVIF/WebP** | explicit w/h | lazy-load | preload только hero |  |  |

---

## 🧪 ФИНАЛЬНОЕ ТЕСТИРОВАНИЕ — ОБЯЗАТЕЛЬНО

После того как любой элемент сайта готов (страница, блок, компонент, бот, форма) — **он должен быть протестирован**, прежде чем считаться завершённым.

### Что тестировать:

| Что проверяем | Как проверяем |
|---|---|
| **Тексты** | Орфография, грамматика, осмысленность, отсутствие lorem ipsum |
| **Вёрстка** | Ничего не наезжает, нет переполнений, отступы одинаковые |
| **Дизайн** | Соответствует визуальному стилю, цвета/шрифты/иконки согласованы |
| **Мобильная версия** | Все breakpoints (320-430px, 768px, 1440-1920px), нет горизонтального скролла |
| **Ссылки** | 0 битых, все ведут куда надо |
| **Формы** | Валидация, успешная отправка, обработка ошибок |
| **Боты (TG/WhatsApp)** | Все сценарии: выбор услуги → локация → бюджет → контакт = успешная заявка |
| **SEO** | title, H1, meta, canonical, hreflang, schema, alt — всё на месте |
| **Скорость** | LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms |
| **Доступность** | axe-core: 0 critical/serious, клавиатурная навигация |

**Правило:** ни одна страница не считается готовой, пока не прошла все проверки выше.

---

# FORMA.in.th — PROPOSAL PART 2
## PREMIUM AUTHORITY / SEO / GEO / UX / QA / PRODUCTION MASTER SPECIFICATION

> This document is PART 2 of the complete FORMA.in.th website specification.
>
> IMPORTANT:
> - Do NOT replace or delete anything from Part 1 / existing `proposal.md`.
> - Do NOT simplify previous requirements.
> - Do NOT remove pages, services, languages, SEO requirements, schemas, UX requirements, technical requirements, content requirements or QA requirements.
> - Every requirement from Part 1 remains mandatory.
> - Part 2 only ADDS stricter requirements and raises the quality bar.
> - If two requirements overlap, use the more demanding version.
> - The final merged specification must remain production-ready.

---

# 1. MASTER PRINCIPLE

FORMA.in.th must not look like:

- a generic construction company;
- a cheap contractor website;
- a WordPress template;
- an AI-generated architecture website;
- a startup landing page;
- a stock-photo villa website;
- a generic tropical real-estate website.

It must feel like a:

**premium architecture + interior design + construction + project management studio on Koh Phangan.**

The experience should communicate:

- architectural intelligence;
- restraint;
- confidence;
- craftsmanship;
- tropical sensitivity;
- technical competence;
- local knowledge;
- international standards;
- high-value projects;
- trust;
- precision;
- long-term thinking.

The site must feel expensive without using excessive visual decoration.

---

# 2. PREMIUM DESIGN QUALITY GATE

Every page must pass a visual quality review.

Reject:

- excessive gradients;
- generic glassmorphism;
- excessive rounded cards;
- template-looking sections;
- excessive shadows;
- random animations;
- oversized typography without purpose;
- stock-looking imagery;
- generic icon grids;
- repetitive cards;
- visual clutter;
- excessive CTA buttons;
- cheap sales language;
- AI-looking copy;
- unnecessary UI decoration.

Prefer:

- strong typography;
- editorial spacing;
- architectural grids;
- asymmetrical composition where appropriate;
- large imagery;
- controlled whitespace;
- subtle motion;
- precise alignment;
- materiality;
- strong hierarchy;
- restrained interaction;
- sophisticated mobile layouts.

---

# 3. BRAND POSITIONING

FORMA must be positioned around the complete project lifecycle:

Architecture
→ Villa Design
→ Interior Design
→ Landscape
→ Planning / Permits
→ Construction
→ Renovation
→ Project Management
→ Technical Supervision
→ Construction Supervision
→ Turnkey Delivery

The website must make the integrated model obvious.

The visitor should understand that FORMA can coordinate the project from early concept through construction and completion.

Do NOT position the company merely as:

"construction contractor"

or

"architecture studio".

The positioning is:

**integrated architecture, design and build.**

---

# 4. HOMEPAGE AUTHORITY ARCHITECTURE

The homepage must perform four jobs simultaneously:

1. Brand positioning
2. Search visibility
3. AI/GEO discoverability
4. Conversion

Recommended information architecture:

1. Hero
2. Direct-answer positioning block
3. Featured projects
4. Core services
5. Why FORMA
6. Architecture + design + build model
7. Process
8. Local expertise
9. Selected project stories
10. Materials / craftsmanship / technical quality
11. Locations
12. Journal / expertise
13. FAQ
14. Final CTA

The homepage must not become a wall of SEO text.

SEO content must be integrated editorially.

---

# 5. DIRECT ANSWER / AI CITATION LAYER

Important pages must contain a concise factual answer near the top.

Example structure:

"What does FORMA do?"

FORMA is an architecture and design-build studio on Koh Phangan providing architecture, villa design, interior design, construction, renovation, project management and technical supervision for private residences, villas, hospitality projects and developments.

The exact wording must be unique per page.

Requirements:

- 40–80 words where appropriate;
- answer the page's primary search intent immediately;
- factual;
- concise;
- citation-friendly;
- no marketing fluff;
- no keyword stuffing.

---

# 6. GEO / AI SEARCH OPTIMIZATION

FORMA must be structured so that AI systems can understand:

ENTITY:
FORMA

TYPE:
Architecture / Interior Design / Design-Build Studio

LOCATION:
Koh Phangan, Thailand

SERVICES:
Architecture
Villa Design
Interior Design
Construction
Renovation
Project Management
Construction Supervision
Technical Supervision
Landscape Design
Permits & Planning
Turnkey Projects
Eco Construction where applicable
Concrete Construction Turnkey where applicable

AUDIENCE:
Villa owners
Property investors
Expats
International clients
Hospitality operators
Developers

The website should clearly expose relationships between:

FORMA
→ services
→ locations
→ projects
→ team
→ expertise
→ journal
→ contact.

---

# 7. ENTITY CONSISTENCY

Use consistent naming throughout:

FORMA
FORMA.in.th
FORMA architecture / design-build studio
Koh Phangan
Thailand

Do not randomly alternate between:

Forma Studio
Forma Architecture
Forma Design
FORMA Development

unless those names are intentionally defined as separate entities.

The final entity model must be internally consistent.

---

# 8. PROJECTS AS AUTHORITY ASSETS

Projects are not merely portfolio cards.

Every substantial project should become an authority asset.

Project page structure:

1. Project title
2. Location
3. Project type
4. Services
5. Status / year where known
6. Hero image
7. Short factual summary
8. Architectural concept
9. Site context
10. Spatial strategy
11. Materials
12. Construction considerations
13. Technical decisions
14. Challenges
15. Solutions
16. Gallery
17. Related services
18. Related location
19. Related journal articles
20. FAQ where useful
21. CTA

Never invent:

- project budgets;
- completion dates;
- awards;
- certifications;
- technical specifications;
- materials;
- client names;
- performance claims.

Unknown information must remain unknown.

---

# 9. PROJECT SEO

Each indexable project page requires:

- unique title;
- unique meta description;
- canonical;
- Open Graph;
- image metadata;
- descriptive alt text;
- appropriate schema;
- internal links;
- related services;
- related locations;
- related journal content.

Avoid creating hundreds of thin project pages.

Only publish indexable pages with meaningful content.

---

# 10. SERVICE PAGE QUALITY STANDARD

Every important service page must answer:

What is the service?
Who is it for?
What problems does it solve?
What does the scope include?
What does the process look like?
What does FORMA deliver?
What happens next?
What locations are covered?
Which projects demonstrate the service?

Recommended structure:

H1
↓
Direct answer
↓
Introduction
↓
Scope
↓
Approach
↓
Process
↓
Deliverables
↓
Projects
↓
Locations
↓
FAQ
↓
CTA

---

# 11. SEARCH INTENT CONTROL

Every indexable URL must have:

- one primary search intent;
- one primary topic;
- clear supporting topics;
- unique title;
- unique H1;
- unique meta description;
- unique primary content.

Create a URL matrix containing:

URL
Page type
Primary intent
Primary keyword
Secondary keywords
Entity
Location
Search funnel stage
Internal links in
Internal links out
Schema
Canonical
Hreflang
Indexability
Status

---

# 12. CANNIBALIZATION CONTROL

Before launch, audit:

- duplicate intent;
- similar service pages;
- overlapping location pages;
- project/service overlap;
- journal/service overlap;
- language duplication.

Do not create multiple pages targeting essentially the same query.

If two URLs compete for the same intent:

- merge;
- differentiate;
- redirect;
- or clearly redefine intent.

---

# 13. LOCAL AUTHORITY

Koh Phangan expertise must be demonstrated, not simply repeated as a keyword.

Useful local topics include:

- hillside construction;
- tropical climate;
- drainage;
- rain;
- humidity;
- coastal exposure;
- access constraints;
- material logistics;
- site slopes;
- vegetation;
- views;
- privacy;
- ventilation;
- shading;
- tropical architecture;
- construction sequencing;
- local permitting;
- contractor coordination.

Only publish factual claims that can be supported.

---

# 14. LOCATION PAGE STANDARD

Location pages must be genuinely useful.

Examples:

Koh Phangan
Thong Sala
Haad Rin
Baan Tai
Sri Thanu
Chaloklum
Haad Yao
Haad Salad
and other strategically relevant areas.

Each location page must contain unique local information.

Never create:

"Architecture in [location]" pages by replacing only the location name.

No doorway-page SEO.

---

# 15. JOURNAL / KNOWLEDGE SYSTEM

The Journal should establish authority.

Content categories:

Architecture
Villa Design
Interior Design
Construction
Renovation
Materials
Tropical Architecture
Koh Phangan
Project Management
Planning
Technical
Sustainability
Design Process

Articles should answer real client questions.

Examples:

- How to plan a villa project on Koh Phangan
- What makes tropical architecture work in Thailand
- Renovation considerations for island properties
- Architecture vs design-build
- Managing construction remotely
- How to evaluate a villa construction proposal
- Materials for humid tropical environments

Every article should have:

- author;
- publication date;
- updated date where applicable;
- category;
- related services;
- related projects;
- related locations;
- internal links;
- useful factual information.

---

# 16. E-E-A-T / TRUST LAYER

Where factually available, expose:

- team;
- experience;
- completed projects;
- project methodology;
- local presence;
- professional capabilities;
- construction process;
- technical expertise;
- contact information;
- company identity.

Do not fabricate:

- years of experience;
- number of projects;
- awards;
- memberships;
- certifications;
- press coverage;
- client logos.

Trust must come from evidence.

---

# 17. CONTENT QUALITY SCORE

Every major page must be scored 0–100.

Suggested criteria:

20 — Search intent
20 — Information quality
15 — Originality
15 — Local expertise
10 — Conversion usefulness
10 — Internal linking
5 — AI/GEO citability
5 — E-E-A-T / evidence

Minimum launch threshold:

90/100.

Anything below 90 requires revision.

---

# 18. ANTI-AI COPY AUDIT

Review every important page for:

- repetitive sentence structure;
- generic claims;
- meaningless adjectives;
- repeated "seamless";
- repeated "tailored";
- repeated "bespoke";
- repeated "timeless";
- repetitive paragraph patterns;
- generic architecture clichés;
- keyword stuffing.

Copy should sound like an experienced architecture professional.

---

# 19. LUXURY CONVERSION SYSTEM

Primary CTA:

Start a Project

Secondary CTAs:

View Projects
Explore Services
Discuss Your Project

Avoid:

Buy Now
Get a Quote!!!
Cheap
Best Price
Limited Offer
Contact Us Today!!!

The contact journey should feel like a professional project inquiry.

Suggested form:

Name
Email
Phone / WhatsApp / Telegram
Project location
Project type
Estimated scope
Timeline
Message

Optional:

Budget range

Only include budget fields if strategically appropriate.

---

# 20. FORM UX

Forms must include:

- validation;
- accessible labels;
- useful error messages;
- success state;
- loading state;
- spam protection;
- keyboard accessibility;
- mobile usability.

Never lose user-entered data because of validation errors.

---

# 21. MOBILE-FIRST QUALITY

Primary viewport testing:

320px
360px
375px
390px
412px
430px

Test:

- navigation;
- hero;
- typography;
- images;
- cards;
- galleries;
- tables;
- forms;
- accordions;
- sliders;
- sticky elements;
- CTA;
- footer.

No horizontal overflow.

No clipped text.

No broken grids.

No tiny tap targets.

---

# 22. TABLET / DESKTOP

Test at:

768px
1024px
1280px
1440px
1728px
1920px

The design must not simply stretch.

Layouts should intentionally adapt.

---

# 23. IMAGE SYSTEM

Use:

AVIF where appropriate
WebP fallback
responsive srcset
sizes
lazy loading
priority loading for LCP images

Every image must have:

- meaningful filename;
- meaningful alt text where appropriate;
- correct dimensions;
- no unnecessary upscaling.

Do not load massive original images when a smaller responsive asset is sufficient.

---

# 24. PERFORMANCE BUDGET

Target:

LCP < 2.5s
INP < 200ms
CLS < 0.1

Also monitor:

TTFB
JS size
CSS size
image weight
font weight
third-party scripts.

Avoid unnecessary JavaScript.

---

# 25. ACCESSIBILITY

Target WCAG 2.2 AA principles.

Check:

- semantic HTML;
- heading hierarchy;
- keyboard navigation;
- focus states;
- color contrast;
- form labels;
- ARIA only where necessary;
- alt text;
- reduced motion;
- screen-reader usability.

---

# 26. INTERNATIONALIZATION

Languages:

EN
RU
TH
HE

EN is the content master.

Translations must not be literal machine translations.

Each language requires:

- natural language;
- correct terminology;
- local grammar;
- correct metadata;
- correct hreflang;
- correct canonical;
- correct navigation;
- correct CTA.

Hebrew must use genuine RTL layout.

---

# 27. RTL QA

Hebrew must be tested separately.

Check:

- navigation;
- breadcrumbs;
- grids;
- arrows;
- sliders;
- icons;
- alignment;
- forms;
- spacing;
- numbers;
- mixed Latin text;
- URLs;
- phone numbers.

Do not merely apply:

direction: rtl;

and consider the job complete.

---

# 28. SEO TECHNICAL RELEASE GATE

Before launch verify:

robots.txt
sitemap.xml
canonical
hreflang
metadata
H1
schema
Open Graph
Twitter/X metadata
404
redirects
internal links
image alt
indexability
noindex
pagination
structured data
favicon
manifest
HTTP status codes.

Crawl the complete production site.

---

# 29. STRUCTURED DATA

Use appropriate schema types only where factually justified.

Potential types:

Organization
LocalBusiness where appropriate
WebSite
WebPage
Service
BreadcrumbList
Article
Person
ImageObject
FAQPage where eligible
Project / CreativeWork where appropriate

Do not add fake schema properties.

Validate JSON-LD.

---

# 30. INTERNAL LINKING GRAPH

Every important page should have meaningful inbound links.

Create a graph:

Homepage
→ Services
→ Individual Services
→ Projects
→ Locations
→ Journal
→ About
→ Process
→ Contact

Service pages
→ related projects
→ related locations
→ relevant journal articles

Project pages
→ services
→ location
→ related projects
→ journal

Journal
→ service
→ project
→ location

Avoid orphan pages.

---

# 31. FOOTER AUTHORITY

Footer should provide:

FORMA identity
Services
Projects
Locations
About
Process
Journal
Contact
Languages
Social links
Legal pages

Do not overcrowd.

---

# 32. ERROR / EMPTY STATES

Design:

404
form error
form success
loading
empty project list
empty journal
image failure
network failure

These states must feel like part of the product.

---

# 33. ANALYTICS

Define events for:

- project view;
- service view;
- contact CTA;
- form start;
- form submit;
- phone click;
- email click;
- WhatsApp click;
- Telegram click;
- language switch;
- project filter;
- journal article view.

Do not track unnecessary personal data.

---

# 34. QA MATRIX

For every important route record:

URL
Desktop
Mobile
Tablet
EN
RU
TH
HE
RTL
SEO
Schema
Accessibility
Performance
Forms
Links
Images
Status

Status:

PASS
WARN
FAIL

No page may be considered finished without explicit QA status.

---

# 35. BROWSER QA

Test in:

Chrome
Safari
Firefox
Edge

At minimum:

desktop
mobile emulation
real mobile where available.

Check:

console
network
404s
mixed content
font loading
image loading
JS errors
layout shifts
hydration errors
broken interactions.

---

# 36. VISUAL REGRESSION

Important pages should have screenshots captured at fixed viewport sizes.

Compare:

before
after

Check:

- spacing;
- typography;
- image cropping;
- header;
- footer;
- CTA;
- responsive breakpoints;
- RTL.

---

# 37. CONTENT INVENTORY

Create a complete content inventory:

URL
H1
Title
Description
Body
CTA
FAQ
Images
Alt
Schema
Internal links
Language
Status

No page may contain accidental placeholder content.

Reject:

Lorem ipsum
TODO
TBD
Coming soon

unless intentionally visible and approved.

---

# 38. PRODUCTION CONTENT RULE

The final site must contain finished content.

Do not leave:

"we will add projects later"
"content coming soon"
"replace this image"
"insert text here"

If real information is unavailable, use a structurally complete section that does not fabricate facts.

---

# 39. SECURITY / ROBUSTNESS

Check:

- dependency vulnerabilities;
- exposed API keys;
- environment variables;
- form endpoints;
- spam protection;
- unsafe HTML;
- external scripts;
- CSP where appropriate;
- secure links;
- HTTPS.

Never commit secrets.

---

# 40. CODE QUALITY

Components must be:

- reusable;
- readable;
- maintainable;
- typed where appropriate;
- semantically structured.

Avoid:

- duplicated components;
- giant monolithic files;
- magic numbers;
- unnecessary dependencies;
- dead code;
- unused CSS;
- unused assets.

---

# 41. NO DEAD ENDS

Every page must answer:

"What should the visitor do next?"

Possible next actions:

View related project
Explore related service
Read related article
Explore location
Start project

No important page should end without a logical next step.

---

# 42. FINAL RELEASE GATES

The website is NOT DONE until:

[ ] Part 1 requirements preserved
[ ] Part 2 requirements implemented
[ ] All routes reviewed
[ ] All core pages complete
[ ] EN complete
[ ] RU complete
[ ] TH complete
[ ] HE complete
[ ] RTL tested
[ ] Mobile tested
[ ] Tablet tested
[ ] Desktop tested
[ ] SEO checked
[ ] GEO checked
[ ] Schema validated
[ ] Sitemap validated
[ ] Robots validated
[ ] Canonicals validated
[ ] Hreflang validated
[ ] Internal links checked
[ ] No orphan pages
[ ] No cannibalization
[ ] Images optimized
[ ] Core Web Vitals checked
[ ] Accessibility checked
[ ] Forms tested
[ ] Analytics checked
[ ] Console clean
[ ] Network clean
[ ] 404 tested
[ ] Redirects tested
[ ] Visual regression checked
[ ] Content QA passed
[ ] No placeholders
[ ] No fabricated claims
[ ] Premium visual QA passed
[ ] Final human editorial review passed

---

# 43. REQUIRED FINAL DOCUMENTS

The implementation must produce:

proposal.md
proposal-part-2.md
AUDIT.md
IMPLEMENTATION_NOTES.md
CONTENT_QA.md
SEO_GEO_AUDIT.md
INTERNAL_LINKING_MAP.md
URL_INTENT_MAP.md
PROJECT_CONTENT_MATRIX.md
FINAL_QA.md
RELEASE_CHECKLIST.md

---

## 50. ТРИ ВАРИАНТА ДИЗАЙНА ГЛАВНОЙ СТРАНИЦЫ И МЕНЮ

> Создать ТРИ разных варианта главной страницы с ТРЕМЯ разными меню и разными визуальными стилями.
> Варианты — отдельные маршруты: `/v1/`, `/v2/`, `/v3/`.
> После реализации — выбираем лучший, остальные удаляем.

---

### ВАРИАНТ A — Editorial / Архитектурный журнал

**Визуальный стиль:** Editorial fashion — крупная типографика, full-bleed изображения, белое пространство, минимализм.

**Меню (5 пунктов):**
```
FORMA
├── Projects
├── Architecture & Design
├── Construction & Build
├── Koh Phangan
├── Journal
└── [Start a Project]
```

**Главная:** Full-screen editorial hero → Featured Projects 2×2 → 4 service categories → Locations → Journal → CTA

**Тон:** Тихий, архитектурный, журнальный. Минимум текста, максимум фото.

---

### ВАРИАНТ B — Premium Service / Премиум Landing

**Визуальный стиль:** Тёмный режим, параллакс, анимации, золотые/оливковые акценты.

**Меню (4 пункта + mega menu):**
```
FORMA
├── Projects (с выпадающими превью)
├── Services (mega menu 13 услуг с иконками)
├── Locations (4 острова)
├── Journal
└── [Start a Project]
```

**Главная:** Full-screen dark video/parallax → Mega grid 13 услуг → Featured Work → Why FORMA → CTA с формой

**Тон:** Дорогой, уверенный, технический.

---

### ВАРИАНТ C — Local Expert / Гео-ориентированный

**Визуальный стиль:** Светлый, тропический — тёплая палитра, натуральные текстуры (дерево, камень), фото KP.

**Меню (6 пунктов, плоское):**
```
FORMA
├── Villa Design on KP
├── Build Your Villa
├── Interior & Landscape
├── Portfolio — Villas
├── Why Koh Phangan?
├── Blog & Guides
└── [+66 00 000 0000]
```

**Главная:** Тёплое фото виллы + H1 → Эссе про KP → 6 карточек услуг + цены → Карта KP → Featured Project → FAQ → WhatsApp/Telegram

**Тон:** Тёплый, locally grounded, для владельцев участков.

---

### ИНСТРУКЦИЯ
- Все 3 варианта — separate pages: `/v1/`, `/v2/`, `/v3/`
- Каждый — полноценная страница со своим меню, hero, секциями, CTA
- Используют одни и те же контент-файлы
- Различия только в layout, компонентах, стилях
- После выбора → удалить остальные, развивать выбранный


# 45. FINAL PRINCIPLE

Do not optimize FORMA for the appearance of completeness.

Optimize it for actual excellence.

The finished website must be:

beautiful,
fast,
credible,
useful,
searchable,
AI-readable,
locally authoritative,
technically correct,
accessible,
mobile-first,
conversion-ready,
and unmistakably premium.

The objective is not:

"make a nice website."

The objective is:

**build the strongest architecture / design-build digital presence on Koh Phangan, with a foundation capable of ranking organically and being understood and recommended by modern search and AI systems.**
