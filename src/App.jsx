import { IoHomeSharp } from "react-icons/io5";
import { FaBookOpen, FaPerson, FaShield } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar, {SidebarItem} from "./components/Sidebar";

function App() {
	const SlideBar = [
		{
			"Name" : "Home",
			"Icon" : <IoHomeSharp />,
			"Link" : "/"
		},

		{
			"Name" : "Study Sets",
			"Icon" : <FaBookOpen />,
			"Link" : "/StudySets"
		},

		{
			"Name" : "Community",
			"Icon" : <MdPeopleAlt />,
			"Link" : "/Community"
		},

		{
			"Name" : "Profile",
			"Icon" : <FaPerson />,
			"Link" : "/Profile"
		},

		{
			"Name" : "Admin Panel",
			"Icon" : <FaShield />,
			"Link" : "/AdminPanel"
		},
	]

	const location = useLocation();
	console.log(location.pathname);
  	return (
    	<div className="flex w-screen h-screen bg-background">
			<Sidebar>
				{SlideBar.map((page) => (		
					<SidebarItem icon={page.Icon} text={page.Name} to={page.Link} active={location.pathname == page.Link}/>
				))}
			</Sidebar>
			<Outlet/>
    	</div>
  	)
}

export default App;