/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useContext, useState } from "react";
import {NavLink, Link, useNavigate} from "react-router-dom";
import CartDropDown from "../components/main/CartDropdown"
import NavMenuDropDown from "../components/main/NavMenuDropDown";
import "flowbite";
import {useContext, useEffect, useState} from "react";
import baseUrl from "../config";
import {AuthProvider, AuthContext, useAuth} from "../context/AuthContext";
import UserDropDown from "../components/main/UserDropDown";

export default function Header({isAdmin = false}) {
	const {user, setUser, isUser} = useAuth();
	const navigate = useNavigate();

	const handleLogout = () =>{
		const token = localStorage.getItem('accessToken');
		fetch(`${baseUrl}/api/v1/auth/logout`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
			.then(() => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				localStorage.removeItem('refresh_token');
				localStorage.removeItem('cart');
				setUser(null);
				navigate("/login", {replace: true})
			})
			.catch(() => {
				alert("Lỗi không thể đăng xuất");
			});
	}

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
							<div class="flex gap-4">
								{ !isAdmin && isUser() &&
									<div className="flex items-center">
										<CartDropDown></CartDropDown>
									</div>
								}

								{
									user ?
										<>
											<UserDropDown user={user} logout={handleLogout}></UserDropDown>
										</>
										:
										<Link to="/login">
										<button
											type="button"
											class="text-white mr-2 bg-blue-700 hidden sm:block hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0">
											Đăng nhập
										</button>
										</Link>
								}

							</div>

							<NavMenuDropDown/>
						</div>
						<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
							{!isAdmin &&
								<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
											Cửa hàng
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
									<li className="mt-2">
										<button
											type="button"
											className="text-white w-full bg-blue-700 block sm:hidden hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0">
											Đăng nhập
										</button>
									</li>
								</ul>
							}
						</div>
					</div>
				</nav>
			</header>
		</>
	);
}
