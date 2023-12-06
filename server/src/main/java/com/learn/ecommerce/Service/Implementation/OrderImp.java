package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Repository.OrderReponsitory;
import com.learn.ecommerce.Service.OrderService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import com.learn.ecommerce.Entity.OrderLine;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Repository.OrderLineReponsitory;
import com.learn.ecommerce.Request.PlaceOrderItem;

import java.util.List;
import java.util.Optional;
@Component
public class OrderImp implements OrderService {

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

        for (PlaceOrderItem item : items){
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
            long priceOrderLine = p.getPrice()*item.getBuyQuantity();
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
        for (PlaceOrderItem item : items){
            Optional<Product> p = productImp.findById(item.getProductId());
            if (p.isPresent() && !p.get().isDeleted() && item.getBuyQuantity() > 0){
                if (p.get().getQuantity() < item.getBuyQuantity()){
                    throw new Exception("Số lượng mua hàng vượt quá tồn kho");
                }
            }
            else {
                throw new Exception("Sản phẩm bạn mua không hợp lệ");
            }
        }
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
        return orderReponsitory.getFilterOrders(time_start, time_end, status, isAllStatus);}
    @Override
    public void save(Order T) {
        orderReponsitory.save(T);
    }

    @Override
    public void delete(Integer id) {
        orderReponsitory.deleteById(id);
    }

}
