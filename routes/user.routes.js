import checkToken from '../Middleware/user_authenticate.js';
import multer from 'multer';
import express from 'express';
import { login, register, fav_movies, add_movie, edit_movie, delete_movie } from '../Controller/user.controller.js'

const get = multer();
const router = express.Router();

// Login API endpoint
router.post('/login', get.any(), login);

// Create a new user
router.post('/register', get.any(), register);

//Favorite movies list
router.get('/fav-movie', get.any(), checkToken, fav_movies);

//Add movie in favrite list
router.post('/add-movie', get.any(), checkToken, add_movie)

//edit movie in favurite list 
router.put('/edit-movie/:id',get.any(), checkToken, edit_movie)

//delete movie in favurite list
router.delete('/delete-movie/:id', checkToken, delete_movie)

export default router; 