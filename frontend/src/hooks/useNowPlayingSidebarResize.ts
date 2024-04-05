import { useEffect } from "react";
import { dynamicMarquee } from "../utils/misc";

export function useNowPlayingSidebarResize() {
    useEffect(() => {
        const nowPlayingSidebarDiv = document.querySelector('.nowPlayingSidebar_resizableSidebar__iXPem') as HTMLElement | null;

        const resizeObserver = new ResizeObserver(entries => { //? Monitor Width Change of Main Content. Depending on its width, change styling for .quickPlayGrid
            entries.forEach(entry => {

                // check if marquee styling is needed when changing sidebar width (checks for overflow on width resize)
                dynamicMarquee()

            });
        });

        if(nowPlayingSidebarDiv) {
            resizeObserver.observe(nowPlayingSidebarDiv);
        }

        return () => {
            if(nowPlayingSidebarDiv) {
                resizeObserver.unobserve(nowPlayingSidebarDiv);
            }
        };

    }, [])
}
