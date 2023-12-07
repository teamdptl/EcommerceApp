import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import {Link, useLocation, useParams,useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import baseUrl from "../config";
import {Button, Modal} from "flowbite-react";
import {HiOutlineExclamationCircle ,HiOutlineCheckCircle} from "react-icons/hi";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const ConfirmPassword = () => {

	const navigate = useNavigate();
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
	const [isChangeSuccess , setIsChangeSuccess] = useState(false)
	const [showPassword, setShowPassword] = useState([false, false]);


	//Check xem link có hết hạn không
	useEffect(() => {
		isValidExpiration()
	}, );
	const isValidExpiration =()=>{
		console.log(UUID)
		const config = {
			headers: {
				'Content-Type': 'text/plain'
			}
		};
		axios.get(`${baseUrl}/api/v1/auth/confirm-password`,{params},config)
			.then(response =>{
				console.log(response)
				setIsExpiration(response.data)
			})
			.catch((error) =>{
				setMessage(error.response.data.message);
			})
	}

	//Set confirmPassword
	const handleConfirmationPasswordChange = (e)=>{
		setConfirmationPassword(e.target.value)
	}
	//Set newPassword
	const handleNewPassword = (e)=>{
		setNewPassword(e.target.value)
	}
	//ShowPassword
	const handleShowPassword = (index)=>{
		const updateShowPassword = [...showPassword]
		updateShowPassword[index] = !showPassword[index]
		setShowPassword(updateShowPassword)
	}
	// t
	const submitForm = ()=>{
		console.log("code = " + UUID)
		if(newPassword.length < 6){
			setMessage("Độ dài của mật khẩu phải lớn hơn 6 kí tự");
			return;
		}
		if(!confirmationPassword || !newPassword){
			setMessage("Vui lòng không để trống dữ liệu");
			return;
		}
		if(confirmationPassword !== newPassword){
			setMessage("Xác nhận mật khẩu không trùng khớp ");
			return;
		}
		const data ={"newPassword":newPassword,"confirmationPassword":confirmationPassword,"code":UUID}
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		axios.post(`${baseUrl}/api/v1/auth/confirm-password`,data,config)
			.then(response => {
				setMessage(response.data.message)
				setIsChangeSuccess(true)
				setTimeout(()=>{
					navigate("/login")
				},3000)

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
								<p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Hãy nhập mật khẩu của bạn vào ô bên dưới</p>
							</div>


							<p className="text-center mt-10 text-black text-xl font-bold">Thay đổi mật khẩu của bạn</p>
							<form className="max-w-xl mx-auto mt-6">
								<div className="flex flex-col items-center sm:justify-center">
									<div className="flex-1 w-8/12 min-w-0 px-4 sm:px-0 relative">
										<label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới</label>
										<input
											onChange={handleNewPassword}
											type={showPassword[0] ? 'text' : 'password'}
											name="newPassword"
											id="newPassword"
											placeholder="Mật khẩu mới"
											class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											required
										/>
										<span className="absolute end-2.5 bottom-5" onClick={()=>{handleShowPassword(0)}}>
              							  {showPassword ? <FaEyeSlash /> : <FaEye />}
										</span>
									</div>
									<div className="flex-1 w-8/12 min-w-0 px-4 sm:px-0 pt-3 relative">
										<label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu mới</label>
										<input 	onChange={handleConfirmationPasswordChange}
												  type={showPassword[1]?"text":"password"}
												  name="confirmationPassword"
												  id="confirmationPassword"
												  placeholder="Nhập lại mật khẩu mới"
												  class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
										<span className="absolute end-2.5 bottom-5" onClick={()=>{handleShowPassword(1)}}>
              							  {showPassword ? <FaEyeSlash /> : <FaEye />}
										</span>

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
										to="/login"
										title=""
										class="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">
										Đăng nhập
									</Link>
								</p>
							</div>
						</div>
					</section>:
						<section className="items-center text-center h-60 flex justify-center flex-col">
							<h1 className="text-6xl text-blue-500 m-5 font-bold">Opps!</h1>
							<p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Liên kết đã hết hạn của bạn đã hết hạn vui lòng gửi yêu cầu mới</p>
						</section>



				}

				<Footer></Footer>
				<Modal show={message !== ""} size="md" onClose={() => setMessage("")} popup dismissible>
					<Modal.Header />
					<Modal.Body>
						<div className="text-center">
							{/*<HiOutlineCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-400 dark:text-gray-200"/>*/}
							{/*<h3 className="mb-5 text-3xl  text-black-500 font-bold dark:text-gray-400">Thành công</h3>*/}

							{
								isChangeSuccess ?
									<div className="mb-3">
										<HiOutlineCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-400 dark:text-gray-200"/>
										<label className="mb-5 text-3xl  text-black-500 font-bold dark:text-gray-400">Thành công</label>
									</div>
								:
									<div className="mb-3">
										<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-gray-200"/>
										<label className="mb-5 text-3xl  text-black-500 font-bold dark:text-gray-400">Thất bại</label>
									</div>

							}

							<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
							 <div className="flex justify-center gap-4">
								 {
									 isChangeSuccess ?
										 <label>Đang được chuyển hướng</label>
										 :
										 <Button color="gray" onClick={() => setMessage("")}>
											 Xác nhận
										 </Button>
								 }
								</div>

						</div>
					</Modal.Body>
				</Modal>
			</>
		);
 
}

export default ConfirmPassword;