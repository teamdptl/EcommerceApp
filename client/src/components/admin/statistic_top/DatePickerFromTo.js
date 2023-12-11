import {Button, Datepicker, Label} from "flowbite-react";
import React, {useState} from "react";
import {IoIosSearch} from "react-icons/io";

const DatePickerFromTo = (props) => {



    const handleChangeDateFrom = (selectedDate)=>{
        props.handleChangeDateFrom(selectedDate);
    }
    const handleChangeDateTo = (selectedDate) =>{
        props.handleChangeDateTo(selectedDate);
    }
    const search = () =>{
        props.search();
    }
    return (
        <>
            <div class="flex justify-between items-end gap-x-2 px-4 py-2">
                <div>
                    <div className="mb-2 block">
                        <Label value="Từ ngày" />
                    </div>
                    <Datepicker   defaultDate={new Date("2023/01/01")}
                                  onSelectedDateChanged={(date)=>{handleChangeDateFrom(date)}} language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" maxDate={new Date()}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label value="Đến ngày" />
                    </div>
                    <Datepicker defaultDate={new Date((new Date()).valueOf() + 1000*3600*24)} onSelectedDateChanged={(date)=>{handleChangeDateTo(date)}} language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" maxDate={new Date((new Date()).valueOf() + 1000*3600*24)}/>
                </div>
                <Button onClick={search} className="mb-1" color="gray"><IoIosSearch/></Button>
            </div>
        </>
    )
}

export default DatePickerFromTo;