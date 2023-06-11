import { Router } from "express";
import indexControllers from "../controller/indexControllers.js";

const router = Router();

router.get('/', indexControllers.jobControllers.getAllJobs);
router.get('/:id', indexControllers.jobControllers.getJob);
router.post('/', indexControllers.jobControllers.insertJob);
router.put('/:id', indexControllers.jobControllers.updateJob);
router.delete('/:id', indexControllers.jobControllers.deleteJob);

export default router;
