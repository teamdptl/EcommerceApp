package com.learn.ecommerce.Service.Implementation;

import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Entity.PaymentStatus;
import com.learn.ecommerce.Repository.OrderReponsitory;
import com.learn.ecommerce.Repository.PaymentStatusRepository;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.PaymentDetailResponse;
import com.learn.ecommerce.Response.PaymentResponse;
import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class PaymentStatusService {
    private static final Set<String> paymentCodes = new HashSet<>();

    @Autowired
    private PaymentStatusRepository repo;

    @Autowired
    private OrderReponsitory orderRepo;
    private final Long timeExpire = 10*60*1000L;
    private final Long sleepTime = 20000L;
    private final String tokenFilePath = "token.txt";
    private final String bankName = "TIMO";
    private final String bankNumber = "9017041010715";
    private final String bankCode = bankName+"-"+bankNumber;
    private final String bankUser = "Huynh Khanh Duy";
    private final String tk = "";
    private final String mk = "";
    private final String quickLinkTemplate = "https://img.vietqr.io/image/%s-print.png?amount=%s&addInfo=%s&accountName=%s";

    public PaymentStatus generatePayment(Order order){
        PaymentStatus payment = new PaymentStatus();
        payment.setExpiredAt(System.currentTimeMillis() + timeExpire);
        payment.setCode(getAlphaNumericString(6));
        payment.setTimeReceived(-1L);
        payment.setOrder(order);
        return repo.save(payment);
    }

    public PaymentStatus findPaymentByCode(String code){
        Optional<PaymentStatus> p =  repo.findByCode(code);
        return p.orElse(null);
    }

    public ResponseEntity<?> getPaymentData(PaymentStatus status){
        PaymentDetailResponse response = new PaymentDetailResponse();
        String qrLink = String.format(quickLinkTemplate, bankCode, status.getOrder().getTotalPrice(), status.getCode(), bankUser);
        response.setPaymentQr(qrLink);
        response.setBankNumber(bankNumber);
        response.setBankName(bankName);
        response.setReceiveName(bankUser);
        response.setMoney(status.getOrder().getTotalPrice());
        response.setCode(status.getCode());
        response.setExpiredAt(status.getExpiredAt());
        response.setNeedPay(true);
        response.setOrderId(status.getOrder().getOrderId());
        response.setMessage("Vui lòng thanh toán đơn hàng");
        return ResponseEntity.ok(response);
    }

    public PaymentResponse checkPayment(PaymentStatus payment){
        System.out.println(System.currentTimeMillis());
        if (payment.getExpiredAt() <= System.currentTimeMillis()){
            if (payment.getTimeReceived() < 0)
                return new PaymentResponse(false, "Chưa thanh toán", payment.getOrder().getOrderId(), true);
            else
                return new PaymentResponse(true, "Thanh toán thành công", payment.getOrder().getOrderId(), true);
        }

        if (paymentCodes.contains(payment.getCode())){
            return new PaymentResponse(false, "Đang chờ thanh toán", payment.getOrder().getOrderId(), false);
        }
        paymentCodes.add(payment.getCode());
        boolean isPayment = checkHistory(payment.getExpiredAt(), payment.getOrder().getTotalPrice(), payment.getCode());
        if (!isPayment)
            return new PaymentResponse(false, "Chưa thanh toán", payment.getOrder().getOrderId(), true);
        payment.setTimeReceived(System.currentTimeMillis());
        Order order = payment.getOrder();
        order.setPaymentStatus(true);
        repo.save(payment);
        orderRepo.save(order);
        return new PaymentResponse(true, "Thanh toán thành công", payment.getOrder().getOrderId(), true);
    }

    public boolean checkHistory(Long stopTimestamp, long money, String description) {
        while (stopTimestamp >= System.currentTimeMillis()){
            try {
                String token = getToken();
                System.out.println("Token: "+token);
                boolean isSuccess = checkInLoop(token, money, description);
                if (isSuccess)
                    return true;
                Thread.sleep(sleepTime);
            } catch (InterruptedException e) {
                return false;
            }
        }
        return false;
    }

    private boolean checkInLoop(String token, long requiredMoney, String requireDescription){
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\r\n    \"format\": \"group\",\r\n    \"index\": 0,\r\n    \"offset\": -1,\r\n    \"accountNo\": \"9017041010715\",\r\n    \"accountType\": \"1025\",\r\n    \"fromDate\": \"04/12/2023\",\r\n    \"toDate\": \"05/12/2100\"\r\n}");
        Request request = new Request.Builder()
                .url("https://app2.timo.vn/user/account/transaction/list")
                .method("POST", body)
                .addHeader("token", token)
                .addHeader("x-gofs-context-id", "a9093948b4f4fa1f3ed1af6d6a43aec67826550c25660a542bda10fcb62efe1d.49190253-ee46-4876-a27b-2f106085727b")
                .addHeader("x-timo-devicekey", "CHkc0Jqy:WEB:WEB:194:WEB:mobile:chrome")
                .addHeader("Content-Type", "application/json")
                .build();
        try {
            Response response = client.newCall(request).execute();
            if (response.code() != 200){
                return false;
            }
            JSONObject json = new JSONObject(response.body().string());
            JSONArray arr = json.getJSONObject("data").getJSONArray("items");
            for (int i = 0; i < arr.length(); i++){
                JSONArray item = arr.getJSONObject(i).getJSONArray("item");
                for (int j = 0; j < item.length(); j++){
                    JSONObject object = item.getJSONObject(i);
                    if (!object.getString("txnType").equals("IncomingTransfer")){
                        continue;
                    }
                    long transferMoney = object.getLong("txnAmount");
                    String description = object.getString("txnDesc");
                    // Kiểm tra số tiền và nội dung mô tả có đúng hay khong
//                    System.out.println(description + " "+requireDescription);
                    if (transferMoney >= requiredMoney && description.trim().contains(requireDescription)){
                        return true;
                    }
                }
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private String getToken(){
        String token = getTokenFromFile();
        if (token == null){
            token = getTokenFromWebsite();
            if (token == null)
                return "";
            saveTokenToFile(token);
        }
        return token;
    }

    private boolean saveTokenToFile(String content){
        Path path = Paths.get(tokenFilePath);
        try {
            Files.write(path, content.getBytes());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private String getTokenFromWebsite(){
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{'username': '"+tk+"', 'password':'"+mk+"', 'lang': 'vn'}");
        Request request = new Request.Builder()
                .url("https://app2.timo.vn/login")
                .method("POST", body)
                .addHeader("X-Timo-Devicereg", "f5e2d5fb89983920e9aef09c001fa821:WEB:WEB:194:WEB:mobile:chrome")
                .addHeader("X-Gofs-Context-Id", "a9093948b4f4fa1f3ed1af6d6a43aec67826550c25660a542bda10fcb62efe1d.262dc387-d481-4a9c-b33f-d90937514274")
                .addHeader("User-Agent", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36")
                .addHeader("Content-Type", "application/json")
                .build();
        try {
            Response response = client.newCall(request).execute();
            JSONObject data = new JSONObject(response.body().string());
            int code = data.getInt("code");
            if (code != 200)
                return null;
            return data.getJSONObject("data").getString("token");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String getTokenFromFile(){
        try {
            return Files.readString(Paths.get(tokenFilePath));
        } catch (Exception e) {
            return null;
        }
    }

    private String getAlphaNumericString(int n) {
        String AlphaNumericString = "ABCDEFGHJKMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghjkmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }
}
