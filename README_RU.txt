NEON AI — версия с настоящим ИИ

В проекте есть веб-интерфейс и Node.js backend. API-ключ хранится только в переменной окружения сервера, не в браузере.

Публикация (один сервис Render):
1. Загрузите содержимое этой папки в корень GitHub-репозитория (можно заменить старые PWA-файлы). ВАЖНО: теперь нужен весь проект: папка public и файлы server.js, package.json, render.yaml, .gitignore.
2. На Render создайте New -> Web Service и подключите GitHub-репозиторий.
3. Build Command: npm install; Start Command: npm start; Runtime: Node.
4. В Environment добавьте OPENAI_API_KEY (секретный ключ API OpenAI) и при желании OPENAI_MODEL=gpt-4.1-mini.
5. Deploy. Открывайте выданный Render URL — он обслуживает и сайт, и /api/chat на одном домене.

ВАЖНО:
- GitHub Pages не может запускать Node.js сервер. Открывайте адрес Render, а не github.io.
- Нужен отдельный OpenAI API key и включённый биллинг API; подписка ChatGPT не включает API-кредиты.
- Никогда не вставляйте API key в index.html, GitHub или присылайте его в чат.
- Не публикуйте .env или секреты.
- Бесплатный Render может засыпать при простое, первый запрос после паузы может быть медленным.
