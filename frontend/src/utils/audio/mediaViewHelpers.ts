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
        if(indexOfCurrentSongInsideMedia !== -1 && mediaType === 'album') return
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
    } else if(mediaType === 'artist') {
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
        //! If playing playlist / liked songs
        const normalizedSongList = [] //* tracks array in this case includes objects with multiple keys. need to normalize into an array of object with only the track key
        for(let track of currentPlaylistMedia.tracks) {
            normalizedSongList.push(track.track)
        }

        const indexOfCurrentSongInsideMedia = normalizedSongList.findIndex((track: any) => track._id === currentSong._id)

        if(indexOfCurrentSongInsideMedia === -1) { // if current song is NOT in the playlist we are trying to play, we will play playlist from the start
            dispatch(setSongList(normalizedSongList))
            dispatch(setCurrentSong(normalizedSongList[0]))
            dispatch(setPlay(true))
        } else {
            dispatch(setSongList(normalizedSongList))
            dispatch(setCurrentSong(normalizedSongList[indexOfCurrentSongInsideMedia]))
            dispatch(setPlay(true))
        }
    }
}

export function handlePlayFromTrackNumber(
    currentAlbumMedia: any,
    currentPlaylistMedia: any,
    mediaType: string,
    index: number,
    dispatch: any
) {
    if(mediaType === 'collection' || mediaType === 'playlist') {
        const normalizedSongList = [] //* tracks array in this case includes objects with multiple keys. need to normalize into an array of object with only the track key
        for(let track of currentPlaylistMedia.tracks) {
            normalizedSongList.push(track.track)
        }
        dispatch(setSongList(normalizedSongList))
        dispatch(setCurrentSong(normalizedSongList[index]))
        dispatch(setPlay(true))
    } else {
        dispatch(setSongList(currentAlbumMedia.tracks))
        dispatch(setCurrentSong(currentAlbumMedia.tracks[index]))
        dispatch(setPlay(true))
    }
}
