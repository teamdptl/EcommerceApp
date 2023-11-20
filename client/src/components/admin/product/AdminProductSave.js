import {Button, FileInput, Label, TextInput} from "flowbite-react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, {useEffect, useState} from "react";
import UploadedImageItem from "./UploadedImageItem";
import {BsTrash3} from "react-icons/bs";

const AdminProductSave = ({data, type, closeForm}) => {
    const [uploadImages, setUploadImages] = useState([]);
    const [selectIndex, setSelectIndex] = useState(0);
    const [product, setProduct] = useState({});

    useEffect(() => {
        if (data){
            setProduct(data);
        }
        else {
            setProduct({});
        }
    }, [data]);

    useEffect(() => {
        console.log(product);
    }, [product]);

    return <>
        <div className="col-span-6 bg-white p-6 rounded-md border-2 border-zinc-100">
            <div class="flex justify-between">
                <p className="text-xl font-semibold mb-2">Thêm sản phẩm</p>
                <Button color="light" size="sm" onClick={closeForm}>Đóng </Button>
            </div>

            <div class=" grid grid-cols-6 gap-4">
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label htmlFor="productName" value="Tên sản phẩm" />
                    </div>
                    <TextInput id="productName" type="text" onChange={(value) => setProduct({...product, name: value})}/>
                </div>
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label htmlFor="productPriceOld" value="Thể loại" />
                    </div>
                    <TextInput id="productPriceOld" type="text" onChange={(categoryId) => setProduct({...product, categoryId: categoryId})}/>
                </div>
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label htmlFor="productPriceOld" value="Hãng" />
                    </div>
                    <TextInput id="productPriceOld" type="text"/>
                </div>
                <div className="col-span-1">
                    <div className="mb-2 block">
                        <Label htmlFor="productPriceOld" value="Giá niêm yết" />
                    </div>
                    <TextInput id="productPriceOld" type="number" min="0"/>
                </div>
                <div className="col-span-1">
                    <div className="mb-2 block">
                        <Label htmlFor="productPrice" value="Giá bán" />
                    </div>
                    <TextInput id="productPrice" type="number" min="0"/>
                </div>
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label htmlFor="productOrigin" value="Xuất xứ" />
                    </div>
                    <TextInput id="productOrigin" type="text" />
                </div>
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label htmlFor="productWarranty" value="Tháng bảo hành" />
                    </div>
                    <TextInput id="productWarranty" type="number" min={0} />
                </div>
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label htmlFor="productImage" value="Hình ảnh sản phẩm" />
                    </div>
                    <FileInput id="file" helperText="Chọn hình ảnh cho sản phẩm" accept="image/*" multiple="multiple"
                               onChange={(even)=>{
                                    const listSrc = [];
                                    for (let i =0; i < even.target.files.length; i++)
                                        listSrc.push({
                                            src: URL.createObjectURL(even.target.files[i]),
                                            file: even.target.files[i]
                                        })
                                    setUploadImages([...uploadImages, ...listSrc])
                                    even.target.value = "";
                    }} />
                </div>
                <div className="col-span-4">
                    <div className="mb-2 block">
                        <Label htmlFor="productSelectedImage" value="Hình ảnh đã chọn" />
                    </div>
                    <div class="flex flex-nowrap gap-3 max-w-full overflow-y-auto p-2">
                        {uploadImages.map((img, index) => (
                            <UploadedImageItem key={img.src} img={img} isSelect={index === selectIndex}
                                               removeCurrent={() => {
                                                   if (selectIndex === index){
                                                       setSelectIndex(0);
                                                   }
                                                   setUploadImages(uploadImages.filter(file => file.src !== img.src));
                                               }}
                                               selectCurrent={() => setSelectIndex(index)}/>
                        ))}
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="mb-2 block">
                        <Label htmlFor="productThongSo" value="Thông số kỹ thuật" />
                    </div>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-1">
                            <div className="mb-2 block">
                                <Label htmlFor="productTenTinhNang" value="Tên thông số" />
                            </div>
                            <TextInput id="productTenTinhNang" type="text" />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2 block">
                                <Label htmlFor="productMoTaTinhNang" value="Mô tả thông số" />
                            </div>
                            <div className="flex gap-2">
                                <TextInput className="flex-1" id="productMoTaTinhNang" type="text" />
                                <Button color="success">Thêm</Button>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="mb-2 block">
                                <Label htmlFor="productMoTaTinhNang" value="Danh sách đã thêm" />
                            </div>
                            <div>
                                <div className="mb-2 flex justify-between rounded border border-zinc-200 gap-2 p-2 items-center">
                                    <p>Làm lạnh nhanh, có làm lanh nahdhahdah jdasdasjd jdskadkasd dsajdja dad asdasd dasd</p>
                                    <Button className="flex-shrink-0" size="sm" color="failure"><BsTrash3 /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="mb-2 block">
                        <Label htmlFor="productDescription" value="Mô tả sản phẩm" />
                    </div>
                    <Editor wrapperClassName="min-h-[300px]"/>
                </div>
            </div>
            <div class="flex justify-end gap-4 mt-6">
                <Button color="success">Lưu thông tin</Button>
                <Button color="gray">Hủy bỏ</Button>
            </div>
        </div>
    </>
}


// @NotEmpty
// private MultipartFile[] files;
// @NotEmpty
// private String name;
// @NotEmpty
// private String description;
// @NotEmpty
// private String thongSoKiThuat;
// @Min(0)
// private long price;
// @Min(0)
// private long oldPrice;
// @Min(0)
// private int warrantyMonths;
// @Min(0)
// private int quantity;
// @NotEmpty
// private String origin;
// @NotEmpty
// private String attributes;
// @Min(1)
// private int branchId;
// @Min(1)
// private int categoryId;
// private int primaryImageIndex = 0;
export default AdminProductSave;