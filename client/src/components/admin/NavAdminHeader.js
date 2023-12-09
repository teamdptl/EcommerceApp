import {Avatar, Dropdown, Navbar} from "flowbite-react";
import {useAuth} from "../../context/AuthContext";


const NavAdminHeader = () => {
	const { user } = useAuth();

	return (
		<>
			<div class="w-full h-[62px]">
				<Navbar fluid rounded className="right-0 top-0 left-0 bg-white w-full fixed border-2 border-zinc-100 z-50">
					<Navbar.Brand href="/">
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Trang quản trị</span>
					</Navbar.Brand>
					<div className="flex md:order-2">
						<Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img={"/user.png"} rounded />}>
							<Dropdown.Header>
								<span className="block text-sm">{user.fullname}</span>
								<span className="block truncate text-sm font-medium">{user.username}</span>
							</Dropdown.Header>
							<Dropdown.Item>Trở về trang chủ</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item>Đăng xuất</Dropdown.Item>
						</Dropdown>
					</div>
				</Navbar>
			</div>
		</>
	);
};

export default NavAdminHeader;
