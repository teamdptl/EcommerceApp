import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import baseUrl from "../config";
import { Hypnosis ,Spin} from "react-cssfx-loading";

const ForgotPassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [email,setEmail]= useState("");
	const [message,setMessage]= useState("");
	const navigate = useNavigate();
	const [isSend , setIsSend] = useState(false)
	const submitForm = () => {
		setIsLoading(true);
		const data =email
		const config = {
			headers: {
				'Content-Type': 'text/plain'
			}
		};
	  axios.post(`${baseUrl}/api/v1/users/forget-password`,data,config)
		  .then((response) =>{
				setIsSend(true);
		  })
		  .catch((error) =>{
			  setMessage(error.response.data.message);
		  })
		  .finally(() => {
			  setIsLoading(false);
		  });
	}
	const handleChangeEmail = (e) => {
		setEmail(e.target.value)
	}
    return (
			<>
				<Header></Header>
				<section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
					{isLoading && (
						<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col">
						<Hypnosis color="#92D8E8" width="50px" height="50px"/>
							<p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-black">
								Đang gửi ...
							</p>
						</div>
					)}
					{!isSend?<div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
						<div class="max-w-2xl mx-auto text-center">
							<h2 class="text-3xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">Bạn đã quên mật khẩu ?</h2>

							<p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
								Đừng lo ! Hãy nhập email và chúng tôi sẽ giúp bạn tạo một mật khẩu mới
							</p>

							<label class="max-w-xl mx-auto text-base leading-relaxed text-gray-600">
								{message}
							</label>
						</div>

						<form action="#" method="POST" class="max-w-xl mx-auto mt-12">
							<div class="flex flex-col items-center sm:flex-row sm:justify-center">
								<div class="flex-1 w-full min-w-0 px-4 sm:px-0">
									<label for="email" class="sr-only"></label>
									<input
										onChange={handleChangeEmail}
										type="email"
										name="email"
										id="email"
										placeholder="Enter email to get started"
										class="block w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-indigo-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
										required
									/>
								</div>
								{/*<Link to="/confirm-password">*/}
									<button
										onClick={submitForm}
										type="button"
										class="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md sm:ml-4 sm:mt-0 sm:w-auto hover:bg-indigo-700 focus:bg-indigo-700">
										Gửi OTP
										<svg class="w-5 h-5 ml-3 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
											<path
												fill-rule="evenodd"
												d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>
								{/*</Link>*/}
							</div>
						</form>

						<div class="flex items-center justify-center px-8 mt-8 sm:px-0">
							<p class="mt-2 text-base text-gray-600">
								Bạn muốn đăng nhập chứ ?{" "}
								<Link
									to="/signup"
									title=""
									class="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">
									Đăng nhập
								</Link>
							</p>
						</div>
					</div>:	<h2 className="text-3xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">Email đã được gửi</h2>}
				</section>
				<Footer></Footer>
			</>
		);
 
}

export default ForgotPassword;