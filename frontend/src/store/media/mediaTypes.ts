export interface MediaThunkRequestBody {
    mediaType: string
    mediaId: string
}

export interface Safeuser {
    id: string
    email: string
    username: string
    likedSongsPlaylistId: string
}
