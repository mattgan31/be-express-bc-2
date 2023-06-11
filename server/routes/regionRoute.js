import { Router } from "express";
import indexControllers from "../controller/indexControllers.js";

const router = Router();

router.get('/', indexControllers.regionControllers.getAllRegions);
router.get('/:id', indexControllers.regionControllers.getRegion);
router.post('/', indexControllers.regionControllers.insertRegion);
router.put('/:id', indexControllers.regionControllers.updateRegion);
router.delete('/:id', indexControllers.regionControllers.deleteRegion);
router.get('/query/:id', indexControllers.regionControllers.querySQL);

export default router;
