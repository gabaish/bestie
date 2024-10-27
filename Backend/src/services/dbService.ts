import { Pool } from 'pg';
import { User } from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


export const createUser = async (email: string, name: string,  auth: string, externalId: number): Promise<User> => {
    const result = await pool.query('INSERT INTO users (email,name,auth_provider,external_id) VALUES ($1, $2, $3, $4) RETURNING *', [email,name,auth,externalId]);
    return result.rows[0];
}
