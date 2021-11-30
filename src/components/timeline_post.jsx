import { BsThreeDots } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { likeUnlikePost } from "../services/firebase";
import UserContext from "../context/user";

const TimelinePost = ({ post }) => {
  console.log(post);
  const { user } = useContext(UserContext);

  const [photoLiked, setphotoLiked] = useState(post.userLikedPhoto);
  const [numberOfLikes, setnumberLikes] = useState(post.likes.length);
  const commentInput = useRef(null);
  const handleFocusComment = () => commentInput.current.focus();

  const handleLike = async () => {
    await likeUnlikePost(user.uid, post.docId, !photoLiked);
    setnumberLikes(photoLiked ? numberOfLikes - 1 : numberOfLikes + 1);
    setphotoLiked(!photoLiked);
  };

  return (
    <div className='mb-8 bg-white text-gray-900 border border-gray-300 '>
      <div className='h-16 flex justify-between items-center px-4'>
        <div className='flex items-center'>
          <HiUserCircle className='w-11 h-11 text-gray-400' />
          <span className='ml-2 font-semibold'>{post.username}</span>
        </div>
        <div className=''>
          <BsThreeDots className='h-5 w-5' />
        </div>
      </div>
      <img src={post.imageSrc}></img>
      {/* IKONE ZA LJAK I TO */}
      <div className='flex px-4 pt-4 items-center text-gray-700 justify-between '>
        <div className='flex'>
          <div className='mx-2 '>
            {photoLiked ? (
              <AiFillHeart
                className='w-7 h-7 hover:opacity-75 text-red-600 '
                onClick={handleLike}
              />
            ) : (
              <FaRegHeart
                className='w-7 h-7 hover:opacity-75   '
                onClick={handleLike}
              />
            )}
          </div>
          <div className='mx-2'>
            <FaRegComment
              className='w-7 h-7 hover:opacity-75'
              onClick={handleFocusComment}
            />
          </div>
          <div className='mx-2'>
            <RiSendPlaneLine className='w-7 h-7 hover:opacity-75' />
          </div>
        </div>
        <div className='mr-1'>
          <FaRegBookmark className='w-7 h-7 hover:opacity-75' />
        </div>
      </div>
      {/* lajkovi */}
      <div className='mx-6 my-4'>
        {numberOfLikes > 0 ? (
          <>
            <span>Liked by </span>
            <span className='font-medium'>{numberOfLikes} people</span>
          </>
        ) : (
          <span className='font-regulart'>Be first to like this post.</span>
        )}
      </div>

      {/* post opis */}
      <div className='mx-6 my-4'>
        <span className='font-medium mr-1'>{post.username}</span>
        <span className='text-gray-600'>{post.caption}</span>
      </div>
      {/* komentar */}
      <div className=' border-t border-gray-300 flex '>
        <div className='mx-6  my-2 flex w-full '>
          <div className=' text-gray-700 w-full '>
            <input
              ref={commentInput}
              className='h-10 px-2 w-full '
              aria-label='Enter your comment.'
              type='text'
              placeholder='Add a comment..'
            ></input>
          </div>

          <div className='my-2 ml-2 text-blue-200 hover:text-blue-400 '>
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePost;
