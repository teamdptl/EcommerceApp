import { Label, TextInput, Alert } from "flowbite-react";
import UserShipInfo from "./UserShipInfo";
import {useContext, useState} from "react";
import UserShipInfoForm from "./UserShipInfoForm";
import {useAuth} from "../../context/AuthContext";

const UserInfo = () => {
	const [display, setDisplay] = useState(false);
	const { user } = useAuth();
	return (
		<>
			<p class="text-xl font-semibold my-3">Thông tin tài khoản</p>
			<div class="mt-2 w-full grid grid-cols-2 gap-x-6 gap-y-3">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="name" value="Họ và tên:" />
					</div>
					<TextInput id="name" sizing="md" type="text" disabled value={user?.fullname}/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email" value="Email:" />
					</div>
					<TextInput id="email" sizing="md" type="email" disabled value={user?.username}/>
				</div>
			</div>
			<div class="flex mt-6 items-center">
				<p class="text-base font-semibold">Thông tin nhận hàng</p>
				<button
					class="bg-blue-700 text-white px-2 py-1 rounded-md ml-4"
					onClick={() => {
						setDisplay(!display);
					}}>
					Thêm ngay
				</button>
			</div>
			{display === true ? (
				<div class="w-full mt-2">
					<UserShipInfoForm saveCallback={() => console.log("saved")} />
				</div>
			) : (
				<></>
			)}
			<p class="mt-4">Bạn chưa có bất kì thông tin nhận hàng nào</p>
			<div class="mt-2 w-full grid grid-cols-1 gap-x-6 gap-y-3">
				<UserShipInfo></UserShipInfo>
			</div>
		</>
	);
};

export default UserInfo;
