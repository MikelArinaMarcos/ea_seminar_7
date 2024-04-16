import { Request, Response } from 'express'

import Post from '../models/Post'

// Función para crear un nuevo post
export async function createPost (req: Request, res: Response): Promise<Response> {
    const { autor, titulo, contenido } = req.body;
    console.log('Creando post');
    const newPost = {
        autor : autor,
        titulo : titulo,
        contenido : contenido
    }
    const post = new Post(newPost); // Creación del nuevo post
    await post.save(); // Se alamacena el nuevo post
    console.log(post);
  
    return res.json({
      message: "Todo creado",
      post
    });
  }
  
// Función para actualizar el post
export async function updatePost(req: Request, res: Response): Promise<Response> {
    const _id = req.params.id;
    const { autor, titulo, contenido } = req.body;
    const post = await Post.findByIdAndUpdate(_id, {
      autor,
      titulo,
      contenido
    }, {new: true});
    return res.json({
      message: "Post actualizado",
      post
    });
}