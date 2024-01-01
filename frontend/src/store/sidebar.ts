// Define Our Action Types with enum
enum ActionTypes {
    TOGGLE_SIDEBAR = 'togglesidebar',
    IS_RESIZING = 'isresizing'
}


interface ToggleRightSidebarAction {
    type: ActionTypes.TOGGLE_SIDEBAR
    payload: Boolean
}

interface IsResizingAction {
    type: ActionTypes.IS_RESIZING
    payload: Boolean
}


export const togglePlayViewSidebar = (boolean: Boolean): ToggleRightSidebarAction => {
    return {
        type: ActionTypes.TOGGLE_SIDEBAR,
        payload: boolean
    }
}

export const resizing = (boolean: Boolean): IsResizingAction => {
    return {
        type: ActionTypes.IS_RESIZING,
        payload: boolean
    }
}


// Define an initial state
interface SidebarState {
    active: Boolean;
    isresizing: Boolean;
}

const initialState: SidebarState = { active: true, isresizing: false };

// Define session reducer
const sidebarReducer = (
    state: SidebarState = initialState,
    action: ToggleRightSidebarAction | IsResizingAction
    ) => {
    let newState;
    switch (action.type) {
        case ActionTypes.TOGGLE_SIDEBAR:
            newState = { ...state };
            newState.active = action.payload;
            return newState;
        case ActionTypes.IS_RESIZING:
            newState = { ...state };
            newState.isresizing = action.payload;
            return newState;
        default:
            return state;
    }
};

export default sidebarReducer;
