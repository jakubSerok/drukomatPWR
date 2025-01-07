import DraftModel from "../models/draftModel.js";

// Pobieranie wszystkich draftów
const getDrafts = async (req, res) => {
  try {
    const drafts = await DraftModel.find();
    res.status(200).json(drafts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas pobierania draftów", error: err });
  }
};

// Dodawanie nowego draftu
const createDraft = async (req, res) => {
  const { Name, DraftFile } = req.body;

  try {
    const newDraft = new DraftModel({
      Name,
      DraftFile, // Convert base64 to binary
    });

    await newDraft.save();
    res.status(201).json(newDraft);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas dodawania draftu", error: err });
  }
};

// Aktualizowanie draftu
const updateDraft = async (req, res) => {
  const { _id, DraftFile } = req.body;

  try {
    const draft = await DraftModel.findById(_id);

    if (!draft) {
      return res
        .status(404)
        .json({ success: false, message: "Draft nie znaleziony" });
    }

    draft.DraftFile = Buffer.from(DraftFile, "base64"); // Update binary data

    await draft.save();
    res.json({
      success: true,
      message: "Draft zaktualizowany pomyślnie",
      draft,
    });
  } catch (error) {
    console.error("Błąd podczas aktualizacji draftu:", error);
    res
      .status(500)
      .json({ success: false, message: "Błąd podczas aktualizacji draftu" });
  }
};

// Usuwanie draftu
const deleteDraft = async (req, res) => {
  const { _id } = req.body;

  try {
    const draft = await DraftModel.findById(_id);

    if (!draft) {
      return res
        .status(404)
        .json({ success: false, message: "Draft nie znaleziony" });
    }

    await DraftModel.findByIdAndDelete(_id);
    res.json({ success: true, message: "Draft usunięty pomyślnie" });
  } catch (error) {
    console.error("Błąd podczas usuwania draftu:", error);
    res
      .status(500)
      .json({ success: false, message: "Błąd podczas usuwania draftu" });
  }
};

export { getDrafts, createDraft, updateDraft, deleteDraft };
