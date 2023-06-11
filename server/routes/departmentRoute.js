import { Router } from "express";
import indexControllers from "../controller/indexControllers.js";

const router = Router();

router.get('/', indexControllers.departmentControllers.getAllDepartments);
router.get('/:id', indexControllers.departmentControllers.getDepartment);
router.post('/', indexControllers.departmentControllers.insertDepartment);
router.put('/:id', indexControllers.departmentControllers.updateDepartment);
router.delete('/:id', indexControllers.departmentControllers.deleteDepartment);

export default router;
