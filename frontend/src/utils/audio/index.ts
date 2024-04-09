export function isCurrentSongInLikedSongs(currentPlaylistMedia: any, currentSong: {_id: string}) {
    const normalizedSongList = [] //* tracks array in this case includes objects with multiple keys. need to normalize into an array of object with only the track key
        for(let track of currentPlaylistMedia.tracks) {
            normalizedSongList.push(track.track)
        }

    const indexOfCurrentSong = normalizedSongList.findIndex((track: any) => track._id === currentSong._id)
    return indexOfCurrentSong >= 0
}

export function getLikedSongsPlaylistLength(currentPlaylistMedia: any) {
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
