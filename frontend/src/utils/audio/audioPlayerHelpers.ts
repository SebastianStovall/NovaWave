import { TrackInterface } from "../../store/player/playerTypes"

//! -- IMPORTANT -- ONLY ATTEMPT TO PLAY IF A CURRENT SONG IS ACTIVE, OTHERWISE YOU WILL GET A DOM ERROR SINCE ITS ATTEMPTING TO PLAY PLAYBACK OF UNDEFINED
export const handlePlay = async (
    audioRef: React.RefObject<HTMLAudioElement>,
    dispatch: any,
    play: boolean,
    setPlay: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    if(audioRef.current) {
        if(audioRef.current.paused) {
            audioRef.current.play()
        }
        if(play === false) {
            dispatch(setPlay(true))
        }
    }
}

// pause button when user hits pause button
export const handlePause = (
    audioRef: React.RefObject<HTMLAudioElement>,
    dispatch: any,
    play: boolean,
    setPlay: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    if(audioRef.current) {
        if(!audioRef.current.paused) {
            audioRef.current.pause()
        }
        if(play === true) {
            dispatch(setPlay(false))
        }
    }
}

// go back one song when user hits the back button in media player
export const handleBack = (
    currentTime: number | number[],
    duration: number,
    shuffle: boolean,
    dispatch: any,
    setCurrentSong: React.Dispatch<React.SetStateAction<TrackInterface | null>>,
    songList: TrackInterface[],
    currentSongIndex: number,
    randomIndex: number
    ) => {
    if (currentTime === duration && shuffle) {
        dispatch(setCurrentSong(songList[randomIndex]))
    } else {
        dispatch(setCurrentSong(songList[currentSongIndex - 1] || songList[songList.length - 1]))
    }
}

// go forward one song when user hits the skip button in media player
export const handleSkip = (
    shuffle: boolean,
    dispatch: any,
    setCurrentSong: React.Dispatch<React.SetStateAction<TrackInterface | null>>,
    songList: TrackInterface[],
    currentSongIndex: number,
    randomIndex: number
    ) => {
    if (shuffle) {
        dispatch(setCurrentSong(songList[randomIndex]))
    } else {
        dispatch(setCurrentSong(songList[currentSongIndex + 1] || songList[0]))
    }
}

export const handleTimeUpdate = (
    audioRef: React.RefObject<HTMLAudioElement>,
    setCurrentTime: React.Dispatch<React.SetStateAction<number | number[]>>,
    setDuration: React.Dispatch<React.SetStateAction<number>>
    ) => {
    if(audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
    }
}

export const handleRepeat = (
    repeat: boolean,
    setRepeat: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    if (!repeat) {
        setRepeat(true)
    } else {
        setRepeat(false)
    }
}

export const handleShuffle = (
    shuffle: boolean,
    setShuffle: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    if (!shuffle) {
        setShuffle(true)
    } else {
        setShuffle(false)
    }
}

export function formatTimestamp(currentTime: number) {
    // Calculate the elapsed time in seconds
    const elapsedMinutes = Math.floor(currentTime / 60);
    const elapsedSeconds = Math.floor(currentTime % 60);

    // Format the timestamp
    const formattedTimestamp = `${elapsedMinutes}:${elapsedSeconds < 10 ? '0' : ''}${elapsedSeconds}`;
    return formattedTimestamp;
}
