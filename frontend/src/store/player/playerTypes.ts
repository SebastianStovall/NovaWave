export interface TrackInterface {
    _id: string
    title: string
    length: string
    audio: string
    image: string
    plays: number

    artist: string
    artistName: string
    artistAboutImage: string
    artistMonthlyListeners: number

    album: string
    albumName: string
}

export interface PlayerState {
    currentSong: null | TrackInterface
    songList: [] | TrackInterface[]
    play: boolean
}
