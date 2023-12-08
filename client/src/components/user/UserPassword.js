import {Button, Label, TextInput} from "flowbite-react";

const UserPassword = () => {
    return <>
        <p className="text-xl font-semibold my-3">Thay đổi mật khẩu mới</p>
        <div className={"max-w-md mx-auto"}>
            <div className={"mb-4"}>
                <div className="mb-2 block">
                    <Label htmlFor="oldpass" value="Mật khẩu cũ"/>
                </div>
                <TextInput id="oldpass" type="password" sizing="md" />
            </div>
            <div className={"mb-4"}>
                <div className="mb-2 block">
                    <Label htmlFor="newpass1" value="Mật khẩu mới" />
                </div>
                <TextInput id="newpass1" type="password" sizing="md" />
            </div>
            <div className={"mb-4"}>
                <div className="mb-2 block">
                    <Label htmlFor="newpass2" value="Nhập lại mật khẩu mới" />
                </div>
                <TextInput id="newpass2" type="password" sizing="md" />
            </div>
            <div className={"flex justify-center"}>
                <Button>Lưu mật khẩu mới</Button>
            </div>
        </div>
    </>
}

export default UserPassword;