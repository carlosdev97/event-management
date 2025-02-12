const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(user);
    const result = await newUser.save();
    return res
      .status(201)
      .json({ message: "Usuario registrado", user: result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      name: user.name,
      id: user.id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await User.findOne({ _id: userId }); // Busca el usuario por su id

    if (result === null) {
      // Si no se encuentra el usuario
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devuelve el perfil del usuario
    return res.status(200).json({ user: result });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el perfil del usuario",
      error: error.message,
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  try {
    // Busca y actualiza el usuario por su ID
    const updatedUser = await User.findByIdAndUpdate(
      userId, // El ID del usuario
      { name, email }, // Los campos a actualizar
      { new: true, runValidators: true } // Opciones: devolver el documento actualizado y validar
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Perfil actualizado", user: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar el perfil", error: error.message });
  }
};
