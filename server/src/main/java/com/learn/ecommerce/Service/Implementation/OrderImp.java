package com.learn.ecommerce.Service.Implementation;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.learn.ecommerce.DTO.TopBrandDTO;
import com.learn.ecommerce.DTO.TopProductDTO;
import com.learn.ecommerce.DTO.TopUserDTO;
import com.learn.ecommerce.Entity.*;
import com.learn.ecommerce.Repository.OrderReponsitory;
import com.learn.ecommerce.Repository.ShipInfoReponsitory;
import com.learn.ecommerce.Service.EmailService;
import com.learn.ecommerce.Service.OrderService;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.sql.Date;

import com.learn.ecommerce.Repository.OrderLineReponsitory;
import com.learn.ecommerce.Request.PlaceOrderItem;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class OrderImp implements OrderService {
    @PersistenceContext
    private EntityManager entityManager;
    private final OrderReponsitory orderReponsitory;

    private final OrderLineReponsitory orderLineReposiotry;
    private final ProductImp productImp;

    @Autowired
    private EmailService emailServiceImp;


    public OrderImp(@Autowired OrderReponsitory orderReponsitory, ShipInfoReponsitory shipInfoReponsitory, @Autowired ProductImp productImp, @Autowired OrderLineReponsitory orderLineRepository, ShipInfoImp shipInfoImp) {
        this.orderReponsitory = orderReponsitory;
        this.productImp = productImp;
        this.orderLineReposiotry = orderLineRepository;
    }

    @Transactional
    public Order placeOrder(List<PlaceOrderItem> items, Order order, String coupon) throws Exception {
        long total = 0;
        checkCondition(items);

        for (PlaceOrderItem item : items) {
            OrderLine orderLine = new OrderLine();
            Product p = productImp.findById(item.getProductId()).get();
            order = orderReponsitory.save(order);
            OrderLine.OrderLineKey orderLineKey = new OrderLine.OrderLineKey();
            orderLineKey.setOrderId(order.getOrderId());
            orderLineKey.setProductId(p.getProductId());
            orderLine.setId(orderLineKey);

            orderLine.setOrder(order);
            orderLine.setProduct(p);
            orderLine.setQuantity(item.getBuyQuantity());
            long priceOrderLine = p.getPrice() * item.getBuyQuantity();
            orderLine.setPrice(priceOrderLine);
            total += priceOrderLine;
            orderLineReposiotry.save(orderLine);
            p.setQuantity(p.getQuantity() - item.getBuyQuantity());
            productImp.save(p);
        }

        order.setTotalPrice(total);
        return orderReponsitory.save(order);
    }

    public void generatePdfContent(Order order, String currentDateTime,  Optional<User> optionalUser) throws FileNotFoundException, DocumentException {
        try {
            Document document = new Document(PageSize.A4);
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//            String currentDateTime = dateFormat.format(new java.util.Date());
            String filepath = "D:\\PDF"+currentDateTime+".pdf";

            PdfWriter.getInstance(document, new FileOutputStream(filepath));
            document.open();

            ClassPathResource resource = new ClassPathResource("times.ttf");
            BaseFont bf = BaseFont.createFont(resource.getURL().toString(), BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

            Font fontTitle = new Font(bf, 18, Font.BOLD);
            Font fontParagraph  = new Font(bf, 13, Font.NORMAL);
            Font fontHeaderParagraph = new Font(bf, 13, Font.BOLD);
            Font fontHeaderIntro = new Font(bf, 11, Font.BOLD);
            Font fontIntro = new Font(bf, 9, Font.NORMAL);

            Paragraph headerIntro = new Paragraph(
                    "SMARTHOME\n" ,fontHeaderIntro);
            headerIntro.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(headerIntro);

            Paragraph bodyIntro = new Paragraph(
                      "Địa chỉ: phường Đa Kao, quận 1, TPHCM\n"+
                            "Email: J2EEmailCompany@gmail.com"
                            ,fontIntro);
            bodyIntro.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(bodyIntro);


            Paragraph paragraph = new Paragraph("\nXác nhận đơn hàng",fontTitle );
            paragraph.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(paragraph);


            if (order.getShipInfo() != null) {
                ShipInfo shipInfo = order.getShipInfo();

                Paragraph shipInfoParagraphHeader = new Paragraph(
                        "\n1. Thông tin vận chuyển:\n" ,fontHeaderParagraph);
                shipInfoParagraphHeader.setAlignment(Paragraph.ALIGN_LEFT);
                document.add(shipInfoParagraphHeader);

                Paragraph shipInfoParagraph = new Paragraph(
                          "Họ và tên: " + "   " +shipInfo.getFullName() + "\n" +
                                "Địa chỉ: " + "  " + shipInfo.getAddress() + "\n" +
                                "Số điện thoại: " + " " +shipInfo.getPhone() + "\n" +
                                "\n" ,
                                fontParagraph
                );
                shipInfoParagraph.setAlignment(Paragraph.ALIGN_LEFT);
                document.add(shipInfoParagraph);
            }

            Paragraph shipInfoParagraphHeader2 = new Paragraph(
                    "\n2. Danh sách các sản phẩm:\n" ,fontHeaderParagraph);
            shipInfoParagraphHeader2.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(shipInfoParagraphHeader2);

                PdfPTable orderLineTable = new PdfPTable(4);
                orderLineTable.setSpacingBefore(25);
                orderLineTable.setSpacingAfter(25);
                orderLineTable.setWidthPercentage(100);

                orderLineTable.addCell(new PdfPCell(new Phrase("Tên sản phẩm", fontHeaderParagraph)));
                orderLineTable.addCell(new PdfPCell(new Phrase("Số lượng", fontHeaderParagraph)));
                orderLineTable.addCell(new PdfPCell(new Phrase("Đơn giá", fontHeaderParagraph)));
                orderLineTable.addCell(new PdfPCell(new Phrase("Thành tiền", fontHeaderParagraph)));


            String nativeQuery = "SELECT p.product_id, p.name, ol.quantity, p.price, ol.price " +
                    "FROM order_line ol " +
                    "JOIN product p ON ol.product_id = p.product_id " +
                    "JOIN Orders o ON ol.order_id = o.order_id " +
                    "WHERE o.order_id = ?1";  // Use positional parameter

            Query query = entityManager.createNativeQuery(nativeQuery)
                    .setParameter(1, order.getOrderId());

            List<Object[]> resultList = query.getResultList();


                for (Object[] result : resultList) {
                    orderLineTable.addCell(new PdfPCell(new Phrase((String) result[1], fontParagraph)));
                    orderLineTable.addCell(new PdfPCell(new Phrase(String.valueOf(Integer.parseInt(result[2].toString())))));
                    orderLineTable.addCell(new PdfPCell(new Phrase(String.valueOf(Integer.parseInt(result[3].toString())))));
                    orderLineTable.addCell(new PdfPCell(new Phrase(String.valueOf(Integer.parseInt(result[4].toString())))));
                }
                document.add(orderLineTable);

            document.close();

            System.out.println("PDF file generated successfully.");
            if (optionalUser.isPresent()) {
                System.out.println("Email: " + optionalUser.get().getEmail());
                emailServiceImp.sendEmailWithAttachment(optionalUser.get().getEmail(), "Xác nhận đơn hàng", "Chúc mừng bạn đã đặt đơn hàng thành công, đây là file đính kèm của đơn đặt hàng", "D:\\PDF" + currentDateTime + ".pdf");
                System.out.println("Tạo email thành công.");
            } else {
                System.out.println("Optional<User> is empty.");
            }

        } catch (Exception e){
            e.printStackTrace();
    }
}

    protected void checkCondition(List<PlaceOrderItem> items) throws Exception {
        for (PlaceOrderItem item : items) {
            Optional<Product> p = productImp.findById(item.getProductId());
            if (p.isPresent() && !p.get().isDeleted() && item.getBuyQuantity() > 0) {
                if (p.get().getQuantity() < item.getBuyQuantity()) {
                    throw new Exception("Số lượng mua hàng vượt quá tồn kho");
                }
            } else {
                throw new Exception("Sản phẩm bạn mua không hợp lệ");
            }
        }
    }

    @Override
    public List<TopProductDTO> findTopSellingProducts(Date startDate, Date endDate) {
        System.out.println(startDate);
        System.out.println(endDate);
        String nativeQuery = "SELECT p.product_id, p.name, SUM(ol.quantity) AS totalSales, m.image_url , p.price  " +
                "FROM order_line ol " +
                "JOIN product p ON ol.product_id = p.product_id " +
                "JOIN Orders o ON ol.order_id = o.order_id " +
                "JOIN media m ON m.product_id = p.product_id "+
                "WHERE o.create_at BETWEEN :startDate AND :endDate and o.is_deleted = 0 and m.is_primary = 1 " +
                "GROUP BY ol.product_id " +
                "ORDER BY totalSales DESC " +
                "LIMIT 10";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate);

        List<Object[]> resultList = query.getResultList();
        List<TopProductDTO> productsWithSales = new ArrayList<>();

        for (Object[] result : resultList) {
            int productId = Integer.parseInt(result[0].toString());
            String productName = (String) result[1];
            int totalSales = Integer.parseInt(result[2].toString());
            String imageUrl = result[3].toString();
            Long price = Long.valueOf(result[4].toString());
            TopProductDTO productSales = new TopProductDTO();
            productSales.setProductId(productId);
            productSales.setName(productName);
            productSales.setTotalSales(totalSales);
            productSales.setPrice(price);
            productSales.setImageUrl(imageUrl);
            productsWithSales.add(productSales);
        }
        return productsWithSales;

    }
    @Override
    public List<TopBrandDTO> findTopBrand(Date startDate, Date endDate) {

        String nativeQuery = "SELECT b.brand_id ,b.name, SUM(ol.quantity) AS totalSales"+
                " FROM order_line ol"+
                " JOIN product p ON ol.product_id = p.product_id "+
                " JOIN Orders o ON ol.order_id = o.order_id "+
                " JOIN Brand b ON p.brand_id = b.brand_id"+
                " WHERE o.create_at BETWEEN :startDate AND :endDate AND o.is_deleted = 0 GROUP BY b.brand_id "+
                " ORDER BY totalSales DESC LIMIT 5";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate);
        List<Object[]> listBrand = query.getResultList();
        List<TopBrandDTO> topBrandWithSale = new ArrayList<>();
        for( Object[] result : listBrand){
            int brandId = Integer.parseInt(result[0].toString());
            String name = result[1].toString();
            int totalSale = Integer.parseInt(result[2].toString());
            TopBrandDTO brandSale = new TopBrandDTO();
            brandSale.setBrandId(brandId);
            brandSale.setName(name);
            brandSale.setTotalSale(totalSale);
            topBrandWithSale.add(brandSale);
        }
        return topBrandWithSale;
    }
    @Override
    public List<TopUserDTO> findTopUser(Date startDate, Date endDate) {
        String nativeQuery = "SELECT u.id , u.fullname , SUM(o.total_price) AS totalBuy"+
                " FROM orders o"+
                " JOIN _user u ON u.id = o.user_id"+
                " WHERE o.create_at BETWEEN :startDate AND :endDate AND o.is_deleted = 0 GROUP BY o.user_id "+
                " ORDER BY totalBuy DESC LIMIT 5";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate);
        List<Object[]> listUser = query.getResultList();
        List<TopUserDTO> topUserList = new ArrayList<>();
        for( Object[] result : listUser){
            int userID = Integer.parseInt(result[0].toString());
            String name = result[1].toString();
            Long totalBuy = Long.valueOf(result[2].toString());
            TopUserDTO user = new TopUserDTO();
            user.setUserId(userID);
            user.setName(name);
            user.setTotalBuy(totalBuy);
            topUserList.add(user);
        }
        return topUserList;
    }

    @Override
    public Optional<Order> findById(Integer id) {
        return orderReponsitory.findById(id);
    }

    @Override
    public List<Order> getAll() {
        return orderReponsitory.findAll();
    }

    public List<Order> getFilterOrders(String text, Date time_start, Date time_end, Integer status, Integer isAllStatus) {
        if(!text.equals("")){
            try{
                Integer number = Integer.parseInt(text);
                if(number < 10000){
                    return orderReponsitory.getFilterOrders(number, time_start, time_end, status, isAllStatus);
                }
                return orderReponsitory.getFilterOrders(text, time_start, time_end, status, isAllStatus);
            }catch(Exception e){
                System.out.println(e);
            }
        }
        return orderReponsitory.getFilterOrders(text, time_start, time_end, status, isAllStatus);
    }

    public List<Order> getByUser(User user){
        return orderReponsitory.findByUser(user);
    }
    @Override
    public void save(Order T) {
        orderReponsitory.save(T);
    }

    @Override
    public void delete(Integer id) {
        orderReponsitory.deleteById(id);
    }

}


