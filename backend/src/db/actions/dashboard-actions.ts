import { UserModel } from "../models/User";
import { AlbumModel } from "../models/Album";
import { ArtistModel } from "../models/Artist";
import { PlaylistModel } from "../models/Playlist";
import CustomError from "../../utils/CustomError";
import { UserDocumentPopulatedWithLikedSongs, AlbumDocument, ArtistDocument, UserDocument, PlaylistDocument } from "../models/modelTypes";
import { getUserById } from "./user-actions";

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

export const getRandomAlbums = async() => {
    try {
        // Use the aggregate method to perform a random sampling
        const randomAlbums: AlbumDocument[] = await AlbumModel.aggregate([
            { $sample: { size: 9 } }, {
                $project: { // only include necessary fields
                    _id: 1
                },
            },
        ]);

        return randomAlbums.map((objectId) => objectId._id)

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

export const getQuickplayDocuments = async(userId: string) => {
    try {
        const userDocument = await getUserById(userId)
        if(!userDocument) {
            throw new CustomError(
                "Query Error",
                "User Document was not found with the provided ObjectId",
                500
            );
        }

        // One spot will always be liked songs in quickplay grid, so only 5 documents are needed
        if(userDocument.recentlyViewed.length < 5) { // if less than 5 items in recentlyViewed populate it
            const nineRandomAlbums = await getRandomAlbums()
            userDocument.recentlyViewed = userDocument.recentlyViewed.concat(nineRandomAlbums);

            await userDocument.save();
            return userDocument.recentlyViewed

        } else {
            const populated = await userDocument.populate('recentlyViewed')
            console.log("POP? --> ", populated)
            return userDocument.recentlyViewed
        }


    } catch(e: any) {
        throw new CustomError(
            "Query Error",
            "Error While Fetching User Document",
            500
        );
    }
}


export const addEntityToRecents = async(userId: string, entityId: string, entityType: string) => {
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
        } else if (entityType === 'artist') {
            const artist: ArtistDocument | null = await ArtistModel.findById(entityId);
            if(!artist) {
                throw new CustomError(
                    "Query Error",
                    `${entityType} document could not be found`,
                    500
                );
            }
        } else if (entityType === 'playlist') {
            const playlist: PlaylistDocument | null = await PlaylistModel.findById(entityId);
            if(!playlist) {
                throw new CustomError(
                    "Query Error",
                    `${entityType} document could not be found`,
                    500
                );
            }
        } else {
            throw new CustomError(
                "Bad Request",
                `Entity type ${entityType} is invalid`,
                500
            );
        }

        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { recentlyViewed: entityId } },
        );

    } catch(e: any) {
        throw e
    }
}
