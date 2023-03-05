import ClinicsRepository from "../repositories/clinics";
import {Selectors} from "../repositories/types/clinicsTypes";
import {Request, Response} from "express";

class ClinicsController {
    repository: ClinicsRepository;

    constructor() {
        this.repository = new ClinicsRepository();
    }

    public getClinics(req: Request<{}, {}, {}, Selectors>, res: Response) {
        res.status(200).json(this.repository.getClinics(req.query));
    }
}

export default new ClinicsController();
