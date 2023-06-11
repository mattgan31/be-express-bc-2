const getAllJobHistories = async (req, res) => {
    try {
        const jobHistories = await req.context.models.job_history.findAll();
        if (jobHistories.length == 0) {
            return res.json({ message: 'data not found' });
        }
        return res. json(jobHistories);
    } catch (error) {
        return res.send({ error });
    }
}

const getJobHistory = async (req, res) => {
    try {
        const jobHistory = await req.context.models.job_history.findOne({
            where: { employee_id: req.params.id }
        });
        if (!jobHistory) {
            return res.json({ message: 'data not found' });
        }
        return res.json(jobHistory);
    } catch (error) {
        return res.send({ error });
    }
}

const insertJobHistory = async (req, res) => {
    try {
        const jobHistory = await req.context.models.job_history.create({
            employee_id: req.body.employee_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            job_id: req.body.job_id,
            department_id: req.body.department_id,
        });
        return res.json(jobHistory);
    } catch (error) {
        return res.send({ error });
    }
}

const updateJobHistory = async (req, res) => {
    try {
        const jobHistory = await req.context.models.job_history.update(
            {
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                job_id: req.body.job_id,
                department_id: req.body.department_id,
            },
            {
                where: { employee_id: req.params.id }, returning: true
            });
        const [rowsAffected, [updatedData]] = jobHistory;
        if (rowsAffected === 0) {
            return res.status(404).json({ message: "Country not found" });
          }
        return res.json(updatedData);
    } catch (error) {
        return res.send({ error });
    }
}

const deleteJobHistory = async (req, res) => {
    try {
        const jobHistory = await req.context.models.job_history.destroy({
            where: { employee_id: req.params.id }
        });
        return res.send({message: 'delete ' + jobHistory + ' row'});
    } catch (error) {
        return res.send({ error });
    }
}

export default {
    getAllJobHistories,
    getJobHistory,
    insertJobHistory,
    updateJobHistory,
    deleteJobHistory
}
