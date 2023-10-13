import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { Link } from "react-router-dom";

const ConfirmPassword = () => {
    return (
			<>
				<Header></Header>
				<section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
					<div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
						<div class="max-w-2xl mx-auto text-center">
							<h2 class="text-3xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">Bạn đã quên mật khẩu ?</h2>
							<p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Hãy nhập mã OTP mà bạn nhận được vào ô bên dưới</p>
						</div>

						<form action="#" method="POST" class="max-w-xl mx-auto mt-12">
							<div class="flex flex-col items-center sm:flex-row sm:justify-center">
								<div class="flex-1 w-full max-w-[200px] min-w-0 px-4 sm:px-0">
									<label for="otp" class="sr-only">
										Mã OTP
									</label>
									<input
										type="text"
										name="otp"
										id="otp"
										placeholder="Nhập OTP của bạn"
										class="block w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-indigo-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
										required
									/>
								</div>

								<button
									type="submit"
									class="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md sm:ml-4 sm:mt-0 sm:w-auto hover:bg-indigo-700 focus:bg-indigo-700">
									Xác nhận
								</button>
							</div>
						</form>
						<p class="text-center mt-10 text-black text-xl font-bold">Thay đổi mật khẩu của bạn</p>
						<form action="#" method="POST" class="max-w-xl mx-auto mt-6">
							<div class="flex flex-col items-center sm:justify-center">
								<div class="flex-1 w-8/12 min-w-0 px-4 sm:px-0">
									<label for="email" class="sr-only"></label>
									<input
										type="text"
										name="email"
										id="email"
										placeholder="Mật khẩu mới"
										class="block w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-indigo-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
										required
									/>
								</div>
								<div class="flex-1 w-8/12 min-w-0 px-4 sm:px-0 pt-3">
									<label for="email" class="sr-only"></label>
									<input
										type="text"
										name="email"
										id="email"
										placeholder="Nhập lại mật khẩu mới"
										class="block w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-indigo-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
										required
									/>
								</div>
							</div>
							<div class="flex justify-center mt-4">
								<button
									type="submit"
									class="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md sm:ml-4 sm:mt-0 sm:w-auto hover:bg-indigo-700 focus:bg-indigo-700">
									Đổi mật khẩu
								</button>
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
					</div>
				</section>
				<Footer></Footer>
			</>
		);
 
}

export default ConfirmPassword;