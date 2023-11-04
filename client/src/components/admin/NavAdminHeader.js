import { Avatar, Dropdown, Navbar } from "flowbite-react";


const user = {
	name: "Huynh Khanh Duy",
	email: "huynh@gmail.com",
	image: "/user.png"
}

const NavAdminHeader = () => {
	return (
		<>
			<div class="w-full h-[55px]">
				<Navbar fluid rounded className="top-0 left-0 w-full fixed">
					<Navbar.Brand href="/">
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Trang quản trị</span>
					</Navbar.Brand>
					<div className="flex md:order-2">
						<Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img={user.image} rounded />}>
							<Dropdown.Header>
								<span className="block text-sm">{user.name}</span>
								<span className="block truncate text-sm font-medium">{user.email}</span>
							</Dropdown.Header>
							<Dropdown.Item>Dashboard</Dropdown.Item>
							<Dropdown.Item>Settings</Dropdown.Item>
							<Dropdown.Item>Earnings</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item>Sign out</Dropdown.Item>
						</Dropdown>
					</div>
				</Navbar>
			</div>
		</>
	);
};

export default NavAdminHeader;
