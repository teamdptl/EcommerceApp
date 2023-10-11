/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import CartDropDown from "../components/shop/CartDropdown"
import "flowbite";

export default function Header() {
    // const [user, setUser] = useContext({});
	// const [cart, setCart] = useContext({});

	return (
		<>
			<header class="bg-white h-[72px]">
				<nav class="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
					<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
						<div>
							<Link to="/">
								<img src="/smarthome-logo.webp" alt="Website Logo" class="h-5 w-auto" />
							</Link>
						</div>
						<div class="flex md:order-2">
							<div class="flex gap-4 max-[640px]:mr-3">
								<div class="flex items-center">
									{/* <button class="rounded-full p-2 border hover:bg-gray-100 focus:outline-none" data-dropdown-toggle="cart-dropdown">
										<AiOutlineShoppingCart size={20} />
									</button> */}
									<CartDropDown></CartDropDown>
								</div>
								<Link to="/login">
									<button
										type="button"
										class="text-white mr-2 bg-blue-700 hidden sm:block hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0">
										Đăng nhập
									</button>
								</Link>
							</div>

							<button
								data-collapse-toggle="navbar-sticky"
								type="button"
								class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
								aria-controls="navbar-sticky"
								aria-expanded="false">
								<span class="sr-only">Open main menu</span>
								<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
								</svg>
							</button>
						</div>
						<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
							<ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
								<li>
									<NavLink
										exact
										to="/"
										className={({ isActive, isPending }) =>
											isPending
												? "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
												: isActive
												? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
												: ""
										}>
										Trang chủ
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/shop"
										className={({ isActive, isPending }) =>
											isPending
												? "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
												: isActive
												? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
												: ""
										}>
										Sản phẩm
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/service"
										className={({ isActive, isPending }) =>
											isPending
												? "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
												: isActive
												? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
												: ""
										}>
										Dịch vụ
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/contact"
										className={({ isActive, isPending }) =>
											isPending
												? "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
												: isActive
												? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
												: ""
										}>
										Liên hệ
									</NavLink>
								</li>
								<li class="mt-2">
									<button
										type="button"
										class="text-white w-full bg-blue-700 block sm:hidden hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0">
										Đăng nhập
									</button>
								</li>
							</ul>
						</div>
						{/* <div id="cart-dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-96 px-6 py-3">
							<p class="text-base font-semibold">Giỏ hàng của bạn</p>
							<ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
								<li class="py-3 sm:py-4">
									<div class="flex items-center space-x-4">
										<div class="flex-shrink-0">
											<img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
										</div>
										<div class="flex-1 min-w-0">
											<p class="text-sm font-medium text-gray-900 truncate dark:text-white">Neil Sims</p>
											<p class="text-sm text-gray-500 truncate dark:text-gray-400">email@windster.com</p>
										</div>
										<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
									</div>
								</li>
							</ul>
						</div> */}
					</div>
				</nav>
			</header>
		</>
	);
}
