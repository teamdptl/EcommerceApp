import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
const SearchBar = ({ onChange }) => {


    const [isSearch, setSearch] = useState('');
    const handleSearch = (event) => {

        console.log(`Searching for: ${isSearch}`);
        onChange({
            title: isSearch
        })
    };

    return (
        <div className={"bg-blue-100 py-8 mb-6"}>
            <p className="text-center mb-4 text-slate-800 text-xl font-semibold">Tìm kiếm sản phẩm trong cửa hàng</p>
            <div className="mx-auto w-screen max-w-screen-md leading-6">
                <form className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-3xl border shadow-lg">
                    <svg className="absolute left-4 block h-5 w-5 text-gray-400" xmlns={FaSearch} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8" className=""></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                    </svg>
                    <input type="name" value={isSearch} onChange={(e) => setSearch(e.target.value)} name="search" className="h-14 w-full rounded-3xl py-4 pr-40 pl-12 outline-none focus:ring-2" placeholder="Tìm kiếm......" />
                    <button onClick={(event) => {
                        event.preventDefault();
                        handleSearch();
                    }} type="submit" className="absolute right-0 mr-1 inline-flex h-12 items-center justify-center rounded-3xl bg-gray-900 px-5 font-medium text-white focus:ring-4 hover:bg-gray-700"><FaArrowRight /></button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar;