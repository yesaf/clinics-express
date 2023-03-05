import {Router} from 'express';
import clinicsController from "../controllers/clinicsController";

const router = Router();

router.get('/', clinicsController.getClinics.bind(clinicsController));

export default router;
