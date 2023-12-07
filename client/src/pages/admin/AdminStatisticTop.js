import {Table} from "flowbite-react";
import DatePickerFromTo from "../../components/admin/statistic_top/DatePickerFromTo";
import AdminPage from "../../layouts/AdminPage";
import {useEffect, useState} from "react";
import baseUrl from "../../config";




const AdminStatisticTop = () => {
    const [productList,setProductList] = useState([]);
    const [brandList,setBrandList] = useState([]);
    const [userList,setUserList] = useState([]);

    const fetchTopProduct =()=>{
        fetch(`${baseUrl}/api/v1/admin/statistic-product`,{
            method:"POST",
            header:{
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            return response.json()
        }).then(data =>{
            console.log(data)
            setProductList(data)
        })
    }

    const fetchTopBrand =()=>{
        fetch(`${baseUrl}/api/v1/admin/statistic-brand`,{
            method:"POST",
            header:{
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            return response.json()
        }).then(data =>{
            console.log(data)
            setBrandList(data)
        })
    }
    const fetchTopUser =()=>{
        fetch(`${baseUrl}/api/v1/admin/statistic-user`,{
            method:"POST",
            header:{
                'Content-Type': 'application/json'
            }
        }).then(response =>{
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
            <DatePickerFromTo/>
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
                    productList.map((item,index )=>(
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
            <DatePickerFromTo/>
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
            <DatePickerFromTo/>
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