import { Button, Modal, Rating } from "flowbite-react"
import { useState } from "react"

const PopupRating = ({open, setOpen}) => {
    const [status, setStatus] = useState(5)
    const lsStatus = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']
    const closeModal = () => {
        setOpen(false);
    }
    return(
        
        <Modal dismissible show={open} onClose={closeModal}>
            <Modal.Header> Đánh giá! </Modal.Header>
            <Modal.Body className="justify-center">
                <div class="flex justify-center items-center"><p>{lsStatus[status-1]}</p></div>
                <Rating size="lg" className="justify-center">
                    
                    {[...Array(5)].map((item, x) => {
                        console.log(x)
                        if(x < status){
                            return <Rating.Star size onClick={() => setStatus(x+1)}></Rating.Star>
                        }else {return <Rating.Star color="gray" onClick={() => setStatus(x+1)}></Rating.Star>}
                    })}
                </Rating>
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        
    )
}

export default PopupRating