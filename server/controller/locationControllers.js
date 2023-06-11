const getAllLocations = async (req, res) => {
    try {
        const locations = await req.context.models.locations.findAll();
        if (locations.length == 0) {
            return res.json({ message: 'data not found' });
        }
        return res.json(locations);
    } catch (error) {
        return res.send({ error });
    }
}

const getLocation = async (req, res) => {
    try {
        const location = await req.context.models.locations.findOne({
            where: { location_id: req.params.id }
        });
        if (!location) {
            return res.json({ message: 'data not found' });
        }
        return res.json(location);
    } catch (error) {
        return res.send({ error });
    }
}

const insertLocation = async (req, res) => {
    try {
        const location = await req.context.models.locations.create({
            location_id: req.body.location_id,
            street_address: req.body.street_address,
            postal_code: req.body.postal_code,
            city: req.body.city,
            country_id: req.body.country_id,
            state_province: req.body.state_province
        });
        return res.json(location);
    } catch (error) {
        return res.send({ error });
    }
}

const updateLocation = async (req, res) => {
    try {
        const location = await req.context.models.locations.update(
            {
                street_address: req.body.street_address,
                postal_code: req.body.postal_code,
                city: req.body.city,
                country_id: req.body.country_id,
                state_province: req.body.state_province
            },
            {
                where: { location_id: req.params.id }, returning: true
            });
        const [rowsAffected, [updatedData]] = location;
        if (rowsAffected === 0) {
            return res.status(404).json({ message: "Country not found" });
          }
        return res.json(updatedData);
    } catch (error) {
        return res.send({ error });
    }
}

const deleteLocation = async (req, res) => {
    try {
        const location = await req.context.models.locations.destroy({
            where: { location_id: req.params.id }
        });
        return res.send({message: 'delete ' + location + ' row'});
    } catch (error) {
        return res.send({ error });
    }
}

export default {
    getAllLocations,
    getLocation,
    insertLocation,
    updateLocation,
    deleteLocation
}
