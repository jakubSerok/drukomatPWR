import Order from "../models/orderModel.js";

// Pobieranie wszystkich zamówień (Get all orders)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("UserId")
      .populate("DrukomantID");
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas pobierania zamówień", error: err });
  }
};

// Tworzenie nowego zamówienia (Create a new order)
const createOrder = async (req, res) => {
  const { Status, DrukomantID, CollectionCode, UserId, File } = req.body;

  try {
    const newOrder = new Order({
      Status,
      DrukomantID,
      CollectionCode,
      UserId,
      File,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas dodawania zamówienia", error: err });
  }
};

// Aktualizowanie zamówienia (Update an order)
const updateOrder = async (req, res) => {
  const { _id, Status, CompletionDate, File } = req.body;

  try {
    const order = await Order.findById(_id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Zamówienie nie znaleziono" });
    }

    // Aktualizuj szczegóły zamówienia tylko, jeśli nowe wartości są dostarczone
    order.Status = Status || order.Status;
    order.CompletionDate = CompletionDate || order.CompletionDate;
    order.File = File || order.File;

    await order.save(); // Zapisz zaktualizowane zamówienie

    res.json({
      success: true,
      message: "Zamówienie zaktualizowane pomyślnie",
      order,
    });
  } catch (error) {
    console.error("Błąd podczas aktualizacji zamówienia:", error);
    res.status(500).json({
      success: false,
      message: "Błąd podczas aktualizacji zamówienia",
    });
  }
};

// Usuwanie zamówienia (Delete an order)
const deleteOrder = async (req, res) => {
  const { _id } = req.body; // Pobierz ID zamówienia z ciała żądania

  try {
    const order = await Order.findById(_id); // Znajdź zamówienie po ID

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Zamówienie nie znaleziono" }); // Zwróć 404, jeśli nie znaleziono
    }

    await Order.findByIdAndDelete(_id); // Usuń zamówienie

    res.json({ success: true, message: "Zamówienie usunięte pomyślnie" }); // Zwróć komunikat sukcesu
  } catch (error) {
    console.error("Błąd podczas usuwania zamówienia:", error); // Loguj błąd

    res
      .status(500)
      .json({ success: false, message: "Błąd podczas usuwania zamówienia" }); // Obsługuje błędy
  }
};

// Szukanie zamówień (Search orders)
const searchOrders = async (req, res) => {
  const { collectionCode } = req.query; // Odbieramy CollectionCode z zapytania

  try {
    const orders = await Order.find({
      CollectionCode: new RegExp(collectionCode, "i"),
    }); // Używamy RegExp do wyszukiwania

    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas wyszukiwania zamówień", error: err });
  }
};

export { getAllOrders, createOrder, updateOrder, deleteOrder, searchOrders };
