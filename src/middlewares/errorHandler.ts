import {Request, Response} from "express";

const errorHandler = (err: Error, req: Request, res: Response) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
}

export default errorHandler;
