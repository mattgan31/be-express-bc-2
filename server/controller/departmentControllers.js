const getAllDepartments = async (req, res) => {
    try {
        const departments = await req.context.models.departments.findAll();
        if (departments.length == 0) {
            return res.json({message: 'data not found'})
        }
        return res. json(departments);
    } catch (error) {
        return res.send({ error });
    }
}

const getDepartment = async (req, res) => {
    try {
        const department = await req.context.models.departments.findOne({
            where: { department_id: req.params.id }
        });
        if (!department) {
            return res.json({message: 'data not found'})
        }
        return res.json(department);
    } catch (error) {
        return res.send({ error });
    }
}

const insertDepartment = async (req, res) => {
    try {
        const department = await req.context.models.departments.create({
            department_id:req.body.department_id,
            department_name: req.body.department_name,
            manager_id: req.body.manager_id,
            location_id:req.body.location_id
        });
        return res.json(department);
    } catch (error) {
        return res.send({ error });
    }
}

const updateDepartment = async (req, res) => {
    try {
        const department = await req.context.models.departments.update(
            {
                department_name: req.body.department_name,
                manager_id: req.body.manager_id,
                location_id:req.body.location_id
            },
            {
                where: { department_id: req.params.id }, returning: true
            });
        const [rowsAffected, [updatedData]] = department;
        if (rowsAffected === 0) {
            return res.status(404).json({ message: "Country not found" });
          }
        return res.json(updatedData);
    } catch (error) {
        return res.send({ error });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const department = await req.context.models.departments.destroy({
            where: { department_id: req.params.id }
        });
        return res.send({ message: 'delete ' + department + ' row' });
    } catch (error) {
        return res.send({ error });
    }
}

export default {
    getAllDepartments,
    getDepartment,
    insertDepartment,
    updateDepartment,
    deleteDepartment
}
