const router = require('express').Router();

const middleware = require('../middleware/clubs.middleware');
const {getAll, getById, create, updateById, deleteById} = require("../controller/clubs.controller");

router.get('/', getAll);
router.post('/',middleware.checkIsEmailDuplicate ,middleware.isBodyValidCreate, create);

router.get('/:clubId', middleware.isClubExist, getById);
router.put('/:clubId', middleware.isBodyValidUpdate, middleware.isClubExist, updateById);
router.delete('/:clubId', middleware.isClubExist, deleteById);


module.exports = router;