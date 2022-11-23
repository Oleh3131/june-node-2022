const router = require('express').Router();

const middleware = require('../middleware/clubs.middleware');

const {getAll, getById, create, updateById, deleteById} = require("../controller/clubs.controller");


router.get('/', getAll);

router.get('/:clubId', middleware.isIdValid, middleware.isClubExist, getById);

router.post('/', middleware.isBodyValidCreate, create);

router.put('/:clubId', middleware.isIdValid, middleware.isBodyValidUpdate, middleware.isClubExist, updateById);

router.delete('/:clubId', middleware.isIdValid, middleware.isClubExist, deleteById);


module.exports = router;