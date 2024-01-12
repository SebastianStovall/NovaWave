export function handleGridView() {
    const mainContent = document.querySelector('.layout_mainContent__ZQulu') as HTMLElement;
    const quickPlayGrid = document.querySelector('.dashboard_quickplayPlaylists__arYfj') as HTMLElement
    if(mainContent.clientWidth <= 1080) {
        quickPlayGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        quickPlayGrid.style.gridTemplateRows = 'repeat(3, 1fr)';
    } else {
        quickPlayGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        quickPlayGrid.style.gridTemplateRows = 'repeat(2, 1fr)';
    }
}
