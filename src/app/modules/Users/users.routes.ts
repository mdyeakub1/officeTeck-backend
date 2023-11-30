import express from 'express'
import { UserController } from './users.controller'

const router = express.Router()

router.post('/create-user', UserController.createUser)
router.get('/', UserController.getAllUser)
router.get('/:id', UserController.getSingleUser)
router.delete('/:id', UserController.deleteUser)
router.patch('/:id', UserController.updateUser)


export const UserRouter = router