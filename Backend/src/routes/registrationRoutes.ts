import { Router} from 'express';
import { createUser } from '../controllers/registrationControllers';

const router = Router();

router.post('/users', createUser);

export default router;