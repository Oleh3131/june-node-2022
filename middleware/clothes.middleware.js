const {fileService} = require("../services");

module.exports={

    checkIsClothesExist:async (req,res,next)=>{

        const {clothesId} = req.params;

        const clothes = await fileService.reader();

        const foundClothes = clothes.find(someClothes => someClothes.id === +clothesId);

        if(!foundClothes){

            return res.status(404).json(`Clothes with id ${clothesId} not exist`);

        }

        req.foundClothes = foundClothes;

        next();

    }

}