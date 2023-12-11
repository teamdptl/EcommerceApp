import { useEffect, useState } from "react";
import UserOrderItem from "./UserOrderItem";
import createFetch from "../../utils/createFetch";
import baseUrl from "../../config";

// const orders = [
// 	{
// 		id: "1234",
// 		date: "12:30 02/11/2023",
// 		status: "Đã giao",
// 		total: 9000000,
// 		payment_status: 0, // Chưa thanh toán
// 		items: [
// 			{"product":{"productId":8,"name":"Tủ lạnh Panasonic 417 lít NR-BX471GPKV","price":17990000,"slugUrl":null,"imageUrl":"https://dienmaygiakhang.vn/wp-content/uploads/2021/03/NR-BX471GPKV-layer-1.jpg","quantity":1000},"buyQuantity":1},
// 			{"product":{"productId":8,"name":"Tủ lạnh Panasonic 417 lít NR-BX471GPKV","price":17990000,"slugUrl":null,"imageUrl":"https://dienmaygiakhang.vn/wp-content/uploads/2021/03/NR-BX471GPKV-layer-1.jpg","quantity":1000},"buyQuantity":1},
// 			{"product":{"productId":8,"name":"Tủ lạnh Panasonic 417 lít NR-BX471GPKV","price":17990000,"slugUrl":null,"imageUrl":"https://dienmaygiakhang.vn/wp-content/uploads/2021/03/NR-BX471GPKV-layer-1.jpg","quantity":1000},"buyQuantity":1}
// 		],
// 	},
// 	{
// 		id: "1235",
// 		date: "12:30 02/11/2023",
// 		status: "Đã giao",
// 		total: 9000000,
// 		payment_status: 0, // Chưa thanh toán
// 		items: [
// 			{"product":{"productId":8,"name":"Tủ lạnh Panasonic 417 lít NR-BX471GPKV","price":17990000,"slugUrl":null,"imageUrl":"https://dienmaygiakhang.vn/wp-content/uploads/2021/03/NR-BX471GPKV-layer-1.jpg","quantity":1000},"buyQuantity":1},
// 			{"product":{"productId":8,"name":"Tủ lạnh Panasonic 417 lít NR-BX471GPKV","price":17990000,"slugUrl":null,"imageUrl":"https://dienmaygiakhang.vn/wp-content/uploads/2021/03/NR-BX471GPKV-layer-1.jpg","quantity":1000},"buyQuantity":1},
// 		],
// 	},
// 	{
// 		id: "1236",
// 		date: "12:30 02/11/2023",
// 		status: "Đã giao",
// 		total: 9000000,
// 		payment_status: 1, // Đã thanh toán
// 		items: [
// 			{"product":{"productId":8,"name":"Tủ lạnh Panasonic 417 lít NR-BX471GPKV","price":17990000,"slugUrl":null,"imageUrl":"https://dienmaygiakhang.vn/wp-content/uploads/2021/03/NR-BX471GPKV-layer-1.jpg","quantity":1000},"buyQuantity":1},
// 			{"product":{"productId":8,"name":"Tủ lạnh Panasonic 417 lít NR-BX471GPKV","price":17990000,"slugUrl":null,"imageUrl":"https://dienmaygiakhang.vn/wp-content/uploads/2021/03/NR-BX471GPKV-layer-1.jpg","quantity":1000},"buyQuantity":1},
// 			{"product":{"productId":8,"name":"Tủ lạnh Panasonic 417 lít NR-BX471GPKV","price":17990000,"slugUrl":null,"imageUrl":"https://dienmaygiakhang.vn/wp-content/uploads/2021/03/NR-BX471GPKV-layer-1.jpg","quantity":1000},"buyQuantity":1},
// 		],
// 	},
// ];

const UserOrder = () => {
	const [orders, setOrders] = useState([])
	const getUserOrders = () => {
		let url = baseUrl + '/api/v1/order/user-orders'
		createFetch(url).then(res => res.json())
						.then(json => {
							console.log("Get usser orrder",json)
							if(json.error === 1){
								setOrders(null)
							}else{
								setOrders(json)
							}
						})
						.catch(err => console.error(err))
	}

	useEffect(() => {
		getUserOrders();
	}, [])
    return (
			<>
				<p className="text-xl font-semibold my-3">Đơn hàng đã mua</p>
                <div className="bg-red">
                    {orders === null || orders === undefined ? <div>Không tìm thấy dữ liệu!</div> : 
						orders.map(order => (
							<UserOrderItem order={order}></UserOrderItem>
						)) }
                </div>
			</>
		);
}

export default UserOrder;