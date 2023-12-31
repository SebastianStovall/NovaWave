// Define Our Action Types with enum
enum ActionTypes {
    TOGGLE_SIDEBAR = 'togglesidebar'
}


interface ToggleRightSidebarAction {
    type: ActionTypes.TOGGLE_SIDEBAR
    payload: Boolean
}


export const setSidebar = (boolean: Boolean): ToggleRightSidebarAction => {
    return {
        type: ActionTypes.TOGGLE_SIDEBAR,
        payload: boolean
    }
}


// Define an initial state
interface SidebarState {
    sidebar: Boolean;
}

const initialState: SidebarState = { sidebar: true };

// Define session reducer
const sidebarReducer = (
    state: SidebarState = initialState,
    action: ToggleRightSidebarAction
    ) => {
    let newState;
    switch (action.type) {
        case ActionTypes.TOGGLE_SIDEBAR:
            newState = { ...state };
            newState.sidebar = action.payload;
            return newState;
        default:
            return state;
    }
};

export default sidebarReducer;
