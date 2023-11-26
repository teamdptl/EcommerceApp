import Page from "../layouts/Page";
import UserShipInfoForm from "../components/user/UserShipInfoForm";
import CartItem from "../components/main/CartItem";
import {Button, Label, Radio, TextInput} from "flowbite-react";
import {ConfirmCart} from "./Cart";

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

const Checkout = () => {
	return <Page>
		<div className="mt-8 max-w-screen-xl mx-auto">
			<p className={"text-2xl font-bold text-center"}>Xác nhận đơn hàng</p>
			<p className={"text-center mt-3"}>Vui lòng kiểm tra lại thông tin trước khi xác nhận</p>
			<hr className="mt-8 mb-3" />
			<div className={"grid grid-cols-6 gap-8"}>
				<div className={"col-span-3"}>
					<p className={"text-lg mb-3 font-semibold"}>Thông tin giao hàng</p>
					<UserShipInfoForm/>
					<p className={"text-lg mb-3 font-semibold mt-6"}>Phương thức thanh toán</p>
					<div>
						<div className="flex items-center gap-2 mb-3">
							<Radio id="nhanhang" name="countries" value="USA" defaultChecked />
							<Label className={"font-normal text-base"} htmlFor="nhanhang">Thanh toán khi nhận hàng (COD)</Label>
						</div>
						<div className="flex items-center gap-2">
							<Radio id="chuyenkhoan" name="countries" value="USA" />
							<Label className={"font-normal text-base"} htmlFor="chuyenkhoan">Chuyển khoản ngân hàng</Label>
						</div>
					</div>

				</div>
				<div className={"col-span-3"}>
					<p className={"text-lg mb-3 font-semibold"}>Thông tin đơn hàng</p>
					<div className={"border-l border-l-zinc-200 pl-3"}>
						{cartList.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
						<hr className={"mx-8"}/>
						<div className={"ml-6 mt-4"}>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="coupon" value="Mã giảm giá" />
								</div>
								<div className={"flex gap-4"}>
									<TextInput className={"flex-grow"} id="coupon" type="text" placeholder="Nhập mã giảm giá của bạn" required />
									<Button color={"blue"}>Áp dụng</Button>
								</div>
							</div>
							<div className={"mt-4 text-slate-500 text-sm"}>
								<div className="flex justify-between py-1">
									<span>Tiền ước tính</span>
									<span className="font-semibold text-slate-900">0</span>
								</div>
								<div className="flex justify-between py-1">
									<span>Giảm giá</span>
									<span className="font-semibold text-slate-900">0</span>
								</div>
								<div className="flex justify-between py-1">
									<span>Phí giao hàng</span>
									<span className="font-semibold text-slate-900">0</span>
								</div>
								<div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
									<span>Tổng tiền</span><span>0</span>
								</div>
								<button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-slate-900 hover:bg-slate-800
									text-slate-50 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000">
									Xác nhận đơn hàng
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Page>;
};
export default Checkout;