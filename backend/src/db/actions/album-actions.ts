import { UserModel } from "../models/User";
import { AlbumModel } from "../models/Album";
import CustomError from "../../utils/CustomError";
import { AlbumDocument } from "../models/modelTypes";

export const addAlbumToRecents = async(userId: string, albumId: string) => {
    try {
        const album: AlbumDocument | null = await AlbumModel.findById(albumId);

        if(!album) {
            throw new CustomError(
                "Query Error",
                "Error While Fetching Album Document",
                500
            );
        }

        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { recentlyViewed: albumId } },
        );

    } catch(e: any) {
        throw e
    }
}
