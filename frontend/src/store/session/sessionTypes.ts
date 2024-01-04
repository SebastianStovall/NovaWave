// ACTION TYPES
export enum ActionTypes {
    SET_USER = "api/auth/login",
    REMOVE_USER = "api/auth/logout",
}

// PAYLOADS
export interface VerifiedUser {
    id: string;
    username: string;
    email: string;
}

// ACTION INTERFACES
export interface SetUserAction {
    type: ActionTypes.SET_USER;
    payload: VerifiedUser;
}

export interface RemoveUserAction {
    type: ActionTypes.REMOVE_USER;
}


// INITIAL STATE

export interface SessionState {
    user: VerifiedUser | null;
}
