import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import SearchBar from "../components/shop/SearchBar";
import FilterBar from "../components/shop/FilterBar";
import ProductItem from "../components/shop/ProductItem";

const products = [
	{
		id: 1,
		name: "Tủ lạnh Samsung Inverter 208 lít RT20HAR8DBU/SV",
		href: "/product/1",
		imageSrc: "https://cdn.tgdd.vn/Products/Images/1943/220320/samsung-rt20har8dbu-sv-1-org.jpg",
		price: "5.460.000đ",
		rating: 0,
        numRate: 0
	},
	{
		id: 2,
		name: "Máy giặt Samsung AI Inverter 9kg WW90TP44DSB/SV",
		href: "/product/2",
		imageSrc: "https://cdn.tgdd.vn/Products/Images/1944/236158/samsung-9kg-ww90tp44dsb-sv-1-org.jpg",
		price: "9.690.000đ",
		rating: 3.7,
        numRate: 35
	},
	{
		id: 3,
		name: "Máy lạnh Daikin Inverter 1 HP FTKY25WMVMV",
		href: "/product/2",
		imageSrc: "https://dienmaygiakhang.vn/wp-content/uploads/2023/05/gold-2.jpg",
		price: "12.690.000đ",
		rating: 4.0,
        numRate: 35
	},
	{
		id: 4,
		name: "Tủ lạnh Samsung Inverter 208 lít RT20HAR8DBU/SV",
		href: "/product/1",
		imageSrc: "https://cdn.tgdd.vn/Products/Images/1943/220320/samsung-rt20har8dbu-sv-1-org.jpg",
		price: "5.460.000đ",
		rating: 5.0,
        numRate: 35
	},
	{
		id: 5,
		name: "Máy giặt Samsung AI Inverter 9kg WW90TP44DSB/SV",
		href: "/product/2",
		imageSrc: "https://cdn.tgdd.vn/Products/Images/1944/236158/samsung-9kg-ww90tp44dsb-sv-1-org.jpg",
		price: "9.690.000đ",
		rating: 3.8,
        numRate: 35
	},
	{
		id: 6,
		name: "Máy lạnh Daikin Inverter 1 HP FTKY25WMVMV",
		href: "/product/2",
		imageSrc: "https://dienmaygiakhang.vn/wp-content/uploads/2023/05/gold-2.jpg",
		price: "12.690.000đ",
		rating: 4.5,
        numRate: 35
	},
	// More products...
];
const Shop = () => {
	return (
		<>
			<Header></Header>
			<SearchBar></SearchBar>
			<FilterBar></FilterBar>
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-4">
						{products.map((product) => (
                            <ProductItem key={product.id} product={ product }></ProductItem>
						))}
					</div>
				</div>
			</div>
			<Footer></Footer>
		</>
	);
};
export default Shop;