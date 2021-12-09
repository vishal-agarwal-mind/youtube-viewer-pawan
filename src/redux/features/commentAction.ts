import { COMMENTS, COUNT_COMMENTS, NEXT_COMMENT_PAGE } from "../types";

export const viewComments = (comments: any) => ({
    type: COMMENTS,
    payload: { comments: comments }
});

export const countComment = (count: number) => ({
    type: COUNT_COMMENTS,
    payload: { total: count }
});

export const nextPageToken = (token: string) => ({
    type: NEXT_COMMENT_PAGE,
    payload: { token: token }
});