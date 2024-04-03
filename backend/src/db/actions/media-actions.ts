import CustomError from "../../utils/CustomError";
import { ArtistDocument, AlbumDocument, PlaylistDocument, TrackDocument } from "../models/modelTypes";
import { ArtistModel } from "../models/Artist";
import { AlbumModel } from "../models/Album";
import { TrackModel } from "../models/Track";
import { PlaylistModel } from "../models/Playlist";
import { Document } from "mongodb";

export const getMediaInfo = async(entityId: string, entityType: string) => {
    try {
        if(entityType === 'album') {
            const album: AlbumDocument | null = await AlbumModel.findById(entityId);
            if(!album) {
                throw new CustomError(
                    "Query Error",
                    `${entityType} document could not be found`,
                    500
                );
            }
            return await (album as Document).populate({path: 'tracks'})
        } else if (entityType === 'artist') {
            const artist: ArtistDocument | null = await ArtistModel.findById(entityId);
            if(!artist) {
                throw new CustomError(
                    "Query Error",
                    `${entityType} document could not be found`,
                    500
                );
            }
            return artist
        } else if (entityType === 'playlist') {
            const playlist: PlaylistDocument | null = await PlaylistModel.findById(entityId);
            if(!playlist) {
                throw new CustomError(
                    "Query Error",
                    `${entityType} document could not be found`,
                    500
                );
            }
            return await (playlist as Document).populate({path: 'tracks'})
        } else {
            throw new CustomError(
                "Bad Request",
                `Entity type ${entityType} is invalid`,
                500
            );
        }
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


export const getDiscography = async(artistId: string) => {
    try {
        const artist: ArtistDocument | null = await ArtistModel.findById(artistId);
            if(!artist) {
                throw new CustomError(
                    "Query Error",
                    `${artistId} document could not be found`,
                    500
                );
            }

        const discography: AlbumDocument[] = await AlbumModel.find({ artist: artistId });

        return discography;

    } catch(e: any) {
        throw e
    }
}
