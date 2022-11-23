const router = require('express').Router();

const middleware = require('../middleware/clubs.middleware');

const {getAll, getById, create, updateById, deleteById} = require("../controller/clubs.controller");


router.get('/', getAll);

router.get('/:clubId',middleware.isClubExist,getById);

router.post('/',middleware.isClubExist,middleware.isBodyValid,create);

router.put('/:clubId',updateById);

router.delete('/:clubId',deleteById);


module.exports = router;