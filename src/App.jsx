import { IoHomeSharp } from "react-icons/io5";

import { FaBookOpen } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaShield } from "react-icons/fa6";

function App() {
	const SlideBar = [
		{
			"Name" : "Home",
			"Icon" : <IoHomeSharp />,
			"Link" : "/Home"
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

  	return (
    	<div className="w-screen h-screen bg-background">
			{/* Sidebar */}
			<div className="flex flex-col w-[175px] h-full bg-sidebar border-r-[1px] border-sidebar-border">
				<div className="flex flex-col justify-center items-center flex-[1] border-b-[1px] border-b-sidebar-border">
					<h1 className="font-bold text-sidebar-primary">LOVE ENGLISH</h1>
					<p className="text-[12px]">Learn Together</p>
				</div>
				<div className="flex flex-col items-center flex-[8] border-b-[1px] border-b-sidebar-border mt-[10px]">
					{
						SlideBar.map((page) => (
							<button className="flex items-center w-[80%] h-[30px] hover:bg-gray-200 text-gray-700 rounded-[5px] cursor-pointer">
								<div className="ml-[10px]">
									{page.Icon}
								</div>
								<span className="ml-[5px]">{page.Name}</span>
							</button>
					))}
				</div>
				<div className="flex-[1]">

				</div>
			</div>
    	</div>
  	)
}

export default App;