const {fileService} = require("../services");

module.exports={

    isClubExist:async (req,res,next)=>{

        const {clubId} = req.params;

        const clubs = await fileService.reader();

        const foundClub = clubs.find(club => club.id === +clubId);

        if(!foundClub){

            throw new Error('Club not found');

        }

        req.club = foundClub;

        next();

    }

}