// PAYLOADS
export interface VerifiedUser {
    id: string;
    username: string;
    email: string;
}

export interface NoUserPayload {
    message: string;
    isLoggedIn: boolean;
}


// INITIAL STATE

export interface SessionState {
    user: VerifiedUser | null;
}
