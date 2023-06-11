import { Router } from "express";
import indexControllers from "../controller/indexControllers.js";

const router = Router();

router.get('/', indexControllers.employeesControllers.getAllEmployees);
router.get('/:id', indexControllers.employeesControllers.getEmployee);
router.post('/', indexControllers.employeesControllers.insertEmployee);
router.put('/:id', indexControllers.employeesControllers.updateEmployee);
router.delete('/:id', indexControllers.employeesControllers.deleteEmployee);

export default router;
