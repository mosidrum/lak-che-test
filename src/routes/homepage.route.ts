import { Request, Response, Router } from 'express';

const homepageRouter = Router();

homepageRouter.get('/', (_: Request, res: Response) => {
    res.json({ message: 'Welcome to lak che task home test by Isaac Ayodele' });
});

export default homepageRouter;
