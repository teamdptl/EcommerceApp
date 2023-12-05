import { Rating } from "flowbite-react";
import {Link} from "react-router-dom";
import {FaCartPlus} from "react-icons/fa";
import {IoCartOutline, IoHeart} from "react-icons/io5";
import useCart from "../../hooks/useCart";
import {useCartContext} from "../../context/CartContext";
const ProductItem = ({ product }) => {
    const ratingArr = Array(parseInt(product.rating, 10)).fill("");
	const { addItemToCart } = useCartContext();
    return (
			<>
				<a href={product.href} key={product.id} className="select-none cursor-pointer relative border p-5 rounded-md">
					<div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md flex justify-center items-center">
						<div class="h-52 w-52 hover:opacity-75">
							<img
								src={product.imageSrc}
								alt={product.imageAlt}
								className="object-cover w-full h-full object-center"
							/>
						</div>
					</div>
					<div className="mt-4">
						<h3 className="text-sm text-gray-700">
							{product.name}
						</h3>
						<p className="text-base mt-2 mb-2 font-medium text-red-700">{product.price}</p>
						{product.rating >= 0 ? (
							<Rating>
								{Array(5).fill('').map((value, index) => (index + 1 <= product.rating ? <Rating.Star /> : <Rating.Star filled={false} />))}
								<p className="ml-2 text-sm font-medium text-gray-900">{product.rating}</p>
								<p className="ml-2 text-xs font-medium text-gray-900">({product.numRate})</p>
							</Rating>
						) : (
							<Rating></Rating>
						)}
					</div>
					<div className={"bottom-0 left-0 right-0 grid grid-cols-2 gap-2 mt-3"}>
						<button className="flex justify-center items-center bg-blue-600 text-white text-xs py-2 font-semibold rounded-xl"
								onClick={(e)=> {
									e.stopPropagation();
									e.preventDefault();
									addItemToCart(product);
								}}
						>
							Thêm giỏ hàng
						</button>
						<button className={"flex justify-center items-center border border-red-500 text-red-500 text-xs py-2 font-semibold rounded-xl"}
								onClick={(e)=> {
									e.stopPropagation();
									e.preventDefault();
								}}
						>
							Yêu thích
						</button>
					</div>
				</a>
			</>
		);
}

export default ProductItem;