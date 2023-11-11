import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export const SidebarAdmin = () => {
	return (
		<>
			<Sidebar aria-label="Default sidebar example" className="top-[60px] left-0 fixed">
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item href="" icon={HiChartPie}>
							Thống kê
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
							Kanban
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiInbox} label="3">
							Inbox
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiUser}>
							Users
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiShoppingBag}>
							Products
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiArrowSmRight}>
							Sign In
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiTable}>
							Sign Up
						</Sidebar.Item>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</>
	);
};