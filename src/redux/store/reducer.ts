import { VIDEOS, SELECTED_VIDEO, SEARCH_VIDEO, COMMENTS, COUNT_COMMENTS, NEXT_COMMENT_PAGE } from "../types";
import { VideoStates, CommentState } from "../interface";

const initialVideoState: VideoStates = {
    term: '',
    videos: [],
    selectedVideo: null
};

const initialCommentState: CommentState = {
    total: 0,
    comments: null,
    nextPageToken: ''
}

export const videoReducer = (state = initialVideoState, action:any) => {
    let term = state.term;
    let videos = state.videos;
    let selectedVideo = state.selectedVideo;

    switch(action.type) {
        case VIDEOS:
            return { term: term, selectedVideo: selectedVideo, videos: action.payload.videos };
        case SELECTED_VIDEO:
            return { term: term, selectedVideo: action.payload.selectedVideo, videos: videos };
        case SEARCH_VIDEO:
            return { term: action.payload.term, selectedVideo: selectedVideo, videos: videos };
        default:
            return state;
    }
};

export const commentReducer = (state = initialCommentState, action: any) => {
    let total = state.total;
    let comments = state.comments;
    let nextPageToken = state.nextPageToken;
    switch(action.type) {
        case COMMENTS:
            return { total: total, comments: action.payload.comments, nextPageToken: nextPageToken };
        case COUNT_COMMENTS:
            return { total: action.payload.total, comments: comments, nextPageToken: nextPageToken };
        case NEXT_COMMENT_PAGE:
            return { total: total, comments: comments, nextPageToken: action.payload.token };
        default:
            return state;
    }
}