import { useEffect } from "react";
import { TrackInterface } from "../store/player/playerTypes";

export const useAudioPlayer = (
    play: boolean,
    currentSong: TrackInterface | null,
    dispatch: any,
    songList: TrackInterface[],
    currentSongIndex: number,
    repeat: boolean,
    shuffle: boolean,
    audioRef: React.RefObject<HTMLAudioElement>,
    randomIndex: number,
    setCurrentSongIndex: React.Dispatch<React.SetStateAction<number>>,
    setVolume: React.Dispatch<React.SetStateAction<number | number[]>>,
    setCurrentSong: React.Dispatch<React.SetStateAction<TrackInterface | null>>
) => {
    useEffect(() => {
        //! If the user doesnt not interact with the page before this executes, will receive an autoplay error ----> play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
        if (play && currentSong && songList.length > 0 && audioRef.current) {
            if(audioRef.current && audioRef.current.paused) {
                audioRef.current.play();
            }
        }

        if ( (play === false || !currentSong || songList.length === 0) && audioRef.current) {
            if(!audioRef.current.paused) {
                audioRef.current.pause();
            }
        }

        if (!currentSong) {
            setCurrentSongIndex(-1);
        } else {
            setCurrentSongIndex(songList.map((songMap) => songMap._id).indexOf(currentSong._id));
        }


        const localAudio = localStorage.getItem('novawave-volume') // set volume
        setTimeout(() => {
            if (localAudio && audioRef.current) {
                audioRef.current.volume = Number(localAudio)
                setVolume( Number(localAudio) )
            }
        }, 150)

    }, [currentSong, dispatch, songList, play, audioRef, setCurrentSongIndex, setVolume]);


    useEffect(() => { //* This useEffect fires if --->     1.) user changes song      2.) song ends      3.) user puts on shuffle     4.) user puts on loop
        const audioElement = audioRef.current;

        if(repeat && audioElement) {
            audioElement.loop = true
        }

        if (!repeat && audioElement) {
            audioElement.loop = false
        }

        function handleSongEnd() {
            if (!repeat && !shuffle) { // go to next song when song ends (if shuffle and repeat are NOT active)
                dispatch(setCurrentSong(songList[currentSongIndex + 1] || songList[0]))
            } else {
            dispatch(setCurrentSong(songList[randomIndex])) // if shuffle on, go to random song
            }
        }

        if (play === true && audioElement && currentSong) { // play if needed
            if(audioElement && audioElement.paused) {
                audioElement.play()
            }
        }

        if (play === false && audioElement) {  // pause if needed
            if(!audioElement.paused) {
                audioElement.pause()
            }
        }

        audioElement?.addEventListener('ended', handleSongEnd); //*  detect when a video/audio input has ended, so you can safely go to the next song without having to worry about the async behavior of audioRef.play()

        return () => {
            audioElement?.removeEventListener('ended', handleSongEnd);
        };

    }, [repeat, play, shuffle, currentSongIndex, randomIndex, songList, currentSong, dispatch, setCurrentSong, audioRef]);

}
