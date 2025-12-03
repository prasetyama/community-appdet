export class payloadNewReq {
    username: string = '' ;
    email: string = '' ;
    password: string = '' ;
    channelId: string = '' ;
    mode: string = '' ;
}

export class payloadReq {
    mode: string = '' ;
    email: string = '' ;
    channelId: string = '' ;
}

export type Channel = {
    id: string;
    name: string;
}