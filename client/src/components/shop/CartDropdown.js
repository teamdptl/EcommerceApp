import { Dropdown } from "flowbite-react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartItem from "./CartItem";
export default function CustomTriggerDropdown() {
	return (
		<Dropdown
			dismissOnClick={false}
			renderTrigger={() => (
				<button class="rounded-full p-2 border hover:bg-gray-100 focus:outline-none" data-dropdown-toggle="cart-dropdown">
					<AiOutlineShoppingCart size={20} />
				</button>
			)}>
			<CartItem></CartItem>
		</Dropdown>
	);
}
