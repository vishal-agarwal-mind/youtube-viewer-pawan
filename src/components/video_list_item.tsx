import { useDispatch } from "react-redux";
import { onVideoSelect } from "../redux/features/videoActions";

/**
 * A **functional** component responsible for action of `list-item` in the video list.
 * @component
 */
const VideoListItem = (props: any) => {
  const dispatch = useDispatch();
  const imageUrl = props.video.snippet.thumbnails.default.url;

  return (
    <li onClick={() => dispatch(onVideoSelect(props.video))} className="p-2 text-black hover:bg-gray-100 hover:text-gray-600" style={{ cursor: 'pointer' }}>
      <div className="flex flex-wrap p-2">
        <div className="w-1/4 px-2">
          <img className="object-contain w-full" alt="video thumbnail" src={imageUrl} />
        </div>
        <div className="w-2/3 px-2">
          <div className="font-semibold" dangerouslySetInnerHTML={{__html: props.video.snippet.title}}></div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
