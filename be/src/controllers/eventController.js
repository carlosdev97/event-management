const User = require("../models/user");
const Event = require("../models/event");

exports.createEvent = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      eventDate,
      eventTime,
      location,
      userId,
    } = req.body;

    if (
      !image ||
      !title ||
      !description ||
      !eventDate ||
      !eventTime ||
      !location ||
      !userId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Faltan campos obligatorios" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    // Función para formatear la hora en formato de 12 horas
    const formatTimeTo12Hours = (time) => {
      const [hour, minute] = time.split(":"); // Divide la hora y los minutos
      let period = "a.m."; // Por defecto, asumimos que es a.m.

      let formattedHour = parseInt(hour, 10);
      if (formattedHour >= 12) {
        period = "p.m.";
        if (formattedHour > 12) {
          formattedHour -= 12; // Convierte a formato de 12 horas
        }
      }

      // Asegura que la hora y los minutos tengan dos dígitos
      const formattedMinute = minute.padStart(2, "0");
      formattedHour = formattedHour.toString().padStart(2, "0");

      return `${formattedHour}:${formattedMinute} ${period}`;
    };

    // Formatea la hora antes de guardarla
    const formattedTime = formatTimeTo12Hours(eventTime);

    const newEvent = await Event.create({
      image,
      title,
      description,
      eventDate,
      eventTime: formattedTime,
      location,
      createdBy: userId,
    });

    await User.findByIdAndUpdate(userId, { $push: { events: newEvent._id } });

    res.status(201).json({
      success: true,
      message: "Evento creado con éxito",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear el evento",
      error: error.message,
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    // Siempre devuelve un estado 200, incluso si no hay eventos
    res.status(200).json({
      success: true,
      message:
        events.length === 0
          ? "No se encontraron eventos"
          : "Eventos obtenidos correctamente",
      events: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener eventos",
      error: error.message,
    });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("events");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      success: true,
      message: "Eventos del usuario econtrados correctamente",
      events: user.events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener eventos",
      error: error.message,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const { title, description, eventDate, eventTime, location } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Evento no encontrado" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        description,
        eventDate,
        eventTime,
        location,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Evento actualizado correctamente",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el evento",
      error: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Evento no encontrado", id: event });
    }

    await Event.findByIdAndDelete(eventId);
    res
      .status(204)
      .json({ success: true, message: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el evento",
      error: error.message,
    });
  }
};

exports.filterEvents = async (req, res) => {
  try {
    const { date, city, search } = req.query;

    const query = {};

    if (date) {
      query.eventDate = date;
    }

    // Filtro por ciudad
    if (city) {
      query["location.city"] = { $regex: new RegExp(city, "i") };
    }

    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
        { "location.city": { $regex: new RegExp(search, "i") } },
      ];
    }

    const events = await Event.find(query);

    if (events.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No se encontraron eventos con los filtros proporcionados",
      });
    }

    res.status(200).json({
      success: true,
      message: "Eventos filtrados correctamente",
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al filtrar eventos",
      error: error.message,
    });
  }
};
