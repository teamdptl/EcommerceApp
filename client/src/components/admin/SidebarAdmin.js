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
import {Link} from "react-router-dom";
import {useAdminCollapse} from "../../context/AdminCollapseContext";

export const SidebarAdmin = () => {
	const { isCollapse, setCollapse } = useAdminCollapse();
	const toggleCollapse = () => {
		setCollapse(!isCollapse);
	}
	return (
		<>
			<Sidebar theme={theme} className="top-[66px] left-0 fixed z-50 bg-white" collapsed={isCollapse}>
				<div className={`pt-2 h-12 ${isCollapse? 'invisible' : ''}`}>
					<p className={"font-semibold text-center text-lg"}>Trang quản trị</p>
				</div>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Link to="/admin/product">
							<Sidebar.Item className="select-none cursor-pointer" icon={BsBoxSeam}>
								Quản lý sản phẩm
							</Sidebar.Item>
						</Link>
						<Link to="/admin/user">
							<Sidebar.Item className="select-none cursor-pointer" icon={FaRegUser }>
								Quản lý người dùng
							</Sidebar.Item>
						</Link>
						<Link to="/admin/catebrand">
							<Sidebar.Item className="select-none cursor-pointer" icon={BiCategory}>
								Quản lý hãng/thể loại
							</Sidebar.Item>
						</Link>
						<Link to="/admin/order">
							<Sidebar.Item className="select-none cursor-pointer" icon={IoCartOutline }>
								Thông tin hóa đơn
							</Sidebar.Item>
						</Link>
					</Sidebar.ItemGroup>
					<Sidebar.ItemGroup>
						<Link to="/admin/top">
							<Sidebar.Item className="select-none cursor-pointer" icon={HiOutlineDocumentReport}>
								Thống kê top
							</Sidebar.Item>
						</Link>
						<Link to="/admin/money">
							<Sidebar.Item className="select-none cursor-pointer" icon={TbReportMoney } >
								Thống kê doanh thu
							</Sidebar.Item>
						</Link>
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