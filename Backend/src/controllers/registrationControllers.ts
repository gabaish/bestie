import { Request, Response } from 'express';
import { User } from '../models/user';
import * as dbService from '../services/dbService';

export const createUser = async(req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const newUser = await dbService.createUser(user.name, user.email, user.auth_provider, user.external_id);
        res.status(201).json(newUser);
    } catch(error){
        console.error("Error creating user this one:", error);
        res.status(500).json({ message: 'Error creating user' });
    }
};