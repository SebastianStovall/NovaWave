import { setPlay, setCurrentSong, setSongList } from "../../store/player/player"

export const handlePlayFromStart = (
    currentAlbumMedia: any,
    currentPlaylistMedia: any,
    currentSong: any,
    mediaType: string,
    play: boolean,
    dispatch: any
) => {
    const indexOfCurrentSongInsideMedia = currentAlbumMedia.tracks.findIndex((track: any) => track._id === currentSong._id)

    if(play === true) { // If already playing, then pause
        dispatch(setPlay(false))
        if(indexOfCurrentSongInsideMedia !== -1) return
    }

    if(mediaType === 'album') {
        const indexOfCurrentSongInsideMedia = currentAlbumMedia.tracks.findIndex((track: any) => track._id === currentSong._id)

        if(indexOfCurrentSongInsideMedia === -1) { // if current song is NOT in the album we are trying to play, we will play album from the start
            dispatch(setSongList(currentAlbumMedia.tracks))
            dispatch(setCurrentSong(currentAlbumMedia.tracks[0]))
            dispatch(setPlay(true))
        } else {
            dispatch(setSongList(currentAlbumMedia.tracks))
            dispatch(setCurrentSong(currentAlbumMedia.tracks[indexOfCurrentSongInsideMedia]))
            dispatch(setPlay(true))
        }
    } else {
        // TODO --->  LOGIC IF YOUR LOOKING AT A PLAYLIST INSTEAD OF AN ALBUM

        // console.log("SONG LIST ----------------->", songList)
        // console.log("CURRENT SONG ----------------->", currentSong)
        // console.log("PLAY STATE ----------------->", play)
    }
}

export function handlePlayFromTrackNumber(
    currentAlbumMedia: any,
    currentPlaylistMedia: any,
    index: number,
    dispatch: any
) {
    dispatch(setSongList(currentAlbumMedia.tracks))
    dispatch(setCurrentSong(currentAlbumMedia.tracks[index]))
    dispatch(setPlay(true))
}
