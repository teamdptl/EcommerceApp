import Page from "../layouts/Page";
import {useEffect, useState} from "react";
import ScreenInfo from "../components/ScreenInfo";

const Payment = () => {
    const currentDate = new Date().getTime();
    const endTime = currentDate + 10*60*1000;
    const [timeRange, setTimeRange] = useState(endTime - currentDate);
    const [client, setClient] = useState(null);

    const msToHMS = ( ms ) =>  {
        // 1- Convert to seconds:
        let seconds = ms / 1000;
        // 2- Extract hours:
        const hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        const minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = seconds % 60;
        if (hours > 0)
            return ( hours+":"+minutes+":"+seconds);
        return minutes+":"+seconds;
    }

    useEffect(() => {
        const handle = setInterval(() => {
            setTimeRange(time => time - 1000);
        }, 1000);

        
        return () => {
            clearInterval(handle);
        }
    }, []);

    useEffect(() => {
        if (timeRange <= 0){
            alert("Hết thời gian thanh toán");
        }
    }, [])

    return <Page>
        <div className="mt-8 max-w-screen-xl mx-auto">
            <p className={"text-2xl font-bold text-center"}>Thanh toán đơn hàng</p>
            <p className={"text-center mt-3"}>Vui lòng thanh toán đơn hàng trong</p>
            <p className={"mt-3 text-red-600 text-center font-semibold"}>{msToHMS(timeRange)}</p>
            <hr className="mt-8 mb-3" />
            <div className={"flex justify-center"}>
                <img src={"https://img.vietqr.io/image/TIMO-9017041010715-print.png?amount=100&addInfo=duy1&accountName=Huynh%20Khanh%20Duy"}/>
            </div>
            <ScreenInfo isShow={false} message={"Thanh toán thành công"} error={0} closeModal={() => console.log('ok')}/>
        </div>
    </Page>
}

export default Payment;