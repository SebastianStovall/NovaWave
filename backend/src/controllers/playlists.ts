import { RequestHandler } from "express";
import { initNewPlaylist } from "../db/actions/playlist-actions";
import CustomError from "../utils/CustomError";
import { get } from "lodash";


export const createNewPlaylist: RequestHandler = async (req, res) => {
    try {
        const userId = get(req, "identity._id") as unknown as string; // key into identify and grab ._id field
        const userPlaylists = get(req, "identity.playlists") as unknown as Array<string>; // key into identify and grab ._id field

        const playlist = await initNewPlaylist(userId, userPlaylists.length)

        if(!playlist) {
            throw new CustomError(
                "CreationError",
                "Error while creating new playlist",
                500
            );
        }

        res.status(201).json({message: 'Successfully Created Playlist'})

    } catch (e: any) {
        if (e instanceof CustomError) {
            res.status(e.code).json({ message: e.name, error: e.message });
        } else {
        res.status(500).json({ message: "Internal Server Error", error: e.message });
        }
    }
};
