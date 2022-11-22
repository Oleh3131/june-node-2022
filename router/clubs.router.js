const router = require('express').Router();

const {getAll, getById, create, updateById, deleteById} = require("../controller/clubs.controller");


router.get('/', getAll);

router.get('/:clubId',getById);

router.post('/',create);

router.put('/:clubId',updateById);

router.delete('/:clubId',deleteById);


module.exports = router;