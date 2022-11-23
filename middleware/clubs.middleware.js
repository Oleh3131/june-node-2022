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
            req.clubs = clubs;

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
    },

    isIdValid: (req,res,next) => {

        try {
            const {clubId} = req.params;

            if(clubId<0 || Number.isNaN(+clubId)){

                throw new apiError('Not valid ID', 400);

            }
        }catch (e){
            next(e);
        }
    }
}