import { UserModel } from "../models/User";
import { AlbumModel } from "../models/Album";
import { ArtistModel } from "../models/Artist";
import CustomError from "../../utils/CustomError";
import { UserDocumentPopulatedWithLikedSongs, AlbumDocument, ArtistDocument } from "../models/modelTypes";

export const getUserLikedSongsPlaylist = async(userId: string) => {
    try {
        const user: UserDocumentPopulatedWithLikedSongs | null = await UserModel.findById({_id: userId}).populate({path: 'likedSongsPlaylistId'})
        if(!user) {
            throw new CustomError(
                "Query Error",
                "Error While Fetching User Liked Songs",
                500
            );
        }
        return user.likedSongsPlaylistId
    } catch(e: any) {
        throw e
    }
}

export const getThreeRandomAlbums = async() => {
    try {
        // Use the aggregate method to perform a random sampling
        const randomAlbums: AlbumDocument[] = await AlbumModel.aggregate([
            { $sample: { size: 3 } }
        ]);
        return randomAlbums

    } catch(e: any) {
        throw new CustomError(
            "Query Error",
            "Error While Fetching Random Albums",
            500
        );
    }
}

export const getTwoRandomArtists = async() => {
    try {
        // Use the aggregate method to perform a random sampling
        const randomArtists: ArtistDocument[] = await ArtistModel.aggregate([
            { $sample: { size: 2 } }
        ]);
        return randomArtists

    } catch(e: any) {
        throw new CustomError(
            "Query Error",
            "Error While Fetching Random Artists",
            500
        );
    }
}
