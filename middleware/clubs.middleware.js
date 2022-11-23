const {fileService} = require("../services");

const apiError = require('../error/apiError');

module.exports = {

    isClubExist: async (req, res, next) => {

        try {

            const {clubId} = req.params;
            const clubs = await fileService.reader();
            const foundClub = clubs.find(club => club.id === +clubId);

            if (!foundClub) {

                throw new apiError('Club not found', 404);

            }

            req.club = foundClub;
            next();

        } catch (e) {
            next(e);
        }
    },

    isBodyValid: async (req, res, next) => {

        try {

            const {clubName, yearOfFoundation} = req.body;

            if (clubName.length < 3 || typeof clubName !== 'string') {

                // return res.status(400).json('Wrong clubName');

                throw new apiError('Wrong clubName', 400);

            }

            if (yearOfFoundation < 1750 || Number.isNaN(+yearOfFoundation)) {

                // return res.status(400).json('Wrong yearOfFoundation');

                throw new apiError('Wrong yearOfFoundation', 400);

            }

            next();

        } catch (e) {
            next(e);
        }

    }

}