import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import UserShipInfoForm from "./UserShipInfoForm";

const UserShipInfo = () => {
	const [info, setInfo] = useState({
		receiveName: "Huỳnh Khánh Duy",
		address: "373 An Dương Vương, Quận 5, TP.Hồ Chí Minh",
		phone: "012345678",
	});

	const [display, setDisplay] = useState(false);

	return (
		<>
			<div class="flex w-full items-center border border-slate-200 py-4 px-5 rounded-md">
				<FaShippingFast size={20}></FaShippingFast>
				<div class="flex flex-col ml-7 mr-3">
					<div class="flex items-center">
						<p class="text-base font-semibold">
							{info.receiveName} - ({info.phone})
						</p>
					</div>
					<p>Địa chỉ: {info.address}</p>
				</div>
				<button
					onClick={() => {
						setDisplay(!display);
					}}
					class="ml-auto text-white bg-blue-700 px-4 py-2 rounded-lg cursor">
					Thay đổi
				</button>
            </div>
            {display === true ? <UserShipInfoForm info={info}  /> : <></>}
		</>
	);
};

export default UserShipInfo;
