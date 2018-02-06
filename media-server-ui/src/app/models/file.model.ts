export class File {
    _id?: string;
    name?: string;
    path?: string;
    src?: string;
    size?: string;
    type?: Date;
    lastModifiedDate?: string;


    title: string;
    artist: string[];
    albumartist: string[];
    album: string;
    year: string;
    track: {
        no: string,
        of: string
    };
    genre: [string];
    disk: {
        no: string,
        of: string
    };
    picture: {
        format: string;
        data: string;
    }[];
    duration: number;
}
