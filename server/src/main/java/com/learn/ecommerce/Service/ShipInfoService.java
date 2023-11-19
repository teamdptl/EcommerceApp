 package com.learn.ecommerce.Service;
import org.springframework.stereotype.Service;
 import com.learn.ecommerce.Entity.ShipInfo
;

import java.util.List;
import java.util.Optional;

 @Service
 public interface ShipInfoService {
     List<ShipInfo> findByUserId(int userId);

     ShipInfo addShipInfo(ShipInfo shipInfo);

     boolean deleteShipInfo(int shipId);

     Optional<ShipInfo> findShipInfoById(int shipId);

     ShipInfo updateShipInfo(ShipInfo shipInfo);
 }