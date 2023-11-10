import { Rating, Avatar } from "flowbite-react"

const Review = ({review}) => {
    console.log(review)
    return (
        <>
            <div class="nc-ReviewItem flex flex-col " data-nc-id="ReviewItem">
                <div class=" flex space-x-4 ">
                    <div class="flex-shrink-0 pt-0.5">
                        <Avatar rounded />
                    </div>
                    <div class="flex-1 flex justify-between">
                        <div class="text-sm sm:text-base">
                            <span class="block font-semibold">{review.username}</span>
                            <span class="block mt-0.5 text-slate-500 dark:text-slate-400 text-sm">{review.create_at}</span>
                        </div>
                        <div class="mt-0.5 flex text-yellow-500" id="start-rating">
                            <Rating>
                                {[...Array(5)].map((x, i) =>{
                                    let numStart = review.rate
                                    return(
                                        (i < numStart) ? (<Rating.Star/>) : (<Rating.Star filled={false} />)
                                    )
                                })    
                                }
                            </Rating>
                            
                        </div>
                    </div>
                </div>
                <div class="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
                    <p class="text-slate-600 dark:text-slate-300">{review.desc}</p>
                </div>
            </div>
        </>
    )
}

export default Review