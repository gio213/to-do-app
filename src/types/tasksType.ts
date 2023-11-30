export interface Itask {
    id: string;
    title: string;
    completed: boolean;
    map: Map<string, any>;
    slice: any;
    created_at: string;

}



export interface Iuser {
    _id: string;
    username: string;
    email: string;
    password: string;
    map: Map<string, any>;
    isVerifed: boolean;

}
export interface CookieSetOptions {
    domain?: string;
    path?: string;
    expires?: Date;
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
}