import {Button, Modal, Spinner} from "flowbite-react";
import {MdOutlineError} from "react-icons/md";
import {HiExclamation} from "react-icons/hi";
import {HiCheck} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";

const ScreenInfo = ({isShow, message ,closeModal, onConfirmCallback, error}) => {
    const navigate = useNavigate();

    return <>
        <Modal theme={theme} className="select-none outline-none ring-0" show={isShow} size="md" popup dismissible
            onClose={closeModal}>
            <div className="py-4 gap-4 flex justify-center items-center flex-col">
                { error === 1 &&
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                        <HiExclamation className="h-5 w-5" />
                    </div>
                }
                { error === 0 &&
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                }

                <p className={"text-center"}>{message}</p>
                <Button color={"gray"} size={"sm"} onClick={() => {
                    closeModal();
                    if (error === 0)
                        navigate(0)
                }}>Ok</Button>
            </div>
        </Modal>
    </>

}

const theme = {
    "content": {
        "base": "relative h-full w-96 p-4 md:h-auto",
        "inner": "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]"
    }
}

export default ScreenInfo;