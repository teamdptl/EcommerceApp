import {RiSubtractFill} from "react-icons/ri";
import {IoAddSharp} from "react-icons/io5";

const NumberInput = ({value, onChange}) => {
    return <>
        <div className={"flex gap-3 items-center select-none"}>
            <div className={`cursor-pointer rounded-full border w-6 h-6 flex justify-center items-center ${value <= 1 ? 'border-zinc-200': 'border-zinc-400'}`}
                onClick={() => {
                    const val = value > 1 ? value - 1 : value;
                    onChange(val);
                }}>
                <RiSubtractFill size={15} className={`${value <= 1 ? 'text-zinc-300' : 'text-zinc-500'}`}/>
            </div>
            <p className="text-gray-500 text-lg">{value}</p>
            <div className="cursor-pointer rounded-full border w-6 h-6 flex justify-center items-center border-zinc-400"
                onClick={() => {
                    onChange(value + 1);
                }}>
                <IoAddSharp size={13}/>
            </div>
        </div>
    </>
}

export default NumberInput;