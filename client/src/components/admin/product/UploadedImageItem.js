import React from "react";
import {IoMdCloseCircle} from "react-icons/io";

const UploadedImageItem = ({img, src, isSelect, selectCurrent, removeCurrent}) => {
    return (
        <>
            <div className={`flex-shrink-0 w-24 h-24 relative select-none ${isSelect ? 'border-4 border-blue-500': ''}`} onClick={selectCurrent}>
                <span class="absolute right-0 top-0 bg-white rounded-full cursor-pointe" onClick={(e) =>{
                    e.stopPropagation();
                    removeCurrent();
                }}>
                    <IoMdCloseCircle color="red" size={20}/>
                </span>
                {img && <img class="w-full h-full" src={src} alt="Ảnh sản phẩm"/>}
                {isSelect && <p class="absolute bottom-0 left-0 right-0 text-xs bg-white text-center">Ảnh đại diện</p>}
            </div>
        </>
    )
}

export default UploadedImageItem;