import useUser from "../hooks/use-user";
import SidebarSuggestionItem from "../components/sidebar_suggestion_item";
import { HiUserCircle } from "react-icons/hi";
const Sidebar = () => {
  const x = useUser();
  console.log("USE USER", x);

  return x.user ? (
    <div className='flex flex-col text-sm'>
      <div className='flex items-center'>
        <div>
          <HiUserCircle className='w-16 h-16 text-gray-400' />
        </div>
        <div className='pl-2'>
          <div className='text-gray-800 font-semibold tracking-wide	'>
            {x.user.username}
          </div>
          <div className='text-gray-500 font-'>{x.user.fullName}</div>
        </div>
      </div>
      <div className='flex justify-between mt-3 mb-1'>
        <div className='text-gray-400 font-semibold'>Suggestions For You</div>
        <div className='text-gray-800 font-semibold hover:text-blue-700'>
          See All
        </div>
      </div>
      <SidebarSuggestionItem username='mahmutoviic' desc='New to Instagram' />
      <SidebarSuggestionItem
        username='muharemmhoso'
        desc='Followed by kerrim_celik + 5 more'
      />
      <SidebarSuggestionItem
        username='ikoikad'
        desc='Followed by kerrim_celik + 5 more'
      />
      <div className='mt-8 text-gray-400 text-xs tracking-wide opacity-90'>
        © 2021 INSTAGRAM CLONE by nedimmfejzic
      </div>
    </div>
  ) : (
    <p>no user</p>
  );
};

export default Sidebar;
