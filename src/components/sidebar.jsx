import useUser from "../hooks/use-user";
import SidebarSuggestion from "./sidebar_suggestions";
import SidebarUser from "./sidebar_user";
const Sidebar = () => {
  const x = useUser();

  return x.user ? (
    <div className='flex flex-col text-sm'>
      <SidebarUser username={x.user.username} fullName={x.user.fullName} />
      <SidebarSuggestion
        userId={x.user.userId}
        following={x.user.following}
        docId={x.user.docId}
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
