import WarehouseModel from "../models/warehouseModule.js";

export const createWarehouse = async (req, res) => {
  try {
    const newWarehouse = new WarehouseModel(req.body);
    await newWarehouse.save();
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWarehouse = async (req, res) => {
  try {
    const warehouse = await WarehouseModel.findById(req.params.id);
    if (!warehouse)
      return res.status(404).json({ message: "Warehouse not found" });
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWarehouse = async (req, res) => {
  try {
    const updatedWarehouse = await WarehouseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWarehouse)
      return res.status(404).json({ message: "Warehouse not found" });
    res.status(200).json(updatedWarehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWarehouse = async (req, res) => {
  try {
    const deletedWarehouse = await WarehouseModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedWarehouse)
      return res.status(404).json({ message: "Warehouse not found" });
    res.status(200).json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
