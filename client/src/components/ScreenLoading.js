import {Modal, Spinner} from "flowbite-react";

const ScreenLoading = ({isShow}) => {
    return <>
        <Modal theme={theme} className="select-none outline-none ring-0" show={isShow} size="md" popup>
            <div className="py-4 gap-4 flex justify-center items-center flex-col">
                <Spinner/>
                <p>Đang tải dữ liệu ...</p>
            </div>
        </Modal>
    </>
}

const theme = {
    "content": {
        "base": "relative h-full w-64 p-4 md:h-auto",
        "inner": "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]"
    }
}

export default ScreenLoading;