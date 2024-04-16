import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";

import User from "../models/User";
import Todo from '../models/Todo';
import IJwtPayload from '../models/JWTPayload';
import { Console } from 'console';
import Post from '../models/Post';

const _SECRET: string = 'api+jwt';



  // https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5

// Función para verificar el token
export async function verifyToken (req: Request, res: Response, next: NextFunction) {
    console.log("verifyToken");
    
    const token = req.header("x-access-token");
    if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    
    const decoded = jwt.verify(token, _SECRET) as IJwtPayload;
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No se ha encontrado el usuario" });

    
    next();

  } catch (error) {
    return res.status(401).json({ message: "No estás autorizado!" });
  }
};

// Función para mirar si un usuario dado es el autor del post
export async function isOwner (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.userId);

    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) return res.status(403).json({ message: "No se ha encontrado el post" });

    if (post.user != req.userId) return res.status(403).json({ message: "No eres el autor" });

    next();

  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

