import Page from "../layouts/Page";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
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

function CartList({ className }) {
	return (
		<>
			<div class={className}>
				<ul role="list" class="-my-6 divide-y divide-gray-200 mr-3">
					{cartList.map((item) => (
						<CartItem key={item.key} item={item} />
					))}
				</ul>
			</div>
		</>
	)
}

function ConfirmCart({ className }) {
	return (
		<>
			<div class={className="flex-1 border-l border-black-100"}>
				{/* Thông tin đơn hàng */}
				<div class="sticky top-28 m-8">
					<h3 class="text-lg font-semibold ">Thông tin đơn hàng</h3>
					<div class="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
						<div class="flex justify-between pb-4">
							<span>Subtotal</span><span class="font-semibold text-slate-900 dark:text-slate-200">$249.00</span>
						</div>
						<div class="flex justify-between py-4">
							<span>Shpping estimate</span>
							<span class="font-semibold text-slate-900 dark:text-slate-200">$5.00</span>
						</div>
						<div class="flex justify-between py-4">
							<span>Tax estimate</span>
							<span class="font-semibold text-slate-900 dark:text-slate-200">$24.90</span>
						</div>
						<div class="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
							<span>Order total</span><span>$276.00</span>
						</div>
					</div>
					<button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Checkout</button>
					{/* <div class="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
						<p class="block relative pl-5">
							<svg class="w-4 h-4 absolute -left-1 top-0.5" viewBox="0 0 24 24" fill="none">
								<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M12 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M11.9945 16H12.0035" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>Learn more
							<a target="_blank" rel="noopener noreferrer" href="##" class="text-slate-900 dark:text-slate-200 underline font-medium">Taxes</a>
							<span> and </span>
							<a target="_blank" rel="noopener noreferrer" href="##" class="text-slate-900 dark:text-slate-200 underline font-medium">Shipping</a>
							infomation</p>
					</div> */}
				</div>
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
					<Breadcrumb.Item href="/shop">
						Sản phẩm
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						Giỏ hàng
					</Breadcrumb.Item>
				</Breadcrumb>
				<hr class="mt-8 mb-3" />
				<div class="flex flex-col lg:flex-row">
					<CartList className="col-span-3 md:col-span-2 w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700" />
					<ConfirmCart className="col-span-1" />
				</div>
			</div>
		</Page>
	</>
};

export default Cart;