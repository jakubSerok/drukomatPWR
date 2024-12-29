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
  const { _id, name, address, city, latitude, longitude, status, description } =
    req.body;

  try {
    const drukomat = await drukomatModel.findById(_id);

    if (!drukomat) {
      return res
        .status(404)
        .json({ success: false, message: "Drukomat nie znaleziony" });
    }

    // Update drukomat details only if new values are provided
    drukomat.name = name || drukomat.name;
    drukomat.address = address || drukomat.address;
    drukomat.city = city || drukomat.city;
    drukomat.latitude = latitude || drukomat.latitude;
    drukomat.longitude = longitude || drukomat.longitude;
    drukomat.status = status || drukomat.status;
    drukomat.description = description || drukomat.description;

    await drukomat.save(); // Save the updated drukomat

    res.json({
      success: true,
      message: "Drukomat zaktualizowany pomyślnie",
      drukomat,
    });
  } catch (error) {
    console.error("Błąd podczas aktualizacji drukomatu:", error);
    res
      .status(500)
      .json({ success: false, message: "Błąd podczas aktualizacji drukomatu" });
  }
};

// Usuwanie drukomatu
const deleteDrukomat = async (req, res) => {
  const { _id } = req.body; // Get drukomat ID from the request body

  try {
    const drukomat = await drukomatModel.findById(_id); // Find the drukomat by ID

    if (!drukomat) {
      return res
        .status(404)
        .json({ success: false, message: "Drukomat nie znaleziony" }); // Return 404 if not found
    }

    await drukomatModel.findByIdAndDelete(_id); // Delete the drukomat

    res.json({ success: true, message: "Drukomat usunięty pomyślnie" }); // Return success message
  } catch (error) {
    console.error("Błąd podczas usuwania drukomatu:", error); // Log error

    res
      .status(500)
      .json({ success: false, message: "Błąd podczas usuwania drukomatu" }); // Handle errors
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

// Searching drukomat by ID and returning its details
const getDrukomatById = async (req, res) => {
  const { id } = req.params; // Get drukomat ID from the request parameters

  try {
    const drukomat = await drukomatModel.findById(id); // Find the drukomat by ID

    if (!drukomat) {
      return res
        .status(404)
        .json({ success: false, message: "Drukomat nie znaleziony" }); // Return 404 if not found
    }

    res.status(200).json(drukomat); // Return the found drukomat
  } catch (error) {
    console.error("Błąd podczas wyszukiwania drukomatu:", error); // Log error

    res
      .status(500)
      .json({ success: false, message: "Błąd podczas wyszukiwania drukomatu" }); // Handle errors
  }
};

export {
  getDrukomaty,
  createDrukomat,
  updateDrukomat,
  deleteDrukomat,
  getDrukomatById,
  searchDrukomats,
};
