import { UserModel } from "../models/User";
import { AlbumModel } from "../models/Album";
import { ArtistModel } from "../models/Artist";
import { PlaylistModel } from "../models/Playlist";
import CustomError from "../../utils/CustomError";
import { UserDocumentPopulatedWithLikedSongs, AlbumDocument, ArtistDocument, UserDocument, PlaylistDocument } from "../models/modelTypes";
import { getUserById } from "./user-actions";
import { ObjectId } from "mongodb";

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
        if(userDocument.recentlyViewed.length < 5) { // if less than 5 items in recentlyViewed populate it (this will be for new users only)
            const nineRandomAlbums = await getRandomAlbums()
            userDocument.recentlyViewed = userDocument.recentlyViewed.concat(nineRandomAlbums);
            await userDocument.populate('recentlyViewed')
            await userDocument.save();

        } else {
            await userDocument.populate('recentlyViewed')
        }



        //! Refactor start --------
        const likedSongsPlaylistId = userDocument.likedSongsPlaylistId as ObjectId;
        if ( userDocument.recentlyViewed.includes(likedSongsPlaylistId) ) {
            // Find the index of likedSongsPlaylistId in the array
            const index = userDocument.recentlyViewed.indexOf(likedSongsPlaylistId);

            if(index !== 0) {
                // Remove it from its current position
                userDocument.recentlyViewed.splice(index, 1);

                // Add it to the front of the array
                const likedSongsInfo = (await userDocument.populate('likedSongsPlaylistId')).likedSongsPlaylistId
                const userQuickplayGrid: any[] = userDocument.recentlyViewed.slice(0, 5);
                userQuickplayGrid.unshift(likedSongsInfo)
                return userQuickplayGrid
            }

        } else {
            const likedSongsInfo = (await userDocument.populate('likedSongsPlaylistId')).likedSongsPlaylistId
            const userQuickplayGrid: any[] = userDocument.recentlyViewed.slice(0, 5);
            userQuickplayGrid.unshift(likedSongsInfo)
            return userQuickplayGrid
        }
        //! Refactor end --------

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

        const userDocument = await getUserById(userId)
        if(!userDocument) {
            throw new CustomError(
                "Query Error",
                "User Document was not found with the provided ObjectId",
                500
            );
        }

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

        if((entityId as unknown as ObjectId) === userDocument.likedSongsPlaylistId) {
            // likedSongs playlist will always be in user recents
            return 'already in recents'
        }

        if (userDocument.recentlyViewed.includes((entityId as unknown as ObjectId))) {
            // If entityId is already in the recentlyViewed array, remove it and shift up its position

            const index = userDocument.recentlyViewed.indexOf((entityId as unknown as ObjectId));
            if(index !== 0) {
                // Remove it from its current position
                userDocument.recentlyViewed.splice(index, 1);
                userDocument.recentlyViewed.unshift((entityId as unknown as ObjectId))
                await userDocument.save()
            }
            return 'already in recents'
        }

        if (userDocument.recentlyViewed.length >= 9) {
            // If the array has 10 or more elements, remove the last element
            userDocument.recentlyViewed.pop();
        }

        userDocument.recentlyViewed.unshift((entityId as unknown as ObjectId)); // Add the new entityId to the beginning of the array
        await userDocument.save(); // Save the updated user document
        return 'added to recents'

    } catch(e: any) {
        throw e
    }
}


export const getRecommended = async() => {
    try {
        const recommendedAlbums = await AlbumModel.find({}).limit(9) // grab all albums
        return recommendedAlbums
    } catch(e) {
        throw e
    }
}

export const getPopularArtists = async() => {
    try {
        const popularArtists = await ArtistModel.find()
            .sort({ monthlyListeners: -1 }) // Sort by monthlyListeners in descending order
            .limit(9); // Limit the results to 9 documents
        return popularArtists
    } catch(e) {
        throw e
    }
}


export const getRecentlyViewed = async(userId: string) => {
    try {
        const userDocument = await getUserById(userId)
        if(!userDocument) {
            throw new CustomError(
                "Query Error",
                "User Document was not found with the provided ObjectId",
                500
            );
        }
        const populatedUser = await userDocument.populate('recentlyViewed')
        return populatedUser.recentlyViewed
    } catch(e) {
        throw e
    }
}
