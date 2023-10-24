import { Dropdown, Select } from "flowbite-react";
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
			dismissOnClick={true}
			renderTrigger={() => (
				<button class="rounded-full p-2 border hover:bg-gray-100 focus:outline-none">
					<AiOutlineShoppingCart size={20} />
				</button>
			)}>
			{/* Danh sách các sản phẩm trong giỏ hàng */}
			<div class="mt-3 px-3 w-76 max-h-96 overflow-y-auto">
			<p className="text-lg font-medium text-gray-900 ml-5 mb-2">Shopping cart</p>

				<div class="flow-root">
					<ul role="list" class="-my-6 divide-y divide-gray-200" >
						{cartList.map((item) => (
							<CartItem key={item.id} item={item} />

						))}
					</ul>
				</div>
			</div>
			{/* Tổng tiền và các nút thanh toán */}
			<div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-5">
				<div className="flex justify-between text-base font-medium text-gray-900">
					<p>Subtotal</p>
					<p>$200</p>
				</div>
				<p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
				<div className="mt-6 flex">
					<a
						href="#"
						className="flex items-center justify-center rounded-full pl-16 pr-16 border border-md  px-6 py-3  font-medium text-black shadow-sm"
					>			View cart
					</a>
					<a
						href="#"
						className="flex items-center justify-center rounded-full ml-2 pl-16 pr-16 border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm bg-indigo-700"
					>			Checkout
					</a>
				</div>
				<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
					<p>
						or
						<button
							type="button"
							className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
							onClick={() => Select(false)}
						>
							Continue Shopping
							<span aria-hidden="true"> &rarr;</span>
						</button>
					</p>
				</div>
			</div>
			{/* Code here */}
		</Dropdown>
	);
}
