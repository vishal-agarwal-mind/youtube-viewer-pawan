import { SELECTED_VIDEO, VIDEOS, SEARCH_VIDEO } from "../types";

export const viewVideos = (video: Array<any>) => ({
    type: VIDEOS,
    payload: { videos: video }
});

export const onVideoSelect = (selVid: any) => ({
    type: SELECTED_VIDEO,
    payload: { selectedVideo: selVid }
});

export const onSearching = (term: string) => ({
    type: SEARCH_VIDEO,
    payload: { term: term }
});