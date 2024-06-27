package com.springproject.goodz.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springproject.goodz.product.dto.Pricehistory;
import com.springproject.goodz.product.service.ProductService;

@RestController
@RequestMapping("/api")
public class PriceController {

    @Autowired
    private ProductService productService;

    /**
     * 상품 가격 변동 History 조회
     * @param period 기간
     * @param pNo 상품 번호
     * @param size 상품 사이즈
     * @return 가격 변동 내역 리스트
     * @throws Exception 예외
     */
    @GetMapping("/getPriceHistory")
    public ResponseEntity<List<Pricehistory>> getPriceHistory(@RequestParam String period, 
                                                              @RequestParam int pNo, 
                                                              @RequestParam String size) throws Exception {
        List<Pricehistory> priceHistory = productService.getPriceHistory(period, pNo, size);
        return ResponseEntity.ok(priceHistory);
    }
}
