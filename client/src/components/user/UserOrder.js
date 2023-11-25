import UserOrderItem from "./UserOrderItem";

const orders = [
	{
		id: "1234",
		date: "12:30 02/11/2023",
		status: "Đã giao",
		total: 9000000,
		payment_status: 0, // Chưa thanh toán
		items: [
			{
				name: "Máy lạnh Daikin Inverter 1 HP FTKY25WMVMV",
				quantity: 1,
				price: 3000000,
				link: "/product/1",
				imageSrc: "https://dienmaygiakhang.vn/wp-content/uploads/2023/05/gold-2.jpg",
			},
			{
				name: "Tủ lạnh Samsung Inverter 208 lít RT20HAR8DBU/SV",
				quantity: 1,
				price: 3000000,
				link: "/product/2",
				imageSrc: "https://cdn.tgdd.vn/Products/Images/1943/220320/samsung-rt20har8dbu-sv-1-org.jpg",
			},
			{
				name: "Máy giặt Samsung AI Inverter 9kg WW90TP44DSB/SV",
				quantity: 1,
				price: 3000000,
				link: "/product/3",
				imageSrc: "https://cdn.tgdd.vn/Products/Images/1944/236158/samsung-9kg-ww90tp44dsb-sv-1-org.jpg",
			},
		],
	},
	{
		id: "1235",
		date: "12:30 02/11/2023",
		status: "Đã giao",
		total: 9000000,
		payment_status: 0, // Chưa thanh toán
		items: [
			{
				name: "Máy lạnh Daikin Inverter 1 HP FTKY25WMVMV",
				quantity: 1,
				price: 3000000,
				link: "/product/1",
				imageSrc: "https://dienmaygiakhang.vn/wp-content/uploads/2023/05/gold-2.jpg",
			},
			{
				name: "Tủ lạnh Samsung Inverter 208 lít RT20HAR8DBU/SV",
				quantity: 1,
				price: 3000000,
				link: "/product/2",
				imageSrc: "https://cdn.tgdd.vn/Products/Images/1943/220320/samsung-rt20har8dbu-sv-1-org.jpg",
			},
			{
				name: "Máy giặt Samsung AI Inverter 9kg WW90TP44DSB/SV",
				quantity: 1,
				price: 3000000,
				link: "/product/3",
				imageSrc: "https://cdn.tgdd.vn/Products/Images/1944/236158/samsung-9kg-ww90tp44dsb-sv-1-org.jpg",
			},
		],
	},
	{
		id: "1236",
		date: "12:30 02/11/2023",
		status: "Đã giao",
		total: 9000000,
		payment_status: 1, // Đã thanh toán
		items: [
			{
				name: "Máy lạnh Daikin Inverter 1 HP FTKY25WMVMV",
				quantity: 1,
				price: 3000000,
				link: "/product/1",
				imageSrc: "https://dienmaygiakhang.vn/wp-content/uploads/2023/05/gold-2.jpg",
			},
			{
				name: "Tủ lạnh Samsung Inverter 208 lít RT20HAR8DBU/SV",
				quantity: 1,
				price: 3000000,
				link: "/product/2",
				imageSrc: "https://cdn.tgdd.vn/Products/Images/1943/220320/samsung-rt20har8dbu-sv-1-org.jpg",
			},
			{
				name: "Máy giặt Samsung AI Inverter 9kg WW90TP44DSB/SV",
				quantity: 1,
				price: 3000000,
				link: "/product/3",
				imageSrc: "https://cdn.tgdd.vn/Products/Images/1944/236158/samsung-9kg-ww90tp44dsb-sv-1-org.jpg",
			},
		],
	},
];

const UserOrder = () => {
    return (
			<>
				<p className="text-xl font-semibold my-3">Đơn hàng đã mua</p>
                <div className="bg-red">
                    {orders.map(order => (
                        <UserOrderItem order={order}></UserOrderItem>
                    )) }
                </div>
			</>
		);
}

export default UserOrder;