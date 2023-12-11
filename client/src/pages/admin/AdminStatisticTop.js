import {Table} from "flowbite-react";
import DatePickerFromTo from "../../components/admin/statistic_top/DatePickerFromTo";
import AdminPage from "../../layouts/AdminPage";
import {useEffect, useState} from "react";
import baseUrl from "../../config";
import createFetch from "../../utils/createFetch";





const AdminStatisticTop = () => {

    const [productList,setProductList] = useState([]);
    const [brandList,setBrandList] = useState([]);
    const [userList,setUserList] = useState([]);

    const [dateFrom , setDateFrom] = useState(["","",""]);
    const [dateTo , setDateTo] = useState(["","",""]);
    const [isLoading, setIsLoading] = useState(["false", "false", "false"]);
    // cai ten noi len tat ca
    const formatDate =(date)=>{
        const originalDate = new Date(date);
        const year = originalDate.getFullYear(); // Lấy năm
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm số 0 ở đầu nếu cần
        const day = originalDate.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm số 0 ở đầu nếu cần
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const handleChangeDateFrom= (text,type)=> {
        const currentDate = formatDate(new Date());
        const updatedState = [...dateFrom];
        const date  = formatDate(text);
        switch (type){
            case "product":
                handleChangeDateFromWithType(0,text)
                break;
            case "brand":
                handleChangeDateFromWithType(1,text)
                break;
            case "user":
                handleChangeDateFromWithType(2,text)
                break;
        }
    }
    // nay de update cai gia tri cua date picker
    const handleChangeDateFromWithType = (index,text)=>{
        const currentDate = formatDate(new Date())
        const date  = formatDate(text);
        //Tranh truong hop chi pick 1 date
        if(dateTo[index]==""){
            const updatedState = [...dateTo];
            updatedState[index]=currentDate
            setDateTo(updatedState);
            console.log(updatedState[index])
        }
        const updatedState = [...dateFrom];
        updatedState[index]=date
        console.log(updatedState[index])
        setDateFrom(updatedState);
    }
    const handleChangeDateToWithType = (index,text) => {
        const currentDate = formatDate(new Date());
        const updatedState = [...dateTo];
        const date  = formatDate(text);
        if(dateFrom[index] == ""){
            const updatedState = [...dateFrom];
            updatedState[index]=currentDate
            setDateFrom(updatedState);
        }
        updatedState[index]=date
        setDateTo(updatedState);
    }
    //Nay de coi no chon date picker nao
    const handleChangeDateTo= (text,type)=> {
        switch (type){
            case "product":
                handleChangeDateToWithType(0,text)
                break;
            case "brand":
                handleChangeDateToWithType(1,text)
                break;
            case "user":
                handleChangeDateToWithType(2,text)
                break;
        }
    }
    // Goi api cua Prodcut ne
    const fetchTopProduct =()=>{
        let data = null;
        const updateLoading =[...isLoading];
        updateLoading[0] = true
        setIsLoading(updateLoading)
        if(dateFrom[0] || dateTo[0])
        {
            data = {
                startDate : dateFrom[0],
                endDate : dateTo[0]
            }
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        };
        //Khong null thi gui data
        if (data !== null) {
            console.log(data)
            requestOptions.body = JSON.stringify(data);
        }
        createFetch(`${baseUrl}/api/v1/admin/statistic-product`, requestOptions)
       .then(response =>{
            return response.json()
        }).then(data =>{
            console.log(data)
            setProductList(data)
        })

    }
    // goi API cua Brand ne
    const fetchTopBrand =()=>{
        let data = null;
        if(dateFrom[1] || dateTo[1])
        {
            data = {
                startDate : dateFrom[1],
                endDate : dateTo[1]
            }
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (data !== null) {
            console.log(data)
            requestOptions.body = JSON.stringify(data);
        }

        createFetch(`${baseUrl}/api/v1/admin/statistic-brand`,requestOptions)
            .then(response =>{
            return response.json()
        }).then(data =>{
            console.log(data)
            setBrandList(data)
        })
    }
    const fetchTopUser =()=>{
        let data = null;
        if(dateFrom[2] || dateTo[2])
        {
            data = {
                startDate : dateFrom[2],
                endDate : dateTo[2]
            }
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (data !== null) {
            console.log(data)
            requestOptions.body = JSON.stringify(data);
        }

        createFetch(`${baseUrl}/api/v1/admin/statistic-user`,requestOptions)
            .then(response =>{
            return response.json()
        }).then(data =>{
            console.log(data)
            setUserList(data)
        })
    }

    useEffect(() => {
        fetchTopProduct();
        fetchTopBrand();
        fetchTopUser();
    }, []);

    return <AdminPage>
        <div className="col-span-2 bg-white rounded-md border-2 border-zinc-100">
            <p class="text-base p-4 rounded-t-md font-semibold text-white bg-blue-500">Thống kê top 10 sản phẩm</p>
            <DatePickerFromTo handleChangeDateFrom={(text)=>handleChangeDateFrom(text,"product")}
                              handleChangeDateTo={(text)=>handleChangeDateTo(text,"product")}
                              search={fetchTopProduct}/>
            <ul class="p-4 pt-2">
                <li class="grid grid-cols-6 justify-center items-center pb-4 mb-4 border-b-2 border-b-zinc-100">
                    <div class="col-span-2">
                        Hình ảnh
                    </div>
                    <div className="col-span-3">
                        Tên sản phẩm
                    </div>
                    <div className="col-span-1">
                        Bán
                    </div>
                </li>
                {

                        productList.map((item, index) => (
                            <li className="grid grid-cols-6 justify-center items-center pb-4 mb-4 border-b-2 border-b-zinc-100">
                                <div className="col-span-2">
                                    <img className="aspect-square w-20" src={item.imageUrl}></img>
                                </div>
                                <div className="col-span-3">
                                    <p className="text-base">{item.name}</p>
                                    <p className="text-sm font-semibold mt-1">{item.price}</p>
                                </div>
                                <div className="col-span-1">
                                    {item.totalSales}
                                </div>
                            </li>
                        ))
                }
                {/*{Array(5).fill(0).map((item) => (*/}
                {/*    <li className="grid grid-cols-6 justify-center items-center pb-4 mb-4 border-b-2 border-b-zinc-100">*/}
                {/*        <div className="col-span-2">*/}
                {/*            <img className="aspect-square w-20" src="https://flowbite-admin-dashboard.vercel.app/images/products/iphone.png"></img>*/}
                {/*        </div>*/}
                {/*        <div className="col-span-3">*/}
                {/*            <p className="text-base">Điện thoại Samsungn sdhahd das</p>*/}
                {/*            <p className="text-sm font-semibold mt-1">3.000.000đ</p>*/}
                {/*        </div>*/}
                {/*        <div className="col-span-1">*/}
                {/*            10*/}
                {/*        </div>*/}
                {/*    </li>*/}
                {/*))}*/}
            </ul>
        </div>
        <div className="col-span-2 bg-white rounded-md border-2 border-zinc-100">
            <p className="text-base p-4 rounded-t-md font-semibold text-white bg-blue-500">Thống kê top 5 hãng</p>
            <DatePickerFromTo handleChangeDateFrom={(text)=>handleChangeDateFrom(text,"brand")}
                              handleChangeDateTo={(text)=>handleChangeDateTo(text,"brand")}
                              search={fetchTopBrand}/>
            <ul class="p-4 pt-2">
                <li className="grid grid-cols-6 justify-center items-center pb-4 mb-4 border-b-2 border-b-zinc-100">
                    <div className="col-span-3">
                        Tên hãng
                    </div>
                    <div className="col-span-3">
                        Số lượng bán
                    </div>
                </li>
                {
                    brandList.map((item,index)=>(
                        <li id={item.brandId} className="grid grid-cols-6 justify-center items-center pb-4 mb-4 border-b-2 border-b-zinc-100">
                            <div className="col-span-3">
                                {item.name}
                            </div>
                            <div className="col-span-3">
                                {item.totalSale}
                            </div>
                        </li>
                    ))
                }

            </ul>
        </div>
        <div className="col-span-2 bg-white rounded-md border-2 border-zinc-100">
            <p className="text-base p-4 rounded-t-md font-semibold text-white bg-blue-500">Thống kê top 5 khách hàng</p>
            <DatePickerFromTo handleChangeDateFrom={(text)=>handleChangeDateFrom(text,"user")}
                              handleChangeDateTo={(text)=>handleChangeDateTo(text,"user")}
                              search={fetchTopUser}/>
            <ul className="mt-3 p-4 pt-2">
                <li className="grid grid-cols-6 justify-center items-center pb-4 mb-4 border-b-2 border-b-zinc-100">
                    <div className="col-span-1">
                        ID
                    </div>
                    <div className="col-span-3">
                        Tên khách hàng
                    </div>
                    <div className="col-span-2">
                        Chi tiêu
                    </div>
                </li>
                {
                    userList.map((item,index)=>(
                        <li className="grid grid-cols-6 justify-center items-center pb-4 mb-4 border-b-2 border-b-zinc-100">
                            <div className="col-span-1">
                                {item.userId}
                            </div>
                            <div className="col-span-3">
                                {item.name}
                            </div>
                            <div className="col-span-2">
                                {item.totalBuy}
                            </div>
                        </li>
                    ))
                }

            </ul>
        </div>
    </AdminPage>
}

export default AdminStatisticTop;