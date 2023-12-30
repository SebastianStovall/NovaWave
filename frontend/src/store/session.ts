import { ILoginUser } from "../components/Auth";

// Define Our Action Types with enum
enum ActionTypes {
    SET_USER = "api/auth/login",
    REMOVE_USER = "api/auth/logout",
}

// define possible payloads
interface VerifiedUser {
    id: string
    username: string
    email: string
}

// Define interfaces for our Actions
interface SetUserAction {
    type: ActionTypes.SET_USER;
    payload: VerifiedUser;
}

interface RemoveUserAction {
    type: ActionTypes.REMOVE_USER;
}

// Create action functions ---> ( returns an action interface )
const setUser = (user: VerifiedUser): SetUserAction => {
    return {
        type: ActionTypes.SET_USER,
        payload: user,
    };
};

const removeUser = (): RemoveUserAction => {
    return {
        type: ActionTypes.REMOVE_USER,
    };
};

//! -------------------------------------------------- THESE WILL BE MOVED AND IMPORTED
// Define user interfaces
interface RegisterUser {
    email: string;
    password: string;
    username: string;
}
//! -------------------------------------------------- THESE WILL BE MOVED AND IMPORTED

// Export action creators
export const signup = (user: RegisterUser) => async (dispatch: Function) => {
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(user),
        });
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    } catch(e: any) {
        return await e.json()
    }
};

export const login = (user: ILoginUser) => async (dispatch: Function) => {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        })

        if(response.ok) {
            const data = await response.json();
            dispatch(setUser(data.user));
            return response;
        } else {
            const error = await response.json();
            console.log(error)
        }

    } catch(e) {
        console.error('Error While Performing Thunk', e)
    }
};

export const logout = () => async (dispatch: Function) => {
    try {
        const response = await fetch("/api/auth/logout");
        if(response.ok) {
            dispatch(removeUser());
        } else {
            const error = await response.json()
            console.log(error)
        }
    } catch(e) {
        console.error('Error While Performing Thunk', e)
    }
};

export const restoreUser = () => async (dispatch: Function) => {
    try {
        const response = await fetch("/api/auth/restore");

        if(response.ok) {
            const data = await response.json()
            console.log("SIGNED IN USER: ", data.user ? data.user : false)
            if(data.isLoggedIn) {
                dispatch(setUser(data.user))
            } else {
                dispatch(removeUser())
            }
        } else {
            const error = await response.json()
            console.log(error)
        }
    } catch(e: any) {
        console.error('Error While Performing Thunk', e)
    }
};


// Define an initial state
interface SessionState {
    user: VerifiedUser | null;
}

const initialState: SessionState = { user: null };

// Define session reducer
const sessionReducer = ( state: SessionState = initialState, action: SetUserAction | RemoveUserAction) => {
    let newState;
    switch (action.type) {
        case ActionTypes.SET_USER:
            newState = { ...state };
            newState.user = action.payload;
            return newState;
        case ActionTypes.REMOVE_USER:
            newState = { ...state };
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
