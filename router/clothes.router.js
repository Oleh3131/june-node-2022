const router = require('express').Router();

const {getAll, getById, create, updateById, deleteById} = require("../controller/clothes.controller");
const middleware = require('../middleware/clothes.middleware');

router.get('/', getAll);

router.get('/:clothesId',middleware.checkIsClothesExist,getById);

router.post('/',create);

router.put('/:clothesId',middleware.checkIsClothesExist, updateById);

router.delete('/:clothesId', deleteById);

module.exports = router;