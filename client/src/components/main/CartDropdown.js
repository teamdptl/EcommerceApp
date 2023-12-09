import { Dropdown, Select } from "flowbite-react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartItem from "./CartItem";
import {Link} from "react-router-dom";
import {useCartContext} from "../../context/CartContext";
import formatMoney from "../../utils/currency";

export default function CustomTriggerDropdown() {
	const { cart, getTotalMoney, getTotalItem } = useCartContext();
	return (
		<Dropdown
			dismissOnClick={true}
			renderTrigger={() => (
				<button before={getTotalItem()} class={`rounded-full relative p-2 border hover:bg-gray-100 focus:outline-none
				${getTotalItem() > 0 ? "before:content-[attr(before)] before:absolute before:-top-2 before:-right-2 before:bg-red-500 " +
					"before:w-5 before:h-5 before:rounded-full before:text-white before:text-xs before:flex before:justify-center before:items-center" : ''}`}>
					<AiOutlineShoppingCart size={20} />
				</button>
			)} label={"Giỏ hàng"}>
			{/* Danh sách các sản phẩm trong giỏ hàng */}
			<p className="text-lg font-medium text-gray-900 mt-3 px-12 pb-3">Giỏ hàng</p>
			<hr className={"mx-12"}/>
			<div className="mt-3 px-8 max-h-96 overflow-y-auto pb-4">
				{cart.length > 0 &&
					<div className="flow-root w-1">
						<ul role="list" className="-my-6 divide-y divide-gray-200" >
							{cart.map((item) => (
								<CartItem key={item.product.productId} item={item} isPopup={true}/>
							))}
						</ul>
					</div>
				}

				{cart.length === 0 &&
					<div className={"flex justify-center items-center flex-col"}>
						<img src={"/empty-cart.svg"} className={"w-48 h-48"}/>
						<p className={"text-slate-800 font-semibold"}>Giỏ hàng trống, vui lòng thêm sản phẩm</p>
					</div>
				}

			</div>
			{/* Tổng tiền và các nút thanh toán */}
			<div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-5">
				<div className="flex justify-between text-base font-medium text-gray-900">
					<p>Tổng tiền</p>
					<p>{ formatMoney(getTotalMoney()) }</p>
				</div>
				<p className="mt-0.5 text-sm text-gray-500">Có thể thêm các chi phí giao hàng khi thanh toán.</p>
				<div className="mt-6 flex">
					<Link to={"/cart"}
						className="flex items-center justify-center rounded-full pl-16 pr-16 border border-md  px-6 py-3  font-medium text-black shadow-sm"
					>			Xem giỏ hàng
					</Link>
					<Link to={"/checkout"}
						href="#"
						className="flex items-center justify-center rounded-full ml-2 pl-16 pr-16 border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm bg-indigo-700"
					>			Thanh toán
					</Link>
				</div>
			</div>
			{/* Code here */}
		</Dropdown>
	);
}
