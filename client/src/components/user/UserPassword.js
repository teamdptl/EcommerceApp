import {Button, Label, TextInput} from "flowbite-react";
import createFetch from "../../utils/createFetch";
import baseUrl from "../../config";
import {useState} from "react";

const UserPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const changePassword = () => {
        if (newPassword !== newPasswordConfirm){
            alert("Mật khẩu xác nhận không giống nhau")
            return;
        }
        if (newPassword.trim().length < 6){
            alert("Mật khẩu phải nhiều hơn 6 kí tự")
            return;
        }

        createFetch(baseUrl + '/api/v1/users/new-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        }).then(res => res.json()).then(data => {
            alert(data.message);
            setNewPassword('');
            setOldPassword('');
            setNewPasswordConfirm('');
        })
    }

    return <>
        <p className="text-xl font-semibold my-3">Thay đổi mật khẩu mới</p>
        <div className={"max-w-md mx-auto"}>
            <div className={"mb-4"}>
                <div className="mb-2 block">
                    <Label htmlFor="oldpass" value="Mật khẩu cũ"/>
                </div>
                <TextInput id="oldpass" type="password" sizing="md" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
            </div>
            <div className={"mb-4"}>
                <div className="mb-2 block">
                    <Label htmlFor="newpass1" value="Mật khẩu mới" />
                </div>
                <TextInput id="newpass1" type="password" sizing="md" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
            <div className={"mb-4"}>
                <div className="mb-2 block">
                    <Label htmlFor="newpass2" value="Nhập lại mật khẩu mới" />
                </div>
                <TextInput id="newpass2" type="password" sizing="md" value={newPasswordConfirm} onChange={e => setNewPasswordConfirm(e.target.value)} />
            </div>
            <div className={"flex justify-center"}>
                <Button onClick={() => changePassword()}>Lưu mật khẩu mới</Button>
            </div>
        </div>
    </>
}

export default UserPassword;