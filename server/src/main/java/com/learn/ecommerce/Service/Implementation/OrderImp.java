package com.learn.ecommerce.Service.Implementation;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.learn.ecommerce.DTO.TopBrandDTO;
import com.learn.ecommerce.DTO.TopProductDTO;
import com.learn.ecommerce.DTO.TopUserDTO;
import com.learn.ecommerce.Entity.*;
import com.learn.ecommerce.Repository.OrderReponsitory;
import com.learn.ecommerce.Repository.ShipInfoReponsitory;
import com.learn.ecommerce.Service.OrderService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
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

    private final ShipInfoReponsitory shipInfoReponsitory;


    private final OrderLineReponsitory orderLineReposiotry;
    private final ProductImp productImp;

    private final ShipInfoImp shipInfoImp;

    public OrderImp(@Autowired OrderReponsitory orderReponsitory, ShipInfoReponsitory shipInfoReponsitory, @Autowired ProductImp productImp, @Autowired OrderLineReponsitory orderLineRepository, ShipInfoImp shipInfoImp) {
        this.orderReponsitory = orderReponsitory;
        this.shipInfoReponsitory = shipInfoReponsitory;
        this.productImp = productImp;
        this.orderLineReposiotry = orderLineRepository;
        this.shipInfoImp = shipInfoImp;
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

    public void generatePdfContent(Order order) throws FileNotFoundException, DocumentException {
        try {
            Document document = new Document(PageSize.A4);
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String currentDateTime = dateFormat.format(new java.util.Date());
            String filepath = "D:\\PDF"+currentDateTime+".pdf";

            PdfWriter.getInstance(document, new FileOutputStream(filepath));
            document.open();
            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontTitle.setSize(18);

            Paragraph paragraph = new Paragraph("Xác nhận đơn hàng",fontTitle );
            paragraph.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(paragraph);

            if (order.getShipInfo() != null) {
                ShipInfo shipInfo = order.getShipInfo();

                Paragraph shipInfoParagraph = new Paragraph(
                        "Thông tin vận chuyển:\n" +
                                "Họ và tên: " + shipInfo.getFullName() + "\n" +
                                "Địa chỉ: " + shipInfo.getAddress() + "\n" +
                                "Số điện thoại: " + shipInfo.getPhone() + "\n"
                );
                shipInfoParagraph.setAlignment(Paragraph.ALIGN_LEFT);
                document.add(shipInfoParagraph);
            }

            List<OrderLine> orderLines = orderLineReposiotry.findAllById(Collections.singleton(order.getOrderId()));

                PdfPTable orderLineTable = new PdfPTable(4);
                orderLineTable.setWidthPercentage(100);
                orderLineTable.addCell("Tên sản phẩm");
                orderLineTable.addCell("Số lượng");
                orderLineTable.addCell("Đơn giá");
                orderLineTable.addCell("Thành tiền");

                for (OrderLine orderLine : orderLines) {
                    orderLineTable.addCell(orderLine.getProduct().getName());
                    orderLineTable.addCell(String.valueOf(orderLine.getQuantity()));
                    orderLineTable.addCell(String.valueOf(orderLine.getPrice()));
                    orderLineTable.addCell(String.valueOf(orderLine.getQuantity() * orderLine.getPrice()));
                }
                document.add(orderLineTable);

            document.close();

            System.out.println("PDF file generated successfully.");

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
        return Optional.empty();
    }

    @Override
    public List<Order> getAll() {
        return orderReponsitory.findAll();
    }


    public List<Order> getFilterOrders(Date time_start, Date time_end, Integer status, Integer isAllStatus) {
        return orderReponsitory.getFilterOrders(time_start, time_end, status, isAllStatus);
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


