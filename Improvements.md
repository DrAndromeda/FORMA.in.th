# FORMA.in.th — Open Improvements

> Технические и контентные задачи, которые ещё не выполнены или требуют проверки.
> Обновляется по мере работ.

## Статус на 15 Sep 2026

| Компонент | Статус |
|-----------|--------|
| Сайт (gh-pages) | ✅ Деплой успешен, страницы 200 |
| Ссылки меню | ✅ Починены (все с префиксом `/FORMA.in.th/`) |
| Контакты | ✅ +66 80 870 5704, @formaisland_bot, WhatsApp, email |
| CSS | ✅ 200 |
| Изображения | ✅ 200 |
| Бот @formaisland_bot | ✅ Запущен (long polling, PID активен) |

## Открытые задачи

### 1. Мобильное меню — проверить на телефоне
- [ ] Открыть `https://drandromeda.github.io/FORMA.in.th/` на мобильном
- [ ] Проверить бургер-меню, все пункты, закрытие
- [ ] Проверить сервис-страницы на мобильном

### 2. .env с токеном бота — не в репозитории
- Файл `/bots/.env` в `.gitignore`, токен только локально на MacBook
- Бот запущен локально — при перезагрузке машины нужно перезапускать
- **Варианты решения:**
  - GitHub Actions secret + CI-бот (требует настройки)
  - systemd/launchd сервис автозапуска на сервере
  - VPS/KVM с постоянным аптаймом

### 3. Linktree — не сделан
- [ ] Создать Linktree для Kim Andromeda
- [ ] Создать Linktree для FORMA (ссылки на все каналы)

### 4. Последний коммит — проверить билд
- Коммит: `c6f7664` (Fix FORMA ContactForm with correct token)
- Ветка: `main`
- Проверить что GitHub Actions билд прошёл (последний push на main)

### 5. AdFoto → CreativeLAB content map
- Перенести контент из старого архива AdFoto в структуру CreativeLAB
- Анализ не сделан

### 6. Деплой — peaceiris/actions-gh-pages
- ✅ Переход на `peaceiris/actions-gh-pages@v4` вместо `actions/deploy-pages`
- ✅ force_orphan обходит protection rules GitHub Pages environment
- Следить, что деплой стабилен при новых коммитах

### 7. CreativeLAB Home — контентная доработка
- [ ] Создать контент-план для FORMA Home по аналогии с CreativeLAB (H2-структура, SEO-текст)
- [ ] Добавить ~800–1,100 слов с ключами

## Как добавлять

При обнаружении новой проблемы или недоработки дописывать пункт в соответствующий раздел.

---

<!-- project: github.com/DrAndromeda/broservice-site -->