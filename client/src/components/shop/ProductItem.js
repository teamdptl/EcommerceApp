import { Rating } from "flowbite-react";
import {Link} from "react-router-dom";
import {FaCartPlus} from "react-icons/fa";
import {IoCartOutline, IoHeart} from "react-icons/io5";
import useCart from "../../hooks/useCart";
import {useCartContext} from "../../context/CartContext";
import formatMoney from "../../utils/currency";
const ProductItem = ({ product, isEnable = true, isEnableRating = true }) => {
    const ratingArr = Array(parseInt(product.rating ?? 1, 10)).fill("");
	const { addItemToCart } = useCartContext();
    return (
			<>
				<Link to={`/product/${product.productId}`} key={product.productId} className="select-none cursor-pointer relative border p-5 rounded-md">
					<div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md flex justify-center items-center">
						<div class="h-52 w-52 hover:opacity-75">
							<img
								src={product.imageUrl}
								alt={"Ảnh sản phẩm"}
								className="object-cover w-full h-full object-center"
							/>
						</div>
					</div>
					<div className="mt-4">
						<h3 className="text-sm text-gray-700 font-semibold">
							{product.name}
						</h3>
						<div className={"flex mt-2 mb-2 items-center gap-2"}>
							<p className="text-base font-medium text-red-700">{ formatMoney(product.price) }</p>
							<p className="text-sm line-through text-gray-400">{ formatMoney(product.oldPrice) }</p>
						</div>
						{ isEnableRating &&
							<>
								{product.rating >= 0 ? (
									<Rating>
										{Array(5).fill('').map((value, index) => (index + 1 <= product.rating ? <Rating.Star /> : <Rating.Star filled={false} />))}
										<p className="ml-2 text-sm font-medium text-gray-900">{product.rating?.toFixed(2)}</p>
										<p className="ml-2 text-xs font-medium text-gray-900">({product.reviewCount})</p>
									</Rating>
								) : (
									<Rating></Rating>
								)}
							</>
						}

					</div>
					{isEnable &&
						<div className={"grid grid-cols-2 gap-2 mt-3"}>
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
					}
				</Link>
			</>
		);
}

export default ProductItem;