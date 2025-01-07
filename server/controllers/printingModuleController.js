import PrintingModuleModel from "../models/printingModule.js";

export const createPrintingModule = async (req, res) => {
  try {
    const newModule = new PrintingModuleModel(req.body);
    await newModule.save();
    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPrintingModule = async (req, res) => {
  try {
    const module = await PrintingModuleModel.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePrintingModule = async (req, res) => {
  try {
    const updatedModule = await PrintingModuleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedModule)
      return res.status(404).json({ message: "Module not found" });
    res.status(200).json(updatedModule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePrintingModule = async (req, res) => {
  try {
    const deletedModule = await PrintingModuleModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedModule)
      return res.status(404).json({ message: "Module not found" });
    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
