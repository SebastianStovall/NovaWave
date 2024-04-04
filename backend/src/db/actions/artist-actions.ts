import { UserModel } from "../models/User";
import { ArtistModel } from "../models/Artist";
import CustomError from "../../utils/CustomError";
import { ArtistDocument, TrackDocument, AlbumDocument, ArtistDocumentPopulated } from "../models/modelTypes";
import { TrackModel } from "../models/Track";

export const addArtistToRecents = async(userId: string, artistId: string) => {
    try {
        const artist: ArtistDocument | null = await ArtistModel.findById(artistId);

        if(!artist) {
            throw new CustomError(
                "Query Error",
                "Error While Fetching Artist Document",
                500
            );
        }

        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { recentlyViewed: artistId } },
        );

    } catch(e: any) {
        throw e
    }
}

export const getTopSongs = async(artistId: string) => {
    try {
        const artist: ArtistDocument | null = await ArtistModel.findById(artistId);
            if(!artist) {
                throw new CustomError(
                    "Query Error",
                    `${artistId} document could not be found`,
                    500
                );
            }

        const topSongs: TrackDocument[] = await TrackModel
        .find({ artist: artistId }) // Filter tracks by artistId
        .sort({ plays: -1 }) // Sort in descending order based on plays
        .limit(5); // Limit to top 5 tracks

        return topSongs;

    } catch(e: any) {
        throw e
    }
}


export const getArtistInfo = async(artistId: string) => {
    try {
        const artist: ArtistDocumentPopulated | null = await ArtistModel.findById(artistId).populate('discography');
            if(!artist) {
                throw new CustomError(
                    "Query Error",
                    `${artistId} document could not be found`,
                    500
                );
            }

        return artist;

    } catch(e: any) {
        throw e
    }
}
