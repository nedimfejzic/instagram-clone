import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPostsOfUsers, getUserObjectByUserId } from "../services/firebase";

export default function usePhotos() {
  const [posts, setPosts] = useState(undefined);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getPosts() {
      //get list of following for user
      const [result] = await getUserObjectByUserId(user.uid);
      const following = result.following;
      // following [2, 3, 2541521]
      let followedUserPhotos = [];
      // sad vidimo koliko prati
      if (following.length > 0) {
        // get posts of every follower in list
        followedUserPhotos = await getPostsOfUsers(user.uid, following);
        // sort posts by creation date
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);

        setPosts(followedUserPhotos);
      } else {
        return null;
      }
    }
    getPosts();
  }, []);

  return { posts };
}
