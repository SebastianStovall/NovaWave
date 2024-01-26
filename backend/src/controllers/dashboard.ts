import { RequestHandler } from "express";
import CustomError from "../utils/CustomError";
import { get } from "lodash";
import { getThreeRandomAlbums, getTwoRandomArtists, getUserLikedSongsPlaylist, getRecommendedAlbums } from "../db/actions/dashboard-actions";
import { AlbumDocument, ArtistDocument } from "../db/models/modelTypes";
import { ObjectId } from "mongodb";

// Generates randomized quickplay grid on user sign in
export const generateQuickplayGrid: RequestHandler = async(req, res, next) => {
    try {
        const currentUserId = (get(req, "identity._id") as unknown as string); // key into identify and grab ._id field
        if(!currentUserId) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing (currentUserId)",
                400
            );
        }

        if(!req.body.albums || !req.body.artists) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing (albums and artist info)",
                400
            );
        }

        const albums = req.body.albums.split(',')
        const artists = req.body.artists.split(',')

        let quickplayGrid: (AlbumDocument | ArtistDocument | { _id: ObjectId })[] = []

        // Populate User Quickplay Grid
        const userLikedSongsPlaylist = await getUserLikedSongsPlaylist(currentUserId)
        const randomizedAlbumArray = await getThreeRandomAlbums()
        const randomizedArtistArray = await getTwoRandomArtists()

        quickplayGrid.push(userLikedSongsPlaylist)
        quickplayGrid = quickplayGrid.concat(randomizedAlbumArray, randomizedArtistArray);


        res.status(200).json({message: 'Quickplay Grid Successfully Generated for User', quickplayGrid})

    } catch(e) {
        next(e)
    }
}


export const retreiveRecommendedForToday: RequestHandler = async(req, res, next) => {
    try {
        const recommendedAlbums = await getRecommendedAlbums()
        res.status(200).json({message: 'Recommended Albums For Today', data: recommendedAlbums})

    } catch(e) {
        next(e)
    }
}
