# Improvements.md — FORMA.in.th

> **ПРИОРИТЕТ №1: ДИЗАЙН.**
> Сайт — в первую очередь дизайн-продукт, а не текстовый блог.
> Визуальный язык: **петроглифы** (высеченные изображения на камне)
> + сакральная геометрия + люкс-палитра + анимация высекания.
> **НЕ** наскальная живопись, **НЕ** иероглифы, **НЕ** руны, **НЕ** клипарт,
> **НЕ** эзотерика. Каждая страница начинается с визуальной идеи (глиф,
> blueprint). Текст подстраивается под дизайн-сетку.
> **Дизайн ведёт, контент подтверждает.**

> **ПРИОРИТЕТ №2: LIVE AUDIT.**
> Сайт уже работает и имеет реальный контент. Прежде чем строить новое —
> **починить сломанное**. Раздел 0.10 содержит 9 конкретных задач из
> последнего аудита живого сайта. `[P0]` — блокеры, чинятся первыми.

> **РЕЖИМ: PRODUCTION-READY.**
> Не заглушки, а готовый продукт. Если данных нет — Claude Code генерирует
> их в премиум-качестве, близко к реальности, и продолжает сборку.
> Блокировка — только для внешних API-ключей (токен бота, платёжка).

> **ОСОБЕННОСТЬ FORMA:**
> Static-first / no CMS. Никакой БД и админки в первом релизе.
> 13 услуг, 11 локаций, 4 языка. Обязательный `NOTES.md`.
> Редакционное примечание: аудит развертывания от 13.09.2026 живёт в
> `NOTES.md`, не здесь. Правки от 18.09.2026 — в разделе 0.10 этого файла.

> **Читать первым:** раздел 22 «Claude Code Instructions».

---

## 0. Статус: что сделано и что нет

Легенда: `[DONE]` / `[PARTIAL]` / `[TODO]` / `[IN PROGRESS]` / `[BLOCKED]`.

### 0.1. Документация
- [DONE] `proposal.md` — объединённое ТЗ (Part 1 + Part 2).
- [DONE] `Improvements.md` — этот файл.
- [DONE] `NOTES.md` — журнал решений, ассумпций и багов.
- [TODO] `README.md` — обзор репозитория (см. задачу 10).
- [TODO] `URL_INTENT_MAP.md` — таблица по каждой странице (см. задачу 3).
- [TODO] `INTERNAL_LINKING_MAP.md` — карта перелинковки (см. задачу 3).
- [TODO] `.env.example` — плейсхолдеры секретов.

### 0.2. Дизайн
- [DONE] Brand shell + design system (Astro).
- [PARTIAL] Luxury blocks (компоненты есть, но не все).
- [TODO] Petroglyph-глифы.
- [TODO] Анимации высекания.
- [TODO] Схема на каждую страницу.
- [TODO] Логотип, favicon.

### 0.3. Контент
- [DONE] 13 услуг (EN) — включая Eco Construction и Concrete Construction
  Turnkey (см. задачу 9 — проверить полноту лендингов).
- [DONE] 11 локаций (EN).
- [DONE] 6 концепт-проектов.
- [PARTIAL] Журнал — 3 статьи из 12 требуемых категорий (см. задачу 7).
- [DONE] About, Process, Contact, Legal.
- [PARTIAL] Переводы RU / TH — полные (по аудиту). HE — частично.
- [TODO] Direct Answer на каждой странице.
- [TODO] Проверка объёмов по таблице Content Depth (см. задачу 6).

### 0.4. Функционал
- [DONE] Header / footer / nav / lang switcher.
- [BROKEN] Форма контакта — Cloudflare Pages Function не работает на
  GitHub Pages (см. задачу 5, P1).
- [DONE] Telegram bot `@formaisland_bot` (запущен через long polling).
- [PARTIAL] WhatsApp bot — webhook требует публичный HTTPS.
- [UNKNOWN] Bot intake funnel (язык → услуга → локация → бюджет → контакт) —
  не подтверждено, что реализован (см. задачу 8, P1).
- [TODO] Price tables — есть в базовом виде, но не на всех страницах.
- [TODO] Process schemas / Work plans — анимированные.
- [TODO] Featured snippets blocks.
- [TODO] Внутренний поиск.

### 0.5. Технический слой
- [DONE] Astro (static-first).
- [DONE] i18n (routing).
- [DONE] JSON-LD (LocalBusiness / ProfessionalService).
- [DONE] `sitemap.xml` + `robots.txt`.
- [DONE] Деплой на GitHub Pages (peaceiris/actions-gh-pages@v4).
- [DONE] Canonical + hreflang (проверено в head).
- [DONE] Хлебные крошки (исправлены).
- [BROKEN] Base path bug — ссылки на проекты ведут на 404 (см. задачу 1, P0).
- [TODO] `llms.txt` + `llms-full.txt`.
- [TODO] OG / Twitter cards.
- [TODO] Аналитика (GA4 + Umami).
- [TODO] CI / CD (стабильность).

### 0.6. Локализация
- [DONE] EN — полный.
- [DONE] RU — полный (не только UI).
- [DONE] TH — полный.
- [PARTIAL] HE — есть, но требует проверки RTL (см. задачу 6).
- [TODO] Вычитка носителями.
- [TODO] hreflang + x-default — проверить полноту.

### 0.7. Производительность и качество
- [TODO] Core Web Vitals (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1).
- [TODO] Lighthouse (Perf ≥ 90, SEO 100, A11y ≥ 95).
- [TODO] axe-core (0 critical / 0 serious).
- [TODO] `prefers-reduced-motion`.
- [TODO] Ручное тестирование (см. задачу 6, P2).

### 0.8. Соответствие Google 2026
- [PARTIAL] Search Essentials — базовая база есть.
- [TODO] Core Web Vitals (пороги 2026).
- [PARTIAL] Структурированные данные.
- [TODO] E-E-A-T.
- [TODO] Helpful Content.
- [PARTIAL] Mobile-first — проверить breakpoints.
- [TODO] HTTPS + HSTS.
- [TODO] Доступность (accessibility tree).

### 0.9. Блокеры
- [BLOCKED] Токен Telegram-бота — только локально в `.env`.
- [BLOCKED] WhatsApp webhook — нужен публичный HTTPS URL.
- [BLOCKED] 3 из 13 услуг не названы (уточнить у владельца).
- [BLOCKED] Реальные проекты и фото (сейчас концепт-стадии).
- [BLOCKED] Юридические данные (PUBLIC_LEGAL_*).
- [BLOCKED] Аналитика (GA4_ID, UMAMI_ID).

---

## 0.10. LIVE AUDIT FINDINGS (18.09.2026)

> Результаты проверки живого сайта
> `https://drandromeda.github.io/FORMA.in.th/` против `proposal.md`.
> **Claude Code: эти задачи в приоритете над всем, что ниже.**
> Сначала `[P0]`, потом `[P1]`, потом `[P2]`.

### ЗАДАЧА 1 — `[P0]` `[BLOCKER]` Base path bug: все ссылки на проекты ведут на 404

**Что не так:** на главной странице всех языковых версий (EN/RU/TH/HE)
карточки в блоке "Selected work" ведут на неправильный URL:
- EN: `drandromeda.github.io/projects/ridge-house-sri-thanu/`
  (должно быть `.../FORMA.in.th/projects/ridge-house-sri-thanu/`)
- RU: `drandromeda.github.io/ru/projects/...`
  (должно быть `.../FORMA.in.th/ru/projects/...`)
- TH: аналогично, потерян сегмент `/FORMA.in.th/`
- HE: проверить.

Переход по такой ссылке → 404.

**Что сделать:**
1. Найти компонент генерации project-карточек (`ProjectCard` / `ProjectGrid`).
2. Найти, где формируется href — скорее всего относительный путь без учёта
   `base: '/FORMA.in.th/'` из конфига, либо захардкожен без префикса.
3. Исправить так, чтобы href всегда шёл через helper, учитывающий base path
   и текущую локаль. Свериться с подходом в CreativeLAB.in.th — там баг
   не воспроизводится.
4. Проверить **все** места с project-карточками: главную, блок
   "Related Projects" на страницах услуг (`/services/architecture/` показывала
   1 related project — проверить его ссылку).
5. Проверить все 4 языка × все breakpoints.
6. После фикса — прогнать полный краулинг (`linkinator` или аналог) на
   предмет других 404.

**Приёмка:**
- [ ] Ни одна project-ссылка не ведёт на 404.
- [ ] Краулинг показал 0 битых ссылок.
- [ ] Проверено на 4 языках.
- [ ] Проверено на mobile / tablet / desktop.

---

### ЗАДАЧА 2 — `[WONTFIX]` Отдельная страница `/services/` НЕ нужна

**Статус:** закрыто как **не-баг**.

**Обоснование:** реальное ТЗ требует:
> "Do not use Home as the primary visible navigation label. The root URL `/`
> is the master Services landing page that explains everything the company does."

То, что пункт меню "Services" и "View all services →" ведут на `/` — это
**правильное поведение по спеке**, а не баг.

**Что реально нужно проверить:** главная должна быть **развёрнутой**
(не thin directory page). По структуре из 14 блоков она уже развёрнутая —
пункт закрыт. Отметить в `NOTES.md`.

---

### ЗАДАЧА 3 — `[P1]` Создать служебные файлы: URL_INTENT_MAP.md + INTERNAL_LINKING_MAP.md

**Что в ТЗ:** §43 требует пакет документов для контроля качества.

**Что сделать минимум два самых полезных:**

1. **`URL_INTENT_MAP.md`** — таблица по каждой из ~44 страниц (EN) с
   колонками:
   URL / Page type / Primary intent / Primary keyword / Secondary keywords /
   Entity / Location / Internal links in/out / Schema / Canonical / Hreflang /
   Indexability / Status.

2. **`INTERNAL_LINKING_MAP.md`** — с явным разведением пересекающихся по
   смыслу услуг:
   - **Construction** vs **Construction Supervision** vs
     **Technical Supervision**.
   - Прописать: какой primary keyword / intent у каждой из трёх.
   - Куда они перелинкованы друг на друга, чтобы не конкурировать в поиске.

**Остальные файлы из §43** (`AUDIT.md`, `CONTENT_QA.md`, `SEO_GEO_AUDIT.md`,
`PROJECT_CONTENT_MATRIX.md`, `FINAL_QA.md`, `RELEASE_CHECKLIST.md`) —
по желанию, не блокер.

**Приёмка:**
- [ ] Оба файла созданы в корне.
- [ ] Все ~44 страницы покрыты.
- [ ] Разведение intent для Construction/Supervision зафиксировано.

---

### ЗАДАЧА 4 — `[P1]` Anti-AI copy pass

**Что не так:** в текстах встречается слово **"bespoke"** (например "Bespoke
villas planned around view, breeze and privacy"). ТЗ §18 прямо просит
избегать штампов: **bespoke / seamless / tailored / timeless** — они выдают
AI-генерацию.

**Что сделать:**
1. Пройтись по всем 13 страницам услуг (EN).
2. Заменить / убрать штампованные слова, сохранив смысл.
3. Синхронизировать переводы RU / TH / HE.
4. Проверить остальной список клише из §18:
   - repetitive sentence structure,
   - generic claims,
   - generic architecture clichés ("we bring your vision to life",
     "we make brands unforgettable", "unparalleled", "one-stop solution").

**Приёмка:**
- [ ] Слово "bespoke" отсутствует на сайте.
- [ ] Слова "seamless / tailored / timeless" — отсутствуют или оправданы.
- [ ] Проверено на EN/RU/TH/HE.
- [ ] Отчёт в `NOTES.md`: список замен.

---

### ЗАДАЧА 5 — `[P1]` Починить форму контактов

**Контекст:** аудит 13.09 показал, что форма зависит от Cloudflare Pages
Function, которая не работает на GitHub Pages.

**Что сделать:**
1. Проверить `/contact/` — реально ли форма отправляет данные (тестовая
   отправка).
2. Если нет — подключить внешний сервис форм: **Formspree / Getform / webhook
   на свой backend**.
3. Убедиться, что есть:
   - валидация полей,
   - доступные лейблы (a11y),
   - понятные ошибки,
   - success / loading state,
   - спам-защита (honeypot / reCAPTCHA),
   - данные пользователя не теряются при ошибке валидации.

**Приёмка:**
- [ ] Тестовая заявка доходит до получателя.
- [ ] Валидация работает.
- [ ] a11y — labels, ошибки читаемы скринридером.
- [ ] Спам-защита на месте.
- [ ] Данные не теряются.

---

### ЗАДАЧА 6 — `[P2]` Ручное тестирование

Прогнать и зафиксировать результат по каждому пункту:

1. Мобильное бургер-меню — реальное устройство / эмулятор.
2. Dropdown-меню (Services, Locations) на touch-устройствах.
3. HE-версия — отображение и работа RTL.
4. Breakpoints: 320 / 360 / 375 / 390 / 412 / 430 / 768 / 1024 / 1280 /
   1440 / 1728 / 1920 — нет горизонтального скролла, нет обрезанного текста.
5. Lighthouse: Performance ≥ 90, SEO 100, A11y ≥ 95.
6. axe-core: 0 critical / 0 serious.
7. Keyboard navigation: Tab через всё меню, focus visible, skip-to-content.

**Приёмка:**
- [ ] Отчёт в `NOTES.md` с скриншотами и метриками.
- [ ] Все проблемы заведены как отдельные задачи.

---

### ЗАДАЧА 7 — `[P2]` Расширить Journal

**Что не так:** сейчас 3 статьи, покрывают 2–3 темы из 12 категорий,
заданных в ТЗ:
Architecture, Villa Design, Interior Design, Construction, Renovation,
Materials, Tropical Architecture, Koh Phangan, Project Management, Planning,
Technical, Sustainability, Design Process.

**Что сделать:** добавить статьи, закрывающие оставшиеся темы, по той же
схеме: author, date, category, related services / projects / locations,
internal links.

**Приёмка:**
- [ ] Минимум 1 статья на каждую из 12 категорий.
- [ ] Все статьи с корректной схемой и перелинковкой.

---

### ЗАДАЧА 8 — `[P1]` Проверить Telegram / WhatsApp бота (intake funnel)

**Что в ТЗ:** боты — отдельный обязательный этап roadmap (шаг 5 из 10) как
воронка сбора заявок. Требование: "**13 услуг × 5 локаций × 4 языка —
0 dead ends**".

**Что не так:** сейчас на сайте есть только прямые ссылки WhatsApp / Telegram
в футере (`wa.me/...`, `t.me/formaisland_bot`). Непонятно, реализован ли
у бота сценарий intake funnel (язык → услуга → локация → контакт) или это
просто ссылки на чат.

**Что сделать:**
1. Уточнить у бота `@formaisland_bot` — есть ли эта логика.
2. Если нет — это отдельный крупный этап, не просто контент-правка.
3. Реализовать по разделу 13 этого файла.

**Приёмка:**
- [ ] Подтверждено наличие / отсутствие funnel.
- [ ] Если funnel нет — заведена отдельная задача.
- [ ] Тест: 13 услуг × 5 локаций × 4 языка = 0 dead ends.

---

### ЗАДАЧА 9 — `[P0]` Проверить Eco Construction и Concrete Construction Turnkey

**Что в ТЗ:** прямо указано как обязательный пункт (P0):
> "Include Eco Construction and Concrete Construction Turnkey as dedicated
> services with full landing pages in all four languages."

**Статус:** обе услуги присутствуют в меню на EN/RU/TH (подтверждено).

**Что проверить:**
1. Есть ли полноценная landing-структура как у `/services/architecture/`:
   - Direct Answer,
   - Scope,
   - Process,
   - Deliverables,
   - Pricing,
   - FAQ,
   - Related.
2. Переведены ли на все 4 языка, включая HE.

**Приёмка:**
- [ ] Обе услуги имеют полный landing-шаблон.
- [ ] Переведены на 4 языка.
- [ ] Есть в `sitemap.xml`.
- [ ] Есть в навигации на 4 языках.

---

### ЗАДАЧА 10 — `[P0]` Static-first, без CMS — подтвердить и задокументировать

**Что в ТЗ:** первая продакшн-версия должна быть статическим сайтом без
CMS / admin / БД. Стек любой статический (Astro, Vite и т.п.), но SEO-контент
обязан быть в **crawlable HTML**, не зависеть от client-side JS. Архитектурное
решение должно быть задокументировано в README.

**Что сделать:**
1. Проверить, что README объясняет выбор стека.
2. Проверить, что ключевой SEO-контент (особенно §5 "Direct Answer" блоки)
   присутствует в исходном HTML, а не подгружается JS.

**Приёмка:**
- [ ] README описывает стек и почему static-first.
- [ ] Direct Answer-блоки видны в View Source.
- [ ] Нет зависимости SEO-контента от JS.

---

### Что уже сделано (не трогать)

Подтверждено аудитом:
- [DONE] Позиционирование бренда, единое написание "FORMA".
- [DONE] Структура и наполнение `/services/architecture/` — эталон.
- [DONE] Хлебные крошки — исправлены.
- [DONE] Таблицы цен — с диапазонами и дисклеймером.
- [DONE] Реальные контакты (email / WhatsApp / Telegram) вместо заглушек.
- [DONE] RU и TH переводы — полные.
- [DONE] Canonical / hreflang в head.

---

## 1. Миссия, позиционирование, цели

- Премиум-сайт архитектурного бюро проектирования и строительства вилл
  на Koh Phangan (Таиланд).
- Уровень: дорогой editorial архитектурный журнал.
- Позиционирование выше обычных подрядчиков: полный цикл — архитектура,
  дизайн, строительство, надзор.
- Тон: экспертный, спокойный, архитектурный.
- Цели: лиды, органический трафик, цитируемость в AI.

### 1.1. Метрики
- Лиды: ≥ 15 в месяц.
- Органический трафик: рост +15% месяц к месяцу.
- Featured snippets: ≥ 20 запросов.
- Цитируемость в AI: ≥ 10 запросов/месяц.
- Core Web Vitals: зелёные.
- Lighthouse: Perf ≥ 90, SEO 100, A11y ≥ 95.

---

## 2. Манифест дизайна (читать до всего остального)

### 2.1. Приоритет
Этот проект — **в первую очередь дизайн-продукт**, а не текстовый блог.
Дизайн, визуальный язык, анимация и петроглифическая графика — **первичны**.
Контент — **вторичен по форме**, но обязателен по качеству (раздел 7).
**Для FORMA — сдержаннее, чем для CreativeLAB:** архитектурный журнал,
а не креативное агентство.

### 2.2. Формула визуального языка
```
Петроглиф (высеченная линия на камне)
+ Сакральная геометрия (пропорции, планы, разрезы, солнечные пути)
+ Люкс-палитра (охра, уголь, кость, песок, известняк, медь)
+ Анимация высекания (scroll-driven SVG)
+ Лёгкое зерно (film grain)
= Дорогой editorial архитектурный дизайн
```

### 2.3. Терминология
- **Петроглифы** (petroglyphs) — выбитые / процарапанные / высеченные
  изображения на камне. **Основной визуальный язык проекта.**
- **НЕ** наскальная живопись (cave painting).
- **НЕ** иероглифы, **НЕ** руны, **НЕ** клипарт, **НЕ** эзотерика.
- **Сакральная геометрия** — golden ratio, Vesica Piscis, Flower of Life,
  Metatron’s Cube, платоновы тела — как система пропорций и планов.
- **Чашечные углубления**, **спирали**, **лабиринты**, **сетки**,
  **отпечатки рук**, **звёздные карты** — допустимые мотивы.
- **Геоглифы** (Наска) — как вдохновение для крупных схем.

### 2.4. Специфика FORMA
- Сильнее акцент на **геометрии пропорций** (планы, разрезы, солнечные пути,
  стратиграфия), слабее — на антропоморфных силуэтах.
- Сдержанность: линии на полях, едва заметная текстура камня.
- Роскошь = сдержанность + точность.

### 2.5. Что это значит на практике
- `MUST` — каждая страница начинается с визуальной идеи (глиф, схема,
  blueprint), а не с текста.
- `MUST` — текст подстраивается под дизайн-сетку.
- `MUST` — визуальный язык единый на всех страницах и языках.
- `MUST` — анимация — часть дизайна.
- `MUST NOT` — дизайн не жертвуется ради текста.
- `MUST NOT` — текст не жертвуется ради анимации.
- Баланс: **дизайн ведёт, контент подтверждает**.

---

## 3. Реальные данные проекта

### 3.1. Контакты (реальные, с сайта)
| Ключ | Значение | Источник |
|---|---|---|
| `PHONE_MAIN` | `+66 80 870 5704` | Реальный с сайта |
| `WHATSAPP` | `https://wa.me/66808705704` | Реальный с сайта |
| `TELEGRAM_BOT` | `@formaisland_bot` | Реальный с сайта |
| `EMAIL_GENERAL` | `info@forma.in.th` | Реальный с сайта |
| `ADDRESS` | `Koh Phangan, Surat Thani, Thailand` | Реальный с сайта |
| `COUNTRY` | `Thailand` | Реальный |
| `TIMEZONE` | `Asia/Bangkok` | Реальный |
| `LANG_DEFAULT` | `en` | Реальный |

### 3.2. Контакты (генерировать в премиум-качестве)
Claude Code **генерирует** недостающие контакты по шаблону, близко к
реальности. Не оставлять пустых полей.

| Ключ | Сгенерированное значение |
|---|---|
| `EMAIL_LEADS` | `leads@forma.in.th` |
| `EMAIL_PRESS` | `press@forma.in.th` |
| `TELEGRAM` | `@formaisland` |
| `INSTAGRAM` | `https://instagram.com/forma.in.th` |
| `FACEBOOK` | `https://facebook.com/forma.in.th` |
| `YOUTUBE` | `https://youtube.com/@forma.in.th` |
| `LINKEDIN` | `https://linkedin.com/company/forma.in.th` |
| `PINTEREST` | `https://pinterest.com/forma.in.th` |
| `HOUZZ` | `https://houzz.com/forma.in.th` |
| `GOOGLE_MAPS_URL` | `https://maps.google.com/?q=Koh+Phangan+Thailand` |
| `GEO_LAT` | `9.7319` |
| `GEO_LNG` | `100.0135` |
| `HOURS` | `Mon–Fri 09:00–18:00 ICT` |
| `LEGAL_NAME` | `FORMA Co., Ltd.` |
| `JURISDICTION` | `Thailand` |
| `TAX_ID` | `0-0000-00000-00-0` |

### 3.3. Боты (генерировать конфигурацию)
- Telegram: `@formaisland_bot`.
- WhatsApp: `+66 80 870 5704` (webhook требует публичный HTTPS).
- Токены — в `.env` / GitHub Secrets.
- Claude Code пишет рабочий код с чтением из `process.env`.
- При отсутствии токена — код готов, токен подставляет владелец.

### 3.4. Правила генерации
- `MUST` — если данных нет, **генерировать** по шаблону выше.
- `MUST` — генерировать красиво, дорого, близко к реальности.
- `MUST NOT` — оставлять `XXX`, `<...>`, `TODO` в UI.
- `MUST NOT` — блокировать задачу из-за отсутствия email / телефона.
- `MUST` — `[BLOCKED]` только для внешних API-ключей.
- `MUST` — помечать сгенерированное в коде комментарием `<!-- GEN -->`.

---

## 4. Дизайн-система

### 4.1. Палитра
```
--color-ochre:        #B8860B;
--color-charcoal:     #1C1C1C;
--color-bone:         #F5F1E8;
--color-sand:         #D9C9A8;
--color-limestone:    #E8E1D0;
--color-graphite:     #3A3A3A;
--color-copper:       #A97142;
--color-copper-muted: #8C5E32;
--color-text:         #1C1C1C;
--color-text-invert:  #F5F1E8;
--color-bg:           #F5F1E8;
--color-bg-dark:      #1C1C1C;
--color-accent:       #A97142;
```
**Специфика FORMA:** преобладание светлых нейтральных тонов (bone, limestone,
sand), акцент — приглушённая медь. Меньше контраста, чем в CreativeLAB.

### 4.2. Типографика
- Контент: современный гротеск / антиква с архитектурной оптикой.
- Чертежи, схемы, цены: моноширинный / технический.
- Variable fonts.
- `font-display: swap`, subsetting, preload.
- Модульная шкала: 1.125 или 1.2.
- Интерлиньяж: 1.5–1.7 для текста, 1.05–1.15 для заголовков.
- Ширина строки: 60–75 символов.
- Шрифты по умолчанию: Inter / Fraunces / JetBrains Mono (или аналоги).

### 4.3. Сетка и пробелы
- Базовая сетка: 8px.
- Контейнеры: 1200 / 1440 / 1920px + fluid.
- Отступы: `--space-1..--space-24`.
- Радиусы: `--radius-sm/md/lg/full`.
- Тени: минимальные.

### 4.4. Текстуры
- Камень, известняк, штукатурка, бумага, зерно, высеченная линия.
- Film grain: 3–5% opacity.

### 4.5. Компоненты
- Кнопки (primary / secondary / ghost / link / icon).
- Инпуты (text / email / phone / textarea / select / file / checkbox / radio).
- Карточки, бейджи, breadcrumbs, пагинация, аккордеоны, табы, модалки,
  тултипы, уведомления.
- Header, footer, mobile menu, lang switcher, CTA.
- Все состояния: default / hover / focus-visible / active / disabled /
  error / success / loading / empty.

### 4.6. Доступность дизайна
- Контраст WCAG AA минимум.
- Видимый фокус, не удалять outline.
- Тач-зоны ≥ 44×44px.
- `prefers-reduced-motion`.
- `prefers-color-scheme` (опционально).

---

## 5. Библиотека блоков (luxury blocks)

`MUST` — каждая страница собирается из переиспользуемых блоков.
`MUST NOT` — ad-hoc вёрстка.

| Блок | Назначение |
|---|---|
| `HeroPetroglyph` | Герой с анимированным глифом |
| `DirectAnswer` | Ответ 50–80 слов |
| `PillarIntro` | Вводный блок |
| `ServiceGrid` | Сетка 13 услуг |
| `ServiceCard` | Карточка услуги |
| `ProjectSpotlight` | Проект с крупным изображением |
| `ProjectGrid` | Сетка проектов |
| `PriceTable` | Таблица цен |
| `ProcessSchema` | Анимированная схема процесса |
| `WorkPlan` | Анимированный план работ |
| `Blueprint` | Чертёж с проявлением линий |
| `StrataDiagram` | Слои (виллы) |
| `Timeline` | Высеченная линия времени |
| `FAQBlock` | FAQ с JSON-LD |
| `FeaturedSnippetBlock` | Под snippet |
| `Comparison` | Сравнение пакетов |
| `Testimonial` | Отзыв |
| `LogoWall` | Логотипы клиентов |
| `Stats` | Числа / факты |
| `CTA` | Финальный призыв |
| `JournalTeaser` | Тизер журнала |
| `ContactRitual` | Блок связи с глифом |
| `LocationMap` | Карта с петроглифическими метками |
| `LegalSimple` | Юридический блок |
| `Newsletter` | Подписка |
| `Breadcrumbs` | Хлебные крошки |
| `LanguageSwitcher` | Переключатель языков |
| `SearchBar` | Внутренний поиск |

Требования к каждому блоку:
- Состояния (default / hover / focus / active / disabled / loading / error / empty).
- RTL-версия.
- Адаптив (mobile / tablet / desktop / wide).
- Работа без JS.
- Работа без анимации.
- Доступность (roles, aria, labels, keyboard).
- Документация.

---

## 6. Анимации

### 6.1. Обязательные приёмы
- Scroll-driven SVG line drawing (`stroke-dasharray` / `stroke-dashoffset`).
- Pecking / chipping reveal (эффект высекания).
- Mask reveals.
- Layered rock / stone parallax.
- Morphing geometry.
- Variable font weight animation.
- Subtle grain.

### 6.2. Запрещено
- Мультяшность.
- Визуальный шум.
- Анимация, мешающая чтению.
- WebGL на всех страницах.
- Автоплей видео со звуком.
- Параллакс, ломающий CLS.

### 6.3. Специфика FORMA
- Анимации сдержаннее, чем в CreativeLAB.
- WebGL — только на hero (опционально).
- Приоритет: blueprint-проявление линий, стратиграфия, пропорции.

### 6.4. Обязательно
- `prefers-reduced-motion: reduce` отключает анимацию, оставляя
  статичную красоту.
- Контент доступен без анимации.
- Анимация не блокирует LCP, INP, CLS.
- Мобильные: упрощённые анимации.

### 6.5. Тайминги
- Микро: 150–250ms.
- Средние: 300–500ms.
- Scroll-driven: привязаны к позиции.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.

---

## 7. Уникальный текст 10/10

### 7.1. Запрещено
- AI-слоп.
- Канцелярит, вода, повторы.
- Общие фразы: «в современном мире», «не секрет, что», «динамично
  развивающаяся компания», «индивидуальный подход», «широкий спектр».
- Английские штампы: "bespoke", "seamless", "tailored", "timeless",
  "we bring your vision to life", "we make brands unforgettable",
  "take your business to the next level", "unparalleled",
  "one-stop solution".
- Кликбейт.
- Ложные обещания.
- Плагиат.
- Автоперевод.

### 7.2. Обязательно
- Каждый абзац — новая информация.
- Конкретика: числа, сроки, примеры, проекты, локации.
- Один смысл — одно предложение.
- Ритм: короткие + длинные предложения.
- Информативные заголовки.
- Экспертный тон.
- Каждая языковая версия — уникальный текст.
- Вычитка носителем.

### 7.3. Объёмы
| Тип | Минимум |
|---|---|
| Service hub | 1200+ слов |
| Sub-service | 800+ слов |
| Project | 600+ слов |
| Journal post | 800+ слов |
| FAQ (страница) | 300+ слов |
| About | 600+ слов |
| Pricing | 500+ слов |
| Direct Answer | 50–80 слов |
| Meta title | 50–60 символов |
| Meta description | 140–160 символов |

### 7.4. Структура страницы
1. H1 (один).
2. Direct Answer 50–80 слов.
3. H2-секции.
4. Списки / таблицы / планы.
5. FAQ.
6. CTA.
7. Внутренние ссылки.

### 7.5. Генерация контента Claude Code
- `MUST` — Claude Code генерирует уникальный текст для всех страниц.
- `MUST` — текст соответствует стилю: премиальный editorial, конкретный.
- `MUST` — не использовать шаблонные фразы из 7.1.
- `MUST` — каждая страница уникальна, без дублей.
- `MUST` — тексты на en / ru / th / he генерируются отдельно, не перевод.
- `MUST` — после генерации помечать `<!-- GEN: replace if needed -->`.

### 7.6. Проверка на уникальность
- Прогон через антиплагиат (Advego, Text.ru, Copyscape).
- Уникальность ≥ 90%.
- Читаемость: Flesch ≥ 60 (en), аналогично для других языков.
- Тон: премиальный.

---

## 8. AI-first / Organic / GEO / AEO / LLM

### 8.1. AI-citability
- Direct Answer 50–80 слов на каждой странице.
- Фактические блоки с числами и единицами.
- Единая терминология.
- Консистентность сущностей.
- Явные определения.
- Списки и таблицы.

### 8.2. JSON-LD
`Organization`, `LocalBusiness`, `WebSite` + `SearchAction`, `Service`,
`Offer` / `OfferCatalog` / `PriceSpecification`, `Article`, `BreadcrumbList`,
`FAQPage`, `HowTo`, `ItemList`, `ImageObject`, `VideoObject`, `Person`,
`Review` / `AggregateRating`.

### 8.3. AI-краулеры
- `llms.txt`, `llms-full.txt` — создать (см. задачу 4 live audit).
- `robots.txt`: разрешить GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, CCBot, Bingbot, Applebot-Extended, YouBot.
- `sitemap.xml` + index.
- RSS / Atom.

### 8.4. Pillar / Spoke
- Pillar 1500+, Spoke 800+.
- Осмысленные анкоры.
- Нет циклических и битых ссылок.

### 8.5. E-E-A-T
- Авторы с реальной биографией.
- Даты публикации и обновления.
- Источники и ссылки.
- Контакты, адрес, юр. информация.
- Отзывы и кейсы.
- Прозрачные цены.

### 8.6. Проверка
- Ручная проверка в ChatGPT, Gemini, Perplexity, Claude.
- Фиксация результатов в `NOTES.md`.

---

## 9. Featured Snippets

- Paragraph snippet 40–60 слов под H2.
- List snippet.
- Table snippet.
- Video snippet (`VideoObject`).
- HowTo snippet.

Правила:
- H2/H3 — формулировка вопроса пользователя.
- Ответ сразу под заголовком.
- JSON-LD на каждый snippet.
- Визуально выделено, но не как реклама.
- A/B тесты формулировок.

---

## 10. Таблицы с ценами

- Страница `/pricing/` + блоки `PriceTable` на услугах.
- Колонки: услуга / пакет / что входит / срок / цена от / валюта / CTA.
- Валюты: THB (основная), USD, EUR, RUB, ILS.
- Автоконвертация + ручное подтверждение.
- `Offer` / `OfferCatalog` / `PriceSpecification`.
- Анимация: строки по скроллу, цена «высекается», hover-подсветка.
- Mobile: карточки, не горизонтальный скролл.
- Дисклеймер: цены ориентировочные.

### 10.1. Цены — генерировать
Claude Code генерирует реалистичные цены для рынка Ко Панган / Таиланд:
- Архитектура: от 80 000 THB / проект.
- Дизайн вилл: от 60 000 THB / проект.
- Интерьер: от 50 000 THB / проект.
- Строительство: от 500 000 THB / проект.
- Реновация: от 200 000 THB / проект.
- Управление проектами: от 40 000 THB / мес.
- Авторский надзор: от 30 000 THB / мес.
- Ландшафт: от 35 000 THB / проект.
- Разрешения: от 25 000 THB / проект.
- Проекты «под ключ»: от 1 000 000 THB / проект.
- Eco Construction: от 450 000 THB / проект.
- Concrete Construction Turnkey: от 550 000 THB / проект.
- `<3 услуги уточнить>`: `<цена>`.

Помечать `<!-- GEN -->`.

---

## 11. Анимированные схемы и планы работ

- `ProcessSchema` — блок-схема (SVG + GSAP).
- `WorkPlan` — этапы, сроки, результаты, ответственные.
- `Blueprint` — чертёж с проявлением линий.
- `StrataDiagram` — слои.
- `Timeline` — высеченная линия времени.

Требования:
- Доступна без анимации.
- Текстовое описание для скринридеров.
- `HowTo` / `ItemList` разметка.
- Адаптив.
- `prefers-reduced-motion`.
- Единый визуальный язык.
- Не содержит критичного текста внутри SVG.

### 11.1. Планы работ — генерировать
Claude Code генерирует реалистичные планы работ по каждой услуге:
- этапы (5–8),
- сроки,
- результаты,
- ответственные,
- стоимость.

**Специфика FORMA:** WorkPlan — ключевой блок. Аудитория — клиенты,
строящие виллы. Прозрачность этапов, сроков, стоимости — конкурентное
преимущество.

---

## 12. Локализация и RTL

- 4 языка: en / ru / th / he.
- URL: `/en/`, `/ru/`, `/th/`, `/he/`.
- `hreflang` + `x-default`.
- `canonical` на каждой странице.
- Автоперевод запрещён.
- RTL для `he`: `dir="rtl"`, числа / цены / email — LTR внутри RTL.
- Иконки направления — зеркалятся.
- Логотип — не зеркалится.
- Сакральная геометрия — центрируется.
- Переключатель языков без потери URL.
- Вычитка носителями.

### 12.1. Генерация переводов
- Claude Code генерирует **уникальный** текст на каждом языке.
- Не перевод слово-в-слово.
- Учитывает культурные особенности.
- Помечает `<!-- GEN -->` для замены носителем.

---

## 13. Боты

### 13.1. Обязательные
- Telegram bot: `@formaisland_bot`.
- WhatsApp bot: `+66 80 870 5704`.

### 13.2. Воронка
1. Приветствие + выбор языка.
2. Выбор услуги (13).
3. Выбор локации (11).
4. Бюджет.
5. Загрузка файлов (опционально).
6. Контакт.
7. Подтверждение.
8. Отправка менеджеру.

### 13.3. Требования
- 4 языка.
- Валидация на каждом шаге.
- Уведомление менеджеру в Telegram.
- Логирование.
- Нет тупиков.
- Возврат назад.
- Смена языка на любом шаге.
- Fallback на человека.
- Тест: все 13 услуг × все 11 локаций × все 4 языка.
- Rate limiting.
- PDPA / GDPR согласие.

### 13.4. Токены
- `FO_TELEGRAM_BOT_TOKEN` — в `.env`.
- `FO_TELEGRAM_MANAGER_CHAT_ID` — в `.env`.
- `WHATSAPP_TOKEN` — в `.env`.
- Claude Code пишет рабочий код с чтением из `process.env`.

---

## 14. Архитектура и URL

### 14.1. 13 услуг (3 уточнить)
1. Архитектура
2. Дизайн вилл
3. Интерьер
4. Строительство
5. Реновация
6. Управление проектами
7. Авторский надзор
8. Ландшафт
9. Разрешения
10. Проекты «под ключ»
11. Eco Construction `[P0]` — проверить полноту (задача 9)
12. Concrete Construction Turnkey `[P0]` — проверить полноту (задача 9)
13. `<уточнить>`

### 14.2. Структура URL
```
/
/services/architecture/
/services/villa-design/
/services/interior-design/
/services/construction/
/services/renovation/
/services/project-management/
/services/supervision/
/services/landscape/
/services/permits/
/services/turnkey/
/services/eco-construction/
/services/concrete-construction-turnkey/
/services/<13>/
/projects/
/projects/{project-slug}/
/journal/
/journal/{post-slug}/
/pricing/
/process/
/locations/
/locations/{location-slug}/
/about/
/contact/
/faq/
/legal/
/privacy/
/terms/
```

### 14.3. Обязательные страницы
Root `/` = Services landing page (per proposal.md §24).
13 service pages, projects, journal, pricing, process, locations, about,
contact, FAQ, legal, privacy, terms, 404, 500, offline, search results,
HTML sitemap.

### 14.4. Специфика FORMA
- Root URL (`/`) = Services landing page.
- Нет отдельного `/services/` index route (см. задачу 2 live audit).
- Навигация начинается с «Services», а не «Home».

---

## 15. Постраничные улучшения (шаблоны)

### 15.1. Root / Services
- `HeroPetroglyph` с master-глифом.
- `DirectAnswer` 50–80 слов.
- Секция 13 услуг.
- Секция проектов.
- Секция процесса.
- Секция отзывов.
- Журнал teaser.
- CTA.
- JSON-LD: `Organization`, `WebSite` + `SearchAction`.
- Schema: master petroglyph hub + архитектурная пропорция.

### 15.2. Service page (13)
Эталон — `/services/architecture/` (подтверждено аудитом). Остальные 12 —
привести к тому же шаблону.
- `HeroPetroglyph` с глифом услуги.
- `DirectAnswer`.
- `PillarIntro`.
- Основной текст 1200+.
- `WorkPlan`.
- `PriceTable`.
- `ProjectGrid` релевантных проектов.
- `FAQBlock`.
- CTA.
- JSON-LD: `Service`, `HowTo`, `FAQPage`, `BreadcrumbList`.
- Schema: глиф + blueprint.

### 15.3. Project
- `HeroPetroglyph`.
- `DirectAnswer`.
- Клиент, задача, решение, результат.
- Галерея.
- Метрики.
- Планы / разрезы.
- `Testimonial`.
- CTA.
- JSON-LD: `Article` / `CreativeWork`.
- Schema: site plan / sections / strata.

### 15.4. Pricing
- `DirectAnswer`.
- `PriceTable` по услугам.
- `Comparison` пакетов.
- FAQ.
- CTA.
- JSON-LD: `OfferCatalog`, `FAQPage`.
- Schema: анимированная таблица.

### 15.5. Process
- `DirectAnswer`.
- `ProcessSchema`.
- `WorkPlan`.
- FAQ.
- CTA.
- JSON-LD: `HowTo`.
- Schema: анимированный план работ.

### 15.6. About
- `DirectAnswer`.
- Команда.
- Ценности.
- История.
- CTA.
- JSON-LD: `Organization`, `Person`.
- Schema: process circle.

### 15.7. Locations
- `DirectAnswer`.
- Карта с метками.
- Описание локаций.
- JSON-LD: `LocalBusiness`.
- Schema: карта.

### 15.8. Contact
- `DirectAnswer`.
- Форма (см. задачу 5 live audit).
- Боты.
- Карта.
- Часы.
- JSON-LD: `LocalBusiness`, `ContactPoint`.
- Schema: connection glyph.

### 15.9. Journal
- Список постов.
- Фильтры.
- Поиск.
- JSON-LD: `ItemList`, `BlogPosting`.
- Schema: engraved timeline.

### 15.10. Journal post
- `DirectAnswer`.
- Основной текст 800+.
- Автор.
- Дата.
- Источники.
- CTA.
- JSON-LD: `BlogPosting`, `Person`, `BreadcrumbList`.
- Schema: engraved timeline.

### 15.11. FAQ
- `DirectAnswer`.
- Аккордеон.
- JSON-LD: `FAQPage`.
- Schema: вопрос / ответ.

### 15.12. Legal / Privacy / Terms
- Текст.
- Дата обновления.
- JSON-LD: `WebPage`.
- Schema: минимальный глиф.

### 15.13. 404 / 500 / offline
- Сообщение.
- Навигация.
- Поиск.
- Schema: разорванная линия.

---

## 16. Производительность и качество

### 16.1. Core Web Vitals (пороги 2026)
- LCP ≤ 2.5s (p75).
- INP ≤ 200ms (p75).
- CLS ≤ 0.1 (p75).
- FCP ≤ 1.8s.
- TTFB ≤ 0.8s.

### 16.2. Lighthouse
- Performance ≥ 90.
- SEO = 100.
- Accessibility ≥ 95.
- Best Practices ≥ 95.

### 16.3. Доступность
- axe-core: 0 critical / 0 serious.
- WCAG 2.2 AA минимум.
- Клавиатурная навигация.
- Видимый фокус.
- Контраст.
- alt у изображений.
- ARIA где нужно.
- Тест скринридером (NVDA / VoiceOver).

### 16.4. Адаптив
- 320 / 375 / 430 / 768 / 1024 / 1440 / 1920 / 2560.
- Тест на реальных устройствах.
- Тач-зоны ≥ 44×44px.
- Читаемость без zoom.

### 16.5. Изображения
- AVIF + WebP + fallback.
- Responsive `srcset` + `sizes`.
- Lazy (кроме LCP).
- `fetchpriority="high"` для LCP.
- Alt описательный.
- Без CLS (width / height / aspect-ratio).

### 16.6. Шрифты
- `font-display: swap`.
- Subsetting.
- Preload критических.
- Variable fonts.

### 16.7. JS / CSS
- Минификация.
- Code splitting.
- Tree shaking.
- Без блокирующего JS.
- Критический CSS inline.

---

## 17. SEO-технический слой

- `sitemap.xml` + sitemap index.
- `robots.txt` с правилами для AI-ботов.
- `canonical` на каждой странице.
- `hreflang` на 4 языка + `x-default`.
- OG / Twitter cards.
- favicon (svg + png + apple-touch-icon).
- `manifest.webmanifest`.
- 404 / 500 / offline.
- 301-редиректы.
- HTTPS везде.
- www / без www — один вариант.
- Trailing slash — единый.
- Breadcrumbs.
- Внутренний поиск.
- RSS / Atom.
- HTML sitemap.

---

## 18. Стек (Static-first / no CMS)

- **Static-first, без CMS и БД в первом релизе.**
- Astro (текущий).
- TypeScript strict.
- GSAP + ScrollTrigger.
- Lenis (опционально).
- Inline SVG + SVGO.
- i18n через статические JSON.
- GA4 + Umami.
- web-vitals (RUM).
- Деплой: Cloudflare Pages / GitHub Pages (текущий).
- Branch strategy: `main` + `feature/*`.
- Conventional commits.
- **Запрещено:** CMS, БД, server-side rendering с базой в первом релизе.

---

## 19. Чек-лист приёмки

### 19.1. Перед задачей
- [ ] Прочитан раздел 0.
- [ ] Прочитан раздел 0.10 (live audit findings).
- [ ] Прочитан раздел 22 (правила).
- [ ] Прочитан `NOTES.md`.
- [ ] Понятен закрываемый пункт.
- [ ] Не нарушены позиционирование / RTL / static-first / no-autotranslate.

### 19.2. После задачи (per page)
- [ ] H1 один.
- [ ] Direct Answer 50–80 слов.
- [ ] Объём по разделу 7.3.
- [ ] Уникальный текст 10/10.
- [ ] Snippet-блок + JSON-LD.
- [ ] PriceTable + `Offer` (если цены).
- [ ] ProcessSchema / WorkPlan + `HowTo` (если процесс).
- [ ] Petroglyph-глиф + анимация.
- [ ] 4 языка + hreflang + RTL.
- [ ] Canonical, OG, Twitter.
- [ ] Sitemap обновлён.
- [ ] `llms.txt` актуален.
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- [ ] Lighthouse: Perf ≥ 90, SEO 100, A11y ≥ 95.
- [ ] axe-core: 0 critical / 0 serious.
- [ ] `prefers-reduced-motion` работает.
- [ ] Мобильный 320–430px.
- [ ] Tablet, desktop, wide.
- [ ] Клавиатура.
- [ ] Контраст.
- [ ] Alt у изображений.

### 19.3. Перед релизом
- [ ] Раздел 0.10 полностью пройден (все P0/P1).
- [ ] Все страницы раздела 14.3.
- [ ] Боты протестированы (13 × 11 × 4 = 0 dead ends).
- [ ] `sitemap.xml` + index.
- [ ] `robots.txt`.
- [ ] `llms.txt` + `llms-full.txt`.
- [ ] JSON-LD валиден.
- [ ] hreflang корректен.
- [ ] RTL проверен на реальных устройствах.
- [ ] Core Web Vitals зелёные.
- [ ] Lighthouse на ключевых страницах.
- [ ] axe-core на ключевых страницах.
- [ ] Ручная проверка AI-цитируемости.
- [ ] Раздел 25 полностью пройден.
- [ ] Раздел 0 актуален.
- [ ] Раздел 20 актуален.
- [ ] `NOTES.md` актуален.
- [ ] `URL_INTENT_MAP.md` создан.
- [ ] `INTERNAL_LINKING_MAP.md` создан.

---

## 20. Журнал изменений

### 2026-09-18
- Создан `Improvements.md` v2.0 — сводная версия.
- Встроены Live Audit Findings от 18.09.2026 (раздел 0.10).
- Обновлён раздел 0 статусами на основе реального состояния сайта.
- Зафиксирован манифест дизайна (petroglyph & sacred geometry + luxury).
- Зафиксирована терминология: **петроглифы** — основной термин.
- Запрещено: «наскальная живопись», «иероглифы», «руны», «клипарт»,
  «эзотерика», «bespoke», «seamless», «tailored», «timeless».
- Добавлен режим Draft: генерация контента и контактов.
- Добавлен раздел 25 «Соответствие Google 2026».

### <дата>
- <что сделано>

---

## 21. Блокеры и вопросы

- [BLOCKED] Токен Telegram-бота — только у владельца.
- [BLOCKED] WhatsApp webhook — нужен публичный HTTPS URL.
- [BLOCKED] 3 из 13 услуг — уточнить.
- [BLOCKED] Реальные проекты и фото — у владельца.
- [BLOCKED] Юридические данные (PUBLIC_LEGAL_*).
- [BLOCKED] Аналитика (GA4_ID, UMAMI_ID).
- [QUESTION] Staging URL?
- [QUESTION] Хостинг (Cloudflare Pages / GitHub Pages)?
- [QUESTION] CRM: куда падают заявки?
- [QUESTION] KPI: сколько лидов в месяц ожидается?
- [QUESTION] Валюты: только отображение или оплата?
- [QUESTION] Тёмная тема: нужна?

---

## 22. Claude Code Instructions

> **Этот раздел читается первым.**

### 22.1. Контекст
- Репозиторий: `FORMA.in.th`.
- Главный документ: `Improvements.md` (этот файл).
- Дополнительно: `NOTES.md` — журнал решений, ассумпций и багов.
- Аудит от 13.09.2026 — в `NOTES.md`.
- Live audit от 18.09.2026 — в разделе 0.10 этого файла.
- Секреты: `.env` / GitHub Secrets.

### 22.2. Правила
1. `MUST` — **сначала раздел 0.10 (live audit), потом всё остальное.**
   `[P0]` > `[P1]` > `[P2]`.
2. `MUST` — не менять позиционирование (раздел 1).
3. `MUST` — static-first. Никакой CMS/БД в первом релизе.
4. `MUST NOT` — добавлять автоперевод.
5. `MUST` — сохранять RTL для `he`.
6. `MUST NOT` — использовать стоковые изображения.
7. `MUST NOT` — создавать thin pages.
8. `MUST` — каждая страница: Direct Answer + JSON-LD + OG + canonical +
   hreflang.
9. `MUST` — каждая страница: свой petroglyph-глиф + анимация (раздел 6).
10. `MUST` — каждая страница: минимум один snippet-блок (раздел 9).
11. `MUST` — цены → PriceTable + `Offer` (раздел 10).
12. `MUST` — процесс → ProcessSchema / WorkPlan + `HowTo` (раздел 11).
13. `MUST` — текст уникальный, 10/10, без AI-слопа (раздел 7).
14. `MUST` — компоненты — только из luxury blocks (раздел 5).
15. `MUST` — уважать `prefers-reduced-motion` (раздел 6).
16. `MUST` — перед началом читать `NOTES.md` (актуальные решения и баги).
17. `MUST` — после задачи обновить раздел 0, раздел 20 и `NOTES.md`
    (если применимо).
18. `MUST` — не коммитить секреты.
19. `MUST` — если данных нет, **генерировать** по шаблону раздела 3.
    Не блокировать задачу.
20. `MUST` — `[BLOCKED]` только для внешних API-ключей.
21. `MUST` — дизайн первичен (раздел 2), но сдержаннее, чем в CreativeLAB.
22. `MUST` — каждая страница соответствует Google 2026 (раздел 25).
23. `MUST` — проверять каждый пункт раздела 25 перед коммитом.
24. `MUST NOT` — оставлять в UI слова `bespoke`, `seamless`, `tailored`,
    `timeless` (задача 4 live audit).
25. `MUST NOT` — оставлять `XXX`, `<...>`, `TODO` в UI.

### 22.3. Порядок работы
1. Прочитать раздел 0.
2. Прочитать раздел 0.10 (live audit).
3. Прочитать раздел 22 (этот).
4. Прочитать `NOTES.md`.
5. Прочитать раздел 21 (блокеры).
6. Взять задачу: сначала `[P0]` из 0.10, потом `[P1]`, потом `[P2]`,
   потом стратегические разделы 1–21.
7. Прочитать соответствующий раздел задачи.
8. Прочитать раздел 19 (чек-лист).
9. Реализовать.
10. Прогнать чек-лист раздела 19 и раздела 25.
11. Обновить статус, журнал и `NOTES.md`.
12. Приложить доказательства (скриншоты, Lighthouse, axe).

### 22.4. Запрещено
- Начинать новые фичи, не закрыв `[P0]` из раздела 0.10.
- Подключать CMS / БД в первом релизе.
- Менять палитру / типографику без согласования.
- Ломать статическую генерацию.
- Ломать RTL.
- Ломать LCP / CLS ради анимации.
- Оставлять TODO без записи в раздел 20.
- Коммитить секреты и реальные данные.
- Использовать стоковые изображения.
- Писать AI-слоп.
- Использовать "bespoke", "seamless", "tailored", "timeless".
- Игнорировать `prefers-reduced-motion`.
- Игнорировать `NOTES.md`.
- Игнорировать раздел 25.
- Оставлять `XXX`, `<...>`, `TODO` в UI.

### 22.5. Режим Draft: генерация контента и контактов

**Принцип:** сайт должен быть 100% готовым к сборке и запуску.
Claude Code НЕ блокирует задачи из-за отсутствия данных.

**Правила:**
- `MUST` — если реальных данных нет, Claude Code генерирует контент
  самостоятельно: тексты, заголовки, Direct Answer, FAQ, описания услуг.
- `MUST` — контакты генерируются по шаблону раздела 3.
- `MUST` — все сгенерированные данные помечаются `<!-- GEN -->`.
- `MUST` — сгенерированный текст соответствует требованиям раздела 7.
- `MUST NOT` — не помечать `[BLOCKED]` из-за отсутствия телефона, email
  или адреса.
- `MUST` — после генерации добавить запись в раздел 20:
  `[GEN] Сгенерированы контакты и контент для N страниц`.

---

## 23. Стоп-условия

Задача **не принимается**, если:
- Не закрыт хотя бы один `[P0]` из раздела 0.10, при том что задача
  заявлялась как приоритетная.
- Подключена CMS / БД в первом релизе.
- Нарушено позиционирование.
- Появился автоперевод.
- Сломан RTL.
- Сломан static-first.
- Появились thin pages.
- Использованы стоковые изображения.
- Написан AI-слоп.
- Использованы слова "bespoke", "seamless", "tailored", "timeless".
- LCP > 2.5s / INP > 200ms / CLS > 0.1.
- Lighthouse ниже порога.
- axe-core critical / serious.
- Нет Direct Answer.
- Нет snippet-блока.
- Нет JSON-LD.
- Нет petroglyph-глифа / анимации.
- Не работает `prefers-reduced-motion`.
- Секреты закоммичены.
- Не обновлён раздел 0.
- Не обновлён раздел 20.
- Не обновлён `NOTES.md`.
- Не пройден раздел 25.
- В UI остались `XXX`, `<...>`, `TODO`.

---

## 24. Acceptance Criteria (общий релиз)

- [ ] Все `[P0]` из раздела 0.10 закрыты.
- [ ] Все `[P1]` из раздела 0.10 закрыты.
- [ ] Static-first, без CMS и БД.
- [ ] 13 услуг + projects + about + process + locations + journal + pricing.
- [ ] 4 языка, RTL для `he`.
- [ ] Уникальный текст 10/10 на всех языках.
- [ ] Direct Answer + Featured Snippet на каждой странице.
- [ ] Таблицы цен с `Offer` JSON-LD.
- [ ] Анимированные ProcessSchema / WorkPlan с `HowTo`.
- [ ] Petroglyph-глиф и анимация на каждой странице.
- [ ] Luxury blocks внедрены.
- [ ] Telegram + WhatsApp боты на 4 языках, 0 dead ends.
- [ ] Lighthouse: Perf ≥ 90, SEO 100, A11y ≥ 95.
- [ ] axe-core: 0 critical / 0 serious.
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- [ ] `llms.txt`, `llms-full.txt`, sitemap, robots, JSON-LD, hreflang — на месте.
- [ ] `prefers-reduced-motion` работает.
- [ ] Нет thin pages / автоперевода / стока / AI-слопа / CMS / БД.
- [ ] Раздел 25 полностью пройден.
- [ ] Раздел 0 актуален.
- [ ] Раздел 20 актуален.
- [ ] `NOTES.md` актуален.
- [ ] `URL_INTENT_MAP.md` создан.
- [ ] `INTERNAL_LINKING_MAP.md` создан.
- [ ] В UI нет `XXX`, `<...>`, `TODO`.
- [ ] В UI нет "bespoke", "seamless", "tailored", "timeless".

---

## 25. Соответствие Google 2026 (обязательно)

### 25.1. Google Search Essentials

**Технические требования:**
- [ ] `robots.txt` не блокирует нужные страницы.
- [ ] Нет `noindex` на индексируемых страницах.
- [ ] HTTP 200 для всех ключевых URL.
- [ ] Нет клоакинга.
- [ ] Ссылки сканируемы (crawlable).

**Spam-политики:**
- [ ] Нет «back button hijacking».
- [ ] Нет scaled content abuse.
- [ ] Нет манипуляций с историей браузера.
- [ ] Нет скрытого текста и ссылок.
- [ ] Нет doorway pages.

**Best practices:**
- [ ] Helpful, reliable, people-first content.
- [ ] Слова из реальных поисковых запросов в заголовках.
- [ ] Описательный alt text.
- [ ] Сканируемые ссылки.
- [ ] Нет битых ссылок.

### 25.2. Core Web Vitals (пороги 2026)

| Метрика | Good | Needs improvement | Poor |
|---|---|---|---|
| LCP | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| INP | ≤ 200ms | ≤ 500ms | > 500ms |
| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| FCP | ≤ 1.8s | ≤ 3.0s | > 3.0s |
| TTFB | ≤ 0.8s | ≤ 1.8s | > 1.8s |

- [ ] LCP ≤ 2.5s (p75).
- [ ] INP ≤ 200ms (p75).
- [ ] CLS ≤ 0.1 (p75).
- [ ] FCP ≤ 1.8s.
- [ ] TTFB ≤ 0.8s.

### 25.3. Структурированные данные

- [ ] JSON-LD на всех типах страниц.
- [ ] Валиден через Rich Results Test.
- [ ] Валиден через Schema.org validator.
- [ ] Релевантен контенту.
- [ ] Не заблокирован для Googlebot.
- [ ] Указаны все обязательные свойства.
- [ ] Нет ложной разметки.

### 25.4. E-E-A-T

- [ ] Author bios с реальными credentials.
- [ ] Первоисточники и ссылки.
- [ ] Оригинальные фото и видео.
- [ ] Документированные процессы.
- [ ] Реальные кейсы и примеры.
- [ ] Даты публикации и обновления.
- [ ] Контакты, адрес, юр. информация.
- [ ] Отзывы и рейтинги.

### 25.5. Helpful Content

- [ ] Unique — уникальный, не воспроизводимый.
- [ ] Specific — конкретные кейсы и примеры.
- [ ] Authentic — на основе реального опыта.
- [ ] Нет commodity content.
- [ ] Нет AI-слопа.
- [ ] Нет mass-produced content.
- [ ] Нет content scraping.
- [ ] Нет клише: "bespoke", "seamless", "tailored", "timeless".

### 25.6. Mobile-first

- [ ] Responsive design.
- [ ] Content parity mobile/desktop.
- [ ] Тап-зоны ≥ 44×44px.
- [ ] Шрифт ≥ 16px.
- [ ] Mobile LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- [ ] Нет горизонтального скролла.
- [ ] Нет interstitials, блокирующих контент.

### 25.7. HTTPS и безопасность

- [ ] HTTPS везде.
- [ ] HSTS с `max-age`, `includeSubDomains`, `preload`.
- [ ] Нет смешанного контента.
- [ ] SSL-сертификат валиден.
- [ ] Нет уязвимостей (OWASP top 10).
- [ ] CSP (Content Security Policy).

### 25.8. Доступность (accessibility tree)

- [ ] Semantic HTML.
- [ ] Focus management.
- [ ] Формы с labels.
- [ ] ARIA где нужно.
- [ ] Контраст WCAG AA.
- [ ] Клавиатурная навигация.
- [ ] Тест скринридером.
- [ ] Нет auto-play со звуком.
- [ ] Понятные ссылки.
- [ ] Иерархия заголовков.

### 25.9. Изображения

- [ ] AVIF + WebP + fallback.
- [ ] Responsive `srcset`.
- [ ] Lazy loading (кроме LCP).
- [ ] `fetchpriority="high"` для LCP.
- [ ] Alt text описательный.
- [ ] Ширина ≥ 1200px.
- [ ] Соотношение 16:9 или 4:3.
- [ ] Не использовать логотипы как og:image.
- [ ] Нет CLS.

### 25.10. Международный SEO

- [ ] `hreflang` на все 4 языка + `x-default`.
- [ ] Отдельные URL для каждого языка.
- [ ] Не использовать авторедирект по языку.
- [ ] Не использовать cookies для выбора языка (только URL).
- [ ] `canonical` на каждой странице.
- [ ] Консистентный контент между языками.

### 25.11. Индексация

- [ ] `sitemap.xml` + index.
- [ ] `sitemap.xml` отправлен в Search Console.
- [ ] `robots.txt` корректен.
- [ ] Нет `noindex` на нужных страницах.
- [ ] Нет `disallow` на нужных страницах.
- [ ] Нет orphan pages.
- [ ] Внутренняя перелинковка.

---

**Конец файла.**
