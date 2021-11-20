import { HiUserCircle } from "react-icons/hi";

const SidebarSuggestionItem = ({ username, desc }) => {
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
          <div className='text-blue-400 text-xs  font-bold hover:text-blue-600'>
            Follow
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSuggestionItem;
