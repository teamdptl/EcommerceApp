import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductDetail from "../components/shop/ProductDetail";
import SupportService from "../components/shop/SupportSevice";
import ReviewGroup from "../components/shop/ReviewsGroup";

const Product = () => {
	return (
		<>
			<Header />
			<div class="">
				<main class="container mt-5 lg:mt-11 mx-auto">
					<ProductDetail></ProductDetail>
					<SupportService></SupportService>
					<hr class="border-slate-200 dark:border-slate-700 mt-20"></hr>
					<ReviewGroup></ReviewGroup>
					<hr class="border-slate-200 dark:border-slate-700 mt-20"></hr>
				</main>
			</div>
			<Footer/>
		</>
	);
};
export default Product;