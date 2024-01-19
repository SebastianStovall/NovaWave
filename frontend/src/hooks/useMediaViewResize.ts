import { useEffect } from "react";

export function useMediaViewResize() {
useEffect(() => {
    const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLElement;
    const mediaContent = document.querySelector('.mediaView_mediaContent__9MFyo') as HTMLElement;
    const coverImage = document.querySelector('.mediaView_coverImg__dpy4n') as HTMLImageElement;
    const titleText = document.querySelector('.mediaView_title__HNM8j') as HTMLDivElement;

    const calculateContainerHeight = (currentWidth: number, container: string) => { // FLUID WIDTH/HEIGHT CHANGE FOR BACKGROUND CONTAINER AND MEDIA IMAGE
        const minWidth = 867;   // if mainContent width dips below this threshold, content will have reached is minimum height possible
        const maxWidth = 1290;  // specifies the threshold until a resize is needed
        const minHeight = container === 'background' ? 250 : 128;  // specifies what the min-height of either container is

        if(currentWidth > 1290 && container === 'image') return 232;

        const width = Math.max(currentWidth, minWidth);
        const percentage = (width - minWidth) / (maxWidth - minWidth);
        const heightDifference = (container === 'background' ? 383 : 232) - minHeight;
        return minHeight + heightDifference * percentage;
    };

    const checkOverflow = (mainContentWidth: number) => { // detect overflow on h1, triggers a resize in ResizeObserver
        return titleText.scrollWidth >= mainContentWidth - 275
    };

    const resizeObserver = new ResizeObserver(entries => { //? Monitor Width Change of Main Content. Depending on its width, change styling for .quickPlayGrid
        entries.forEach(entry => {
            const { width } = entry.contentRect;
            // console.log(`Element width changed to ${width}`);

            let computedStyle = window.getComputedStyle(titleText);
            let fontSize = parseFloat(computedStyle.fontSize);

            const getUpdatedFontStyle = () => {
                computedStyle = window.getComputedStyle(titleText);
                fontSize = parseFloat(computedStyle.fontSize);
            }

            if(width >= 867) { // if container small, have h1 wrap text
                titleText.style.whiteSpace= 'nowrap'
            } else {
                titleText.style.fontSize = `${36}px`;
                getUpdatedFontStyle()
            }

            if (checkOverflow(width)) { // when overflow is introduced, decrease h1 font size, keep going until no overflow (good for large window changed)
                let isOverflow = checkOverflow(width)
                while(isOverflow) {
                    getUpdatedFontStyle()
                    if(titleText.style.fontSize === '36px') {
                        titleText.style.whiteSpace = 'wrap'
                        break;
                    }

                    if(width > 867) {
                        titleText.style.fontSize = `${Math.max(36, fontSize - 8)}px`;
                    } else {
                        titleText.style.fontSize = `${36}px`;
                        titleText.style.whiteSpace= 'wrap'
                    }

                    isOverflow = checkOverflow(width)
                }

            } else {  // if no overflow present, decide when to increase font size, and make sure it doesnt exceed 96px
                if( width - titleText.scrollWidth >= 467 && (fontSize + 8) <= 96 ) {
                    let isOverflow = checkOverflow(width);
                    while(!isOverflow && (fontSize + 20) <= 96) {  // keep gradually increasing (good for large window changes)
                        titleText.style.fontSize = `${fontSize + 8}px`;
                        getUpdatedFontStyle()
                        isOverflow = checkOverflow(width)
                    }

                    if(isOverflow) { // handle any remaining overflow
                        titleText.style.fontSize = `${fontSize - 8}px`;
                        getUpdatedFontStyle()
                    }
                }
            }

            // console.log("NEW HEIGHT", newHeight);
            const newHeight = calculateContainerHeight(width, 'background');
            const newImageHeight = calculateContainerHeight(width, 'image');

            mediaContent.style.height = `${newHeight}px`;
            coverImage.style.height = `${newImageHeight}px`
            coverImage.style.width = `${newImageHeight}px`

        });
    });

    resizeObserver.observe(mainContent);

    return () => {
        resizeObserver.unobserve(mainContent);
    };

}, [])

}
