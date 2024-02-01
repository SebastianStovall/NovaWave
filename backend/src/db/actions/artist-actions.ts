import { UserModel } from "../models/User";
import { ArtistModel } from "../models/Artist";
import CustomError from "../../utils/CustomError";
import { ArtistDocument } from "../models/modelTypes";

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
