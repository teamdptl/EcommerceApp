import { Dropdown } from "flowbite-react";
import { AiOutlineMenu } from "react-icons/ai"
import { NavLink, Link } from "react-router-dom";
const NavMenuDropDown = () => {
    return (
			<>
				<Dropdown
					dismissOnClick={false}
					renderTrigger={() => (
						<button class="block md:hidden rounded-full p-2 border hover:bg-gray-100 focus:outline-none">
							<AiOutlineMenu size={20} />
						</button>
					)}>
					<div class="items-center justify-between w-screen md:flex md:w-auto md:order-1">
						<ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<NavLink
									exact
									to="/"
									className={(navData) =>
										navData.isActive
											? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
											: "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
									}>
									Trang chủ
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/shop"
									className={(navData) =>
										navData.isActive
											? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
											: "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
									}>
									Sản phẩm
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/service"
									className={(navData) =>
										navData.isActive
											? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
											: "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
									}>
									Dịch vụ
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/contact"
									className={(navData) =>
										navData.isActive
											? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
											: "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
									}>
									Liên hệ
								</NavLink>
							</li>
							<li class="mt-2">
								<Link to="/login">
									<button
										type="button"
										class="text-white w-full bg-blue-700 block sm:hidden hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0">
										Đăng nhập
									</button>
								</Link>
							</li>
						</ul>
					</div>
				</Dropdown>
			</>
		);
}

export default NavMenuDropDown;