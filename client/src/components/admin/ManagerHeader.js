import {Button, TextInput} from "flowbite-react";
import {HiOutlinePlus, HiSearch} from "react-icons/hi";
import {TbFilter} from "react-icons/tb";
import {BsFillTrash3Fill} from "react-icons/bs";

const ManagerHeader = ({title, placeHolder, addTitle, removeTitle, filterCallback, addCallback, removeCallback, searchCallBack}) => {
    return (
        <>
            <div className="p-4 flex justify-between items-center">
                <div className="flex gap-6 items-center">
                    <p className="text-xl font-semibold">{title}</p>
                    {searchCallBack &&
                        <div className="flex gap-2">
                            <TextInput type="text" icon={HiSearch } placeholder={placeHolder} sizing="md" />
                            {filterCallback && <
                                Button color="gray" pill onClick={() => filterCallback()}>
                                <TbFilter />
                            </Button>
                            }
                            <Button onClick={() => searchCallBack()}>
                                Tìm kiếm
                            </Button>
                        </div>
                    }

                </div>
                <div className="flex gap-2">
                    {addCallback &&
                        <Button size="sm" gradientMonochrome="success" onClick={() => {
                            addCallback();
                        }}>
                            <HiOutlinePlus className={addTitle ? "mr-2" : ""}/> {addTitle}
                        </Button>
                    }

                    {removeCallback &&
                        <Button size="sm" gradientMonochrome="failure" onClick={() => {
                            removeCallback();
                        }}>
                            <BsFillTrash3Fill className={removeTitle ? "mr-2": ""}/> {removeTitle}
                        </Button>
                    }
                </div>
            </div>
        </>
    )
}

export default ManagerHeader;