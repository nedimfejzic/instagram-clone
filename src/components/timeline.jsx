import TimelinePost from "./timeline_post";
import Skeleton from "react-loading-skeleton";
import { useContext } from "react";
import usePhotos from "../hooks/use-photos";
import Loader from "react-loader-spinner";
import useUser from "../hooks/use-user";

const Timeline = () => {
  const { posts } = usePhotos();
  const loggedUser = useUser();
  console.log("dobio sam slike", posts);

  if (posts === undefined) {
    return (
      <div className='flex w-full justify-center mt-32'>
        <Loader type='Oval' color='#9CA3AF' height={150} width={150} />
      </div>
    );
  }

  if (!posts) {
    return (
      <p>
        No posts. <br></br>Follow some accounts to see more photos.
      </p>
    );
  }

  return (
    <div className='mb-28'>
      {posts.map((post) => (
        <TimelinePost key={post.docId} post={post} loggedUser={loggedUser} />
      ))}
    </div>
  );
};

export default Timeline;
