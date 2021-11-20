import { useEffect } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <div>
      <Header />
      <div className='container mx-auto max-w-screen-lg grid  grid-cols-12 gap-4 px-4'>
        <div className='col-span-12 md:col-span-8'>
          <Timeline />
        </div>
        <div className=' col-span-4 hidden md:block '>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
