import ManagerHeader from "../ManagerHeader";

const AdminOrder = () => {
    return (
        <>
            <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
                <ManagerHeader title="Thông tin hóa đơn"
                               searchCallBack={() => console.log("tim kiem")}
                               placeHolder="Mã đơn, sdt, người mua"
                               filterCallback={() => console.log("filter")}

                />
            </div>
        </>
    )
}

export default AdminOrder;