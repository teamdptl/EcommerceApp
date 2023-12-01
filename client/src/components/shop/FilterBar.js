import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAccusoft } from "react-icons/fa";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./styles.css";
import { Dropdown } from 'flowbite-react';


const FilterBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isColor, setIsColor] = useState(false);
    const [isPrice, setIsPrice] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    const [value, setValue] = useState([0, 60]);
    return (
        <div class="flex flex-col mx-auto relative mb-12 w-screen max-w-screen-xl">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
                <nav class=" relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar" >
                    <ul class="flex sm:space-x-2" >
                        <li class=" relative" >
                            <button
                                onClick={() => handleButtonClick('All Items')}
                                className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full 
          ${activeButton === 'All Items' ? 'text-slate-100 bg-slate-800' : 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-800 hover:bg-slate-100/75 dark:hover:bg-slate-800'} focus:outline-none`}
                            >
                                All Items
                            </button>
                        </li>
                        <li class=" relative" >
                            <button
                                onClick={() => handleButtonClick('Women')}
                                className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full 
          ${activeButton === 'Women' ? 'text-slate-100 bg-slate-800' : 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-800 hover:bg-slate-100/75 dark:hover:bg-slate-800'} focus:outline-none`}
                            >
                                Women
                            </button>
                        </li>
                        <li class=" relative" >
                            <button
                                onClick={() => handleButtonClick('Man')}
                                className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full 
          ${activeButton === 'Man' ? 'text-slate-100 bg-slate-800' : 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-800 hover:bg-slate-100/75 dark:hover:bg-slate-800'} focus:outline-none`}
                            >
                                Man
                            </button>
                        </li>
                        <li class=" relative" >
                            <button
                                onClick={() => handleButtonClick('Jewels')}
                                className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full 
          ${activeButton === 'Jewels' ? 'text-slate-100 bg-slate-800' : 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-800 hover:bg-slate-100/75 dark:hover:bg-slate-800'} focus:outline-none`}
                            >
                                Jewels
                            </button>
                        </li>
                        <li class=" relative" >
                            <button
                                onClick={() => handleButtonClick('Kids')}
                                className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full 
          ${activeButton === 'Kids' ? 'text-slate-100 bg-slate-800' : 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-800 hover:bg-slate-100/75 dark:hover:bg-slate-800'} focus:outline-none`}
                            >
                                Kids
                            </button>
                        </li>
                    </ul>
                </nav>
                <span class="block flex-shrink-0 text-right">
                    <button class=" relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium pl-4 py-2.5 sm:pl-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl w-auto !pr-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                        onClick={(e) => setIsActive(!isActive)} >
                        <svg class="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                            <path d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M16.07 16.52C17.8373 16.52 19.27 15.0873 19.27 13.32C19.27 11.5527 17.8373 10.12 16.07 10.12C14.3027 10.12 12.87 11.5527 12.87 13.32C12.87 15.0873 14.3027 16.52 16.07 16.52Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <span class="block truncate ml-2.5">Filter</span>
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
                            {/* <div class="relative">
                                <button class="flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none   border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500" id="headlessui-popover-button-:rg:" type="button" aria-expanded="false"
                                    onClick={(e) => setIsColor(!isColor)} >
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns={FaAccusoft}>
                                        <path d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M8.35 1.94995L9.69 3.28992" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M2.07 11.92L17.19 11.26" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M3 22H16" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    <span class="ml-2">Colors</span>
                                    <svg xmlns={FaAngleDown} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="w-4 h-4 ml-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                                    </svg>
                                </button>
                                {isColor && (
                                    <div class="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm opacity-100 translate-y-0">
                                        <div class="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                            <div class="relative flex flex-col px-5 py-6 space-y-5">
                                                <div class="flex text-sm sm:text-base ">
                                                    <input type="checkbox" class="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"></input>
                                                    <label class="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none">
                                                        <span class="text-slate-900 dark:text-slate-100  ">White</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">

                                                <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonThird text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Clear</button>

                                                <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div> */}
                            {/* <div class="relative">

                                <button class="flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none "
                                    onClick={(e) => setIsPrice(!isPrice)}
                                >
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" c></path>
                                        <path d="M12 6V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>

                                    <span class="ml-2 min-w-[90px]">1$ - 500$</span>
                                    <span>
                                        <span class="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                            </svg>
                                        </span>
                                    </span>
                                </button>

                                {isPrice && (
                                    <div class="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm opacity-100 translate-y-0" >
                                        <div class="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                            <div class="relative flex flex-col px-5 py-6 space-y-8">
                                                <div class="space-y-5">
                                                    <span class="font-medium">Price range</span>
                                                    <RangeSlider value={value} onInput={setValue}></RangeSlider>
                                                </div>
                                                <div class="flex justify-between space-x-5">
                                                    <div>
                                                        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Min price</label>
                                                        <div class="mt-1 relative rounded-md">
                                                            <span class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">$</span>
                                                            <input type="text" class="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent" value={value[0]}>
                                                            </input>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Max price</label>
                                                        <div class="mt-1 relative rounded-md">
                                                            <span class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">$</span>
                                                            <input type="text" class="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent" value={value[1]}>
                                                            </input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                                <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonThird text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Clear</button>
                                                <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div> */}

                            <div class="relative ">
                                <Dropdown label="Color" class="rounded-full border hover:bg-fuchsia-50 ">
                                    <div class="absolute z-10 w-screen max-w-sm  sm:px-0 lg:max-w-sm opacity-100 translate-y-0">
                                        <div class="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                            <div class="relative flex flex-col px-5 py-6 space-y-5">
                                                <div class="flex text-sm sm:text-base ">
                                                    <input type="checkbox" class="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"></input>
                                                    <label class="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none">
                                                        <span class="text-slate-900 dark:text-slate-100  ">White</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                                <Dropdown.Item class="rounded-full">
                                                    <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonThird text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Clear</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item class="rounded-full">
                                                    <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Apply</button>
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                    </div>

                                </Dropdown>
                            </div>

                            <div class="relative">
                                <Dropdown label="1$ - 500$" class="rounded-full border hover:bg-fuchsia-50 ">
                                    <div class="absolute z-40 w-screen max-w-sm px-4 sm:px-0 lg:max-w-sm opacity-100 translate-y-0" >
                                        <div class="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                            <div class="relative flex flex-col px-5 py-6 space-y-8">
                                                <div class="space-y-5">
                                                    <span class="font-medium">Price range</span>
                                                    <RangeSlider value={value} onInput={setValue}></RangeSlider>
                                                </div>
                                                <div class="flex justify-between space-x-5">
                                                    <div>
                                                        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Min price</label>
                                                        <div class="mt-1 relative rounded-md">
                                                            <span class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">$</span>
                                                            <input type="text" class="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent" value={value[0]}>
                                                            </input>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Max price</label>
                                                        <div class="mt-1 relative rounded-md">
                                                            <span class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">$</span>
                                                            <input type="text" class="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent" value={value[1]}>
                                                            </input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                                <Dropdown.Item class="rounded-full ">
                                                    <button class=" relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonThird text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Clear</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item class="rounded-full">
                                                    <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Apply</button>
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                    </div>

                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}

export default FilterBar;



