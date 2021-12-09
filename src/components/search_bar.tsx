import { useDispatch, useSelector } from "react-redux";
import { onSearching } from "../redux/features/videoActions";

/**
 * A **functional** component which displays search bar.
 * @component
 * @param {string} term - A keyword for searching videos.
 */
const SearchBar = (props: any) => {
  const term = useSelector((state: any) => state.video.term)
  const dispatch = useDispatch();

  const onInputChange = (term: string) => {
    dispatch(onSearching(term));
    props.onSearchTermChange(term);
  }

  return (
    <div className="w-2/3 ml-auto mr-auto h-12">
      {<input
        value={term}
        className="appearance-none block w-full bg-gray-200 text-red-700 border border-gray-200 rounded py-3 px-4 my-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-mono"
        onChange={(event) => onInputChange(event.target.value)}
        placeholder="SEARCH"
      />}
    </div>
  );
}

export default SearchBar;
