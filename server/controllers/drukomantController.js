import drukomatModel from "../models/drukomatModel.js";
// Pobieranie wszystkich drukomatów
const getDrukomaty = async (req, res) => {
  try {
    const drukomaty = await drukomatModel.find();
    res.status(200).json(drukomaty);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas pobierania drukomatów", error: err });
  }
};

// Dodawanie nowego drukomatu
const createDrukomat = async (req, res) => {
  const { name, address, city, latitude, longitude, status, description } =
    req.body;

  try {
    const newDrukomat = new drukomatModel({
      name,
      address,
      city,
      latitude,
      longitude,
      status,
      description,
    });

    await newDrukomat.save();
    res.status(201).json(newDrukomat);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas dodawania drukomatu", error: err });
  }
};

// Aktualizowanie drukomatu
const updateDrukomat = async (req, res) => {
  const { id } = req.params;
  const { name, address, city, latitude, longitude, status, description } =
    req.body;

  try {
    const updatedDrukomat = await drukomatModel.findByIdAndUpdate(
      id,
      { name, address, city, latitude, longitude, status, description },
      { new: true }
    );
    if (!updatedDrukomat) {
      return res.status(404).json({ message: "Drukomat nie znaleziony" });
    }
    res.status(200).json(updatedDrukomat);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas aktualizowania drukomatu", error: err });
  }
};

// Usuwanie drukomatu
const deleteDrukomat = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDrukomat = await drukomatModel.findByIdAndDelete(id);
    if (!deletedDrukomat) {
      return res.status(404).json({ message: "Drukomat nie znaleziony" });
    }
    res.status(200).json({ message: "Drukomat usunięty" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas usuwania drukomatu", error: err });
  }
};
const searchDrukomats = async (req, res) => {
  const { city } = req.query; // Odbieramy miasto z zapytania

  try {
    const drukomaty = await drukomatModel.find({ city: new RegExp(city, "i") }); // Używamy RegExp do wyszukiwania

    res.status(200).json(drukomaty);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas wyszukiwania drukomatów", error: err });
  }
};

export {
  getDrukomaty,
  createDrukomat,
  updateDrukomat,
  deleteDrukomat,
  searchDrukomats,
};
