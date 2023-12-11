import { Carousel } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { StaticImage } from "gatsby-plugin-image";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';



const ProductCarousel = () => {
  return (
    <div class="flex justify-center w-full">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{deplay:1000}}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="image relative">
            <img src="https://d1pjg4o0tbonat.cloudfront.net/content/dam/toshiba-aem/vn/tu-lanh/kv.jpg/jcr:content/renditions/cq5dam.web.5000.5000.jpeg" />
            <div className="space-y-5 title-content absolute top-[25%] left-[8rem]">
                  <h3 className="text-[50px] font-[700]">CÔNG NGHỆ <span className="text-blue-700">ORIGINFRESH™</span></h3>
                  <p><span className="text-blue-700 " >ORIGINFRESH™</span> là sự kết hợp hoàn hảo của công nghệ <br></br>
                    giúp bạn giữ nguyên hương vị, tươi ngon lâu hơn.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="image relative">
            <img src="https://d1pjg4o0tbonat.cloudfront.net/content/dam/toshiba-aem/vn/banner-san-pham/dieu-hoa-khong-khi/120423/banner-may-dieu-hoa-khong-khi-2023-1204.jpg/jcr:content/renditions/cq5dam.web.5000.5000.jpeg" />
            <div className="space-y-5 title-content absolute top-[25%] left-[8rem]">
                  <h3 className="text-[40px] font-[700] text-blue-700">DETOX KHÔNG KHÍ</h3>
                  <h3 className="text-[30px] font-[500] ">MANG THIÊN NHIÊN VÀO NHÀ</h3>
                  <p>Máy lạnh cao cấp Toshiba Daiseikai với bộ đôi<br></br>
                  bảo vệ kép <span className="text-blue-700" >Magic Coil</span> chống bám bẩn và công<br></br>nghệ <span className="text-blue-700" >Ultra Pure</span> diệt khuẩn, khử mùi, giúp không <br></br> gian sống luôn trong lành, tinh khiết.
                  </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="image relative">
            <img src="https://d1pjg4o0tbonat.cloudfront.net/content/dam/toshiba-aem/vn/may-giat/may-giat-say/banner/banner-may-giat-say-210323.jpg/jcr:content/renditions/cq5dam.web.5000.5000.jpeg" />
            <div className="space-y-5 title-content absolute top-[25%] left-[8rem]">
                  <h3 className="text-[40px] font-[700]">CÔNG NGHỆ</h3>
                  <h3 className="text-[40px] font-[700] text-blue-700">SENSEDOSE</h3>
                  <p><span className="text-blue-700" >SenseDose</span> sẽ tự động cấp nước giặt, xả<br></br>
                  thông minh dựa vào khối lượng quần áo mang<br></br>lại hiệu quả giặt sạch vượt trội. Việc giặt giũ <br></br> giờ đây trở nên đơn giản, thuận tiện hơn bao giờ hết.


                  </p>
            </div>
          </div>
        </SwiperSlide>
        ...
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
