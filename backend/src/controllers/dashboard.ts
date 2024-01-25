import { RequestHandler } from "express";
import CustomError from "../utils/CustomError";
import { get } from "lodash";
import { getThreeRandomAlbums, getTwoRandomArtists, getUserLikedSongsPlaylist } from "../db/actions/dashboard-actions";
import { AlbumDocument, ArtistDocument, PlaylistDocument } from "../db/models/modelTypes";

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

        let quickplayGrid: (AlbumDocument | ArtistDocument | PlaylistDocument)[] = []

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
