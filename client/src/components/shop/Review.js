import { Rating, Avatar, Button, Dropdown } from "flowbite-react"
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { redirect, useNavigate } from "react-router-dom";
import PopupRating from "./PopupRating";
import AdminConfirmModal from "../admin/AdminConfirmModal";

const Review = ({listReview, setListReview, review}) => {
    const [showConfirm, setShowConfirm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [content, setContent] = useState(review.description)
    const [start, setStart] =  useState(review.rate)
    let navigate = useNavigate()
    let [contentConfirm, setContentConfirm ]= useState("")
    let [typeConfirm, setTypeConfirm ]= useState("")

    const deleteReview = async () => {
        let url = 'http://localhost:8080/api/v1/review/delete/' + review.reviewId
        let accessToken = JSON.stringify(localStorage.getItem('accessToken'))
        let authStr = ""
        // console.log(accessToken === 'null')
        if(accessToken === 'null')
            authStr = ""
        else authStr = "Bearer " + accessToken.split("\"")[1]
        console.log(authStr)
        return await fetch(url, {
                                method: "GET",
                                headers: {
                                    'Authorization': authStr,
                                    Accept:"*/*",
                                    "Accept-Encoding":"gzip, deflate, br",
                                    "Accept-Language":"en-US,en;q=0.9,vi;q=0.8",
                                    Connection:"keep-alive",
                                    Host:"localhost:8080"
                            }})
                    .then((res) => res.json())
                    .then((json) => {
                        // console.log(json)
                        // alert(json.message)
                        if(json.message === "Vui lòng đăng nhập để xóa đánh giá của bạn!"){
                            setShowConfirm(true)
                            setContentConfirm(json.message)
                        }else{
                            let tempList = []
                            if(json.error === 0){
                                setTypeConfirm("success")
                                setContentConfirm(json.message)
                                for(let i = 0; i < listReview.length; i++){
                                    if(listReview[i].reviewId !== review.reviewId){
                                        tempList.push(listReview[i])
                                    }
                                }
                                setListReview(tempList)
                                setShowConfirm(true)
                            }else{
                                setTypeConfirm("fail")
                                setContentConfirm(json.message)
                                setShowConfirm(true)
                            }
                        }
                           
                        
                        return json})
                    .catch(err => console.error('Error:', err));
    }

    return (
        <>
            <AdminConfirmModal isShow={showConfirm} closeModal={()=>setShowConfirm()} content={contentConfirm} confirmCallback={() => {navigate("/login", {replace: true})}} type={typeConfirm} />
            <div class="nc-ReviewItem flex flex-col " data-nc-id="ReviewItem">
                <div class=" flex space-x-4 ">
                    <div class="flex-shrink-0 pt-0.5">
                        <Avatar rounded />
                    </div>
                    <div class="flex-1 flex justify-between">
                        <div class="text-sm sm:text-base">
                            <span class="block font-semibold">{review.userFullname}</span>
                            <span class="block mt-0.5 text-slate-500 dark:text-slate-400 text-sm">{review.createAt}</span>
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
                            <Dropdown label dismissOnClick={false} renderTrigger={() => <span  className="self-center ml-5" ><CiMenuKebab color="black" fontSize="bold"></CiMenuKebab></span>}>
                                <Dropdown.Item onClick={() => setShowModal(true)}>Chỉnh sửa</Dropdown.Item>
                                <Dropdown.Item onClick={() => {deleteReview()}}>Xóa</Dropdown.Item>
                            </Dropdown>
                            <PopupRating showModal={showModal} setOpen={setShowModal} content={content} setContent={setContent} start={start} setStart={setStart} listReview={listReview} setListReview={setListReview} reviewId={review.reviewId} add={false}></PopupRating>
                        </div>
                    </div>
                </div>
                <div class="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
                    <p class="text-slate-600 dark:text-slate-300">{content}</p>
                </div>
            </div>
        </>
    )
}

export default Review