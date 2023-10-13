import { Dropdown } from "flowbite-react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartItem from "./CartItem";

const cartList = [
	{
		id: 1,
		name: "Máy lạnh Daikin Inverter 1 HP FTKY25WMVMV",
		href: "/product/1",
		quantity: 1,
		price: 12690000,
		imageSrc: "https://dienmaygiakhang.vn/wp-content/uploads/2023/05/gold-2.jpg",
	},
	{
		id: 2,
		name: "Tủ lạnh Samsung Inverter 208 lít RT20HAR8DBU/SV",
		href: "/product/2",
		quantity: 1,
		price: 5460000,
		imageSrc: "https://cdn.tgdd.vn/Products/Images/1943/220320/samsung-rt20har8dbu-sv-1-org.jpg",
	},
	{
		id: 3,
		name: "Máy giặt Samsung AI Inverter 9kg WW90TP44DSB/SV",
		href: "/product/3",
		quantity: 1,
		price: 9690000,
		imageSrc: "https://cdn.tgdd.vn/Products/Images/1944/236158/samsung-9kg-ww90tp44dsb-sv-1-org.jpg",
	},
];

export default function CustomTriggerDropdown() {
	return (
		<Dropdown
			dismissOnClick={false}
			renderTrigger={() => (
				<button class="rounded-full p-2 border hover:bg-gray-100 focus:outline-none">
					<AiOutlineShoppingCart size={20} />
				</button>
			)}>
			{/* Danh sách các sản phẩm trong giỏ hàng */}
			<div class="mt-8 px-3 w-96">
				<div class="flow-root">
					<ul role="list" class="-my-6 divide-y divide-gray-200">
						{cartList.map((item) => (
							<li>
								<CartItem key={item.id} item={item}/>
							</li>
						))}
					</ul>
				</div>
			</div>
			
			{/* Tổng tiền và các nút thanh toán */}
			{/* Code here */}
		</Dropdown>
	);
}
