import { userModel } from '../models/user.model.js';

async function getUsersController(req, res) {
    try {
        const users = await userModel.find({role: 'user'}).select('-password');
        res.status(200).json({ data: users, message: 'Users fetched successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUserController(req, res) {
    try {
        const { id, name, email } = req.body;
        if (!id) {
            throw new Error('User ID is required');
        }
        const user = await userModel
            .findByIdAndUpdate(id, { name, email }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ data: user, message: 'User updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUserController(req, res) {
    try {
        console.log("deleteUserController: ", deleteUserController);
        
        const { id } = req.params;
        if (!id) {
            throw new Error('User ID is required');
        }
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ data: user, message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export { getUsersController, deleteUserController, updateUserController };