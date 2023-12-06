import {Button, FileInput, Label, Select, TextInput} from "flowbite-react";
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, {useEffect, useState} from "react";
import UploadedImageItem from "./UploadedImageItem";
import {BsTrash3} from "react-icons/bs";
import baseUrl from "../../../config";
import ScreenLoading from "../../ScreenLoading";
import ScreenInfo from "../../ScreenInfo";
import {useNavigate} from "react-router-dom";

const AdminProductSave = ({show, productId, isEdit, closeForm}) => {
    const [uploadImages, setUploadImages] = useState([]);
    const [selectIndex, setSelectIndex] = useState(0);
    const [product, setProduct] = useState({});
    const [tenThongSo, setTenThongSo] = useState('');
    const [giaTriThongSo, setGiaTriThongSo] = useState('');

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [editorState, setEditorState] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [infoBox, setInfoBox] = useState({show: false, msg: '', icon: 'fail', error: 0});

    let removeImageIds = [];
    let isPrimaryInUpload = false;

    useEffect(() => {
        if (!show) return;
        fetch(baseUrl + '/api/v1/category/get').then(res => res.json())
            .then(json => {
                setCategories(json);
            })
            .catch((e) => {
                console.log(e);
            })

        fetch(baseUrl + '/api/v1/brand/get').then(res => res.json())
            .then(json => {
                setBrands(json);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [show]);

    useEffect(() => {
        if (productId && isEdit){
            // Loading product data from db
            fetch(baseUrl + `/api/v1/product/get/${productId}`).then(res => res.json())
                .then(json => {
                    setProduct({
                        ...json,
                        attributes: JSON.parse(json.attributes) ?? []
                    });
                    const index = json.medias.findIndex(item => item.isPrimary) ?? 0;
                    setSelectIndex(index);
                })
                .catch((e) => {
                    console.log(e);
                })
        }
        else {
            setProduct({
                name: '',
                categoryId: 1,
                brandId: 1,
                price: 0,
                oldPrice: 0,
                origin: 'Trung Quốc',
                warrantyMonths: 12,
                quantity: 100,
                medias: []
            });
            setUploadImages([]);
            setSelectIndex(0);

        }
    }, [isEdit, productId]);


    const saveProduct = () => {
        // setIsLoading(true);
        const formData = new FormData();
        for (const [key, value] of Object.entries(product)) {
            if (key === "attributes")
                formData.append(key, JSON.stringify(product.attributes))
            else
                formData.append(key, value);
        }

        uploadImages.forEach((item) => {
            formData.append("files", item.file)
        })

        formData.append("primaryImageIndex", selectIndex)

        const rawContentState = editorState ? convertToRaw(editorState.getCurrentContent()) : null;
        const markup = rawContentState ? draftToHtml(rawContentState) : "";
        formData.append("description", markup)
        formData.append('thongSoKiThuat', 'Không có gì ca');

        fetch(baseUrl + '/api/v1/product/add', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.error === 1)
                    setInfoBox({...infoBox, show: true, msg: json.message, error: json.error })
                else {
                    setInfoBox({...infoBox, show: true, msg: json.message, error: json.error })
                }
            })
            .catch(e => console.log(e))
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        console.log(product);
    }, [product]);

    useEffect(() => {
        console.log(selectIndex);
    }, [selectIndex]);

    return <>
        <div id="productSave" className={`col-span-6 bg-white p-6 rounded-md border-2 border-zinc-100 ${show? '' : 'hidden'}`}>
            <div class="flex justify-between">
                <p className="text-xl font-semibold mb-2">Thêm sản phẩm</p>
                <Button color="light" size="sm" onClick={closeForm}>Đóng </Button>
            </div>

            <div class=" grid grid-cols-6 gap-4">
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label htmlFor="productName" value="Tên sản phẩm" />
                    </div>
                    <TextInput id="productName" type="text" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})}/>
                </div>
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label value="Thể loại" />
                    </div>
                    <Select value={product.categoryId}
                        onChange={(e) => setProduct({...product, categoryId: parseInt(e.target.value)})}>
                        {categories.map(item => (
                            <option key={item.categoryId} value={item.categoryId}>{item.name}</option>
                        ))}
                    </Select>
                </div>
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label value="Hãng" />
                    </div>
                    <Select value={product.brandId}
                            onChange={(e) => setProduct({...product, brandId: parseInt(e.target.value)})}>
                        {brands.map(item => (
                            <option key={item.brandId} value={item.brandId}>{item.name}</option>
                        ))}
                    </Select>
                </div>
                <div className="col-span-1">
                    <div className="mb-2 block">
                        <Label htmlFor="productPriceOld" value="Giá niêm yết" />
                    </div>
                    <TextInput id="productPriceOld" type="number" min="0" value={product.price}
                        onChange={(e) => setProduct({...product, price: parseInt(e.target.value)})}
                    />
                </div>
                <div className="col-span-1">
                    <div className="mb-2 block">
                        <Label htmlFor="productPrice" value="Giá bán" />
                    </div>
                    <TextInput id="productPrice" type="number" min="0" value={product.oldPrice}
                        onChange={(e) => setProduct({...product, oldPrice: parseInt(e.target.value)})}
                    />
                </div>
                <div className="col-span-2">
                    <div className="mb-2 block">
                        <Label htmlFor="productOrigin" value="Xuất xứ" />
                    </div>
                    <Select value={product.origin}
                            onChange={(e) => setProduct({...product, origin: e.target.value})}>
                        <option value="Trung Quốc">Trung Quốc</option>
                        <option value="Việt Nam">Việt Nam</option>
                        <option value="Thái Lan">Thái Lan</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Nhật Bản">Nhật Bản</option>
                    </Select>
                </div>
                <div className="col-span-1">
                    <div className="mb-2 block">
                        <Label htmlFor="productQuantity" value="Số lượng" />
                    </div>
                    <TextInput id="productQuantity" type="number" min={0} value={product.quantity}
                        onChange={(e) => setProduct({...product, quantity: parseInt(e.target.value)})}
                    />
                </div>
                <div className="col-span-1">
                    <div className="mb-2 block">
                        <Label htmlFor="productWarranty" value="Tháng bảo hành" />
                    </div>
                    <TextInput id="productWarranty" type="number" min={0} value={product.warrantyMonths}
                               onChange={(e) => setProduct({...product, warrantyMonths: parseInt(e.target.value)})}
                    />
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
                            <UploadedImageItem key={img.src} img={img} src={img.src} isSelect={index === selectIndex}
                                               removeCurrent={() => {
                                                   if (selectIndex === index){
                                                       setSelectIndex(0);
                                                   }
                                                   setUploadImages(uploadImages.filter(file => file.src !== img.src));
                                               }}
                                               selectCurrent={() => setSelectIndex(index)}/>
                        ))}
                        { product && product.medias && product.medias.map((img) => (
                            <UploadedImageItem key={uploadImages.length + img.imageId} img={img} src={img.imageUrl} isSelect={(uploadImages.length + img.imageId) === selectIndex}
                                               removeCurrent={() => {
                                                   if (selectIndex === (uploadImages.length + img.imageId)){
                                                       setSelectIndex(0);
                                                   }
                                                   const newMedia = product.medias.filter(file => (file.imageId !== img.imageId))
                                                   setProduct({...product, medias: newMedia});
                                                   removeImageIds.push(img.imageId);
                                               }}
                                               selectCurrent={() => setSelectIndex((uploadImages.length + img.imageId))}/>
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
                            <TextInput id="productTenTinhNang" type="text" value={ tenThongSo }
                                onChange={(e) => setTenThongSo(e.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2 block">
                                <Label htmlFor="productMoTaTinhNang" value="Mô tả thông số" />
                            </div>
                            <div className="flex gap-2">
                                <TextInput className="flex-1" id="productMoTaTinhNang" type="text" value={giaTriThongSo}
                                           onChange={(e) => setGiaTriThongSo(e.target.value)}/>
                                <Button color="success" onClick={() => {
                                    const attribute = {key: tenThongSo, value: giaTriThongSo };
                                        // product.attributes ? [...product.attributes, ] : [{key: tenThongSo, value: giaTriThongSo }]
                                    const duplicateIndex = product.attributes?.findIndex(item => item.key === tenThongSo);
                                    if (duplicateIndex !== null && duplicateIndex > -1 ) {
                                        const attributes = [...product.attributes]
                                        attributes[duplicateIndex] = attribute;
                                        setProduct({...product, attributes: attributes})
                                    }
                                    else {
                                        const attributes = product.attributes ? [...product.attributes, attribute ] : [attribute]
                                        setProduct({...product, attributes: attributes})
                                    }
                                }}>Thêm</Button>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="mb-2 block">
                                <Label htmlFor="productMoTaTinhNang" value="Tính năng đã thêm" />
                            </div>
                            <div>
                                {product.attributes?.map(item => (
                                    <div key={item.key} className="mb-2 flex justify-between rounded border border-zinc-200 gap-2 p-2 items-center">
                                        <p>{item.key}: {item.value}</p>
                                        <Button className="flex-shrink-0" size="sm" color="failure"
                                            onClick={() => {
                                                const attr = product.attributes?.filter(obj => obj.key !== item.key)
                                                setProduct({...product, attributes: attr})
                                            }}><BsTrash3 /></Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="mb-2 block">
                        <Label htmlFor="productDescription" value="Mô tả sản phẩm" />
                    </div>
                    <Editor wrapperClassName="min-h-[300px]" onEditorStateChange={(state) => setEditorState(state)}/>
                </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
                <Button color="success" onClick={saveProduct}>Lưu thông tin</Button>
                <Button color="gray" onClick={closeForm}>Hủy bỏ</Button>
            </div>
        </div>
        <ScreenInfo isShow={infoBox.show} message={infoBox.msg} error={infoBox.error} closeModal={()=> setInfoBox({...infoBox, show: false})}/>
        <ScreenLoading isShow={isLoading}></ScreenLoading>
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