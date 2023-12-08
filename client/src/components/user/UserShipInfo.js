import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import UserShipInfoForm from "./UserShipInfoForm";
import createFetch from "../../utils/createFetch";
import baseUrl from "../../config";

const UserShipInfo = ({info, onSubmit}) => {
	// const [info, setInfo] = useState({
	// 	receiveName: "Huỳnh Khánh Duy",
	// 	address: "373 An Dương Vương, Quận 5, TP.Hồ Chí Minh",
	// 	phone: "012345678",
	// });

	const [editInfo, setEditInfo] = useState({...info});

	const [display, setDisplay] = useState(false);

	const saveShipInfo = async (shipInfo) => {
		return createFetch(baseUrl+'/api/v1/user/shipInfo/add', {
			method: 'POST',
			body: JSON.stringify(shipInfo),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.catch(err => console.log(err))
	}

	const editShipInfo = async (shipInfo) => {
		return createFetch(baseUrl+`/api/v1/user/shipInfo/edit/${shipInfo.shipId}`, {
			method: 'PUT',
			body: JSON.stringify(shipInfo),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.catch(err => console.log(err))
	}

	const removeShipInfo = async () => {
		return createFetch(baseUrl+`/api/v1/user/shipInfo/delete/${info.shipId}`, {
			method: 'DELETE',
		}).then(res => {
			if (res.ok)
				onSubmit();
		})
			.catch(err => console.log(err))
	}

	const onClickSave = () => {
		if (!editInfo || !editInfo.isValid){
			alert("Vui lòng điền đầy đủ thông tin!");
			return;
		}
		if (info.shipId){
			console.log("Edit data "+editInfo);
			editShipInfo({...editInfo, shipId: info.shipId})
				.then((data) => {
					// alert("Tạo thành công");
					onSubmit();
				})
				.catch(err => console.log(err))
		}
		else {
			console.log("Save data "+editInfo);
			saveShipInfo(editInfo)
				.then((data) => {
					// alert("Tạo thành công");
					onSubmit();
				})
				.catch(err => console.log(err))
		}
	}

	return (
		<>
			<div class="flex w-full items-center border border-slate-200 py-4 px-5 rounded-md">
				<FaShippingFast size={20}></FaShippingFast>
				<div class="flex flex-col ml-7 mr-3">
					<div class="flex items-center">
						<p class="text-base font-semibold">
							{info.fullName} - ({info.phone})
						</p>
					</div>
					<p>Địa chỉ: {info.address}</p>
				</div>
				<div className={"ml-auto gap-2 flex items-center"}>
					<button
						onClick={() => {
							setDisplay(!display);
						}}
						className="text-white bg-blue-700 px-4 py-2 rounded-lg cursor whitespace-nowrap">
						Thay đổi
					</button>
					<button
						onClick={() => {
							removeShipInfo();
						}}
						className="text-white bg-red-600 px-4 py-2 rounded-lg cursor whitespace-nowrap">
						Xóa
					</button>
				</div>
            </div>
            {display === true ?
				<UserShipInfoForm shipInfo={{...info}}
								  onChange={(data) => setEditInfo(data)}
								  saveCallback={() => {onClickSave()}}
			/> : <></>}
		</>
	);
};

export default UserShipInfo;
