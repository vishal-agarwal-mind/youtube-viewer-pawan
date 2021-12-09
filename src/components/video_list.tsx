import { useSelector } from "react-redux";
import VideoListItem from "./video_list_item";

/**
 * A **functional** component responsible for listing videos.
 * @component
 */
const VideoList = () => {
  const videos = useSelector((state: any) => state.video.videos);

  const videoItems = videos.map((video: any) => {
    return (
      <VideoListItem
        key={video.etag}
        video={video}
      />
    );
  });

  if (videos.length === 0) {
    return <div className="font-mono">Loading video list...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow w-full border border-gray-400">
      <ul className="w-full divide-y divide-gray-400">{videoItems}</ul>
    </div>
  );
};

export default VideoList;
