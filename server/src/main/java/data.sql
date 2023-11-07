use ecommerce;

insert into category values
                      (1, 0, "Điều hòa nhiệt độ" , "Máy lạnh"),
                      (2, 0, "Máy giặt tự động", "Máy giặt"),
                      (3, 0, "Đông lạnh thực phẩm" ,"Tủ lạnh");


insert into brand values
                      (1, 0, "LG"),
                      (2, 0, "Toshiba"),
                      (3, 0, "Panasonic"),
                      (4, 0, "Sharp"),
                      (5, 0, "Samsung"),
                      (6, 0, "Hitachi"),
                      (7, 0, "Aqua"),
                      (8, 0, "Electrolux"),
                      (9, 0, "Daikin"),
                      (10, 0, "Casper"),
                      (11, 0, "Funiki"),
                      (12, 0, "TCL");

# 3 Sản phẩm của máy lạnh
insert into product values
                        (12, 1, 0, 1, 100, 36, 6390000, 5990000, "{}", "Máy lạnh TCL Inverter 1.5 HP TAC-13CSD/XAB1I", "Trung Quốc", null,
                        "Máy lạnh TCL Inverter 1.5 HP TAC-13CSD/XAB1I ứng dụng các công nghệ làm lạnh Turbo, giúp bạn nhanh chóng tận hưởng được sự mát mẻ trong những ngày nắng nóng. Công nghệ AI Inverter kết hợp cùng Eco cho hiệu năng sử dụng điện được tối ưu hơn, bộ lọc HD giúp trả lại bầu không khí trong lành, loại bỏ mùi hôi. Dàn lạnh vận hành êm ái đi kèm tính năng I-Feel đem lại giấc ngủ ngon và sâu hơn.",
                         "Loại máy:Máy lạnh 1 chiều (chỉ làm lạnh)Inverter:Máy lạnh InverterCông suất làm lạnh:1.5 HP - 12.000 BTUPhạm vi làm lạnh hiệu quả:Từ 15 - 20m² (từ 40 đến 60 m³)Độ ồn trung bình:31.8 - 40.6 dB/50.7 dBDòng sản phẩm:2023Sản xuất tại:Trung QuốcThời gian bảo hành cục lạnh:3 nămThời gian bảo hành cục nóng:Máy nén 5 nămChất liệu dàn tản nhiệt:Hãng không công bốLoại Gas:R-32");
insert into media values (null, 1, 1, 1, 'https://cdn.tgdd.vn/Products/Images/2002/307168/tcl-inverter-15-hp-tac-13csd-xab1i-550x160.jpg'),
                         (null, 1, 0, 1, "https://cdn.tgdd.vn/Products/Images/2002/307168/Slider/vi-vn-tong-quan-tcl-inverter-15-hp-tac-13csd-xab1i-1.jpg"),
                         (null, 1, 0, 1, "https://cdn.tgdd.vn/Products/Images/2002/307168/Slider/vi-vn-bo-loc-tcl-inverter-15-hp-tac-13csd-xab1i-2.jpg");

# 3 Sản phẩm của máy giặt


# 3 Sản phẩm của tủ lạnh









