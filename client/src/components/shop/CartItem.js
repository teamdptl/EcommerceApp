const products = [
	{
		id: 1,
		name: "Throwback Hip Bag",
		href: "#",
		color: "Salmon",
		price: "$90.00",
		quantity: 1,
		imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
		imageAlt: "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
	},
	{
		id: 2,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		price: "$32.00",
		quantity: 1,
		imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	// More products...
];

const CartItem = () => {
	return (
		<>
			<div className="mt-8 w-96">
				<div className="flow-root">
					<ul role="list" className="-my-6 divide-y divide-gray-200">
						{products.map((product) => (
							<li key={product.id} className="flex py-6">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
									<img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center" />
								</div>

								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<a href={product.href}>{product.name}</a>
											</h3>
											<p className="ml-4">{product.price}</p>
										</div>
										<p className="mt-1 text-sm text-gray-500">{product.color}</p>
									</div>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="text-gray-500">Qty {product.quantity}</p>

										<div className="flex">
											<button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
												Remove
											</button>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default CartItem;
