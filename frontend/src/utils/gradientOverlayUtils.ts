import React from "react";

export function hexToRgb(hex: string | undefined) {
    // Remove the hash if it's included
    if(hex === undefined) return
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    const bigint = parseInt(hex, 16);

    // Extract RGB components
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Return the result as an object
    return `${r}, ${g}, ${b}, 0.8`
}

export const imageUrls = [
    'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/liked-songs-640.png',
    'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Sahara-Album-8.png',
    'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.png',
    'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Fear-Album-7.png',
    'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-_-Heartbreak-Album-4.png',
    'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.png'
]



// mouse event functions

export const handleMouseEnter = (index: number, setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>, gradientOverlay: HTMLElement | null) => {
    //* Fade In transition When Mouse Enters a Quick Album on Grid
    if (gradientOverlay) {
        gradientOverlay.style.opacity = '0';
    }
    setHoveredIndex(index);
    if (gradientOverlay) {
        gradientOverlay.style.opacity = '1';
    }
};

export const handleMouseLeave = ( gradientOverlay: HTMLElement | null) => {
    //* Fade Out Transition
    if (gradientOverlay) {
        gradientOverlay.style.opacity = '0';
    }
};
