import CartItem from "../main/CartItem";
import {Button} from "flowbite-react";
import {useState} from "react";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import formatMoney from "../../utils/currency";

const formatDateTime = (datetime) => {
    let date = datetime.split('T')[0]
    let time = datetime.split('T')[1].split('.')[0]
    return time + ' ' + date
}

const UserOrderItem = ({order}) => {
    const [collapse, setCollapse] = useState(false);
    const orderStatus = ['', 'Đang tiếp nhận', 'Đang giao hàng', 'Đã hoàn thành', 'Đã hủy']
    return (
        <>
            <div className="border border-zinc-200 rounded-lg mb-4 mt-4">
                <div className={"bg-slate-100 p-4 rounded-lg flex justify-between items-center"}>
                    <div>
                        <p className={"text-base font-semibold mb-2"}>Đơn hàng {order.orderId}</p>
                        <p className={"text-sm text-zinc-500"}>{formatDateTime(order.createAt)} - <span className={"text-blue-500"}>{orderStatus[order.orderStatus]}</span></p>
                    </div>
                    <div>
                        <Button color={'gray'} onClick={() => setCollapse(!collapse)}>
                            { !collapse &&
                                <MdKeyboardArrowDown size={26} />
                            }
                            { collapse &&
                                <MdKeyboardArrowUp size={26} />
                            }
                        </Button>
                    </div>
                </div>
                <div className={`px-4 overflow-y-auto ${collapse ? 'max-h-max pb-4' : 'max-h-0'}`}>
                    {order.orderLineResponse.map(item => (
                        <CartItem key={item.productName} item={item} isOrder={true}/>
                    ))}
                    <div className={"text-slate-500 text-sm"}>
                        <div className="flex justify-between py-1">
                            <span>Tiền ước tính</span>
                            <span className="font-semibold text-slate-900">{formatMoney(order.totalPrice)}</span>
                        </div>
                        <div className="flex justify-between py-1">
                            <span>Giảm giá</span>
                            <span className="font-semibold text-slate-900">0đ</span>
                        </div>
                        {/* <div className="flex justify-between py-1">
                            <span>Phí giao hàng</span>
                            <span className="font-semibold text-slate-900">0</span>
                        </div> */}
                        <div className="flex justify-between font-semibold text-slate-900 text-base pt-4">
                            <span>Tổng tiền</span><span>{formatMoney(order.totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrderItem;