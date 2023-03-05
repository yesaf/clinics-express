import {Router} from 'express';
import suggestionsController from "../controllers/suggestionsController";

const router = Router();

router.get('/:selector', suggestionsController.getSuggestions.bind(suggestionsController));

export default router;
