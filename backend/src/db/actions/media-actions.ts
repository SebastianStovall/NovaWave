import CustomError from "../../utils/CustomError";
import { ArtistDocument, AlbumDocument, PlaylistDocument } from "../models/modelTypes";
import { ArtistModel } from "../models/Artist";
import { AlbumModel } from "../models/Album";
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
