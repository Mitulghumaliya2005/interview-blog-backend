// import { registerUser, loginUser } from '../services/auth.service.js';
import { userModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

async function registerUserController(req, res) {
    try {
        console.log('Received registration data:', req.body);

        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            throw new Error('Name, email and password are required');
        }
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        // const user = await registerUser(req.body);
        res.status(201).json({ newUser, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function loginUserController(req, res) {
    try {
        console.log('Received login data:', req.body);
        // const userData = await loginUser(req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = await jwt.sign({
            id: user._id, email: user.email, role: user.role
        },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        if (!token) {
            throw new Error('Failed to generate token');
        }
        return res.status(200).json({
            data: {
                user, token
            }, message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { registerUserController, loginUserController }