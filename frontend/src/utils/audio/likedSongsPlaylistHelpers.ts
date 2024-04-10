export function isCurrentSongInLikedSongs(currentPlaylistMedia: any, currentSong: {_id: string}) { // determine whether to render a play or pause button for liked songs playlist media page view
    if(!currentPlaylistMedia) return

    const normalizedSongList = [] //* tracks array in this case includes objects with multiple keys. need to normalize into an array of object with only the track key
        for(let track of currentPlaylistMedia.tracks) {
            normalizedSongList.push(track.track)
        }

    const indexOfCurrentSong = normalizedSongList.findIndex((track: any) => track._id === currentSong._id)
    return indexOfCurrentSong >= 0
}

export function getLikedSongsPlaylistLength(currentPlaylistMedia: any) { // get total length of liked songs playlist
    if(!currentPlaylistMedia) return

    let totalSeconds = 0;

    for(let obj of currentPlaylistMedia.tracks) {
        const track = obj.track
        const [minutes, seconds] = track.length.split(':').map(Number);
        totalSeconds += minutes * 60 + seconds;
    }

    const finalMinutes = Math.floor(totalSeconds / 60);
    const finalSeconds = totalSeconds % 60;

    return `${finalMinutes}:${finalSeconds.toString().padStart(2, '0')}`;
}

export function isTargetSongInLikedSongs(trackId: string, likedSongIds: string[]) { // Check if a song is in user's liked songs
    if(!trackId) return

    const indexOfCurrentSong = likedSongIds.findIndex((_id: string) => _id === trackId)
    return indexOfCurrentSong >= 0
}

export async function handleFavoriteSong(trackId: string, playlistId: string, likedSongIds: string[]) {
    const isAlreadyinLikedSongs = isTargetSongInLikedSongs(trackId, likedSongIds)
    if(isAlreadyinLikedSongs) {
        //* If in liked songs, remove
        const response = await fetch('/api/playlists/removeTrack', {
            method: 'PATCH',
            body: JSON.stringify({trackId, playlistId}),
            headers: { "Content-Type": "application/json" }
        })

        if(!response.ok) console.error("fetch to /api/playlists/removeTrack did not emit a successful response code")
    } else {
        //* if not in liked songs, add
        const response = await fetch('/api/playlists/add', {
            method: 'PATCH',
            body: JSON.stringify({trackId, playlistId}),
            headers: { "Content-Type": "application/json" }
        })

        if(!response.ok) console.error("fetch to /api/playlists/add did not emit a successful response code")
    }
}
