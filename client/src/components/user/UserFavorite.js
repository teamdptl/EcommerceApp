import ProductItem from "../shop/ProductItem";

const products = [
    {
        "productId": 1,
        "name": "Máy lạnh TCL Inverter 1.5 HP TAC-13CSD/XAB1I",
        "price": 5990000,
        "oldPrice": 6390000,
        "slugUrl": null,
        "warrantyMonths": 36,
        "quantity": 99,
        "brandName": "TCL",
        "categoryName": "Máy lạnh",
        "imageUrl": "https://cdn.tgdd.vn/Products/Images/2002/307168/tcl-inverter-15-hp-tac-13csd-xab1i-550x160.jpg",
        "orderCount": 1,
        "rating": 0,
        "reviewCount": 0
    },
    {
        "productId": 2,
        "name": "Máy lạnh Samsung Inverter 2 HP AR18CYHAAWKNSV",
        "price": 12590000,
        "oldPrice": 16690000,
        "slugUrl": null,
        "warrantyMonths": 12,
        "quantity": 999,
        "brandName": "Samsung",
        "categoryName": "Máy lạnh",
        "imageUrl": "https://www.aaronfaber.com/wp-content/uploads/2017/03/product-placeholder-wp.jpg",
        "orderCount": 1,
        "rating": 0,
        "reviewCount": 0
    },
    {
        "productId": 3,
        "name": "Máy lạnh Daikin Inverter 1.5 HP FTKB35XVMV",
        "price": 10490000,
        "oldPrice": 14000000,
        "slugUrl": null,
        "warrantyMonths": 12,
        "quantity": 999,
        "brandName": "Daikin",
        "categoryName": "Máy lạnh",
        "imageUrl": "https://dienmaygiakhang.vn/wp-content/uploads/2022/03/FTKB50WAVMV_0006_Layer-1.jpg",
        "orderCount": 1,
        "rating": 0,
        "reviewCount": 0
    },
    {
        "productId": 4,
        "name": "Máy lạnh Casper 2.0 HP SC-18FS32",
        "price": 9090000,
        "oldPrice": 11990000,
        "slugUrl": null,
        "warrantyMonths": 36,
        "quantity": 999,
        "brandName": "Casper",
        "categoryName": "Máy lạnh",
        "imageUrl": "https://dienmaygiakhang.vn/wp-content/uploads/2021/03/SC-09FS323.jpg",
        "orderCount": 1,
        "rating": 0,
        "reviewCount": 0
    },
    {
        "productId": 5,
        "name": "Máy lạnh Toshiba Inverter 2.5 HP RAS-H24E2KCVG-V",
        "price": 20690000,
        "oldPrice": 28990000,
        "slugUrl": null,
        "warrantyMonths": 24,
        "quantity": 999,
        "brandName": "Toshiba",
        "categoryName": "Máy lạnh",
        "imageUrl": "https://dienmaygiakhang.vn/wp-content/uploads/2021/03/RAS-H18E2KCVG-V2.jpg",
        "orderCount": 1,
        "rating": 0,
        "reviewCount": 0
    },
    {
        "productId": 6,
        "name": "Tủ lạnh Samsung Inverter 588 lít RF48A4000B4/SV",
        "price": 13890000,
        "oldPrice": 20500000,
        "slugUrl": null,
        "warrantyMonths": 24,
        "quantity": 1000,
        "brandName": "Samsung",
        "categoryName": "Tủ lạnh",
        "imageUrl": "https://cdn.tgdd.vn/Products/Images/1943/236999/Slider/0-1020x570.jpg",
        "orderCount": 0,
        "rating": 0,
        "reviewCount": 0
    },
    {
        "productId": 7,
        "name": "Tủ lạnh LG Inverter 315 lít GN-D315BL",
        "price": 7990000,
        "oldPrice": 11400000,
        "slugUrl": null,
        "warrantyMonths": 24,
        "quantity": 1000,
        "brandName": "LG",
        "categoryName": "Tủ lạnh",
        "imageUrl": "https://dienmaygiakhang.vn/wp-content/uploads/2019/12/GN-D315BL-6.jpg",
        "orderCount": 0,
        "rating": 0,
        "reviewCount": 0
    },
    {
        "productId": 8,
        "name": "Tủ lạnh Panasonic 417 lít NR-BX471GPKV",
        "price": 17990000,
        "oldPrice": 23790000,
        "slugUrl": null,
        "warrantyMonths": 24,
        "quantity": 1000,
        "brandName": "Panasonic",
        "categoryName": "Tủ lạnh",
        "imageUrl": "https://dienmaygiakhang.vn/wp-content/uploads/2021/03/NR-BX471GPKV-layer-1.jpg",
        "orderCount": 0,
        "rating": 0,
        "reviewCount": 0
    },
    {
        "productId": 9,
        "name": "Tủ lạnh Hitachi 290 lít R-H350PGV7(BBK)",
        "price": 7990000,
        "oldPrice": 9959000,
        "slugUrl": null,
        "warrantyMonths": 24,
        "quantity": 1000,
        "brandName": "Hitachi",
        "categoryName": "Tủ lạnh",
        "imageUrl": "https://dienmaygiakhang.vn/wp-content/uploads/2023/08/R-H350PGV7BBK-1.jpg",
        "orderCount": 0,
        "rating": 0,
        "reviewCount": 0
    },
    {
        "productId": 10,
        "name": "Tủ lạnh Electrolux 335 lít EBB3742K-A",
        "price": 10290000,
        "oldPrice": 13990000,
        "slugUrl": null,
        "warrantyMonths": 24,
        "quantity": 1000,
        "brandName": "Electrolux",
        "categoryName": "Tủ lạnh",
        "imageUrl": "https://dienmaygiakhang.vn/wp-content/uploads/2021/03/K-A_0005_Layer-21.jpg",
        "orderCount": 0,
        "rating": 0,
        "reviewCount": 0
    }
]
const UserFavorite = () => {
    return <>
        <p className="text-xl font-semibold my-3 mb-6">Các sản phẩm đã thích</p>
        <div className={"grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-3"}>
            {products.map(product => (
                <ProductItem key={product.productId} product={product} isEnable={false}/>
            ))}
        </div>
    </>
}

export default UserFavorite;