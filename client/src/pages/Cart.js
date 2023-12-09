import Page from "../layouts/Page";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import CartItem from "../components/main/CartItem";
import {Link} from "react-router-dom";
import {useCartContext} from "../context/CartContext";
import formatMoney from "../utils/currency";

export function CartList({ className, cart }) {
	return (
		<>
			<div class={className}>
				{cart.length === 0 &&
					<div className={"flex justify-center items-center flex-col"}>
						<img src={"/empty-cart.svg"} className={"w-72 h-72"}/>
						<p className={"text-slate-800 font-semibold"}>Giỏ hàng trống, vui lòng thêm sản phẩm</p>
					</div>
				}

				{cart.length > 0 &&
					<>
						<ul role="list" className="-my-6 divide-y divide-gray-200 mr-3">
							{cart.map((item) => (
								<CartItem key={item.key} item={item} />
							))}
						</ul>
					</>
				}

			</div>
		</>
	)
}

export function ConfirmCart({ className }) {
	const { getTotalMoney } = useCartContext();
	return (
		<>
			<div className={"flex-1 border-l border-black-100"}>
				{/* Thông tin đơn hàng */}
				<div class="sticky top-28 m-8">
					<h3 class="text-lg font-semibold ">Thông tin đơn hàng</h3>
					<div class="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
						<div class="flex justify-between pb-4">
							<span>Dự tính</span><span class="font-semibold text-slate-900 dark:text-slate-200">{formatMoney(getTotalMoney())}</span>
						</div>
						<div class="flex justify-between py-4">
							<span>Phí vận chuyển</span>
							<span class="font-semibold text-slate-900 dark:text-slate-200">0</span>
						</div>
						<div class="flex justify-between py-4">
							<span>Phát sinh (Thỏa thuận)</span>
							<span class="font-semibold text-slate-900 dark:text-slate-200">0</span>
						</div>
						<div class="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
							<span>Tổng tiền</span><span>{formatMoney(getTotalMoney())}</span>
						</div>
					</div>
					<Link to={"/checkout"} class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
						Mua hàng
					</Link>
				</div>
			</div>
		</>
	)
}

const Cart = () => {
	const { cart, updateQuantity, removeItem } = useCartContext();
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
					<CartList cart={cart} className="col-span-3 md:col-span-2 w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700" />
					<ConfirmCart className="col-span-1" />
				</div>
			</div>
		</Page>
	</>
};

export default Cart;