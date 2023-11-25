// Tham khảo: https://tailwindui.com/components/ecommerce/components/shopping-carts , keyword: tailwind cart component
// Xây dựng CartItem

import formatMoney from "../../utils/currency";
import {RiAddFill, RiSubtractFill} from "react-icons/ri";
import {IoAddSharp} from "react-icons/io5";
import {CiTrash} from "react-icons/ci";
import {FiTrash2} from "react-icons/fi";
import NumberInput from "./NumberInput";
import {useEffect, useState} from "react";

const CartItem = ({ item }) => {
	const [quantity, setQuantity] = useState(1);
	return (
		<>
			<li className="flex m-5 pt-5">

				<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
					<img
						src={item.imageSrc}
						alt={item.imageAlt}
						className="h-full w-full object-cover object-center"
					/>
				</div>
				<div className="ml-4 flex flex-1 flex-col">
					<div>
						<div className="flex justify-between text-base font-medium text-gray-1000">
							<h3 className="w-auto">
								<a className="text-sm" href={item.href}>{item.name}</a>
							</h3>
							<p className=" h-8 ml-4 flex items-center border-2 rounded-md text-green-400 border-green-400 p-2" >{formatMoney(item.price)} </p>
						</div>
						<p className="mt-1 text-sm text-gray-500">{item.color}</p>
					</div>
					<div className="flex flex-1 items-end justify-between text-sm">

						<NumberInput value={quantity} onChange={(val) => setQuantity(val)}/>

						<div className="flex">
							<button
								type="button"
								className="font-medium text-red-500 hover:text-red-600"
							>
								<FiTrash2 size={18} />
							</button>
						</div>
					</div>
				</div>
			</li>
		</>
	);
};

export default CartItem;
