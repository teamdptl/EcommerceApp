import {Button, Sidebar, Tooltip} from "flowbite-react";
import {
	HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight, HiOutlineDocumentReport, HiShoppingBag,
} from "react-icons/hi";
import {BsBoxSeam} from "react-icons/bs";
import {BiCategory} from "react-icons/bi";
import {FaRegUser} from "react-icons/fa";
import {IoCartOutline} from "react-icons/io5";
import {TbReportMoney} from "react-icons/tb";
import {RiFileUserLine} from "react-icons/ri";

export const SidebarAdmin = ({isCollapse, setCollapse, setPage}) => {
	const toggleCollapse = () => {
		setCollapse(!isCollapse);
	}
	return (
		<>
			<Sidebar theme={theme} className="top-[62px] left-0 fixed z-50 bg-white" collapsed={isCollapse}>
				<div className={"pt-2 h-12"}>
					<img  className={`w-2/3 mx-auto ${isCollapse ? 'invisible' : ''}`} src="/smarthome-logo.webp" alt="Hình shop"/>
				</div>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item className="select-none cursor-pointer" icon={BsBoxSeam} onClick={() => setPage('product')}>
							Quản lý sản phẩm
						</Sidebar.Item>
						<Sidebar.Item className="select-none cursor-pointer" icon={FaRegUser } onClick={() => setPage('user')}>
							Quản lý người dùng
						</Sidebar.Item>
						<Sidebar.Item className="select-none cursor-pointer" icon={BiCategory} onClick={() => setPage('cateandbrand')}>
							Quản lý hãng/thể loại
						</Sidebar.Item>
						<Sidebar.Item className="select-none cursor-pointer" icon={IoCartOutline } onClick={() => setPage('order')}>
							Thông tin hóa đơn
						</Sidebar.Item>
					</Sidebar.ItemGroup>
					<Sidebar.ItemGroup>
						<Sidebar.Item className="select-none cursor-pointer" icon={HiOutlineDocumentReport} onClick={() => setPage('statistictop')}>
							Thống kê top
						</Sidebar.Item>
						<Sidebar.Item className="select-none cursor-pointer" icon={TbReportMoney }  onClick={() => setPage('statisticmoney')}>
							Thống kê doanh thu
						</Sidebar.Item>
					</Sidebar.ItemGroup>
					<Sidebar.ItemGroup>
						<div className="pt-8 flex justify-center">
							<Button color="light" onClick={toggleCollapse}>
								{!isCollapse && <HiOutlineChevronDoubleLeft />}
								{isCollapse && <HiOutlineChevronDoubleRight />}
							</Button>
						</div>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</>
	);
};

const theme = {
	"root": {
		"base": "h-full",
		"collapsed": {
			"on": "w-16",
			"off": "w-64"
		},
		"inner": "h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3 border-2 border-zinc-100 dark:bg-gray-800"
	},
}