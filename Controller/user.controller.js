import prisma from "../DB/db.config.js";
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
// Extract the verify function from the jwt module
const { sign } = jwt;
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(200).json(
                {
                    status: "failed",
                    message: 'Please register as you are not in our records'
                }
            );
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json(
                {
                    status: "failed",
                    message: 'Invalid username or password'
                });
        }

        // Generate JWT token
        const token = sign({ userId: user.id }, 'mysecretkey', {
            expiresIn: '1h', // Token expiration time (1 hour in this case)
        });

        res.status(200).json({ status: "success", message: 'Successfully Login', data: user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to log in' });
    }
}

export const register = async (req, res) => {
    
    try {         
        const { full_name, email, password } = req.body;
        // Check for null or empty values
        if (!full_name || !email || !password) {
            return res.status(400).json({ status: "failed", message: 'Please provide all required fields.' });
        }
        const findEmail = await prisma.user.findUnique({
            where: { email }
        })
        if (findEmail) {
            return res.status(400).json({ status: "failed", message: 'Please Use New Email ,This Email Already Register In Our Record' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                full_name,
                email,
                password: hashedPassword,
            },
        });
        return res.status(200).json({ status: "success", data: user });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Failed to create user.' });
    }
}

export const fav_movies = async (req, res) => {
    const userId = req.decoded.userId;

    // // Define pagination parameters
    // const page = parseInt(req.body.page) || 1; // Default to page 1 if not provided
    // const pageSize = parseInt(req.body.pageSize) || 10; // Default to a page size of 10 if not provided

    try {
        // Calculate the offset based on the page and page size
        // const offset = (page - 1) * pageSize;

        // Query movies with pagination
        const movies = await prisma.movie.findMany({
            where: { userId },
            // skip: offset,
            // take: pageSize,
        });
        // Count the total number of movies for the user
        // const totalMovies = await prisma.movie.count({
        //     where: { userId },
        // });

        // Calculate total pages based on totalMovies and pageSize
        // const totalPages = Math.ceil(totalMovies / pageSize);

        res.status(200).json({
            status: "success",
            movies
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
}

export const add_movie = async (req, res) => {
    const userId = req.decoded.userId;
    const { name, rating, cast, genre, releaseDate } = req.body;
    try {
        // Check for null or empty values
        if (!name || !rating || !cast || !genre || !releaseDate) {
            return res.status(400).json({ status: "failed", message: 'Please provide all required fields.' });
        }
        const floatRating = Number(rating)
        const castArray = cast.split(',');
        const releaseDateISO = new Date(releaseDate).toISOString();
        const movie = await prisma.movie.create({
            data: {
                name,
                rating: floatRating,
                cast: castArray,
                genre,
                releaseDate: releaseDateISO,
                userId,
            },
        });

        res.status(200).json(
            {
                status: "success",
                message: "Successfully Movie Added",
                data: movie
            });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Error adding a movie' });
    }
};

export const edit_movie = async (req, res) => {
    const userId = req.decoded.userId;
    const movieId = req.params.id; // Assuming you have a route parameter for the movie ID
    const { name, rating, cast, genre, releaseDate } = req.body;

    try {
          // Check for null or empty values
          if (!name || !rating || !cast || !genre || !releaseDate) {
            return res.status(400).json({ status: "failed", message: 'Please provide all required fields.' });
        }
        const floatRating = Number(rating)
        const castArray = cast.split(',');
        const releaseDateISO = new Date(releaseDate).toISOString();
        const movie = await prisma.movie.update({
            where: { id: Number(movieId), userId }, // Ensure the movie belongs to the user
            data: {
                name,
                rating: floatRating,
                cast: castArray,
                genre,
                releaseDate: releaseDateISO,
            },
        });

        res.status(200).json(
            {
                status: "success",
                message: "Successfully Movie Edited",
                data: movie
            });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Error editing the movie' });
    }
};

export const delete_movie = async (req, res) => {
    const userId = req.decoded.userId;
    const movieId = req.params.id; // Assuming you have a route parameter for the movie ID

    try {
        await prisma.movie.delete({
            where: { id: Number(movieId), userId }, // Ensure the movie belongs to the user
        });

        res.status(200).json({ status: "success", message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ status: "failed", message: 'Error deleting the movie' });
    }
};