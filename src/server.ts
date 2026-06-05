import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/config/google-books-api-key", (req, res) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GOOGLE_BOOKS_API_KEY não está definido no backend",
    });
  }

  return res.json({ apiKey });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});