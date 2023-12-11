import Header from "../layouts/Header";
import Footer from '../layouts/Footer';
import { Link,useNavigate   } from "react-router-dom";

import React, {useContext, useState} from 'react';
import baseUrl from "../config";
import {useAuth} from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import {Button, Modal} from "flowbite-react";
import {HiOutlineExclamationCircle} from "react-icons/hi";


const Login = () => {
		const navigate = useNavigate();
		const [message, setMessage] = useState('');
		const [email, setEmail] = useState('');
		const [password, setPassword] = useState('');
		const {user, setUser} = useAuth();


	const submitForm = (e) => {
		e.preventDefault();
		const data = {
			password: password,
			email: email
		};
		fetch(`${baseUrl}/api/v1/auth/authenticate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (!response.ok) {

				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				let accessToken = data.access_token
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refresh_token', data.refresh_token);
				const decoded = jwtDecode(accessToken);
				setUser({
					username: decoded.username,
					fullname: decoded.fullname,
					role: decoded.role
				})
				navigate('/', {replace: true});
			})
			.catch(data => {
				console.log(data)
				setMessage("Tài khoản hoặc mật khẩu không trùng khớp")
			});
	};



	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	return (
		<>
			<Header></Header>
			<section class="bg-white">
				<div class="grid grid-cols-1 lg:grid-cols-2">
					<div class="flex items-center justify-center px-4 pt-5 pb-10 bg-white sm:px-6 lg:px-8 sm:pb-16 sm:pt-8 lg:pb-24 lg:pt-12">
						<div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
							<h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">Đăng nhập</h2>

							<p class="mt-2 text-base text-gray-600">
								Không có tài khoản ?{" "}
								<Link
									to="/signup"
									title=""
									class="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">
									Tạo tài khoản ngay
								</Link>
							</p>

							<form  class="mt-8">
								{/*<label class="text-red-500 font-medium">{message}</label>*/}
								<div class="space-y-5">
									<div>
										<label for="" class="text-base font-medium text-gray-900">
											{" "}
											Email của bạn{" "}
										</label>
										<div class="mt-2.5">
											<input
												onChange={handleEmailChange}
												type="email"
												name="email"
												id="email"
												placeholder="Your email"
												class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
											/>
										</div>
									</div>

									<div>
										<div class="flex items-center justify-between">
											<label for="" class="text-base font-medium text-gray-900">
												{" "}
												Mật khẩu{" "}
											</label>

											<Link
												to="/forget-password"
												title=""
												class="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700">
												{" "}
												Quên mật khẩu ?{" "}
											</Link>
										</div>
										<div class="mt-2.5">
											<input
												onChange={handlePasswordChange}
												type="password"
												name="password"
												id="password"
												placeholder="Your password"
												class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
											/>
										</div>
									</div>

									<div>
										<button
											onClick={submitForm}
											type="button"
											class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
											Đăng nhập
										</button>
									</div>
								</div>
							</form>

							<div class="mt-3 space-y-3">
								<button
									type="button"
									class="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none">
									<div class="absolute inset-y-0 left-0 p-4">
										<svg class="w-6 h-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
											<path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
										</svg>
									</div>
									Đăng nhập bằng Google
								</button>

								<button
									type="button"
									class="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none">
									<div class="absolute inset-y-0 left-0 p-4">
										<svg class="w-6 h-6 text-[#2563EB]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
											<path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
										</svg>
									</div>
									Đăng nhập bằng Facebook
								</button>
							</div>
						</div>
					</div>

					<div class="flex items-center justify-center px-4 pt-5 pb-10 sm:pb-16 sm:pt-8 lg:pb-24 lg:pt-12 bg-gray-50 sm:px-6 lg:px-8">
						<div>
							<img class="w-full mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png" alt="" />

							<div class="w-full max-w-md mx-auto xl:max-w-xl">
								<h3 class="text-2xl font-bold text-center text-black">Mua hàng nhanh chóng, tiện lợi</h3>
								<p class="leading-relaxed text-center text-gray-500 mt-2.5">
									Chính sách bảo hành nhiều ưu đãi, đổi trả miễn phí trong vòng 1 tuần
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer></Footer>
			<Modal show={message !== ""} size="md" onClose={() => setMessage("")} popup dismissible>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-gray-200" />
						<label className="mb-5 text-3xl  text-black-500 font-bold dark:text-gray-400">Thất bại</label>
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
						<div className="flex justify-center gap-4">
							<Button color="gray" onClick={() => setMessage("")}>
								Xác nhận
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default Login;