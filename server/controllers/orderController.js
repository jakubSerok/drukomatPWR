import Order from "../models/orderModel.js";

// Pobieranie wszystkich zamówień (Get all orders)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Błąd podczas pobierania zamówień", error: err });
  }
};
const getUserOrders = async (req, res) => {
  console.log("User  ID from request Profile featcg:", req.user); // Debugging line

  try {
    // Find all orders for the user
    const orders = await Order.find({ UserId: req.user.id }); // Match orders by UserId

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json(orders); // Return the list of orders
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      message: "Error fetching orders for the user",
      error: error.message,
    });
  }
};

// Tworzenie nowego zamówienia (Create a new order)
const createOrder = async (req, res) => {
  const {
    Status,
    DrukomantID,
    CollectionCode,
    UserId,
    File: { DraftID, UserFile, Quantity, Color, Format },
  } = req.body;

  try {
    const newOrder = new Order({
      Status,
      DrukomantID,
      CollectionCode,
      UserId,
      File: {
        DraftID,
        UserFile,
        Quantity,
        Color,
        Format,
      },
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
  const {
    _id,
    Status,
    CompletionDate,
    DrukomantID,
    CollectionCode,
    UserId,
    File,
  } = req.body;

  try {
    // Find the order by ID
    const order = await Order.findById(_id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Zamówienie nie znaleziono", // Order not found
      });
    }

    // Update only provided fields
    if (Status !== undefined) order.Status = Status;
    if (CompletionDate) order.CompletionDate = CompletionDate;
    if (DrukomantID) order.DrukomantID = DrukomantID;
    if (CollectionCode) order.CollectionCode = CollectionCode;
    if (UserId) order.UserId = UserId;

    // Update the File object if provided
    if (File) {
      order.File = {
        ...order.File, // Keep existing fields if not updated
        DraftID: File.DraftID !== undefined ? File.DraftID : order.File.DraftID,
        UserFile:
          File.UserFile !== undefined ? File.UserFile : order.File.UserFile,
        Quantity:
          File.Quantity !== undefined ? File.Quantity : order.File.Quantity,
        Color: File.Color !== undefined ? File.Color : order.File.Color,
        Format: File.Format !== undefined ? File.Format : order.File.Format,
      };
    }

    await order.save(); // Save the updated order to the database

    res.json({
      success: true,
      message: "Zamówienie zaktualizowane pomyślnie", // Order updated successfully
      order,
    });
  } catch (error) {
    console.error("Błąd podczas aktualizacji zamówienia:", error); // Error during update
    res.status(500).json({
      success: false,
      message: "Błąd podczas aktualizacji zamówienia", // Error message
      error,
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

export {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  searchOrders,
  getUserOrders,
};
