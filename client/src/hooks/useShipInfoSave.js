import {useState} from "react";
import baseUrl from "../config";

const useShipInfoSave = () => {
    const [saveId, setSaveId] = useState(null);

    const callback = (data) => {
        fetch(baseUrl+'/api/v1/user/shipInfo/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(json => {
                setSaveId(json.shipId)
            }).catch(e => console.log(e))
    }

    return {saveId, callback}
}

export default useShipInfoSave;
