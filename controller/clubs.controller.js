const Club = require('../footballСlubDb/Club');

module.exports = {

    getAll: async (req, res, next) => {

        try {
            const clubs = await Club.find();

            res.status(201).json(clubs);

        } catch (e) {
            next(e);
        }


    },
    getById: async (req, res, next) => {

        try {
            const club = await req.club;
            res.status(201).json(club);

        } catch (e) {
            next(e)
        }
    },

    create: async (req, res, next) => {

        try {
            const newClub = req.body;

            const createdClub = await Club.create(newClub);

            res.status(201).json(createdClub);

        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {

        try {
            const newClub = req.body;

            await Club.findByIdAndUpdate(req.params.clubId, newClub);

            res.status(201).json('Updated');

        } catch (e) {
            next(e);
        }
    },

    deleteById: async (req, res,next) => {

        try {

            await Club.deleteOne({_id: req.params.clubId});

            res.sendStatus(204);

        }catch (e){
            next(e)
        }
    }
}