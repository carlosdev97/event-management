const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDBMongo = require("./src/config/db");
const authMiddleware = require("./src/middlewares/authMiddleware");

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDBMongo();

app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/events", require("./src/routes/eventRoutes"));

app.get("/api/users/profile", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Perfil de usuario", user: req.user });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "Error en el servidor", error: error.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
