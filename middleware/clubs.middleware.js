const apiError = require('../error/apiError');
const Club = require('../footballСlubDb/Club');

module.exports = {

    isClubExist: async (req, res, next) => {
        try {
            const {clubId} = req.params;

            const foundClub = await Club.findById(clubId);

            if (!foundClub) {

                throw new apiError('Club not found', 404);

            }

            req.club = foundClub;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkIsEmailDuplicate: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {

                throw new apiError('Email not present', 400);

            }

            const foundClub = await Club.findOne({email});

            if (foundClub) {

                throw new apiError('Club with this email already exist', 409);

            }

            req.club = foundClub;

            next();

        } catch (e) {
            next(e);
        }
    },

    isBodyValidCreate: (req, res, next) => {

        try {
            const {clubName, yearOfFoundation} = req.body;

            if (!clubName || clubName.length < 3 || typeof clubName !== 'string') {

                throw new apiError('Wrong clubName', 400);

            }

            if (!yearOfFoundation || yearOfFoundation < 1750 || Number.isNaN(+yearOfFoundation)) {

                throw new apiError('Wrong yearOfFoundation', 400);

            }

            next();

        } catch (e) {
            next(e);
        }
    },

    isBodyValidUpdate: (req, res, next) => {

        try {
            const {clubName, yearOfFoundation} = req.body;

            if (clubName && (clubName.length < 3 || typeof clubName !== 'string')) {

                throw new apiError('Wrong clubName', 400);

            }

            if (yearOfFoundation && (yearOfFoundation < 1750 || Number.isNaN(+yearOfFoundation))) {

                throw new apiError('Wrong yearOfFoundation', 400);

            }

            next();

        } catch (e) {
            next(e);
        }
    }
}