import { Router } from "express";
import indexControllers from "../controller/indexControllers.js";

const router = Router();

router.get('/', indexControllers.locationControllers.getAllLocations);
router.get('/:id', indexControllers.locationControllers.getLocation);
router.post('/', indexControllers.locationControllers.insertLocation);
router.put('/:id', indexControllers.locationControllers.updateLocation);
router.delete('/:id', indexControllers.locationControllers.deleteLocation);

export default router;
