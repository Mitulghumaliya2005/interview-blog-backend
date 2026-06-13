import {deleteUserController, getUsersController, updateUserController} from '../controllers/user.controller.js';
import Router from 'express';

const router = Router();

router.get('/getUsers', getUsersController);
router.delete('/deleteUser/:id', deleteUserController);
router.put('/updateUser', updateUserController);

export default router;