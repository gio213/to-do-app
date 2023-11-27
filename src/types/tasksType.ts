export interface Itask {
    id: string;
    title: string;
    completed: boolean;
    map: Map<string, any>;
    slice: any;
}



export interface Iuser {
    id: string;
    username: string;
    email: string;
    password: string;
    map: Map<string, any>;
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