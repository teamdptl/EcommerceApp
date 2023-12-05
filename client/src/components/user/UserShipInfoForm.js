/* eslint-disable no-unused-vars */
import { TextInput, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";

const UserShipInfoForm = ({shipInfo, saveCallback, onChange}) => {
	const baseURL = "https://provinces.open-api.vn/api";

	const [fullName, setFullName] = useState('');
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('');
	const [listProvince, setListProvince] = useState([]);
	const [province, setProvince] = useState(null);
	const [listDistrict, setListDistrict] = useState([]);
	const [district, setDistrict] = useState(null);
	const [listWard, setListWard] = useState([]);
    const [ward, setWard] = useState(null);
    
    const info = shipInfo !== null ? { ...shipInfo } : { receiveName: "", phone: "", address: "" };

	const getProvinces = async () => {
		const provinces = await fetch(`${baseURL}/p`, {
			method: "GET",
		})
			.then((res) => res.json())
			.catch((err) => console.error(err));

		const list = provinces.map((province) => {
			return {
				name: province.name,
				code: province.code,
			};
		});
		setListProvince(list);
	};

	// Lấy danh sách tỉnh thành khi lần đầu
	useEffect(() => {
		getProvinces();
	}, []);

	// Lấy danh sách quận huyện nếu chọn tỉnh thành
	useEffect(() => {
		const getDistricts = async () => {
			if (province === null) return;
			const getProvince = await fetch(`${baseURL}/p/${province.code}?depth=2`, {
				method: "GET",
			})
				.then((res) => res.json())
				.catch((err) => console.error(err));

			const districts = getProvince["districts"].map((district) => {
				return {
					name: district.name,
					code: district.code,
				};
			});
            setListDistrict(districts);
            setListWard([]);
		};
		getDistricts();
	}, [province]);

	// Lấy danh sách phường xã nếu đã chọn quận huyện
	useEffect(() => {
		const getWards = async () => {
			if (district === null) return;
			const getDistrict = await fetch(`${baseURL}/d/${district.code}?depth=2`, {
				method: "GET",
			})
				.then((res) => res.json())
				.catch((err) => console.error(err));

			const wards = getDistrict["wards"].map((ward) => {
				return {
					name: ward.name,
					code: ward.code,
				};
			});
			setListWard(wards);
		};
		getWards();
	}, [district]);

	const phoneRegex = (phone) => {
		return (/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm).test(phone)
	}

	useEffect(() => {
		const shipData = {
			fullName: fullName,
			phone: phone,
			address: `${street}, ${ward?.name}, ${district?.name}, ${province?.name}`,
			isValid: province !== null && district !== null && ward !== null && street !== null && fullName.length > 0 && phoneRegex(phone)
		}
		if (onChange)
			onChange(shipData)
		console.log(shipData)
	}, [province, district, ward, fullName, phone, street])

	const onChangeProvinces = (value) => {
		const code = parseInt(value);
		if (code) {
			const findProvince = listProvince.find((item) => item.code === code);
            if (findProvince) {
                setProvince(findProvince);
                setDistrict(null);
                setWard(null);
            }
		}
	};

	const onChangeDistrict = (value) => {
		const code = parseInt(value);
		if (code) {
			const findDistrict = listDistrict.find((item) => item.code === code);
            if (findDistrict) {
                setDistrict(findDistrict);
                setWard(null);
            }
		}
	};

	const onChangeWard = (value) => {
		const code = parseInt(value);
		if (code) {
			const findWard = listWard.find((item) => item.code === code);
			if (findWard) setWard(findWard);
		}
	};

	return (
		<>
			<div class="w-full grid grid-cols-2 gap-x-6 gap-y-3">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="name" value="Họ và tên người nhận" />
					</div>
					<TextInput id="name" sizing="md" type="text" value={info.receiveName} onChange={e => setFullName(e.target.value)}/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="name" value="Số điện thoại" />
					</div>
					<TextInput id="name" sizing="md" type="text" value={info.phone} onChange={e => setPhone(e.target.value)}/>
				</div>
				<div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Tên đường/Số nhà" />
						</div>
						<TextInput id="name" sizing="md" type="text" value={street} onChange={e => setStreet(e.target.value)}/>
					</div>
				</div>
				<div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Tỉnh/Thành Phố" />
						</div>
						<Select
							id="name"
							sizing="md"
							type="text"
							required
							defaultValue=""
							onChange={(e) => {
								onChangeProvinces(e.target.value);
							}}>
							<option value="">Chọn tỉnh/thành phố</option>
							{listProvince.map((province) => (
								<option key={province.code} value={province.code}>
									{province.name}
								</option>
							))}
						</Select>
					</div>
				</div>
				<div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Quận/Huyện" />
						</div>
						<Select
							id="name"
							sizing="md"
							type="text"
							required
							defaultValue=""
							onChange={(e) => {
								onChangeDistrict(e.target.value);
							}}>
							<option value="">Chọn quận/huyện</option>
							{listDistrict.map((district) => (
								<option key={district.code} value={district.code}>
									{district.name}
								</option>
							))}
						</Select>
					</div>
				</div>
				<div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Phường/Xã" />
						</div>
						<Select
							id="name"
							sizing="md"
							type="text"
							required
							defaultValue=""
							onChange={(e) => {
								onChangeWard(e.target.value);
							}}>
							<option value="">Chọn phường/xã</option>
							{listWard.map((ward) => (
								<option key={ward.code} value={ward.code}>
									{ward.name}
								</option>
							))}
						</Select>
					</div>
				</div>
			</div>
			{saveCallback &&
				<div className="flex justify-center mt-3">
					<button className="text-white rounded-md cursor bg-green-500 mx-auto py-2 px-4"
						onClick={() => saveCallback()}
					>Lưu thông tin</button>
				</div>
			}

		</>
	);
};

export default UserShipInfoForm;
