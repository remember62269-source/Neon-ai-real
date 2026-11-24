const express = require("express");
const path = require("path");
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "На сервере ещё не задан OPENAI_API_KEY" });
    const message = String(req.body?.message || "").trim();
    if (!message) return res.status(400).json({ error: "Пустое сообщение" });
    const history = Array.isArray(req.body?.history) ? req.body.history.slice(-20) : [];
    const messages = [
      { role: "system", content: "Ты NEON AI — полезный, дружелюбный и точный ИИ-помощник. Отвечай на языке пользователя. Если не уверен, честно скажи об этом." },
      ...history.filter(x => x && ["user","assistant"].includes(x.role) && typeof x.content === "string").map(x => ({ role: x.role, content: x.content.slice(0, 6000) })),
      { role: "user", content: message.slice(0, 6000) }
    ];
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", messages, temperature: 0.7 })
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      const detail = data?.error?.message || `OpenAI API вернул статус ${upstream.status}`;
      return res.status(502).json({ error: detail });
    }
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) return res.status(502).json({ error: "ИИ не вернул текстовый ответ" });
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ error: "Ошибка сервера: " + e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`NEON AI listening on ${port}`));
