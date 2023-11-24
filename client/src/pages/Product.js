import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductDetail from "../components/shop/ProductDetail";
import SupportService from "../components/shop/SupportSevice";
import ReviewGroup from "../components/shop/ReviewsGroup";
import { useEffect, useState } from "react"


const getReviewData = async () => {
    let url = window.location.href
    let urlArr = url.split('/')
    let productId = urlArr[4]
    let apiStr = 'http://localhost:8080/api/v1/review/all/' + productId
    console.log("URL: " + urlArr)
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

const Product = () => {
	const [reviewsData, setReviewsData] = useState([]);
	    useEffect(() => {
        getReviewData().then(res => setReviewsData(res))
    },[])

	let averageRating = 0;
	let numberOfReviews = 0;
	console.log((reviewsData !== undefined) && (reviewsData.error === undefined) && (reviewsData.length > 0))
	if((reviewsData !== undefined) && (reviewsData.error === undefined)){
		averageRating = getAverageRating(reviewsData);
		numberOfReviews = reviewsData.length;
	}

	return (
		<>
			<Header />
			<div class="">
				<main class="container mt-5 lg:mt-11 mx-auto">
					<ProductDetail rating={averageRating} numOfReview={numberOfReviews} ></ProductDetail>
					<SupportService></SupportService>
					<hr class="border-slate-200 dark:border-slate-700 mt-20"></hr>
					{(reviewsData === undefined || reviewsData.error !== undefined) ? (<div>Lỗi! Không thể tải đánh giá cho sản phẩm này</div>) : ((reviewsData.length <= 0) ? <div>Chưa có đánh giá cho sản phẩm</div> : <ReviewGroup reviewsData={reviewsData} setReviewData={setReviewsData}></ReviewGroup>)}
					<hr class="border-slate-200 dark:border-slate-700 mt-20"></hr>
				</main>
			</div>
			<Footer/>
		</>
	);
};
export default Product;