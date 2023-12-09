import {Button} from "flowbite-react";
import {useState} from "react";
import {MdAttachMoney, MdKeyboardArrowDown, MdKeyboardArrowUp, MdModeEdit} from "react-icons/md";
import {FaInfoCircle} from "react-icons/fa";
import formatMoney from "../../../utils/currency";

const formatter = new Intl.NumberFormat('VN', {
    style: 'currency',
    currency: 'VND'
  });

const formatDateTime = (datetime) => {
    let date = datetime.split('T')[0]
    let time = datetime.split('T')[1].split('.')[0]
    return time + ' ' + date
}

const AdminOrderItem = ({order, openInfo, openStatus, openConfirm}) => {
    const [display, setDisplay] = useState(false);
    const listStatusOrderText = ['all', 'Đang tiếp nhận', 'Đang giao hàng', 'Đã hoàn thành', 'Đã hủy']
    const toggleDisplay = () => {
        setDisplay(!display);
    }
    const listProduct = order.orderLineResponse ? order.orderLineResponse : [];

    return <>
        <div className="mb-3">
            <div className={`hover:bg-zinc-50 grid grid-cols-8 cursor-pointer select-none items-center border border-zinc-200 rounded-md py-3 ${display ? 'bg-zinc-50': 'bg-white'}`}
                 onClick={toggleDisplay}
            >
                <p className="text-center flex items-center gap-4 ml-4">
                    { !display &&
                        <MdKeyboardArrowDown size={26} />
                    }
                    { display &&
                        <MdKeyboardArrowUp size={26} />
                    }
                    {order.orderId}
                </p>
                <p className="text-center">{listStatusOrderText[order.orderStatus]}</p>
                <p className="text-center">{order.shipInfoFullname}</p>
                <p className="text-center">{formatDateTime(order.createAt)}</p>
                <p className="text-center">{formatMoney(order.totalPrice)}</p>
                <p className="text-center">{order.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                <p className="text-center">{order.paymentMethod}</p>
                <div className="flex justify-center gap-1">
                    <Button size={"sm"} onClick={(e) => openInfo(e, order)}><FaInfoCircle/></Button>
                    <Button color={"warning"} size={"sm"} onClick={(e) => openStatus(e, order)}><MdModeEdit /></Button>
                    <Button color={"success"} size={"sm"} onClick={(e) => openConfirm(e, order)}><MdAttachMoney /></Button>
                </div>
            </div>
            <div className={`select-none cursor-pointer overflow-y-auto rounded-xl border border-zinc-200 px-20 ${display ? 'max-h-64': 'max-h-0'} `}
                onClick={toggleDisplay}
            >
                {listProduct.map(item => {
                    return (<div className="flex items-center justify-evenly my-2">
                        <img className="w-24 h-24" src={item.productMedia.imageUrl}></img>
                        <div>
                            <p>{item.productName}</p>
                            <p>{formatMoney(item.productPrice)}</p>
                        </div>
                        <p>Số lượng: {item.quantity}</p>
                        <p>Thành tiền: {formatMoney(item.price)}</p>
                    </div>)
                })}
            </div>
        </div>
    </>
}

export default AdminOrderItem;