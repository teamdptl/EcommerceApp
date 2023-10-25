import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle, HiShoppingCart } from "react-icons/hi";
import UserInfo from '../components/user/UserInfo';

const User = () => {
	return (
		<>
			<Header></Header>
			<div class="max-w-4xl mx-auto mt-10">
				<p class=" text-2xl font-semibold">Tài khoản của bạn</p>
				<p class="mt-2">Enrico Cole, ciseco@gmail.com · Los Angeles, CA</p>
				<Tabs.Group aria-label="Tabs with icons" theme={tabTheme} style="underline">
					<Tabs.Item active icon={HiUserCircle} title="Tài khoản">
						<UserInfo></UserInfo>
					</Tabs.Item>
					<Tabs.Item icon={HiShoppingCart} title="Đơn hàng">
						<p>
							Đơn hàng
						</p>
					</Tabs.Item>
					<Tabs.Item icon={HiClipboardList} title="Yêu thích">
						<p>
							Yêu thích
						</p>
					</Tabs.Item>
					<Tabs.Item icon={HiAdjustments} title="Đổi mật khẩu">
						<p>
							Thay đổi mật khẩu
						</p>
					</Tabs.Item>
				</Tabs.Group>
			</div>
			<Footer></Footer>
		</>
	);
};

export default User;

const tabTheme = {
	base: "flex flex-col gap-2 mt-5",
	tablist: {
		tabitem: {
			base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none",
			styles: {
				underline: {
					base: "rounded-t-lg",
					active: {
						on: "text-blue-600 rounded-t-lg border-b-2 border-blue-600 active",
						off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600",
					},
				},
			},
			icon: "mr-2 h-5 w-5",
		},
	},
	tabitemcontainer: {
		base: "",
		styles: {
			default: "",
			underline: "",
			pills: "",
			fullWidth: "",
		},
	},
	tabpanel: "py-3",
};