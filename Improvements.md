# Improvements — FORMA.in.th

Список правок/улучшений, которые нужно реализовать. На основе PROGRESS.md.

## 🔴 Обязательно перед запуском

### 1. Контактные данные
- [ ] **Email** — установить `PUBLIC_CONTACT_EMAIL`
- [ ] **Телефон** — установить `PUBLIC_CONTACT_PHONE`
- [ ] **WhatsApp** — установить `PUBLIC_CONTACT_WHATSAPP`
- [ ] **Адрес** — установить `PUBLIC_ADDRESS_LINE1`, `_LINE2`, `_CITY`, `_POSTCODE`, `_COUNTRY`
- [ ] **Соцсети** — установить `PUBLIC_SOCIAL_LINKS` (сейчас пусто, аккаунтов нет)

### 2. Юридические данные (нужен юрист!)
- [ ] `PUBLIC_LEGAL_GOVERNING_LAW` — право какой страны
- [ ] `PUBLIC_LEGAL_RETENTION_PERIOD` — срок хранения данных
- [ ] `PUBLIC_LEGAL_UPDATED_DATE` — дата последнего обновления
- [ ] Terms / Privacy / Cookies — заменить `[[VERIFY]]` на реальный текст

### 3. Боты (Telegram + WhatsApp)
- [ ] Telegram bot token (получить у @BotFather)
- [ ] WhatsApp Cloud API аккаунт + webhook
- [ ] Прогнать `bots/TEST_PLAN.md` вживую

### 4. Реальные проекты
- [ ] Заменить 6 "concept study" на реальные проекты + фото
- [ ] Настоящие отзывы клиентов (testimonials)
- [ ] Настоящая портретная/архитектурная фотография
- [ ] Hero-слайдер: разнообразить фото (интерьеры, стройка, ландшафт)

### 5. Переводы
- [ ] Профессиональная вычитка RU/TH/HE носителями языка
- [ ] Проверить Hebrew RTL отображение с реальным текстом

### 6. Аналитика
- [ ] Подключить GA4 / Yandex Metrica / Meta Pixel
- [ ] Настроить cookie-consent обработчик (`forma:consent`)

### 7. Хостинг
- [ ] Выбрать хостинг (Cloudflare Pages / Vercel / др.)
- [ ] Залить `.env` с реальными значениями
- [ ] Запустить Lighthouse против live URL

## 🟡 Улучшения

### 8. QA
- [ ] axe-core CLI проверка accessibility (кроме Lighthouse)
- [ ] Кросс-браузерное тестирование
- [ ] Mobile viewport визуальная проверка

### 9. Контент
- [ ] Обновить страницы услуг — добавить конкретные цены/примеры
- [ ] Написать реальные статьи в Journal (сейчас 6 placeholders)

### 10. Прочее
- [ ] Убрать `proposal(NEW2).md` из рабочей директории (оставить только в .git истории)
- [ ] Проверить, что меню V2 (по этапам проекта) реализовано
- [ ] Star Project button — перенести из header в footer