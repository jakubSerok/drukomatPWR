import express from "express";
import {
  getDrukomaty,
  createDrukomat,
  updateDrukomat,
  deleteDrukomat,
  searchDrukomats,
  getDrukomatById,
  updateDrukomatWarehouse,
} from "../controllers/drukomantController.js";
const drukomatRouter = express.Router();

// Pobieranie wszystkich drukomatów
drukomatRouter.get("/getDrukomaty", getDrukomaty);

// Dodawanie nowego drukomatu
drukomatRouter.post("/createDrukomat", createDrukomat);

//Szukanie drukarki
drukomatRouter.get("/searchDrukomat", searchDrukomats);

// Aktualizowanie drukomatu
drukomatRouter.post("/edit", updateDrukomat);
// Updating the warehouse ID of a specific drukomat
drukomatRouter.post("/updateWarehouse/:id", updateDrukomatWarehouse);

// Usuwanie drukomatu
drukomatRouter.post("/delete", deleteDrukomat);

// New route to get drukomat by ID
drukomatRouter.get("/drukomaty/:id", getDrukomatById);

export default drukomatRouter;
