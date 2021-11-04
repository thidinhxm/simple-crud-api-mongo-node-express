const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const {validateParam, schemas, validateBody} = require('../helpers/routerHelper')


router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userSchema), UserController.newUser)

router.route('/:userID')
    .get(validateParam(schemas.idSchema, 'userID'), UserController.getUser)
    .put(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), UserController.replaceUser)
    .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), UserController.updateUser)


router.route('/:userID/decks')
    .get(validateParam(schemas.idSchema, 'userID'), UserController.getUserDecks)
    .post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.newOptionalDeckSchema), UserController.newUserDecks)
module.exports = router