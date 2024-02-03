import { RequestHandler } from "express";
import CustomError from "../utils/CustomError";
import { get } from "lodash";
import { getQuickplayDocuments } from "../db/actions/dashboard-actions";
import { addEntityToRecents } from "../db/actions/dashboard-actions";


export const addEntityToRecentlyViewed: RequestHandler = async (req, res, next) => {
    try {
        const currentUserId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const { entityId, entityType } = req.body;

        if(!entityId || !entityType) {
            throw new CustomError(
                "Bad Request",
                "Entity information is missing in the request body",
                400
            );
        }

        if(entityType !== 'artist' && entityType !== 'album' && entityType !== 'playlist') {
            throw new CustomError(
                "Bad Request",
                `Entity type ${entityType} is invalid`,
                400
            );
        }

        const wasAdded = await addEntityToRecents(currentUserId, entityId, entityType)

        if(wasAdded === 'added to recents') {
            return res.status(200).json({ message: `${entityType} has been added to user's recently viewed`});
        } else {
            return res.status(200).json({ message: `${entityType} is already in user's recently viewed.`});
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
