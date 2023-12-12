import ManagerHeader from "../../components/admin/ManagerHeader";
import AdminOrderItem from "../../components/admin/order/AdminOrderItem";
import AdminOrderTitle from "../../components/admin/order/AdminOrderTitle";
import AdminOrderStatusModal from "../../components/admin/order/AdminOrderStatusModal";
import AdminConfirmModal from "../../components/admin/AdminConfirmModal"
import React, {useEffect, useState} from "react";
import AdminOrderInfo from "../../components/admin/order/AdminOrderInfo";
import AdminOrderConfirmCash from "../../components/admin/order/AdminOrderConfirmCash";
import DatePickerFromTo from "../../components/admin/statistic_top/DatePickerFromTo";
import {Datepicker, Label, Select} from "flowbite-react";
import AdminPage from "../../layouts/AdminPage";
import baseUrl from '../../config'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import createFetch from "../../utils/createFetch";


const getISOStringDate = (date) => {
    let stringDate = date.toISOString().split('T')[0];
    console.log("String date: ", stringDate)
    return stringDate
}
const AdminOrder = () => {

    // Trạng thái đơn hàng
    const [showOrderStatus, setShowOrderStatus] = useState(false);
    // Thông tin nhận hàng
    const [showOrderInfo, setShowOrderInfo] = useState(false);
    // Xác nhận thu tiền
    const [showConfirm, setShowConfirm] = useState(false);

    //Filter
    const [showFilter, setShowFilter] = useState(false);

    const [listOrder, setListOrder] = useState([]);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const [endDate, setEndDate] = useState(currentDate)
    const [startDate, setStartDate] = useState(previousMonth)
    const [orderStatus, setOrderStatus] = useState(0)
    const [currentOrderSelect, setCurrentOrderSelect] = useState([])


    //Announ Modal
    const [showAnnounce, setShowAnnounce] = useState(false)
    const [content , setContent] = useState()
    const [type, setType] = useState('')


    const getListOrder = (isExport) => {
        const fileName = 'testExportExcel'
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        let url = '';
        let start = getISOStringDate(startDate);
        let end = getISOStringDate(endDate);
        if(isExport){
            url = baseUrl + '/api/v1/order/all?start=' + start + "&end=" + end + '&status=' + orderStatus;
        }else{url = baseUrl + '/api/v1/order/all'}
        
        console.log(url)
        createFetch(url)
        .then(data => data.json())
        .then((res) => {
            console.log(res)
            if(res.error === 1){
                setListOrder(undefined)
            }else{
                if(isExport){
                    const ws = XLSX.utils.json_to_sheet(res);
                    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                    const data = new Blob([excelBuffer], { type: fileType });
                    FileSaver.saveAs(data, fileName + fileExtension);
                }else{
                    setListOrder(res)
                }
            }
            
        })
        .catch(err => console.error(err))
    }

    const filterOrder = (searchText) => {
        let start = getISOStringDate(startDate);
        let end = getISOStringDate(endDate);
        let url = baseUrl + '/api/v1/order/all?text=' + searchText + '&start=' + start + "&end=" + end + '&status=' + orderStatus;
        console.log(url)
        createFetch(url)
        .then(data => data.json())
        .then((res) => {
            console.log(res)
            if(res.error === 1){
                setListOrder(undefined)
            }else{
                setListOrder(res)
            }
             
        })
        .catch(err => console.error(err))
    }
    const openOrderStatus = (e, order) => {
        e.stopPropagation();
        console.log(order);
        setCurrentOrderSelect(order)
        setShowOrderStatus(true);
    }

    const openOrderInfo = (e, order) => {
        e.stopPropagation();
        console.log(order);
        setCurrentOrderSelect(order)
        setShowOrderInfo(true);
    }

    const openConfirm = (e, order) => {
        e.stopPropagation();
        console.log(order);
        setCurrentOrderSelect(order)
        setShowConfirm(true);
    }

    useEffect(() => {
        console.log(orderStatus)
        getListOrder(false)
    },[])

    const loadOrderTable = () => {
        let listComponent = []
        listOrder.forEach(element => {
            listComponent.push(<AdminOrderItem openInfo={openOrderInfo} openStatus={openOrderStatus} openConfirm={openConfirm} order={element}/>)
        });
        return listComponent
    }

    const saveStatus = (orderId, status) => {
        console.log("Save status function")
        let url = baseUrl + '/api/v1/order/update/status?order=' + orderId + '&status=' + status;
        setShowOrderStatus(false);
        createFetch(url).then(data => data.json())
                    .then(res => {
                        if(res.error === 0){
                            listOrder.map(item => {
                                if(item.orderId === orderId) {
                                    item.orderStatus = status;
                                }
                            })
                            setListOrder(listOrder);
                            setContent(res.message)
                            setType('success')
                            setShowAnnounce(true);
                        }else{
                            setContent(res.message)
                            setType('fail')
                            setShowAnnounce(true)
                        }
                    })
                    .catch(err => console.error(err))
    }

    const confirmPayment = (orderId) => {

        let url = baseUrl + '/api/v1/order/update/payment?order=' + orderId + '&payment=true';
        setShowConfirm(false)
        createFetch(url).then(data => data.json())
                    .then(res => {
                        if(res.error === 0){
                            listOrder.map(item => {
                                if(item.orderId === orderId) {
                                    item.paymentStatus = true;
                                }
                            })
                            setListOrder(listOrder);
                            setContent(res.message)
                            setType('success')
                            setShowAnnounce(true);
                        }else{
                            setContent(res.message)
                            setType('fail')
                            setShowAnnounce(true)
                        }
                    })
                    .catch(err => console.error(err))
        
    }

    return (
        <AdminPage>
            <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
                <ManagerHeader title="Thông tin đơn hàng"
                               searchCallBack={filterOrder}
                               placeHolder="Mã đơn, sdt, người mua"
                               filterCallback={() => setShowFilter(!showFilter)}
                               exportCallback={() => getListOrder(true)}
                />
                {showFilter &&
                    <div className={`flex mb-4 gap-4 mx-4 items-center justify-center`}>
                        <Label value="Từ ngày" />
                        <Datepicker language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" maxDate={currentDate} value={startDate.toLocaleDateString("vi-VN")} onSelectedDateChanged={(value) => setStartDate(value)}/>
                        <Label value="Đến ngày" />
                        <Datepicker language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" maxDate={currentDate} value={endDate.toLocaleDateString("vi-VN")} onSelectedDateChanged={(value) => setEndDate(value)}/>
                        <Label value="Trạng thái" />
                        <Select id="countries"
                            value={orderStatus} 
                            onChange={val => setOrderStatus(val.target.value)}
                            required>
                            <option value={0}>Tất cả</option>
                            <option value={1}>Đang tiếp nhận</option>
                            <option value={2}>Đang giao hàng</option>
                            <option value={3}>Đã hoàn thành</option>
                            <option value={4}>Đã hủy</option>
                        </Select>
                    </div>
                }

                <div className="px-4">
                    <AdminOrderTitle/>
                    {listOrder === undefined ? (<div>Error when loading data!</div>) : ((listOrder.lenght === 0) ? <div>Load load đồ đó</div> : loadOrderTable())}
                </div>
            </div>
            <AdminOrderStatusModal order={currentOrderSelect} showModal={showOrderStatus} closeModal={() => setShowOrderStatus(false)} saveStatus={saveStatus}/>
            <AdminOrderInfo order={currentOrderSelect} showModal={showOrderInfo} closeModal={() => setShowOrderInfo(false)}/>
            <AdminOrderConfirmCash order={currentOrderSelect} showModal={showConfirm} closeModal={() => setShowConfirm(false)} handleConfirm={confirmPayment}/>
            <AdminConfirmModal isShow={showAnnounce} closeModal={() => setShowAnnounce(false)} content={content} type={type}></AdminConfirmModal>
        </AdminPage>
    )
}

export default AdminOrder;