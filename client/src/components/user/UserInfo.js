import { Label, TextInput, Alert } from "flowbite-react";
import UserShipInfo from "./UserShipInfo";
import {useContext, useEffect, useState} from "react";
import UserShipInfoForm from "./UserShipInfoForm";
import {useAuth} from "../../context/AuthContext";
import useUserInfoFetch from "../../hooks/useShipInfoFetch";
import {get} from "axios";
import createFetch from "../../utils/createFetch";
import baseUrl from "../../config";
import useShipInfoFetch from "../../hooks/useShipInfoFetch";

const UserInfo = () => {
	const { user } = useAuth();
	const [display, setDisplay] = useState(false);
	const { listInfo, loading, errorMsg, getInfoList } = useShipInfoFetch();
	const [editInfo, setEditInfo] = useState(null);

	useEffect(() => {
		getInfoList();
	}, [])

	const saveShipInfo = async (shipInfo) => {
		if (!shipInfo || !shipInfo.isValid){
			alert("Vui lòng điền đầy đủ thông tin");
			return;
		}
		return createFetch(baseUrl+'/api/v1/user/shipInfo/add', {
			method: 'POST',
			body: JSON.stringify(shipInfo),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			getInfoList();
			setDisplay(false);
		})
			.catch(err => console.log(err))
	}

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
					<UserShipInfoForm saveCallback={() => {
						saveShipInfo(editInfo);
					}} onChange={(editInfo) => setEditInfo(editInfo)}/>
				</div>
			) : (
				<></>
			)}

			<div class="mt-2 w-full grid grid-cols-1 gap-x-6 gap-y-3">
				{listInfo && listInfo.length > 0 &&
					listInfo.map(info => (
						<UserShipInfo info={info} onSubmit={getInfoList}/>
					))
				}
				{!listInfo || listInfo.length === 0 &&
					<p className="mt-4">Bạn chưa có bất kì thông tin nhận hàng nào</p>
				}
			</div>
		</>
	);
};

export default UserInfo;
