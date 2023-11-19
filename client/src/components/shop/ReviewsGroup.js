import { useState } from "react"
import Review from "./Review"
import { Rating, Button } from "flowbite-react"
import PopupRating from "./PopupRating"

const getAverageRating = (reviewsData) => {
    let average = 0
    reviewsData.forEach((review) => {
        average += review.rate
    })

    return (average/reviewsData.length).toFixed(2)
}

const calcPercentStart = (reviewsData) => {
    let start1 = 0;
    let start2 = 0;
    let start3 = 0;
    let start4 = 0;
    let start5 = 0;
    let len = reviewsData.length;
    reviewsData.forEach((item) => {
        if(item.rate === 5){
            start5++;
        }

        if(item.rate === 4){
            start4++;
        }

        if(item.rate === 3){
            start3++;
        }

        if(item.rate === 2){
            start2++;
        }

        if(item.rate === 1){
            start1++;
        }
    })
    start1 = (start1*100/len).toFixed(0)
    start2 = (start2*100/len).toFixed(0)
    start3 = (start3*100/len).toFixed(0)
    start4 = (start4*100/len).toFixed(0)
    start5 = (start5*100/len).toFixed(0)
    console.log(start1, start2, start3, start4, start5)
    return [start1, start2, start3, start4, start5]
}

const ReviewGroup = ({reviewsData, setReviewData}) => {
    
    const [showModal, setShowModal] = useState(false)
    
    let averageRating = getAverageRating(reviewsData)
    let percentOfStarts = calcPercentStart(reviewsData)
    
    return(
        <>
            <div class="mt-10">
                <h2 class="text-2xl font-semibold flex items-center">
                    <Rating size="lg">
                        <Rating.Star />
                        <p className=" ml-2 font-bold text-gray-900 dark:text-white">{averageRating}</p>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                        <a href="#" className="font-medium text-gray-900 underline hover:no-underline dark:text-white">
                            {reviewsData.length} reviews
                        </a>
                    </Rating>
                    
                </h2>
                <div class="mt-5">
                    
                    <Rating.Advanced percentFilled={percentOfStarts[4]} className="mb-2">
                        5 star
                    </Rating.Advanced>
                    <Rating.Advanced percentFilled={percentOfStarts[3]} className="mb-2">
                        4 star
                    </Rating.Advanced>
                    <Rating.Advanced percentFilled={percentOfStarts[2]} className="mb-2">
                        3 star
                    </Rating.Advanced>
                    <Rating.Advanced percentFilled={percentOfStarts[1]} className="mb-2">
                        2 star
                    </Rating.Advanced>
                    <Rating.Advanced percentFilled={percentOfStarts[0]} className="mb-2">1 star</Rating.Advanced>
                
                </div>
                <div class="mt-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28 overflow-auto max-h-96 border-t-2 pt-5">
                        {reviewsData.map((review) => {
                            return <Review listReview={reviewsData} review={review} setListReview={setReviewData}></Review>  
                        })
                        }
                           
                    </div>
                    <Button gradientDuoTone="tealToLime" pill size="xl" className="mt-10" onClick={() => {setShowModal(true)}}>
                        Đánh giá
                        <PopupRating open={showModal} setOpen={setShowModal}></PopupRating>
                    </Button>
                    
                </div>
            </div>
        </>
    )

}

export default ReviewGroup