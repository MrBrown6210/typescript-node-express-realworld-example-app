import { NextFunction, Request, Response } from "express";
import { Document, Model } from "mongoose";

export const CRUD = (model: Model<Document, {}>) => {
  const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = new model(req.body[model.modelName.toLowerCase()]);
      await doc.save();
      res.json(doc);
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, skip, search } = req.query;
      let q = {};

      try {
        if (typeof search === "string") {
          q = JSON.parse(search);
        }
      } catch {}

      let query = model.find(q);

      if (Number(limit)) {
        query = query.limit(Number(limit));
      }

      if (Number(skip)) {
        query = query.limit(Number(skip));
      }

      const docs = await query.exec();
      res.json(docs);
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await model.findById(req.params.id);
      if (!doc) return res.sendStatus(404);
      res.json(doc);
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await model.findByIdAndUpdate(
        req.params.id,
        req.body[model.modelName.toLowerCase()],
        { new: true } // return edited doc
      );
      if (!doc) return res.sendStatus(404);
      res.json(doc);
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  const clear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await model.findByIdAndDelete(req.params.id);
      if (!doc) return res.sendStatus(404);
      res.sendStatus(204);
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  return { create, list, get, edit, clear };
};
