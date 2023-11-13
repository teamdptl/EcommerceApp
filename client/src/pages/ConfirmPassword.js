import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import baseUrl from "../config";

const ConfirmPassword = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const UUID = searchParams.get("code");
	const params = {
		"UUID":UUID
	}
	const [confirmationPassword,setConfirmationPassword] = useState("");
	const [newPassword,setNewPassword] = useState("");
	const [message,setMessage] = useState("");
	const [isExpiration,setIsExpiration] = useState(false);
	const isValidExpiration =()=>{
		console.log(UUID)
		const config = {
			headers: {
				'Content-Type': 'text/plain'
			}
		};
		axios.get(`${baseUrl}/api/v1/users/confirm-password`,{params},config)
			.then(response =>{
				console.log(response)
				setIsExpiration(response.data)
			})
			.catch((error) =>{
				setMessage(error.response.data.message);
			})
	}
	useEffect(() => {
		isValidExpiration()
	}, []);
	const handleConfirmationPasswordChange = (e)=>{
		setConfirmationPassword(e.target.value)
	}
	const handleNewPassword = (e)=>{
		setNewPassword(e.target.value)
	}
	const submitForm = ()=>{
		console.log("code = " + UUID)
		const data ={"newPassword":newPassword,"confirmationPassword":confirmationPassword,"code":UUID}
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		axios.post(`${baseUrl}/api/v1/users/confirm-password`,data,config)
			.then(response => {
				setMessage(response.data.message)
		})
			.catch(error =>{
				setMessage(error.response.data.message)
			})
	}
    return (
			<>
				<Header></Header>
				{
					isExpiration ? <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
						<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
							<div className="max-w-2xl mx-auto text-center">
								<h2 className="text-3xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">Bạn đã quên mật khẩu ?</h2>
								<p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Hãy nhập mã OTP mà bạn nhận được vào ô bên dưới</p>
							</div>

							{/*<form action="#" method="POST" class="max-w-xl mx-auto mt-12">*/}
							{/*	/!*<div class="flex flex-col items-center sm:flex-row sm:justify-center">*!/*/}
							{/*	/!*	<div class="flex-1 w-full max-w-[200px] min-w-0 px-4 sm:px-0">*!/*/}
							{/*	/!*		<label for="otp" class="sr-only">*!/*/}
							{/*	/!*			Mã OTP*!/*/}
							{/*	/!*		</label>*!/*/}
							{/*	/!*		<input*!/*/}
							{/*	/!*			type="text"*!/*/}
							{/*	/!*			name="otp"*!/*/}
							{/*	/!*			id="otp"*!/*/}
							{/*	/!*			placeholder="Nhập OTP của bạn"*!/*/}
							{/*	/!*			class="block w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-indigo-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"*!/*/}
							{/*	/!*			required*!/*/}
							{/*	/!*		/>*!/*/}
							{/*	/!*	</div>*!/*/}
							{/*	/!*	<button*!/*/}
							{/*	/!*		type="submit"*!/*/}
							{/*	/!*		class="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md sm:ml-4 sm:mt-0 sm:w-auto hover:bg-indigo-700 focus:bg-indigo-700">*!/*/}
							{/*	/!*		Xác nhận*!/*/}
							{/*	/!*	</button>*!/*/}
							{/*	/!*</div>*!/*/}
							{/*</form>*/}
							<p className="text-center mt-10 text-black text-xl font-bold">Thay đổi mật khẩu của bạn</p>
							<form className="max-w-xl mx-auto mt-6">
								<div className="flex flex-col items-center sm:justify-center">
									<div className="flex-1 w-8/12 min-w-0 px-4 sm:px-0">
										<label htmlFor="newPassword" className="sr-only"></label>
										<input
											onChange={handleNewPassword}
											type="text"
											name="newPassword"
											id="newPassword"
											placeholder="Mật khẩu mới"
											className="block w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-indigo-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
											required
										/>
									</div>
									<div className="flex-1 w-8/12 min-w-0 px-4 sm:px-0 pt-3">
										<label htmlFor="confirmationPassword" className="sr-only"></label>
										<input
											onChange={handleConfirmationPasswordChange}
											type="text"
											name="confirmationPassword"
											id="confirmationPassword"
											placeholder="Nhập lại mật khẩu mới"
											className="block w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-indigo-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
											required
										/>
									</div>
								</div>
								<div className="flex justify-center mt-4">
									<button
										onClick={submitForm}
										type="button"
										className="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md sm:ml-4 sm:mt-0 sm:w-auto hover:bg-indigo-700 focus:bg-indigo-700">
										Đổi mật khẩu
									</button>
								</div>
							</form>

							<div className="flex items-center justify-center px-8 mt-8 sm:px-0">
								<p className="mt-2 text-base text-gray-600">
									Bạn muốn đăng nhập chứ ?{" "}
									<Link
										to="/signup"
										title=""
										class="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">
										Đăng nhập
									</Link>
								</p>
							</div>
						</div>
					</section>:
						<p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Hãy nhập mã OTP mà bạn nhận được vào ô bên dưới</p>

				}

				<Footer></Footer>
			</>
		);
 
}

export default ConfirmPassword;