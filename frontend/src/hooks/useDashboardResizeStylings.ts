import { useEffect } from "react";

export function useDashboardResizeStylings(dependencies: any) {
    useEffect(() => {
        const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLElement | null;
        const quickPlayGrid = document.querySelector('.dashboard_quickplayPlaylists__arYfj') as HTMLElement | null;

        const resizeObserver = new ResizeObserver(entries => { //? Monitor Width Change of Main Content. Depending on its width, change styling for .quickPlayGrid
            entries.forEach(entry => {
                const { width } = entry.contentRect;

                if(quickPlayGrid) {
                    if(width <= 922) { //* quickPlayGrid Styling
                        quickPlayGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                        quickPlayGrid.style.gridTemplateRows = 'repeat(3, 1fr)';
                    } else {
                        quickPlayGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                        quickPlayGrid.style.gridTemplateRows = 'repeat(2, 1fr)';
                    }
                }


            });
        });

        if(mainContent) {
            resizeObserver.observe(mainContent);
        }

        return () => {
            if(mainContent) {
                resizeObserver.unobserve(mainContent);
            }
        };

    }, [dependencies])
}
