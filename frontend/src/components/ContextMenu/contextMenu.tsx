import { useRef } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import mediaPageStyles from '../../pages/MediaView/mediaView.module.css'
import styles from './contextMenu.module.css';

interface ContextMenuProps {
    x: number
    y: number
    entityType: string
    entityId: string
    closeContextMenu: () => void
}

// Custom Functional Component To Render Out ToolTip content
export const ContextMenu: React.FC<ContextMenuProps> = ({x, y, entityId, entityType, closeContextMenu}) => {

    const contextMenuRef = useRef<HTMLDivElement>(null) //* needed to close menu
    useOnClickOutside(contextMenuRef, closeContextMenu) //* needed to close menu

    return (
        <div
            className={styles.contextMenuStyling}
            style={{top: `${y}px`, left: `${x}px`}}
            ref={contextMenuRef}
        >
            <div onClick={() => console.log(entityId, entityType)}>
                <i className='fa fa-heart' id={mediaPageStyles.inLikedSongs}></i>
                <div>Remove From Library</div>
            </div>
        </div>
    )
};
