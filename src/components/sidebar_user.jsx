import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import UserContext from "../context/user";

const SidebarUser = ({ username, fullName }) => {
  const { user } = useContext(UserContext);

  if (!username || !fullName || !user) {
    return <Skeleton count={1} height={64} />;
  }

  return (
    <Link to={`/p/${username}`}>
      <div className='flex items-center'>
        <div>
          <HiUserCircle className='w-16 h-16 text-gray-400' />
        </div>
        <div className='pl-2'>
          <div className='text-gray-800 font-semibold tracking-wide	'>
            {username}
          </div>
          <div className='text-gray-500 font-'>{fullName}</div>
        </div>
      </div>
    </Link>
  );
};

export default memo(SidebarUser);

SidebarUser.propTypes = {
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
};
