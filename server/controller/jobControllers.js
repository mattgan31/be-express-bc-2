const getAllJobs = async (req, res) => {
    try {
        const jobs = await req.context.models.jobs.findAll();
        if (jobs.length == 0) {
            return res.json({message: 'data not found'})
        }
        return res. json(jobs);
    } catch (error) {
        return res.send({ error });
    }
}

const getJob = async (req, res) => {
    try {
        const job = await req.context.models.jobs.findOne({
            where: { job_id: req.params.id }
        });
        if (!job) {
            return res.json({ message: 'data not found' });
        }
        return res.json(job);
    } catch (error) {
        return res.send({ error });
    }
}

const insertJob = async (req, res) => {
    try {
        const job = await req.context.models.jobs.create({
            job_id: req.body.job_id,
            job_title: req.body.job_title,
            min_salary: req.body.min_salary,
            max_salary: req.body.max_salary
        });
        return res.json(job);
    } catch (error) {
        return res.send({ error });
    }
}

const updateJob = async (req, res) => {
    try {
        const job = await req.context.models.jobs.update(
            {
                job_title: req.body.job_title,
                min_salary: req.body.min_salary,
                max_salary: req.body.max_salary
            },
            {
                where: { job_id: req.params.id }, returning: true
            });
        const [rowsAffected, [updatedData]] = job;
        if (rowsAffected === 0) {
            return res.status(404).json({ message: "Country not found" });
          }
        return res.json(updatedData);
    } catch (error) {
        return res.send({ error });
    }
}

const deleteJob = async (req, res) => {
    try {
        const job = await req.context.models.jobs.destroy({
            where: { job_id: req.params.id }
        });
        return res.send({ message: 'delete ' + job + ' row' });
    } catch (error) {
        return res.send({ error });
    }
}

export default {
    getAllJobs,
    getJob,
    insertJob,
    updateJob,
    deleteJob
}
