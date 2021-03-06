import { Request, Response, Router } from 'express';
import UserRepository from '../infrastructures/UserRepository';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const userRepository = new UserRepository();
    const results = await userRepository.fetchAll();
    if (results) {
      res.status(200);
      res.send(results);
    } else {
      res.status(204);
      res.json({
        message: 'No User',
      });
    }
  } catch (err) {
    res.status(409);
    res.json({
      message: err.toString(),
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  console.log({ params: req.params });
  try {
    const userRepository = new UserRepository();
    const results = await userRepository.fetch(req.params.id);

    if (results) {
      res.status(200);
      res.send(results);
    } else {
      res.status(204);
      res.json({
        message: 'No User',
      });
    }
  } catch (err) {
    res.status(409);
    res.json({
      message: err.toString(),
    });
  }
});

router.post('/', async (req: Request, res: Response) => {
  console.log({ body: req.body });
  try {
    const userRepository = new UserRepository();
    const results = await userRepository.save(req.body);

    res.status(201);
    res.send(results);
  } catch (err) {
    res.status(409);
    res.json({
      message: err.toString(),
    });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  console.log({
    params: req.params,
    body: req.body,
  });
  try {
    const userRepository = new UserRepository();
    const results = await userRepository.update(req.params.id, req.body);

    res.status(200);
    res.send(results);
  } catch (err) {
    res.status(409);
    res.json({
      message: err.toString(),
    });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  console.log({ params: req.params });
  try {
    const userRepository = new UserRepository();
    await userRepository.delete(req.params.id);

    res.json({
      message: 'ok',
    });
  } catch (err) {
    res.status(409);
    res.json({
      message: err.toString(),
    });
  }
});

export default router;
