import { Router } from "express";
import indexControllers from "../controller/indexControllers.js";

const router = Router();

router.get('/', indexControllers.jobHistoryControllers.getAllJobHistories);
router.get('/:id', indexControllers.jobHistoryControllers.getJobHistory);
router.post('/', indexControllers.jobHistoryControllers.insertJobHistory);
router.put('/:id', indexControllers.jobHistoryControllers.updateJobHistory);
router.delete('/:id', indexControllers.jobHistoryControllers.deleteJobHistory);

export default router;
