import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import {
  AiOutlineLogout,
  AiFillHome,
  AiOutlineHeart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineAddAPhoto } from "react-icons/md";
const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  return (
    <header className='h-16 bg-white border-b border-gray-300 mb-4 '>
      <div className='container mx-auto  max-w-screen-lg px-6 lg:px-0'>
        <div className='flex justify-between h-16'>
          <div className='text-gray-700 text-center flex  items-center cursor-pointer'>
            <h1 className='flex justify-center w-full'>
              <Link to={ROUTES.DASHBOARD}>
                <img
                  src='/images/logo.png'
                  alt='instagram'
                  className='mt-2 w-6/12'
                ></img>
              </Link>
            </h1>
          </div>

          <div className='gap-6 text-gray-700 text-center flex items-center pr-4'>
            {user && (
              <>
                <Link to={ROUTES.DASHBOARD}>
                  <AiFillHome className='h-6 w-6' />
                </Link>

                <Link to={ROUTES.DASHBOARD}>
                  <MdOutlineAddAPhoto className='h-6 w-6' />
                </Link>

                <Link to={ROUTES.DASHBOARD}>
                  <AiOutlineHeart className='h-6 w-6' />
                </Link>

                <button
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <AiOutlineLogout className='h-6 w-6' />
                </button>
              </>
            )}

            {!user && (
              <>
                <Link to={ROUTES.SING_UP}>
                  <AiOutlineUserAdd className='h-6 w-6' />
                </Link>
                <Link to={ROUTES.LOGIN}>
                  <AiOutlineLogout className='h-6 w-6' />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
