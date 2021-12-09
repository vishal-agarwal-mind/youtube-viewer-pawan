import { parseInt } from "lodash";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { viewComments, countComment, nextPageToken } from "../redux/features/commentAction";

/**
 * A **functional** component which fetches the comments of the selected
 * youtube video, using Youtube Data API v3.
 * @component
 * @param {string} API_KEY - Youtube Data API Key.
 * @param {string=} token - Token used by Youtube Data API.
 * 
 */
function Comments(props: any) {

    const video = useSelector((state: any) => state.video.selectedVideo);
    const dispatch = useDispatch();
    const comments = useSelector((state: any) => state.comment.comments);
    const pageToken = useSelector((state: any) => state.comment.nextPageToken);

    /**
     * **fetchComments** is an inner function of **Comments** Componet.
     * It uses `fetch()` function to fetch data. You can view more information about `fetch()` at
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API}. Following parameter are being 
     * used to fetch the comments.
     * @param {string} url - Youtue Data API endpoint url.
     * @param {string} part - Can be snippet, replies and id. eg: `snippet,replies`
     * @param {string} videoId - Youtube video id.
     * @param {string} key - API key.
     */
    function fetchComments(token: string = '') {
        let url = new URL("https://youtube.googleapis.com/youtube/v3/commentThreads");
        url.searchParams.append('part', 'snippet,replies');
        url.searchParams.append('videoId', video.id.videoId);
        url.searchParams.append('key', props.api);
        url.searchParams.append('order', 'relevance');
        if (token !== '') {
            url.searchParams.append('pageToken', token);
        }

        fetch(url.toString())
        .then(response => response.json())
        .then(data => {
            dispatch(viewComments((data.items ? data.items : null)));
            dispatch(countComment(data.pageInfo.totalResults ? data.pageInfo.totalResults : 0));
            if (token !== '') {
                let newData = (data.items ? data.items : null);
                let collection: any = null;
                if (newData !== null) {
                    for (const key in newData) {
                        if (Object.prototype.hasOwnProperty.call(newData, key)) {
                            let index = Object.keys(comments).length + (parseInt(key) + 1);
                            comments[index] = newData[key];
                        }
                    }
                    collection = comments;
                }
                dispatch(viewComments(collection));
            }else {
                dispatch(viewComments((data.items ? data.items : null)));
            }
            dispatch(nextPageToken(data.nextPageToken ? data.nextPageToken : ''))
        })
        .catch(err => { console.error(err); })
    }

    useEffect(() => {
        if (video !== null) {
            fetchComments();   
        }

    }, [props.api, video, dispatch]);

    if (video === null) {
        return (
            <div className="w-full p-2">
                <h3 className="font-mono mt-3">Loading Comments...</h3>
            </div>
        );
    }

    if (comments === null) {
        return (
            <div className="w-full p-2">
                <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded mt-3" role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p>Currently there are no comments for this video.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <h3 className="font-mono font-semibold text-xl text-red-600 my-3">Comments</h3>
            <InfiniteScroll
                dataLength={Object.keys(comments).length}
                next={() => { fetchComments(pageToken) }}
                hasMore={(pageToken !== '') ? true : false}
                loader={<h4 className="font-mono">Loading Comments...</h4>}
                endMessage={<p className="font-mono text-gray-400">All comments has been loaded.</p>}
            >
                {Object.keys(comments).map((objKey) => (
                    <div className="flex items-start border border-gray-400 rounded mb-2 p-2" key={objKey}>
                        <img className="object-scale-down mr-4 rounded" src={comments[objKey].snippet.topLevelComment.snippet.authorProfileImageUrl}/>
                        <div className="w-full">
                            <div className="pb-2">
                                <h6 className="font-mono text-lg text-red-600"><strong>{comments[objKey].snippet.topLevelComment.snippet.authorDisplayName}</strong></h6>
                                <p className="font-mono text-md" dangerouslySetInnerHTML={{__html: comments[objKey].snippet.topLevelComment.snippet.textDisplay}}></p>
                            </div>
                            <div className="text-gray-400 text-sm">
                                <p>
                                    Likes: {comments[objKey].snippet.topLevelComment.snippet.likeCount}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default Comments;