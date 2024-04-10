import { LibraryState } from "../store/library/libraryTypes";

export function isEntityInLibrary(entityType: string, entityId: string, userLibrary: LibraryState) {
    if(!entityId || Object.keys(userLibrary).length <= 0) return

    if(entityType === 'album') {
        if(userLibrary.albums[entityId]) {
            return true
        } else {
            return false
        }
    }

    if(entityType === 'artist') {
        if(userLibrary.artists[entityId]) {
            return true
        } else {
            return false
        }
    }
}

async function addToLibrary(entityType: string, entityId: string) {
    const response = await fetch('/api/library/add', {
        method: 'PATCH',
        body: JSON.stringify({entityId, entityType, entityOwnerId: undefined}),
        headers: { "Content-Type": "application/json" }
    })

    if(!response.ok) console.log("FAILED TO ADD TO LIBRARY")
}

async function removeFromLibrary(entityType: string, entityId: string) {
    const response = await fetch('/api/library/remove', {
        method: 'PATCH',
        body: JSON.stringify({entityId, entityType}),
        headers: { "Content-Type": "application/json" }
    })

    if(!response.ok) console.log("FAILED TO REMOVE FROM LIBRARY")
}

// handles removing and favoriting to user library
export async function handleAddOrRemoveFromLibrary(entityType: string, entityId: string, userLibrary: LibraryState) {
    console.log("ENTITY ID", entityId)
    console.log("ENTITY TYPE", entityType)
    console.log("LIB", userLibrary)
    if(isEntityInLibrary(entityType, entityId, userLibrary)) {
        await removeFromLibrary(entityType, entityId)
    } else {
        await addToLibrary(entityType, entityId)
    }
}
