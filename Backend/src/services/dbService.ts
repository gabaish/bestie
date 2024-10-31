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

export const getUserByEmail = async( email:string): Promise<User|null> => {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows.length > 0 ? result.rows[0] : null;
}
