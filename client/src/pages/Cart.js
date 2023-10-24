import Page from "../layouts/Page";
import {Breadcrumb} from "flowbite-react";
import {HiHome} from "react-icons/hi";
import CartItem from "../components/main/CartItem";

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

function CartList({className}) {
	return (
		<>
			<div class={className}>
				<ul role="list" class="-my-6 divide-y divide-gray-200">
					{cartList.map((item) => (
						<CartItem key={item.key} item={item}/>
					))}
				</ul>
			</div>
		</>
	)
}

function ConfirmCart({className}) {
	return (
		<>
			<div class={className}>
				Thông tin đơn hàng
			</div>
		</>
	)
}

const Cart = () => {
	return <>
		<Page>
			<div class="max-w-screen-xl mx-auto">
				<p class="text-2xl mt-8 font-semibold text-center">Giỏ hàng</p>
				<Breadcrumb aria-label="Default breadcrumb example" class="flex justify-center mt-3">
					<Breadcrumb.Item
						href="/"
						icon={HiHome}
					>
						<p>
							Trang chủ
						</p>
					</Breadcrumb.Item>
					<Breadcrumb.Item href="/product">
						Sản phẩm
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						Giỏ hàng
					</Breadcrumb.Item>
				</Breadcrumb>
				<hr class="mt-8 mb-3"/>
				<div class="grid grid-cols-3">
					<CartList className="col-span-3 md:col-span-2"/>
					<ConfirmCart className="col-span-1"/>
				</div>
			</div>
		</Page>
	</>
};

export default Cart;