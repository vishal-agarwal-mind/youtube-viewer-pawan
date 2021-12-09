import { useEffect } from "react";
import _ from "lodash";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import Comments from "./components/comments";
import { viewVideos, onVideoSelect } from "./redux/features/videoActions";
import { connect } from "react-redux";

interface VideoStates {
  term: string;
  videos: Array<any>;
  selectedVideo: object | null
}

const API_KEY: string | undefined = process.env.REACT_APP_VIDEO_API;

/**
 * Main component of the app. It is responsible for loading the list of
 * videos and managing all other components. It user Youtube Data API v3
 * to fetch video list.
 * @component
 */
const App = (props: any) => {

  /**
   * **videoSearch** is an inner function of **App** component which is
   * responsible for fetching the list of videos.
   * @param {string} [term=liverpool] - A keyword for searching videos.
  */
  let videoSearch = (term: string) => {
    let url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('key', (API_KEY ? API_KEY : ''));
    url.searchParams.append('q', term);
    url.searchParams.append('type', 'video');

    fetch(url.toString())
    .then(response => response.json())
    .then(data => {
      // Dispatching data to store.
      props.dispatch(viewVideos(data.items ? data.items : []));
      props.dispatch(onVideoSelect(data.items[0] ? data.items[0] : null));
    })
    .catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {
    videoSearch("liverpool");
    // eslint-disable-next-line
  }, []);

  const searchVideo = _.debounce((term: string)  => {
    videoSearch(term)
  }, 300);

  return (
    <div className="flex flex-col sm:w-full lg:w-5/6 mx-auto divide-y-2">
      <div className="flex flex-wrap w-full px-4 pb-5">
        <SearchBar onSearchTermChange={searchVideo} />
      </div>
      <div className="flex sm:flex-col lg:flex-row w-full divide-x-2">
        <div className="flex flex-col w-full sm:w-full lg:w-2/3 px-4">
          <div className="w-full mt-2">
            <VideoDetail />
          </div>
          <div className="flex flex-col">
            <div className="divide-y-2">
              <div>&nbsp;</div>
              <div>
                <Comments api={API_KEY} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-full lg:w-1/3 px-4">
          <div className="py-4 mt-2">
            <VideoList />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: VideoStates) => {
  return {
    term: state.term,
    videos: state.videos,
    selectedVideo: state.selectedVideo
  }
}

export default connect(mapStateToProps)(App);
