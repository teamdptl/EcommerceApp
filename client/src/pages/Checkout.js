import Page from "../layouts/Page";
import UserShipInfoForm from "../components/user/UserShipInfoForm";
import CartItem from "../components/main/CartItem";
import {Button, Label, Radio, TextInput} from "flowbite-react";
import {useCartContext} from "../context/CartContext";
import formatMoney from "../utils/currency";
import useShipInfoSave from "../hooks/useShipInfoSave";
import {useEffect, useState} from "react";
import baseUrl from "../config";
import ScreenLoading from "../components/ScreenLoading";
import ScreenInfo from "../components/ScreenInfo";

const Checkout = () => {
	const { cart, getTotalMoney, loadCart } = useCartContext();
	const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng COD');
	const [loading, setLoading] = useState(false);
	const [shipInfo, setShipInfo] = useState(null);
	const [msg, setMsg] = useState({show: false, text: '', error: 0});

	useEffect(() => {
		loadCart();
	}, [])

	const createOrder = async (shipId) => {
		return fetch(baseUrl+'/api/v1/order/place', {
			method: 'POST',
			body: JSON.stringify({
				items: cart.map(item => {
					return {
						productId: item.product.productId,
						buyQuantity: item.buyQuantity
					}
				}),
				paymentType: paymentMethod,
				shipId: shipId
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.catch(err => console.log(err))
			.finally(() => setLoading(false))
	}

	const saveShipInfo = async () => {
		return fetch(baseUrl+'/api/v1/user/shipInfo/add', {
			method: 'POST',
			body: JSON.stringify(shipInfo),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.catch(err => console.log(err))
	}

	const placeOrder = async() => {
		if (!shipInfo || !shipInfo.isValid){
			return;
		}
		const { shipId } = await saveShipInfo();
		const {error, message} = await createOrder(shipId);
		setMsg({...msg, error: error, text: message, show: true});
	}

	return <Page>
		<div className="mt-8 max-w-screen-xl mx-auto">
			<p className={"text-2xl font-bold text-center"}>Xác nhận đơn hàng</p>
			<p className={"text-center mt-3"}>Vui lòng kiểm tra lại thông tin trước khi xác nhận</p>
			<hr className="mt-8 mb-3" />
			<div className={"grid grid-cols-6 gap-8"}>
				<div className={"col-span-3"}>
					<p className={"text-lg mb-3 font-semibold"}>Thông tin giao hàng</p>
					<UserShipInfoForm onChange={(shipInfo) => setShipInfo(shipInfo)}/>
					<p className={"text-lg mb-3 font-semibold mt-6"}>Phương thức thanh toán</p>
					<div>
						<div className="flex items-center gap-2 mb-3">
							<Radio id="nhanhang" name="paymentMethod" value="Thanh toán khi nhận hàng" defaultChecked onChange={e => setPaymentMethod(e.target.value)}/>
							<Label className={"font-normal text-base"} htmlFor="nhanhang">Thanh toán khi nhận hàng (COD)</Label>
						</div>
						<div className="flex items-center gap-2">
							<Radio id="chuyenkhoan" name="paymentMethod" value="Chuyển khoản" onChange={e => setPaymentMethod(e.target.value)}/>
							<Label className={"font-normal text-base"} htmlFor="chuyenkhoan">Chuyển khoản ngân hàng</Label>
						</div>
					</div>

				</div>
				<div className={"col-span-3"}>
					<p className={"text-lg mb-3 font-semibold"}>Thông tin đơn hàng</p>
					<div className={"border-l border-l-zinc-200 pl-3"}>
						{cart.map((item) => (
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
									<span className="font-semibold text-slate-900">{formatMoney(getTotalMoney())}</span>
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
									<span>Tổng tiền</span><span>{formatMoney(getTotalMoney())}</span>
								</div>
								<button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-slate-900 hover:bg-slate-800
									text-slate-50 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
									onClick={placeOrder}
								>
									Xác nhận đơn hàng
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<ScreenLoading isShow={loading} />
		<ScreenInfo isShow={msg.show} message={msg.text} error={msg.error} closeModal={() => setMsg({...msg, show: false})}/>
	</Page>;
};
export default Checkout;