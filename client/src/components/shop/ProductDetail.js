import { Carousel, Button, Rating } from "flowbite-react";
import SupportService from "../../components/shop/SupportSevice";
import { useContext, useState } from "react";
import { RiSubtractFill } from "react-icons/ri"
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import baseUrl from "../../config"
import {useCartContext} from "../../context/CartContext";
import AdminConfirmModal from "../admin/AdminConfirmModal";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const product = {favourite: null}

const getAverageRating = (reviewsData) => {
    if(reviewsData.length <= 0)
        return 0;
    let average = 0
    reviewsData.forEach((review) => {
        average += review.rate
    })

    return (average/reviewsData.length).toFixed(2)
}


const ProductDetail = ({data, listReview}) => {
    
    const [favourite, setFavourite] = useState(data.favorite)
    const [quantity, setQuantity] = useState(1)
    const [showDisc, setShowDisc] = useState(false)
    const [showWarrantyPolicy, setShowWarrantyPolicy] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [content, setContent] = useState("")
    const [type, setType] = useState()
    const {user, setUser, setAutoLogin} = useContext(AuthContext);
    const { addItemToCart } = useCartContext();
    const navigate = useNavigate();
    let medias = data.medias;
    
    const formatter = new Intl.NumberFormat('VN', {
        style: 'currency',
        currency: 'VND'
      });
      
    const favouriteClick = () => {
        if(user){
            let token = localStorage.getItem('accessToken')
            token = token ? token : ""
            if(favourite){
                const url = baseUrl + '/api/v1/product/delete-favorite/' + data.productId
                
                fetch(url, {
                    method: 'GET',
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                })
                .then(data => {
                    if(data.status === 200){
                        setFavourite(!favourite);
                    }else{
                        setContent("Vui lòng tải lại trang!")
                        setType("success");
                        setShowConfirm(true)
                    }
                })
                .catch(err => console.error(err))
            }else{
                const url = baseUrl + '/api/v1/product/add-favorite/' + data.productId
                fetch(url, {
                    method: 'GET',
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                })
                .then(data => {
                    if(data.status === 200){
                        setFavourite(!favourite);
                    }else{
                        setContent("Vui lòng tải lại trang!")
                        setType("success");
                        setShowConfirm(true)
                    }
                })
                .catch(err => console.error(err))
            }
            
        }else{
            setContent("You need login first!")
            setType("warning");
            setShowConfirm(true)
        }
        
    }

    const addQuantity = () => {
        setQuantity(quantity+1)
    }

    const subtractQuantity = () => {
        if(quantity > 1)
            setQuantity(quantity - 1)
    }
    
    return (
        <>
            {data === undefined || data === null ? <div class="font-extrabold self-center">Opps! Không thể tải sản phẩm</div> :
            (<div>
                <div class="lg:flex">
                    <section class="w-full lg:w-[55%]">
                        <picture class="relative">
                        { (medias === undefined || medias.length <= 0) ? <img className="w-full rounded-2xl object-cover" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt=""></img>:
                                <Swiper
                                height={100}
                                spaceBetween={0}
                                slidesPerView={1}
                                navigation
                                autoplay={{deplay:1000}}
                                modules={[Navigation, Pagination, Autoplay]}
                                pagination={{ clickable: true }}
                                onSlideChange={() => console.log("slide change")}
                                onSwiper={(swiper) => console.log(swiper)}
                                className="items-center"
                            >
                                {
                                    medias.map((item) => {
                                        return (<SwiperSlide className="h-full self-center"><img className="w-full rounded-2xl object-cover" src={item.imageUrl} alt=""></img></SwiperSlide>)
                                    })
                                }      

                            </Swiper>

                        }
                            
                        </picture>
                        
                    </section>
                    <section class="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
                        <div>
                            <h2 class="flex justify-between text-2xl sm:text-3xl font-semibold">
                                <span>{data.name}</span>
                                <Button color="light" className="rounded-full w-9 h-9 self-center ml-5" onClick={() =>{favouriteClick()}}>
                                    { (favourite) ? (<AiFillHeart color="red" size="20"/>) : (<AiOutlineHeart size='20' />) }
                                </Button>
                            </h2>
                            <div class="flex items-center mt-5 space-x-4 sm:space-x-5">
                                <div class="">
                                    <div class="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold">
                                        <span class="text-green-500 !leading-none">{formatter.format(data.price)}</span>
                                    </div>
                                </div>
                                {
                                    data.oldPrice === 0 ? (<div></div>) : 
                                    (<div class="">
                                        <div class="flex items-center border-2 border-grey-500 rounded-lg py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold">
                                            <strike class="text-gray-500 !leading-none">{formatter.format(data.oldPrice)}</strike>
                                        </div>
                                    </div>)
                                }
                                
                                <div class="h-7 border-l border-slate-300 dark:border-slate-700"></div>
                                <div class="flex items-center">
                                    <a href="#reviews" class="flex items-center text-sm font-medium">
                                        <Rating>
                                            <Rating.Star></Rating.Star>
                                            <p className="ml-1 text-sm font-bold text-gray-900 dark:text-white">{getAverageRating(listReview)}</p>
                                            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                                            <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                                                {listReview.length} đánh giá
                                            </span>
                                        </Rating>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="mt-10">
                            <div>
                                <div class="flex justify-between font-medium text-sm">
                                    <label for="">
                                        <h2>Giới thiệu</h2>
                                    </label>
                                    <a rel="noopener noreferrer" href="#description" class="text-primary-6000 hover:text-primary-500">Xem mô tả</a>
                                </div>
                                <ul class="py-2 px-4">
                                    <li class="flex">
                                        <img src="../../../../sparkles.png" class="w-10 h-7"/>
                                        <h3 class="font-bold pr-1">Thương hiệu: </h3>
                                        <p class="flex"> {data.brandName}</p>
                                    </li>
                                    <li class="flex">
                                        <img src="../../../../sparkles.png" class="w-10 h-7"/>
                                        <h3 class="font-bold pr-1">Bảo hành: </h3>
                                        <p class="flex"> {data.warrantyMonths} tháng</p>
                                    </li>
                                    <li class="flex">
                                        <img src="../../../../sparkles.png" class="w-10 h-7"/>
                                        <h3 class="font-bold pr-1">Xuất xứ: </h3>
                                        <p class="flex"> {data.origin}</p>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class="flex space-x-3.5 mt-10">
                            <Button.Group className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
                                <div class="nc-NcInputNumber flex items-center justify-between space-x-5 w-full">
                                    <div class="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                                        <Button onClick={() => subtractQuantity()} color="grey" className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default">
                                            <FaMinus/>
                                        </Button>
                                        <span class="select-none block flex-1 text-center leading-none text-xl">{quantity}</span>
                                        <Button onClick={() => addQuantity()} color="grey" className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default">
                                            <FaPlus />
                                        </Button>
                                    </div>
                                </div>
                            </Button.Group>
                            <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                                    onClick={() => {
                                        const findPrimaryImage = data.medias.find(item => item.primary) ?? data?.medias[0];
                                        addItemToCart({...data, imageUrl: findPrimaryImage.imageUrl}, quantity);
                                    }}
                            >
                                <svg class="hidden sm:inline-block w-5 h-5 mb-0.5" viewBox="0 0 9 9" fill="none">
                                    <path d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z" fill="currentColor"></path>
                                </svg>
                                <span class="ml-3">Thêm giỏ hàng</span>
                            </button>
                        </div>

                        <hr class="mt-10 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>

                        <SupportService></SupportService>
                    </section>
                
                    <AdminConfirmModal isShow={showConfirm} closeModal={() => setShowConfirm(false)} confirmCallback={() => navigate('/login')} content={content} type={type}></AdminConfirmModal>
                </div>
                <hr id="description" class="border-slate-200 dark:border-slate-700 mt-20"></hr>

                <div class="w-full rounded-2xl space-y-2.5 mt-10">
                    <Button color="gray" className="w-full flex justify-between focus:ring-0" theme={buttonTheme} onClick={() => {setShowDisc(!showDisc)}}>
                        <span>Mô tả</span>
                        { showDisc ? <RiSubtractFill/> : <AiOutlinePlus/>}
                    </Button>
                    {showDisc ? (<div class="p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6" id="headlessui-disclosure-panel-:ra:" dangerouslySetInnerHTML={{__html: data.description}}></div>) : (<div className="hidden"></div>)}
                    {/* <Button color="gray" className="w-full flex justify-between focus:ring-0" theme={buttonTheme} onClick={() => {setShowWarrantyPolicy(!showWarrantyPolicy)}}>
                        <span>Chính sách bảo hành</span>
                        { showWarrantyPolicy ? <RiSubtractFill/> : <AiOutlinePlus/>}
                    </Button> */}
                    {showWarrantyPolicy ? (<div class="p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6" id="headlessui-disclosure-panel-:ra:" >Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context, of clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body posture.</div>) : (<div className="hidden"></div>)}
                </div>
            </div>)
            }
        </>

    );
};

const buttonTheme = {
    
        "base": "group flex items-stretch items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none",
        "fullSized": "w-full",
        "color": {
          "dark": "text-white bg-gray-800 border border-transparent enabled:hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700",
          "failure": "text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900",
          "gray": "bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ",
          "info": "text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800",
          "light": "text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-700",
          "purple": "text-white bg-purple-700 border border-transparent enabled:hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:enabled:hover:bg-purple-700 dark:focus:ring-purple-900",
          "success": "text-white bg-green-700 border border-transparent enabled:hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800",
          "warning": "text-white bg-yellow-400 border border-transparent enabled:hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
          "blue": "text-white bg-blue-700 border border-transparent enabled:hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
          "cyan": "text-cyan-900 bg-white border border-cyan-300 enabled:hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:text-white dark:border-cyan-600 dark:enabled:hover:bg-cyan-700 dark:enabled:hover:border-cyan-700 dark:focus:ring-cyan-700",
          "green": "text-green-900 bg-white border border-green-300 enabled:hover:bg-green-100 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:text-white dark:border-green-600 dark:enabled:hover:bg-green-700 dark:enabled:hover:border-green-700 dark:focus:ring-green-700",
          "indigo": "text-indigo-900 bg-white border border-indigo-300 enabled:hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:text-white dark:border-indigo-600 dark:enabled:hover:bg-indigo-700 dark:enabled:hover:border-indigo-700 dark:focus:ring-indigo-700",
          "lime": "text-lime-900 bg-white border border-lime-300 enabled:hover:bg-lime-100 focus:ring-4 focus:ring-lime-300 dark:bg-lime-600 dark:text-white dark:border-lime-600 dark:enabled:hover:bg-lime-700 dark:enabled:hover:border-lime-700 dark:focus:ring-lime-700",
          "pink": "text-pink-900 bg-white border border-pink-300 enabled:hover:bg-pink-100 focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:text-white dark:border-pink-600 dark:enabled:hover:bg-pink-700 dark:enabled:hover:border-pink-700 dark:focus:ring-pink-700",
          "red": "text-red-900 bg-white border border-red-300 enabled:hover:bg-red-100 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700",
          "teal": "text-teal-900 bg-white border border-teal-300 enabled:hover:bg-teal-100 focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:text-white dark:border-teal-600 dark:enabled:hover:bg-teal-700 dark:enabled:hover:border-teal-700 dark:focus:ring-teal-700",
          "yellow": "text-yellow-900 bg-white border border-yellow-300 enabled:hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:text-white dark:border-yellow-600 dark:enabled:hover:bg-yellow-700 dark:enabled:hover:border-yellow-700 dark:focus:ring-yellow-700"
        },
        "disabled": "cursor-not-allowed opacity-50",
        "isProcessing": "cursor-wait",
        "spinnerSlot": "absolute h-full top-0 flex items-center animate-fade-in",
        "spinnerLeftPosition": {
          "xs": "left-2",
          "sm": "left-3",
          "md": "left-4",
          "lg": "left-5",
          "xl": "left-6"
        },
        "gradient": {
          "cyan": "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
          "failure": "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800",
          "info": "text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 ",
          "lime": "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800",
          "pink": "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800",
          "purple": "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800",
          "success": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800",
          "teal": "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
        },
        "gradientDuoTone": {
          "cyanToBlue": "text-white bg-gradient-to-r from-cyan-500 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
          "greenToBlue": "text-white bg-gradient-to-br from-green-400 to-cyan-600 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800",
          "pinkToOrange": "text-white bg-gradient-to-br from-pink-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800",
          "purpleToBlue": "text-white bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
          "purpleToPink": "text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800",
          "redToYellow": "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400",
          "tealToLime": "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 enabled:hover:bg-gradient-to-l enabled:hover:from-teal-200 enabled:hover:to-lime-200 enabled:hover:text-gray-900 focus:ring-4 focus:ring-lime-200 dark:focus:ring-teal-700"
        },
        "inner": {
          "base": "flex w-full items-stretch items-center transition-all duration-200 justify-between",
          "position": {
            "none": "",
            "start": "rounded-r-none",
            "middle": "rounded-none",
            "end": "rounded-l-none"
          },
          "outline": "border border-transparent",
          "isProcessingPadding": {
            "xs": "pl-8",
            "sm": "pl-10",
            "md": "pl-12",
            "lg": "pl-16",
            "xl": "pl-20"
          }
        },
        "label": "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
        "outline": {
          "color": {
            "gray": "border border-gray-900 dark:border-white",
            "default": "border-0",
            "light": ""
          },
          "off": "",
          "on": "flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
          "pill": {
            "off": "rounded-md",
            "on": "rounded-full"
          }
        },
        "pill": {
          "off": "rounded-lg",
          "on": "rounded-full"
        },
        "size": {
          "xs": "text-xs px-2 py-1",
          "sm": "text-sm px-3 py-1.5",
          "md": "text-sm px-4 py-2",
          "lg": "text-base px-5 py-2.5",
          "xl": "text-base px-6 py-3"
        }
      
  }

  const carouselTheme = {
    "root": {
      "base": "relative h-full w-full",
      "leftControl": "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
      "rightControl": "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none"
    },
    "indicators": {
      "active": {
        "off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
        "on": "bg-white dark:bg-gray-800"
      },
      "base": "h-3 w-3 rounded-full",
      "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
    },
    "item": {
      "base": "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
      "wrapper": {
        "off": "w-full flex-shrink-0 transform cursor-default snap-center",
        "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
      }
    },
    "control": {
      "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
      "icon": "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
    },
    "scrollContainer": {
      "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
      "snap": "snap-x"
    }
  }

export default ProductDetail