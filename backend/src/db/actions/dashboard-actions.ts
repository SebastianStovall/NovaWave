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
        return { _id: user.likedSongsPlaylistId._id } // only include necessary fields
    } catch(e: any) {
        throw e
    }
}

export const getThreeRandomAlbums = async() => {
    try {
        // Use the aggregate method to perform a random sampling
        const randomAlbums: AlbumDocument[] = await AlbumModel.aggregate([
            { $sample: { size: 3 } }, {
                $project: { // only include necessary fields
                    image: 1,
                    title: 1,
                },
            },
        ]);
        console.log("RANDOM ALBUMS")
        return randomAlbums

    } catch(e: any) {
        console.log("ERROR", e)
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
            { $sample: { size: 2 } }, {
                $project: { // only include necessary fields
                    name: 1,
                    aboutImage: 1,
                },
            },
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

export const getRecommendedAlbums = async() => {
    try {
        const last9Documents: AlbumDocument[] = await AlbumModel.find()
        .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
        .limit(9); // Limit the result to 9 documents

        return last9Documents

    } catch(e: any) {
        throw new CustomError(
            "Query Error",
            "Error While Fetching Recommended Albums",
            500
        );
    }
}
