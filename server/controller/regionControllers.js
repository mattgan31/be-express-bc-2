import { sequelize } from "../models/init-models.js";

const getAllRegions = async (req, res) => {
    try {
        const regions = await req.context.models.regions.findAll();
        if (regions.length == 0) {
            return res.json({ message: 'data not found' });
        }
        return res. json(regions);
    } catch (error) {
        return res.send({ error });
    }
}

const getRegion = async (req, res) => {
    try {
        const region = await req.context.models.regions.findOne({
            where: { region_id: req.params.id }
        });
        if (!region) {
            return res.json({ message: 'data not found' });
        }
        return res.json(region);
    } catch (error) {
        return res.send({ error });
    }
}

const insertRegion = async (req, res) => {
    try {
        const region = await req.context.models.regions.create({
            region_name: req.body.region_name
        });
        return res.json(region);
    } catch (error) {
        return res.send({ error });
    }
}

const updateRegion = async (req, res) => {
    try {
        const region = await req.context.models.regions.update(
            {
                region_name: req.body.region_name
            },
            {
                where: { region_id: req.params.id }, returning: true
            });
        const [rowsAffected, [updatedData]] = region;
        if (rowsAffected === 0) {
            return res.status(404).json({ message: "Country not found" });
          }
        return res.json(updatedData);
    } catch (error) {
        return res.send({ error });
    }
}

const deleteRegion = async (req, res) => {
    try {
        const region = await req.context.models.regions.destroy({
            where: { region_id: req.params.id }
        });
        return res.send({ message: 'delete ' + region + ' row' });
    } catch (error) {
        return res.send({ error });
    }
}

const querySQL = async (req, res)=>{
    try {
        await sequelize.query('select * from regions where region_id = :id',
            { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT }
        ).then(result => {
            return res.send({result});
        });
    } catch (error) {
        return res.send({ error });
    }
}

export default {
    getAllRegions,
    getRegion,
    insertRegion,
    updateRegion,
    deleteRegion,
    querySQL
}
