import Page from "../layouts/Page";
import {useEffect, useState} from "react";
import ScreenInfo from "../components/ScreenInfo";
import { Client, Message } from '@stomp/stompjs';
import createFetch from "../utils/createFetch";
import baseUrl from "../config";
import {useNavigate, useParams} from "react-router-dom";

const Payment = () => {
    const [timeRange, setTimeRange] = useState(0);
    const [client, setClient] = useState(null);
    const { code} = useParams();

    const navigate = useNavigate();
    const [msg, setMsg] = useState({show: false, text: '', error: 0});
    const [paymentData, setPaymentData] = useState({});


    const msToHMS = ( ms ) =>  {
        // 1- Convert to seconds:
        let seconds = ms / 1000;
        // 2- Extract hours:
        const hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        const minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = Math.round(seconds % 60);
        if (hours > 0)
            return ( hours+":"+minutes+":"+seconds);
        return minutes+":"+seconds;
    }

    const init = () => {
        const c = new Client({
            brokerURL: 'ws://localhost:8080/paymentWs',
            reconnectDelay: 10000,
        });
        c.onConnect = (frame) => {
            console.log("Connect");
            const subscription = c.subscribe(`/queue/payment/${code}`, (message) => {
                const data = JSON.parse(message.body);
                if (data.payment)
                    setMsg({show: true, text: data.message, error: 0})
            })
            c.publish({ destination: '/app/payment', body: JSON.stringify({code: code}) });
        }
        c.onStompError = (frame) => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        }
        c.activate();
        setClient(c);
    }

    const getPaymentData = () => {
        createFetch(baseUrl + `/api/v1/order/payment/${code}`).then(res => {
            if (!res.ok){
                navigate('/', {replace: true})
            }
            return res.json();
        }).then(data => {
            setPaymentData(data);
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const handle = setInterval(() => {
            setTimeRange(time => {
                if ( time > 0)
                    return time - 1000
                return time;
            });
        }, 1000);
        getPaymentData();
        init();
        return () => {
            clearInterval(handle);
            client?.deactivate();
        }
    }, []);

    useEffect(() => {
        if (timeRange < 0){
            alert("Hết thời gian thanh toán");
            navigate("/", {replace: true})
        }
    }, [timeRange])

    useEffect(() => {
        if (paymentData.expiredAt){
            setTimeRange(new Date(paymentData.expiredAt) - new Date());
        }
        else {
            setTimeRange(0);
        }
    }, [paymentData]);

    return <Page>
        <div className="mt-8 max-w-screen-xl mx-auto">
            <p className={"text-2xl font-bold text-center"}>Thanh toán đơn hàng</p>
            <p className={"text-center mt-3"}>Vui lòng thanh toán đơn hàng trong</p>
            <p className={"mt-3 text-red-600 text-center font-semibold"}>{msToHMS(timeRange)}</p>
            <hr className="mt-8 mb-3" />
            {
                paymentData.paymentQr &&
                <div className={"flex justify-center"}>
                    <img src={paymentData.paymentQr} alt={"Ảnh chuyển khoản"}/>
                </div>
            }

            <ScreenInfo isShow={msg.show} message={msg.text} error={msg.error} closeModal={() => {
                setMsg({...msg, show: false})
                navigate("/user?tab=order");
            }}/>
        </div>
    </Page>
}

export default Payment;