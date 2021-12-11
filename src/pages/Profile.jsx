import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  getPostsOfUserByUserID,
  getUserByUsername,
} from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import { HiUserCircle } from "react-icons/hi";
import { BsGearWide } from "react-icons/bs";

const Profile = () => {
  const { username } = useParams();
  const [user, setuser] = useState(undefined);
  const [posts, setposts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      document.title = user.fullName + " (@" + user.username + ")";
    }
  }, [user]);

  useEffect(() => {
    async function checkIfUsernameExist() {
      const [userByUsername] = await getUserByUsername(username);
      console.log("got user by username - ", userByUsername);

      if (userByUsername === undefined) {
        history.push(ROUTES.NOT_FOUND);
      }

      setuser(userByUsername);

      const resultPosts = await getPostsOfUserByUserID(userByUsername.userId);
      console.log("getting posts for userId", userByUsername.userId);
      console.log("got posts", resultPosts);
      setposts(resultPosts);
    }

    checkIfUsernameExist();
  }, [username, history]);

  if (user === undefined) {
    return <p>loading</p>;
  }

  return (
    <div>
      <Header />
      <div className='container mx-auto max-w-screen-lg grid  grid-cols-12 gap-4 px-4'>
        <div className='col-span-12'>
          <div className='flex'>
            <div className='w-64'>
              <HiUserCircle className='w-48 h-48 text-gray-400' />
            </div>
            <div className='mt-8 '>
              <div className='flex items-center'>
                <span className='font-light text-3xl'>{user.username}</span>
                <BsGearWide className='mx-4 mt-1 w-6 h-6 text-gray-800 hover:text-gray-500' />
              </div>

              <div className='flex mt-4'>
                <div className='mr-8'>
                  <span className='font-medium pr-1'>{posts.length}</span> posts
                </div>
                <div className='mr-8'>
                  <span className='font-medium pr-1'>
                    {user.followers.length}
                  </span>
                  followers
                </div>
                <div className='mr-8'>
                  <span className='font-medium pr-1'>
                    {user.following.length}
                  </span>
                  following
                </div>
              </div>

              <div className='font-medium mt-4'>{user.fullName}</div>
              <div className='mt-4'>{user.emailAddress}</div>
            </div>
          </div>
          <div className='my-6 border-t border-gray-300'></div>
          <div className='mt-6 w-full gap-1 md:gap-10 grid grid-cols-3'>
            {posts.length == 0 && <p>No posts!</p>}
            {posts.map((post) => (
              <div key={post.docId}>
                <img className='' src={post.imageSrc}></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
