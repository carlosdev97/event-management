const jwt = require("jsonwebtoken");

const middlewareAuth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      mensaje: "¡Se requiere token de autenticación!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ mensaje: "Token invalido", error: error.message });
    }
    req.user = decoded;
    next();
  });
};

module.exports = middlewareAuth;
