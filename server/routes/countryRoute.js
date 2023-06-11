import { Router } from "express";
import indexControllers from "../controller/indexControllers.js";

const router = Router();

router.get('/', indexControllers.countryControllers.getAllCountries);
router.get('/:id', indexControllers.countryControllers.getCountry);
router.post('/', indexControllers.countryControllers.insertCountry);
router.put('/:id', indexControllers.countryControllers.updateCountry);
router.delete('/:id', indexControllers.countryControllers.deleteCountry);

export default router;
