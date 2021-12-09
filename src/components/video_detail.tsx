import { useSelector } from "react-redux";

/**
 * A **functional** component which displays selected video and it's details.
 * @component
 * @param {object} selectedVideo - Selected Youtube video.
 */
const VideoDetail = () => {

  const video = useSelector((state: any) => state.video.selectedVideo);

  if (!video) {
    return <div className="font-mono p-2 w-full">Loading Video...</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="w-full mt-4 pb-4 rounded-lg border border-gray-400 shadow-lg">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          title={video.snippet.title}
          className="embed-responsive-item"
          src={url}
        />
      </div>
      <div className="font-mono p-3">
        <div className="font-semibold text-xl text-red-600" dangerouslySetInnerHTML={{__html: video.snippet.title}}></div>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );
};

export default VideoDetail;
