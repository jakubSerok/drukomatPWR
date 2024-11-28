import express from "express";
import {
  getDrukomaty,
  createDrukomat,
  updateDrukomat,
  deleteDrukomat,
  searchDrukomats,
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

// Usuwanie drukomatu
drukomatRouter.post("/delete", deleteDrukomat);

export default drukomatRouter;
