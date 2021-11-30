import { useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import {
  addFollowerForUser,
  updateFollowingForUser,
} from "../services/firebase";

const SidebarSuggestionItem = ({
  username,
  desc,
  loggedInUserDocId,
  userId,
  spDocId,
}) => {
  const [followed, setFollowed] = useState(false);

  async function handleFollowClick() {
    await updateFollowingForUser(loggedInUserDocId, userId, false);
    await addFollowerForUser(spDocId, loggedInUserDocId, false);
    setFollowed(true);
  }

  if (followed) {
    return null;
  }
  return (
    <div className='flex items-center mt-2'>
      <div>
        <HiUserCircle className='w-11 h-11 text-gray-400' />
      </div>
      <div className='flex w-full justify-between items-center'>
        <div className='pl-2'>
          <div className='text-gray-800 font-semibold tracking-wide	'>
            {username}
          </div>
          <div className='text-gray-400 text-xs '>{desc}</div>
        </div>
        <div className='pl-2'>
          <button
            type='button'
            onClick={handleFollowClick}
            className='text-blue-400 text-xs  font-bold hover:text-blue-600'
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarSuggestionItem;
