const {fileService} = require("../services");

const apiError = require('../error/apiError');

module.exports={

    isClubExist:async (req,res,next)=>{

        try {

            const {clubId} = req.params;
            const clubs = await fileService.reader();
            const foundClub = clubs.find(club => club.id === +clubId);

            if(!foundClub){

                throw new apiError('Club not found',404);

            }

            req.club = foundClub;
            next();

        }catch (e){
            next(e);
        }
    }
}