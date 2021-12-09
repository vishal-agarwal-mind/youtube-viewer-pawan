export interface VideoStates {
    term: string;
    videos: Array<any>;
    selectedVideo: object | null
}

export interface CommentState {
    total: number;
    comments: object | null;
    nextPageToken: string;
}