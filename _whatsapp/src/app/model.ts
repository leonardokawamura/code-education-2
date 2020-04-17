export interface ChatGroup {
    id: number;
    name: string;
    photo_url: string;
    readonly created_at?: {date: string};
    readonly updated_at?: {date: string};
}