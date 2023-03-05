import { Router } from 'express';
import clinicsRouter from './clinicsRouter';
import suggestionsRouter from './suggestionsRouter';

const mainRouter = Router();

mainRouter.use('/clinics', clinicsRouter);
mainRouter.use('/suggest', suggestionsRouter);

export default mainRouter;
