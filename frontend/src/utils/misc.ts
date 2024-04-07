export function dynamicMarquee() {
    // grab the full width of the text string (scrollingText.clientWidth) and compare it to where the overflow cuttoff point is (container.clientWidth - 36).
    // If there is overflow, use the difference between the width of text string and the cuttoff point to know how far to translate left, then once the
    // translation completes, translate to the right back to the starting position

    const scrollingText = document.querySelector('.nowPlayingSidebar_scrollText__QlQIB') as HTMLHeadingElement;
    const container = document.querySelector('.nowPlayingSidebar_topInformation__nZADR') as HTMLDivElement;
    const boxshadowContainer = document.querySelector('.nowPlayingSidebar_innerOverflowContainer__tPRrK') as HTMLDivElement;

    if(scrollingText && container && boxshadowContainer) {
        // scrollingText.clientWidth ------> Width of text string
        // (container.clientWidth - 36) -----> Cutoff point where overflow beings on text string
        const isOverflow = ((container.clientWidth - 36) <= scrollingText.clientWidth);

        if(isOverflow) {
            const amountToTranslate = scrollingText.clientWidth - (container.clientWidth - 36);
            scrollingText.style.setProperty('--trans-x', `-${amountToTranslate + 10}px`);
            boxshadowContainer.style.maskImage = 'linear-gradient(to right, transparent 0, #000 6px, #000 calc(100% - 12px), transparent 100%)'

        } else {
            // REMOVE
            scrollingText.style.setProperty('--trans-x', `0px`);
            boxshadowContainer.style.maskImage = 'none'
        }
    }
}


export function dynamicMarquee2() {
    const scrollingText = document.querySelector('.nowPlayingSidebar_scrollText22__1kjf5') as HTMLHeadingElement;
    const container = document.querySelector('.nowPlayingSidebar_topInformation2__DbPcq') as HTMLDivElement;
    const boxshadowContainer = document.querySelector('.nowPlayingSidebar_innerOverflowContainer2__mQJzZ') as HTMLDivElement;

    if(scrollingText && container && boxshadowContainer) {
        const isOverflow = ((container.clientWidth - 36) <= scrollingText.clientWidth);

        if(isOverflow) {
            const amountToTranslate = scrollingText.clientWidth - (container.clientWidth - 36);
            scrollingText.style.setProperty('--trans-x2', `-${amountToTranslate + 15}px`);
            boxshadowContainer.style.maskImage = 'linear-gradient(to right, transparent 0, #000 6px, #000 calc(100% - 12px), transparent 100%)'

        } else {
            // REMOVE
            scrollingText.style.setProperty('--trans-x2', `0px`);
            boxshadowContainer.style.maskImage = 'none'
        }
    }
}
