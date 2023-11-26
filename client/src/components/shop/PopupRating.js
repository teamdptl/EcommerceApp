import { Button, Modal, Rating, Textarea } from "flowbite-react"
import { useEffect, useState } from "react"

const PopupRating = ({showModal, setOpen, content, setContent, start, setStart, listReview, setListReview, reviewId, add}) => {
    const [status, setStatus] = useState(start)
    const lsStatus = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']
    const [textReview, setTextReview] = useState(content)

    // console.log("Start: " + start)
    // console.log("content: " + content)

    const addReview = async () => {
        let url = window.location.href
        let urlArr = url.split('/')
        let productId = urlArr[4]
        let apiStr = 'http://localhost:8080/api/v1/review/add/' + productId
        let accessToken = JSON.stringify(localStorage.getItem('accessToken'))
        let authStr
        if(accessToken === 'null')
            authStr = ""
        authStr = "Bearer " + accessToken.split("\"")[1]
        return await fetch(apiStr, {
                                        method: 'POST',
                                        headers: {
                                            'Authorization': authStr,
                                            'Content-Type':'application/json',
                                            
                                        },
                                        body: JSON.stringify({
                                            "description": textReview,
                                            "rate": status
                                        })
                                    })
                                    .then(res => res.json())
                                    .then(json => {
                                        setOpen(false)
                                        if(json.error === undefined){
                                            let tempList = listReview
                                            tempList.push(json)
                                            setListReview(tempList)
                                            alert("Đánh giá thành công! Xin chân thành cảm ơn!")
                                        }else{
                                            alert(json.message)
                                        }
                                        
                                    })
                                    .catch(err => console.error(err))
    }

    const updateReview = async () => {
        let url = 'http://localhost:8080/api/v1/review/update/' + reviewId
        let accessToken = JSON.stringify(localStorage.getItem('accessToken'))
        let authStr
        
        if(accessToken === 'null')
            authStr = ""
        else authStr = "Bearer " + accessToken.split("\"")[1]
        
        return await fetch(url, {
                            method: 'POST',
                            headers:{
                                'Authorization': authStr,
                                'Content-Type':'application/json',
                            },
                            body: JSON.stringify({
                                "description": textReview,
                                "rate": status
                            })
                        }).then(res => res.json())
                        .then(json => {
                            // console.log(json)
                            setOpen(false)
                            if(json.error === undefined){
                                setContent(textReview)
                                setStart(status)
                                let tempList = listReview.map(item => {
                                    if (item.reviewId === reviewId){
                                        item.description = json.description
                                        item.rate = json.rate
                                        item.createAt = json.createAt
                                    }
                                    return item
                                }) 

                                setListReview(tempList)
                                alert("Cập nhật thành công!")
                            }else{
                                alert(json.message)
                            }
                        })
                        .catch(err => console.error(err))
    }

    return(
        
        <Modal dismissible show={showModal} onClose={() => setOpen(false)}>
            <Modal.Header> Đánh giá! </Modal.Header>
            <Modal.Body className="justify-center">
                <div class="flex justify-center items-center"><p>{lsStatus[status-1]}</p></div>
                <Rating size="lg" className="justify-center">
                    
                    {[...Array(5)].map((item, x) => {
                        
                        if(x < status){
                            return <Rating.Star size onClick={() => setStatus(x+1)}></Rating.Star>
                        }else {return <Rating.Star color="gray" onClick={() => setStatus(x+1)}></Rating.Star>}
                    })}
                </Rating>
                <Textarea placeholder="Nhập đánh giá..." value={textReview} onChange={e => setTextReview(e.target.value)}></Textarea>
            </Modal.Body>
            <Modal.Footer>
                {add ? <Button className="self-end" onClick={() => addReview()}>Thêm</Button> : <Button className="self-end" onClick={() => updateReview()}>Cập nhật</Button>}
                
            </Modal.Footer>
        </Modal>
        
    )
}

export default PopupRating