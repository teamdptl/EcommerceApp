import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import SearchBar from "../components/shop/SearchBar";
import FilterBar from "../components/shop/FilterBar";
import ProductItem from "../components/shop/ProductItem";
import ProductList from "../components/shop/ProductList";
import useProductsFetch from "../hooks/useProductsFetch";
import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";




const Shop = () => {

	const [filter, setFilter] = useState({})

	const { products, errorMsg, loading, callback, currentPage, maxPage, totalElements } = useProductsFetch();
	useEffect(() => {
		callback({});
	}, [])

	useEffect(() => {
		console.log(products);
	}, [products])



	return (
		<>
			<Header></Header>
			<SearchBar onChange={(searchData) => callback(searchData)}></SearchBar>
			<FilterBar onChange={(filterData) => callback(filterData)} ></FilterBar>
			<ProductList ></ProductList>
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-4">
						{products
							.map((product) => (
								<ProductItem key={product.id} product={product}></ProductItem>
							))}
					</div>
				</div>
			</div>
			{maxPage > 1 &&
				<>
					<p className="text-center my-2">Tổng: {totalElements} sản phẩm, mỗi trang 10</p>
					<div className="flex overflow-x-auto sm:justify-center mb-4">
						<Pagination currentPage={currentPage + 1} totalPages={maxPage} showIcons onPageChange={(page) => {
							callback({ ...filter, page: page - 1 });
						}} />
					</div>
				</>
			}
			<Footer></Footer>
		</>
	);
};
export default Shop;