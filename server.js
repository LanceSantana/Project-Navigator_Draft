const express = require("express");
const fetch = require("node-fetch");
const app = express();

const apiKey = process.env.API_KEY;

app.use(express.json());

app.post("/api/openai", async (req, res) => {
    const { message } = req.body;
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a project management chatbot." },
                    { role: "user", content: message }
                ]
            })
        });
        const data = await response.json();
        res.json(data.choices[0].message.content);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from OpenAI." });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
