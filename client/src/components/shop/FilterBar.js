import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAccusoft, FaStar } from "react-icons/fa";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./styles.css";
import { Dropdown } from 'flowbite-react';
import { Label, Select } from 'flowbite-react';
import baseUrl from "../../config";
import formatMoney from "../../utils/currency";
import useProductsFetch from "../../hooks/useProductsFetch";



const FilterBar = ({ onChange }) => {


    const [isActive, setIsActive] = useState(false);

    //-------thể loại sản phẩm--------------
    const [selectedCategory, setSelectedCategory] = useState('');

    // Hàm xử lý sự kiện khi người dùng chọn loại sp
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        console.log(`User clicked category with ID: ${categoryId}`);
        onChange({
            categoryId: categoryId,
            page: 0,
        });
    };


    //------- giá khi kéo thanh slider----------
    const [isPrice, setPrice] = useState([0, 100000000]);

    useEffect(() => {
        console.log(isPrice);

    }, [isPrice]);

    // Hàm xử lý khi người dùng thay đổi khoảng giá
    const handlePriceChange = (value) => {
        setPrice(value);  // Cập nhật trạng thái khoảng giá khi người dùng thay đổi thanh trượt
    };

    // Hàm xử lý khi người dùng nhấn nút "Apply"
    const handleApplyFilter = () => {
        onChange({ priceMin: isPrice[0], priceMax: isPrice[1], page: 0 })
    };

    //------------hãng------------
    const [isBrand, setBrand] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const handleInputCheckbox = (event, brandId) => {

        if (selectedBrands.includes(brandId)) {
            setSelectedBrands(selectedBrands.filter(id => id !== brandId));
        } else {
            setSelectedBrands([...selectedBrands, brandId]);
        }
    };
    const handleApplyButton = () => {
        // hiển thị sản phẩm 
        onChange({ branchIds: selectedBrands, page: 0 })
    };


    //-----------xuất xứ----------------------
    const listOrigin = ['Việt Nam', 'Trung Quốc', 'Thái Lan', 'Indonesia', 'Nhật Bản'];
    const [isOrigin, setOrigin] = useState([]);
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setOrigin([...isOrigin, value]);
        } else {
            setOrigin(isOrigin.filter(item => item !== value));
        }
    };
    // Hàm xử lý nhấn nút button
    const handleApplyOrigin = () => {

        console.log("xuất xứ vừa chọn:", isOrigin);
        onChange({ origins: isOrigin, page: 0 })
    };

    //-------------- đánh giá-----------------
    const [selectedOption, setSelectedOption] = useState('Đánh giá');

    const handleSelectChange = (event) => {

        setSelectedOption(event.target.value);
        // console.log(event.target.value);
        // Xử lý logic dựa trên option được chọn
        onChange({ rating: event.target.value, page: 0 })
    };


    //-----------Tìm kiếm sp theo điều kiện ------------
    const [selectedValue, setSelectedValue] = useState('Tìm kiếm sản phẩm theo');
    const handleSelect = (event) => {

        setSelectedValue(event.target.value);
        console.log(event.target.value);
        // Xử lý logic dựa trên option được chọn
        onChange({ sortType: event.target.value, page: 0 })
    };
    //---------1
    // const [optionSearch, setoptionSearch] = useState("");
    // const handleOptionChange = (event) => {
    //     setoptionSearch(event.target.value);
    //     onChange({ sortType: optionSearch })
    // }

    // // Update the price range state
    // const handlePriceRangeChange = (min, max) => {
    //     setPrice([min, max]);
    // }
    // -----------2
    // const handleSelect = (e) => {
    //     if (e.target.value === "1") {
    //         setPrice([0, 100000000]); // Đặt lại giá trị isPrice tương ứng với lựa chọn "Giá từ Thấp đến Cao"
    //         filterAndSortProducts([0, 100000000]); // Gọi hàm xử lý tìm kiếm sản phẩm dựa trên giá
    //     } else if (e.target.value === "2") {
    //         setPrice([100000000, 0]); // Đặt lại giá trị isPrice tương ứng với lựa chọn "Giá từ Cao đến Thấp"
    //         filterAndSortProducts([100000000, 0]); // Gọi hàm xử lý tìm kiếm sản phẩm dựa trên giá
    //     }
    //     onChange({ sortType: e.target.value })
    // };

    // const [products, setProducts] = useState([]);
    // const filterAndSortProducts = (priceRange, sortingOption) => {
    //     // Filter products based on the selected price range
    //     const filteredProducts = products.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

    //     // Sort products based on the sorting option
    //     if (sortingOption === '1') {
    //         filteredProducts.sort((a, b) => a.price - b.price);
    //     } else if (sortingOption === '2') {
    //         filteredProducts.sort((a, b) => b.price - a.price);
    //     }

    //     // Update the state with the filtered and sorted products
    //     setProducts(filteredProducts);
    // };
    //--------------3
    // const [products, setProducts] = useState([]);
    // const [sortBy, setSortBy] = useState('');

    // useEffect(() => {
    //     if (sortBy === '1') {
    //         setProducts([...products].sort((a, b) => a.isPrice - b.isPrice));
    //     } else if (sortBy === '2') {
    //         setProducts([...products].sort((a, b) => b.isPrice - a.isPrice));
    //     }
    // }, [sortBy]);

    // const handleSortChange = (e) => {
    //     setSortBy(e.target.value);

    //     onChange({ sortType: e.target.value })
    // };


    //---------gọi API---------------------
    const [isCategory, setCategory] = useState([]);
    useEffect(() => {
        fetch(baseUrl + '/api/v1/category/get')
            .then(response => response.json())
            .then(json => {
                setCategory(json);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        fetch(baseUrl + '/api/v1/brand/get')
            .then(response => response.json())
            .then(json => {
                setBrand(json);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        //console.log(isCategory);
    }, [isCategory, isBrand, selectedOption])







    return (
        <>
            <div class="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
                <nav class=" relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar" >
                    <ul class="flex sm:space-x-2" >
                        <li key={'all'} className="relative">
                            <button
                                onClick={() => handleCategoryClick('')}
                                className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                              ${selectedCategory === '' ? 'text-slate-100 bg-slate-800' : 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-800 hover:bg-slate-100/75 dark:hover:bg-slate-800'} focus:outline-none`}
                            >
                                Tất cả
                            </button>

                        </li>
                        {isCategory.map((item) => (
                            <li key={item.categoryId} className="relative">
                                <button
                                    onClick={() => handleCategoryClick(item.categoryId)}
                                    className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full
                              ${selectedCategory === item.categoryId ? 'text-slate-100 bg-slate-800' : 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-800 hover:bg-slate-100/75 dark:hover:bg-slate-800'} focus:outline-none`}
                                >
                                    {item.name}

                                </button>

                            </li>
                        ))}
                    </ul>
                </nav>
                <span class="block flex-shrink-0 text-right">
                    <button class=" relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium pl-4 py-2.5 sm:pl-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl w-auto !pr-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                            onClick={(e) => setIsActive(!isActive)} >
                        <svg class="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                            <path d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M16.07 16.52C17.8373 16.52 19.27 15.0873 19.27 13.32C19.27 11.5527 17.8373 10.12 16.07 10.12C14.3027 10.12 12.87 11.5527 12.87 13.32C12.87 15.0873 14.3027 16.52 16.07 16.52Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <span class="block truncate ml-2.5"> Bộ Lọc</span>
                        <span class="absolute top-1/2 -translate-y-1/2 right-5">
                            <svg xmlns={FaAngleDown} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="w-4 h-4 sm:w-5 sm:h-5 " >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                            </svg>
                        </span>
                    </button>
                </span>
            </div>
            {isActive && (
                <div class="opacity-100 ">
                    <div class="w-full border-b border-neutral-200/70 dark:border-neutral-700 my-8"></div>
                    <div class="flex lg:space-x-4">
                        <div class="hidden lg:flex flex-1 space-x-4">
                            <div class="relative ">
                                <Dropdown label="Hãng" class="rounded-full border hover:bg-sky-50">
                                    <div class="absolute z-10 w-screen max-w-sm  sm:px-0 lg:max-w-sm opacity-100 translate-y-0">
                                        <div class="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                            <div class="relative flex flex-col px-5 py-6 space-y-5">
                                                {isBrand.map((brand) => (
                                                    <div key={brand.brandId} class="flex text-sm sm:text-base">
                                                        <input checked={selectedBrands.includes(brand.brandId)} type="checkbox" onChange={(event) => handleInputCheckbox(event, brand.brandId)} class="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"></input>
                                                        <label class="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none">
                                                            <span class="text-slate-900 dark:text-slate-100">{brand.name}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div class="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                                <Dropdown.Item class="rounded-full">
                                                    <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5 ttnc-ButtonThird text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Xoá</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item class="rounded-full">
                                                    <button onClick={handleApplyButton} class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Lọc</button>
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                    </div>
                                </Dropdown>
                            </div>

                            <div class="relative">
                                <Dropdown label="Giá Tiền" class="rounded-full border hover:bg-sky-50 truncate ">
                                    <div class="absolute z-40 w-screen max-w-sm px-4 sm:px-0 lg:max-w-sm opacity-100 translate-y-0" >
                                        <div class="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                            <div class="relative flex flex-col px-5 py-6 space-y-8">
                                                <div class="space-y-5">
                                                    <span class="font-medium">Khoảng giá</span>
                                                    <RangeSlider value={isPrice} onInput={handlePriceChange} min={0} max={100000000} step={5000000}></RangeSlider>
                                                </div>
                                                <div class="flex justify-between space-x-5">
                                                    <div>
                                                        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Min price</label>
                                                        <div class="mt-1 relative rounded-md">
                                                            <span class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm"></span>
                                                            <input type="text" class="block w-36 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent" value={formatMoney(isPrice[0])}>
                                                            </input>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Max price</label>
                                                        <div class="mt-1 relative rounded-md">
                                                            <span class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm"></span>
                                                            <input type="text" class="block w-36 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent" value={formatMoney(isPrice[1])}>
                                                            </input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                                <Dropdown.Item class="rounded-full ">
                                                    <button class=" relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonThird text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Xoá</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item class="rounded-full">
                                                    <button onClick={handleApplyFilter} class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Lọc</button>
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                    </div>

                                </Dropdown>
                            </div>

                            <div class="relative ">
                                <Dropdown label="Xuất xứ" class="rounded-full border hover:bg-sky-50">
                                    <div class="absolute z-10 w-screen max-w-sm  sm:px-0 lg:max-w-sm opacity-100 translate-y-0">
                                        <div class="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                            <div class="relative flex flex-col px-5 py-6 space-y-5">

                                                {listOrigin.map((item, index) => (
                                                    <div key={index} class="flex text-sm sm:text-base">
                                                        <input type="checkbox" checked={isOrigin.includes(item)} value={item} onChange={handleCheckboxChange} class="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"></input>
                                                        <label class="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none">
                                                            <span class="text-slate-900 dark:text-slate-100">{item}</span>
                                                        </label>
                                                    </div>
                                                ))}

                                            </div>
                                            <div class="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                                <Dropdown.Item class="rounded-full">
                                                    <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5 ttnc-ButtonThird text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Xoá</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item class="rounded-full">
                                                    <button onClick={handleApplyOrigin} class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Lọc</button>
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                    </div>

                                </Dropdown>

                            </div>

                            <div class="relative ">
                                <Select id="countries" required value={selectedOption}
                                        onChange={handleSelectChange}
                                        class="bg-white h-9 rounded-full border-slate-300 hover:bg-sky-50 ">
                                    <option value="-1">Đánh giá</option>
                                    <option value="1">1 Sao</option>
                                    <option value="2">2 Sao</option>
                                    <option value="3">3 Sao</option>
                                    <option value="4">4 Sao</option>
                                    <option value="5">5 Sao</option>
                                </Select>

                            </div>


                            <div class="!ml-auto">
                                <div class="relative">
                                    <Select id="countries"
                                        // onChange={handleSelect}
                                        // value={products}

                                            value={selectedValue}
                                            onChange={handleSelect}
                                            required
                                            class="bg-white h-9 rounded-full border-slate-300 w-screen max-w-xs  hover:bg-sky-50">
                                        <option value="0">Sắp xếp theo phổ biến</option>
                                        <option value="1">Sắp xếp theo đánh giá cao</option>
                                        <option value="2">Giá từ thấp đến cao</option>
                                        <option value="3">Giá từ cao đến thấp</option>
                                    </Select>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default FilterBar;



