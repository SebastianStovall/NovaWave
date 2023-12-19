import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

const app = express();

app.use(json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // handle errors
  res.status(500).json({ message: err.message }); // since error is specified, will yell at you if you dont return a 500
});


const port = 3000;
app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
});
