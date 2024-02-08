import { RequestHandler } from "express";
import CustomError from "../utils/CustomError";
import { get } from "lodash";
import { getQuickplayDocuments, addEntityToRecents, getRecommended, getPopularArtists, getRecentlyViewed } from "../db/actions/dashboard-actions";


export const addEntityToRecentlyViewed: RequestHandler = async (req, res, next) => {
    try {
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const { mediaId, mediaType } = req.body;

        if(!mediaId || !mediaType) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing in the request body",
                400
            );
        }

        if(mediaType !== 'artist' && mediaType !== 'album' && mediaType !== 'playlist') {
            throw new CustomError(
                "Bad Request",
                `Entity type ${mediaType} is invalid`,
                400
            );
        }

        const wasAdded = await addEntityToRecents(currentUserId, mediaId, mediaType)

        if(wasAdded === 'added to recents') {
            return res.status(200).json({ message: `${mediaType} has been added to user's recently viewed`});
        } else {
            return res.status(200).json({ message: `${mediaType} is already in user's recently viewed.`});
        }

    } catch(e) {
        next(e)
    }
}


export const buildQuickplayGrid: RequestHandler = async (req, res, next) => {
    try {
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field

        const gridItems = await getQuickplayDocuments(currentUserId)

        res.status(200).json({message: 'Quickplay grid successfully created', quickplayGrid: gridItems})

    } catch (e) {
        next(e)
    }
};


export const getDashboardGrids: RequestHandler = async(req, res, next) => {
    try {
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field

        const recommendedAlbums = await getRecommended()
        const popularArtists = await getPopularArtists()
        const recentlyViewed = await getRecentlyViewed(currentUserId)

        res.status(200).json({message: 'Grid Info Retreived Successfully', recommendedAlbums, popularArtists, recentlyViewed})
    } catch (e) {
        next(e)
    }
}
