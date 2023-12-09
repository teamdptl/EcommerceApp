import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductDetail from "../components/shop/ProductDetail";
import SupportService from "../components/shop/SupportSevice";
import ReviewGroup from "../components/shop/ReviewsGroup";
import baseUrl from "../config";
import { useEffect, useState } from "react"
import { AuthProvider } from "../context/AuthContext";
import {useParams} from "react-router-dom";

const Product = () => {
	const [reviewsData, setReviewsData] = useState([]);
	const [productData, setProductData] = useState();
	const { productId} = useParams();

	const getReviewData = async () => {

		let apiStr = baseUrl + '/api/v1/review/all/' + productId

		return await fetch(apiStr)
			.then((res) => res.json())
			.then((json) => {return json})
			.catch(err => console.error(err))

	}

	const getAverageRating = (reviewsData) => {
		let average = 0
		reviewsData.forEach((review) => {
			average += review.rate
		})

		return (average/reviewsData.length).toFixed(2)
	}

	const getProductData = async () => {
		let apiUrl = baseUrl + '/api/v1/product/get/' + productId
		let token = localStorage.getItem('accessToken')
		token = token ? token : "";
		console.log("Token in get product data: " + token)
		let bearerToken = "Bearer " + token;
		console.log("Bearer Token in get product data: " + bearerToken)
		return await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Authorization': bearerToken
			},
		})
			.then(res => res.json())
			.then((json) => {return json})
			.catch(err => console.error(err))
	}

	useEffect(() => {
        getReviewData().then(res => setReviewsData(res))
		getProductData().then(res => setProductData(res))
    },[])

	let averageRating = 0;
	let numberOfReviews = 0;
	console.log(productData)
	if((reviewsData !== undefined) && (reviewsData.error === undefined) ){
		averageRating = getAverageRating(reviewsData);
		numberOfReviews = reviewsData.length;
	}
	return (
		<>
			<AuthProvider>
				<Header />
				<div class="">
					<main class="max-w-7xl mt-5 lg:mt-11 mx-auto">
						{productData === undefined || productData === null ? 
							<div class="font-extrabold self-center">Opps! Không thể tải sản phẩm</div>:
							<ProductDetail data={productData} listReview={(reviewsData !== undefined) && (reviewsData.error === undefined) ? reviewsData : []}/>
						}
						
						<SupportService></SupportService>
						<hr class="border-slate-200 dark:border-slate-700 mt-20"></hr>
						{(reviewsData === undefined || reviewsData.error !== undefined) ? (<div>Lỗi! Không thể tải đánh giá cho sản phẩm này</div>) : ((reviewsData.length <= 0) ? <div>Chưa có đánh giá cho sản phẩm</div> : <ReviewGroup reviewsData={reviewsData} setReviewData={setReviewsData}></ReviewGroup>)}
						<hr class="border-slate-200 dark:border-slate-700 mt-20"></hr>
					</main>
				</div>
				<Footer/>
			</AuthProvider>
		</>
	);
};
export default Product;