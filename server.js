const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

app.use(express.json());

app.post("/chat", async (req, res) => {
  const userInput = req.body.message;

  try {
    const response = await fetch("https://api.gemini.com/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    res.json({ response: data.response });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat memproses pesan" });
  }
});

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
