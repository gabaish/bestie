import { Request, Response } from 'express';
import { User } from '../models/user';
import * as dbService from '../services/dbService';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const createUser = async(req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
        const newUser = await dbService.createUser(user.email, user.name, hashedPassword);
        res.status(201).json(newUser);
    } catch(error){
        console.error("Error creating user this one:", error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const login = async(req: Request, res: Response) => {
    try {
        const user = await dbService.getUserByEmail(req.body.email);
        if (!user) res.status(404).json({ message: 'User not found' });
        else {
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            //const isPasswordCorrect = (user.password == req.body.password);
            if (!isPasswordCorrect) res.status(401).json({ message: 'Incorrect password' });
            else{
                res.status(200).json(user);
            }
        }   
    } catch(error){
        console.error('Error logging in: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};