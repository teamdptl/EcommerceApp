import {Button} from "flowbite-react";
import {useState} from "react";
import {MdAttachMoney, MdKeyboardArrowDown, MdKeyboardArrowUp, MdModeEdit} from "react-icons/md";
import {FaInfoCircle} from "react-icons/fa";

const AdminOrderItem = ({order, openInfo, openStatus, openConfirm}) => {
    const [display, setDisplay] = useState(false);

    const toggleDisplay = () => {
        setDisplay(!display);
    }

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
                    #001
                </p>
                <p className="text-center">Đang giao hàng</p>
                <p className="text-center">Huỳnh Khánh Duy</p>
                <p className="text-center">12:12 23/11/2023</p>
                <p className="text-center">30.000.000</p>
                <p className="text-center">Chưa thanh toán</p>
                <p className="text-center">COD</p>
                <div className="flex justify-center gap-1">
                    <Button size={"sm"} onClick={openInfo}><FaInfoCircle/></Button>
                    <Button color={"warning"} size={"sm"} onClick={openStatus}><MdModeEdit /></Button>
                    <Button color={"success"} size={"sm"} onClick={openConfirm}><MdAttachMoney /></Button>
                </div>
            </div>
            <div className={`select-none cursor-pointer overflow-y-auto rounded-xl border border-zinc-200 px-20 ${display ? 'max-h-64': 'max-h-0'} `}
                onClick={toggleDisplay}
            >
                <div className="flex items-center justify-evenly my-2">
                    <img className="w-24 h-24" src={"https://bizweb.dktcdn.net/100/475/489/products/dieu-hoa-casper-1-chieu-9000btu-sc-09fs32-jpg-width-500-height-500-quality-100.jpg?v=1685675567480"}></img>
                    <div>
                        <p>Máy lạnh Samsung Inverter 1 HP AR10CYHAAWKNSV</p>
                        <p>8.990.000₫</p>
                    </div>
                    <p>Số lượng: 1</p>
                    <p>Thành tiền: 8.990.000₫</p>
                </div>
                <div className="flex items-center justify-evenly my-2">
                    <img className="w-24 h-24" src={"https://bizweb.dktcdn.net/100/475/489/products/dieu-hoa-casper-1-chieu-9000btu-sc-09fs32-jpg-width-500-height-500-quality-100.jpg?v=1685675567480"}></img>
                    <div>
                        <p>Máy lạnh Samsung Inverter 1 HP AR10CYHAAWKNSV</p>
                        <p>8.990.000₫</p>
                    </div>
                    <p>Số lượng: 1</p>
                    <p>Thành tiền: 8.990.000₫</p>
                </div>
            </div>
        </div>
    </>
}

export default AdminOrderItem;