const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareAuth = require("../middlewares/authMiddleware");

// Rutas para usuarios

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", middlewareAuth, userController.getUserProfile);
router.put("/profile", middlewareAuth, userController.updateUserProfile);

module.exports = router;
