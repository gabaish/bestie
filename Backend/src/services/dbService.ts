import { Pool } from 'pg';
import { User } from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


export const createUser = async (email: string, name: string, password:string): Promise<User> => {
    const result = await pool.query('INSERT INTO users (email,name,password) VALUES ($1, $2, $3) RETURNING *', [email,name,password]);
    return result.rows[0];
}
