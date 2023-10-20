// Tham khảo: https://tailwindui.com/components/ecommerce/components/shopping-carts , keyword: tailwind cart component
// Xây dựng CartItem

const CartItem = ({ item }) => {
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
							<h3 class="w-36">
								<a class="text-sm" href={item.href}>{item.name}</a>
							</h3>
							<p className=" h-8 ml-4 flex items-center border-2 rounded-md text-green-400 border-green-400 p-2" >${item.price} </p>
						</div>
						<p className="mt-1 text-sm text-gray-500">{item.color}</p>
					</div>
					<div className="flex flex-1 items-end justify-between text-sm">
						<p className="text-gray-500">Qty {item.quantity}</p>

						<div className="flex">
							<button
								type="button"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Remove
							</button>
						</div>
					</div>
				</div>
			</li>
		</>
	);
};

export default CartItem;
