import { UserAttr } from '@daos/UserDao';
import { IClientData } from '@shared/JwtService';


declare module 'express' {
    export interface Request  {
        user: UserAttr,
        body: {
            name: string,
            email: string;
            password: string;
            url: string,

        },
        query: {
            page: number,
            limit: number,
        }
    }
}


declare global {
    namespace Express {
        export interface Request  {
            user: UserAttr,
        }
        export interface Response {
            sessionUser: IClientData;
        }
    }
}
