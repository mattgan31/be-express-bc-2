const getAllCountries = async (req, res) => {
    try {
        const countries = await req.context.models.countries.findAll();
        if (countries.length == 0) {
            return res.json({message: 'data not found'})
        }
        return res. json(countries);
    } catch (error) {
        return res.json({error: error});
    }
}

const getCountry = async (req, res) => {
    try {
        const country = await req.context.models.countries.findOne({
            where: { country_id: req.params.id }
        });
        if (!country) {
            return res.json({message: 'data not found'})
        }
        return res.json(country);
    } catch (error) {
        return res.json({error: error});
    }
}

const insertCountry = async (req, res) => {
    try {
        const country = await req.context.models.countries.create({
            country_id: req.body.country_id,
            country_name: req.body.country_name,
            region_id: req.body.region_id
        });
        return res.json(country);
    } catch (error) {
        return res.json({error: error});
    }
}

const updateCountry = async (req, res) => {
    try {
        const country = await req.context.models.countries.update(
            {
                country_name: req.body.country_name,
                region_id: req.body.region_id
            },
            {
                where: { country_id: req.params.id }, returning: true
            });
        const [rowsAffected, [updatedData]] = country;
        if (rowsAffected === 0) {
            return res.status(404).json({ message: "Country not found" });
          }
        return res.json(updatedData);
    } catch (error) {
        return res.json({error: error});
    }
}

const deleteCountry = async (req, res) => {
    try {
        const country = await req.context.models.countries.destroy({
            where: { country_id: req.params.id }
        });
        return res.send({ message: 'delete ' + country + ' row' });
    } catch (error) {
        return res.json({error: error});
    }
}

export default {
    getAllCountries,
    getCountry,
    insertCountry,
    updateCountry,
    deleteCountry
}
