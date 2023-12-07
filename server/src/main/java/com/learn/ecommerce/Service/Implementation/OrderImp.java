package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.DTO.TopBrandDTO;
import com.learn.ecommerce.DTO.TopProductDTO;
import com.learn.ecommerce.DTO.TopUserDTO;
import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Repository.OrderReponsitory;
import com.learn.ecommerce.Service.OrderService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import com.learn.ecommerce.Entity.OrderLine;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Repository.OrderLineReponsitory;
import com.learn.ecommerce.Request.PlaceOrderItem;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Component
public class OrderImp implements OrderService {
    @PersistenceContext
    private EntityManager entityManager;
    private final OrderReponsitory orderReponsitory;
    private final OrderLineReponsitory orderLineReposiotry;
    private final ProductImp productImp;

    public OrderImp(@Autowired OrderReponsitory orderReponsitory, @Autowired ProductImp productImp, @Autowired OrderLineReponsitory orderLineRepository) {
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
        System.out.println(startDate);
        System.out.println(endDate);
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
        System.out.println(startDate);
        System.out.println(endDate);
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


