// Tham khảo: https://tailwindui.com/components/ecommerce/components/shopping-carts , keyword: tailwind cart component
// Xây dựng CartItem

const CartItem = ({ item }) => {
	return (
		<>
			<div>{ item.name }</div>
		</>
	);
};

export default CartItem;
