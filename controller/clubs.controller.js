const {fileService} = require("../services");

module.exports = {

    getAll: async (req, res) => {

        const clubs = await fileService.reader();

        res.status(201).json(clubs);

    },
    getById: async (req, res) => {

        const club = await req.club;

        res.status(201).json(club);

    },

    create: async (req, res) => {

        const newClub = req.body;

        const clubs = await fileService.reader();

        const createdClub = {
            id: clubs[clubs.length - 1].id + 1,
            clubName: newClub.clubName,
            yearOfFoundation: newClub.yearOfFoundation
        };

        clubs.push(createdClub);

        await fileService.writer(clubs);

        res.status(201).json(createdClub);

    },

    updateById: async (req, res) => {

        const newClub = req.body;

        const {clubId} = req.params;

        const clubs = await fileService.reader();

        const index = clubs.findIndex(club => club.id === +clubId);

        clubs[index] = {...clubs[index], ...newClub}

        await fileService.writer(clubs);

        res.status(201).json('Updated');

    },

    deleteById: async (req, res) => {

        const {clubId} = req.params;

        const clubs = await fileService.reader();

        const index = clubs.findIndex((user) => user.id === +clubId);

        clubs.splice(index, 1);

        await fileService.writer(clubs);

        res.sendStatus(204);

    }
}