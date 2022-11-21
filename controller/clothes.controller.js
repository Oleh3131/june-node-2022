const {fileService} = require("../services");

module.exports = {

    getAll: async (req, res) => {

        const clothes = await fileService.reader();

        res.status(201).json(clothes);

    },

    getById: async (req, res) => {

        res.json(req.foundClothes);

    },

    create: async (req, res) => {

        const createdClothes = req.body;

        const clothes = await fileService.reader();

        const newClothes = {
            id: clothes[clothes.length - 1].id + 1,
            type: createdClothes.type,
            price: createdClothes.price
        }

        clothes.push(newClothes);

        await (fileService.writer(clothes));

        res.status(201).json(newClothes);

    },

    updateById: async (req, res) => {

        const {newClothes} = req.body;

        const {clothesId} = req.params;

        const clothes = await fileService.reader();

        const index = clothes.findIndex((someClothes) => someClothes.id === +clothesId);

        if (index === -1) {

            return res.status(404).json(`Clothes with id ${clothesId} not exist`);

        }

        clothes[index] = {...clothes[index], ...newClothes};

        await fileService.writer(clothes);

        res.status(201).json('Updated');

    },

    deleteById: async (req, res) => {

        const {clothesId} = req.params;

        const clothes = await fileService.reader();

        const index = clothes.findIndex((someClothes) => someClothes.id === +clothesId);

        if (index === -1) {

            return res.status(404).json(`Clothes with id ${clothesId} not exist`);

        }

        clothes.splice(index, 1);

        await fileService.writer(clothes);

        res.sendStatus(204);

    }

}