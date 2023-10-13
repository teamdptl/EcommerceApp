import { Rating } from "flowbite-react";
const ProductItem = ({ product }) => {
    const ratingArr = Array(parseInt(product.rating, 10)).fill("");
    return (
			<>
				<div key={product.id} className="group relative border p-5 rounded-md">
					<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md flex justify-center items-center group-hover:opacity-75">
						<div class="h-52 w-52">
							<img
								src={product.imageSrc}
								alt={product.imageAlt}
								className="object-cover w-full h-full object-center"
							/>
						</div>
					</div>
					<div className="mt-4">
						<h3 className="text-sm text-gray-700">
							<a href={product.href}>
								<span aria-hidden="true" className="absolute inset-0" />
								{product.name}
							</a>
						</h3>
						<p className="text-base mt-2 mb-2 font-medium text-red-700">{product.price}</p>
						{product.rating > 0 ? (
							<Rating>
								{ratingArr.map((value, index) => (index <= product.rating ? <Rating.Star /> : <Rating.Star filled={false} />))}
								<p className="ml-2 text-sm font-medium text-gray-900">{product.rating}</p>
								<p className="ml-2 text-xs font-medium text-gray-900">({product.numRate})</p>
							</Rating>
						) : (
							<Rating></Rating>
						)}
					</div>
				</div>
			</>
		);
}

export default ProductItem;