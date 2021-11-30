import { useEffect, useState } from "react";
import SidebarSuggestionItem from "../components/sidebar_suggestion_item";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../services/firebase";

const SidebarSuggestion = ({ userId, following, docId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function getSuggestions() {
      const result = await getSuggestedProfiles(userId, following);
      setProfiles(result);
    }
    if (userId) {
      getSuggestions();
    }
  }, [userId, following]);

  if (!profiles) {
    return (
      <div className='mt-4'>
        <Skeleton count={4} height={45} className='mt-2' />
      </div>
    );
  }
  if (profiles.length == 0) {
    return null;
  }

  return (
    <>
      <div className='flex justify-between mt-3 mb-1'>
        <div className='text-gray-400 font-semibold'>Suggestions For You</div>
        <div className='text-gray-800 font-semibold hover:text-blue-700'>
          See All
        </div>
      </div>

      {profiles &&
        profiles.map((profil) => (
          <SidebarSuggestionItem
            loggedInUserDocId={docId}
            key={profil.userId}
            username={profil.username}
            desc={profil.fullName}
            userId={profil.userId}
            spDocId={profil.docId}
          />
        ))}
    </>
  );
};

export default SidebarSuggestion;
