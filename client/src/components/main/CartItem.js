// Tham khảo: https://tailwindui.com/components/ecommerce/components/shopping-carts , keyword: tailwind cart component
// Xây dựng CartItem

import formatMoney from "../../utils/currency";
import {RiAddFill, RiSubtractFill} from "react-icons/ri";
import {IoAddSharp} from "react-icons/io5";
import {CiTrash} from "react-icons/ci";
import {FiTrash2} from "react-icons/fi";
import NumberInput from "./NumberInput";
import {useEffect, useState} from "react";
import {useCartContext} from "../../context/CartContext";

const CartItem = ({ item, isOrder = false, isPopup = false }) => {
	const { updateQuantity, removeItem } = useCartContext();
	const {product, buyQuantity} = item;
	const [pickQuantity, setPickQuantity] = useState(buyQuantity);

	useEffect(() => {
		if (buyQuantity !== pickQuantity)
			setPickQuantity(buyQuantity);
	}, [buyQuantity]);

	useEffect(() => {
		if (buyQuantity !== pickQuantity){
			updateQuantity(product.productId, pickQuantity);
		}
	}, [pickQuantity]);

	return (
		<>
			<li className={`flex m-5 pt-5 ${isPopup ? 'w-96': ''}`}>

				<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
					<img
						src={product.imageUrl}
						alt="Ảnh sản phẩm"
						className="h-full w-full object-cover object-center"
					/>
				</div>
				<div className="ml-4 flex flex-1 flex-col">
					<div>
						<div className="flex justify-between text-base font-medium text-gray-1000">
							<h3 className="w-auto">
								<a className="text-sm" href={`/product/${product.productId}`}>{product.name}</a>
							</h3>
							<p className=" h-8 ml-4 flex items-center border-2 rounded-md text-green-400 border-green-400 p-2" >{formatMoney(product.price*pickQuantity)}</p>
						</div>
						<p className="mt-1 text-sm text-gray-500 mb-2">{formatMoney(product.price)}</p>
					</div>
					<div className="flex flex-1 items-end justify-between text-sm">
						{
							!isOrder &&
							<>
								<NumberInput value={pickQuantity} onChange={(val) => setPickQuantity(val)}/>
								<div className="flex">
									<button
										type="button"
										className="font-medium text-red-500 hover:text-red-600"
										onClick={() => removeItem(product.productId)}
									>
										<FiTrash2 size={18} />
									</button>
								</div>
							</>
						}
						{
							isOrder &&
							<>
								<p className="text-gray-500">Số lượng {buyQuantity}</p>
								<div className="flex">
									<button
										type="button"
										className="font-medium text-indigo-600 hover:text-indigo-500"
									>
										Đánh giá sản phẩm
									</button>
								</div>
							</>
						}
					</div>
				</div>
			</li>
		</>
	);
};

export default CartItem;
