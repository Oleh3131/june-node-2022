const {fileService} = require("../services");

const customError = require('../error/customError');

module.exports={

    checkIsClothesExist:async (req,res,next)=>{

        try {

            const {clothesId} = req.params;

            const clothes = await fileService.reader();

            const foundClothes = clothes.find(someClothes => someClothes.id === +clothesId);

            if(!foundClothes){

                throw new customError(`Clothes with id ${foundClothes} not exist`,404);

            }
            req.foundClothes = foundClothes;

            next();

        }catch (e){

            next(e);

        }
    }
}