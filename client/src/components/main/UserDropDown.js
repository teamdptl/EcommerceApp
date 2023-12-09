import {Dropdown} from "flowbite-react";
import {FaRegUser} from "react-icons/fa";
import {HiLogout, HiOutlineDocumentReport} from "react-icons/hi";
import {MdOutlineInfo} from "react-icons/md";
import {PiTruckDuotone} from "react-icons/pi";
import {IoIosHeartEmpty} from "react-icons/io";
import {IoCartOutline, IoKeyOutline} from "react-icons/io5";
import {BsBoxSeam} from "react-icons/bs";
import {BiCategory} from "react-icons/bi";
import {TbReportMoney} from "react-icons/tb";
import {Link} from "react-router-dom";

const UserDropDown = ({user, logout}) => {
    console.log(user);
    return <>
        {user?.role?.toLowerCase() === 'admin' &&
            <Dropdown
                dismissOnClick={true}
                renderTrigger={() => (
                    <button className={"rounded-full relative p-2 hover:bg-gray-100 focus:outline-none"}>
                        <FaRegUser size={20}/>
                    </button>
                )} label={"User"}>
                <Dropdown.Header>
                    <span className="block text-sm">{user.fullname}</span>
                    <span className="block truncate text-sm font-medium">{user.username}</span>
                </Dropdown.Header>
                <Dropdown.Item icon={BsBoxSeam}>Quản lý sản phẩm</Dropdown.Item>
                <Dropdown.Item icon={FaRegUser}>Quản lý người dùng</Dropdown.Item>
                <Dropdown.Item icon={BiCategory}>Quản lý hãng, thể loại</Dropdown.Item>
                <Dropdown.Item icon={IoCartOutline}>Quản lý đơn hàng</Dropdown.Item>
                <Dropdown.Item icon={HiOutlineDocumentReport}>Thống kê top</Dropdown.Item>
                <Dropdown.Item icon={TbReportMoney}>Thống kê doanh thu</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item icon={HiLogout} onClick={logout}>Đăng xuất</Dropdown.Item>
            </Dropdown>
        }
        { user?.role?.toLowerCase() === 'user' &&
            <Dropdown
                dismissOnClick={true}
                renderTrigger={() => (
                    <button className={"rounded-full relative p-2 hover:bg-gray-100 focus:outline-none"}>
                        <FaRegUser size={20}/>
                    </button>
                )} label={"User"}>
                <Dropdown.Header>
                    <span className="block text-sm">{user.fullname}</span>
                    <span className="block truncate text-sm font-medium">{user.username}</span>
                </Dropdown.Header>
                <Link to={"/user"}>
                    <Dropdown.Item icon={MdOutlineInfo}>Thông tin cá nhân</Dropdown.Item>
                </Link>
                <Link to={"/user?tab=order"}>
                    <Dropdown.Item icon={PiTruckDuotone }>Đơn hàng</Dropdown.Item>
                </Link>
                <Link to={"/user?tab=favorite"}>
                    <Dropdown.Item icon={IoIosHeartEmpty }>Yêu thích</Dropdown.Item>
                </Link>
                <Link to={"/user?tab=change-password"}>
                    <Dropdown.Item icon={IoKeyOutline }>Đổi mật khẩu</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item icon={HiLogout} onClick={logout}>Đăng xuất</Dropdown.Item>
            </Dropdown>
        }
    </>
}

export default UserDropDown;