const getAllEmployees = async (req, res) => {
    try {
        const employees = await req.context.models.employees.findAll();
        if (employees.length == 0) {
            return res.json({message: 'data not found'})
        }
        return res. json(employees);
    } catch (error) {
        return res.send({ error });
    }
}

const getEmployee = async (req, res) => {
    try {
        const employee = await req.context.models.employees.findOne({
            where: { employee_id: req.params.id }
        });
        if (!employee) {
            return res.json({message: 'data not found'})
        }
        return res.json(employee);
    } catch (error) {
        return res.send({ error });
    }
}

const insertEmployee = async (req, res) => {
    try {
        const employee = await req.context.models.employees.create({
            employee_id: req.body.employee_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            hire_date: req.body.hire_date,
            salary: req.body.salary,
            commission_pct: req.body.commission_pct,
            job_id: req.body.job_id,
            manager_id: req.body.manager_id,
            department_id: req.body.department_id,
            xemp_id: req.body.xemp_id,
        });
        return res.json(employee);
    } catch (error) {
        return res.send({ error });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const employee = await req.context.models.employees.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                hire_date: req.body.hire_date,
                salary: req.body.salary,
                commission_pct: req.body.commission_pct,
                job_id: req.body.job_id,
                manager_id: req.body.manager_id,
                department_id: req.body.department_id,
                xemp_id: req.body.xemp_id
            },
            {
                where: { employee_id: req.params.id }, returning: true
            });
        const [rowsAffected, [updatedData]] = employee;
        if (rowsAffected === 0) {
            return res.status(404).json({ message: "Country not found" });
          }
        return res.json(updatedData);
    } catch (error) {
        return res.send({ error });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const employee = await req.context.models.employees.destroy({
            where: { employee_id: req.params.id }
        });
        return res.send({ message: 'delete ' + employee + ' row' });
    } catch (error) {
        return res.send({ error });
    }
}

export default {
    getAllEmployees,
    getEmployee,
    insertEmployee,
    updateEmployee,
    deleteEmployee
}
