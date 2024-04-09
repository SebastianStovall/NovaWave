import CustomError from "../../utils/CustomError";
import { ArtistDocument, AlbumDocument, PlaylistDocument} from "../models/modelTypes";
import { ArtistModel } from "../models/Artist";
import { AlbumModel } from "../models/Album";
import { TrackModel } from '../models/Track'
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
            const artistImg = (await ArtistModel.findById(album.artist))?.aboutImage
            return [await (album as Document).populate({path: 'tracks'}), artistImg]
        } else if (entityType === 'artist') {
            const artist: ArtistDocument | null = await ArtistModel.findById(entityId);
            if(!artist) {
                throw new CustomError(
                    "Query Error",
                    `${entityType} document could not be found`,
                    500
                );
            }
            return [artist, null]
        } else if (entityType === 'playlist') {
            const playlist: PlaylistDocument | null = await PlaylistModel.findById(entityId).populate('tracks.track');
            if(!playlist) {
                throw new CustomError(
                    "Query Error",
                    `${entityType} document could not be found`,
                    500
                );
            }
            return [playlist, null]
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

export const getTrack = async() => {
    try {
        const track = await TrackModel.findOne({ title: 'KILLKA' })
        return track
    } catch(e: any) {
        throw e
    }
}
