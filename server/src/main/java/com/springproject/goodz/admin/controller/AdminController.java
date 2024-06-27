package com.springproject.goodz.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.springproject.goodz.admin.service.AdminService;
import com.springproject.goodz.pay.dto.Purchase;
import com.springproject.goodz.product.dto.Brand;
import com.springproject.goodz.product.dto.Page;
import com.springproject.goodz.product.dto.Product;
import com.springproject.goodz.product.dto.ProductOption;
import com.springproject.goodz.product.dto.UpdateProductRequest;
import com.springproject.goodz.product.service.BrandService;
import com.springproject.goodz.product.service.ProductService;
import com.springproject.goodz.utils.dto.Files;
import com.springproject.goodz.utils.service.FileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController // 컨트롤러를 RESTful 웹 서비스로 변경
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private BrandService brandService;

    @Autowired
    private ProductService productService;

    @Autowired
    private FileService fileService;

    @Autowired
    private AdminService adminService;

    // 관리자 홈 페이지
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> index() throws Exception {
        List<Map<String, Object>> saleStateCounts = adminService.countUserSalesByState();
        Map<String, Integer> saleStateMap = saleStateCounts.stream()
            .collect(Collectors.toMap(
                count -> (String) count.get("sale_state"), 
                count -> ((Long) count.get("count")).intValue()
            ));
        
        List<Map<String, Object>> purchaseStateCounts = adminService.countUserPurchaseByState();
        Map<String, Integer> purchaseStateMap = purchaseStateCounts.stream()
            .collect(Collectors.toMap(
                count -> (String) count.get("purchase_state"), 
                count -> ((Long) count.get("count")).intValue()
            ));
        
        Map<String, Object> response = new HashMap<>();
        response.put("saleStateCounts", saleStateMap);
        response.put("purchaseStateCounts", purchaseStateMap);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 브랜드 목록 조회
    @GetMapping("/brands")
    public ResponseEntity<Map<String, Object>> brandList(Page page,
                            @RequestParam(value = "page", defaultValue = "1") int pageNumber,
                            @RequestParam(value = "keyword", defaultValue = "") String keyword) throws Exception {
        page.setPage(pageNumber);
        int total = brandService.getTotalCount(keyword);
        page.setTotal(total);
        List<Brand> brandList = brandService.brandList(page, keyword);
        log.info("page : " + page);
        log.info("keyword : " + keyword);

        Map<String, Object> response = new HashMap<>();
        response.put("brandList", brandList);
        response.put("page", page);
        response.put("keyword", keyword);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 브랜드 등록 페이지로 이동
    @GetMapping("/add_brand")
    public ResponseEntity<String> moveToAddBrand() {
        return new ResponseEntity<>("/admin/add_brand", HttpStatus.OK);
    }

    // 브랜드 등록
    @PostMapping("/brands")
    public ResponseEntity<String> addBrands(@RequestBody Brand brand) throws Exception {
        log.info("::::::::::::::브랜드 등록 요청::::::::::::::");
        log.info(brand.toString());
        int result = brandService.insert(brand);
        if (result == 0) {
            log.info("::::::::::::::브랜드 등록 처리 중 예외발생::::::::::::::");
            return new ResponseEntity<>("Error while adding brand", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Brand added successfully", HttpStatus.CREATED);
    }

    // 제품 목록 조회
    @GetMapping("/products")
    public ResponseEntity<Map<String, Object>> productList(Page page,
                          @RequestParam(value = "page", defaultValue = "1") int pageNumber,
                          @RequestParam(value = "keyword", defaultValue = "") String keyword) throws Exception {
        page.setPage(pageNumber);
        int total = productService.getTotalCount(keyword);
        page.setTotal(total);
        List<Product> productList = productService.productList(page, keyword);
        log.info("page : " + page);
        log.info("keyword : " + keyword);

        Map<String, Object> response = new HashMap<>();
        response.put("productList", productList);
        response.put("page", page);
        response.put("keyword", keyword);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 제품 등록 페이지로 이동
    @GetMapping("/add_product")
    public ResponseEntity<Map<String, Object>> moveToAddProduct() throws Exception {
        List<Brand> brandList = brandService.list();

        Map<String, Object> response = new HashMap<>();
        response.put("brandList", brandList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 제품 등록
    @PostMapping("/products")
    public ResponseEntity<String> addProducts(
        @RequestBody Product product, 
        @RequestParam("productFiles") List<MultipartFile> productFiles, 
        @RequestParam("sizes") List<String> sizes, 
        @RequestParam("optionPrices") List<Integer> optionPrices, 
        @RequestParam("stockQuantities") List<Integer> stockQuantities, 
        @RequestParam("status") List<String> status,
        @RequestParam("category") String category,
        @RequestParam("price") int price, 
        @RequestParam(value = "mainImgIndex", required = false, defaultValue = "-1") int mainImgIndex) throws Exception {
        log.info("::::::::::::::상품 등록 요청::::::::::::::");
        log.info(product.toString());
        product.setCategory(category);
        product.setInitialPrice(price);
        product.setProductFiles(productFiles); // 파일 리스트를 설정합니다.
        int result = productService.insert(product, mainImgIndex);
        if(result > 0) {
            int pNo = product.getPNo();
            // 옵션 등록
            for (int i = 0; i < sizes.size(); i++) {
                ProductOption option = new ProductOption();
                option.setPNo(pNo); // set the generated product number
                option.setSize(sizes.get(i));
                option.setOptionPrice(optionPrices.get(i));
                option.setStockQuantity(stockQuantities.get(i));
                option.setStatus(status.get(i));
                productService.insertProductOption(option);
                // priceHistory에 사이즈 별 가격 최초 등록
                productService.makeHistory(pNo, sizes.get(i), optionPrices.get(i));
            }
        } else {
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Product added successfully", HttpStatus.CREATED);
    }

    // 매입 내역 화면 ( 유저가 판매 )
    @GetMapping("/purchase_state")
    public ResponseEntity<Map<String, Object>> userSaleList(Page page,
                                @RequestParam(value = "page", defaultValue = "1") int pageNumber) throws Exception {
        page.setPage(pageNumber);
        int total = adminService.getTotalCount();
        page.setTotal(total);
        List<Map<String, Object>> saleList = adminService.userSaleList(page);
        List<Map<String, Object>> saleStateCounts = adminService.countUserSalesByState();
        Map<String, Integer> saleStateMap = saleStateCounts.stream()
            .collect(Collectors.toMap(
                count -> (String) count.get("sale_state"), 
                count -> ((Long) count.get("count")).intValue()
            ));

        Map<String, Object> response = new HashMap<>();
        response.put("saleList", saleList);
        response.put("saleStateCounts", saleStateMap);
        response.put("page", page);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 유저가 판매한 번호를 기준으로 단일 조회
    @GetMapping("/purchase/detail/{sNo}")
    public ResponseEntity<Map<String, Object>> purchaseDetail(@PathVariable("sNo") int sNo) throws Exception {
        Map<String, Object> saleDetail = adminService.userSale(sNo);
        return new ResponseEntity<>(Map.of("saleDetail", saleDetail), HttpStatus.OK);
    }

    // 유저의 단일 판매 내역 상태 변경
    @PutMapping("/purchase/update")
    public ResponseEntity<String> updateSaleState(@RequestParam("sNo") int sNo, @RequestParam("saleState") String saleState) throws Exception {
        // 현재 판매 내역 가져오기
        Map<String, Object> saleDetail = adminService.userSale(sNo);
        String currentSaleState = (String) saleDetail.get("saleState");

        // 디버깅: 현재 판매 상태와 변경할 판매 상태를 출력
        System.out.println("Current sale state: " + currentSaleState);
        System.out.println("New sale state: " + saleState);

        if (!"completed".equals(currentSaleState) && "completed".equals(saleState)) {
            int pNo = (int) saleDetail.get("productNo");
            int initialPrice = adminService.getInitialPrice(pNo);

            // 디버깅: productNo와 initialPrice를 출력
            System.out.println("Product No: " + pNo);
            System.out.println("Initial Price: " + initialPrice);

            adminService.handleProductOption(pNo, (String) saleDetail.get("size"), initialPrice);
        }

        adminService.updateUserSaleState(sNo, saleState);
        return new ResponseEntity<>("Sale state updated successfully", HttpStatus.OK);
    }

    // 거래 내역 
    @GetMapping("/pay_history")
    public ResponseEntity<Map<String, Object>> pay_history(Page page,
                            @RequestParam(value = "page", defaultValue = "1") int pageNumber) throws Exception {
        page.setPage(pageNumber);
        int total = adminService.TotalCount();
        page.setTotal(total);
        List<Map<String, Object>> purchaseList = adminService.userPurchaseList(page);
        List<Map<String, Object>> purchaseStateCounts = adminService.countUserPurchaseByState();
        Map<String, Integer> purchaseStateMap = purchaseStateCounts.stream()
            .collect(Collectors.toMap(
                count -> (String) count.get("purchase_state"), 
                count -> ((Long) count.get("count")).intValue()
            ));

        Map<String, Object> response = new HashMap<>();
        response.put("purchaseList", purchaseList);
        response.put("purchaseStateCounts", purchaseStateMap);
        response.put("page", page);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 유저가 구매한 상품 단일 조회
    @GetMapping("/pay_history/detail/{purchaseNo}")
    public ResponseEntity<Purchase> payhistorydetail(@PathVariable("purchaseNo") int purchaseNo) throws Exception {
        Purchase purchase = adminService.userPurchase(purchaseNo);
        return new ResponseEntity<>(purchase, HttpStatus.OK);
    }

    // 유저가 구매한 상품 상태 변경
    @PutMapping("/pay_history/update")
    public ResponseEntity<String> updatePurchase(@RequestParam("purchaseNo") int purchaseNo,
                                @RequestParam(value = "trackingNumber", required = false) String trackingNumber,
                                @RequestParam(value = "courier", required = false) String courier,
                                @RequestParam("purchaseState") String purchaseState,
                                @RequestParam("pNo") int pNo,
                                @RequestParam("size") String size) throws Exception {
        // 현재 상태 조회
        Purchase currentPurchase = adminService.userPurchase(purchaseNo);
        String currentState = currentPurchase.getPurchaseState();
        // 운송장 번호가 제공된 경우 업데이트
        if (trackingNumber != null && !trackingNumber.isEmpty() && courier != null && !courier.isEmpty()) {
            String trackingNo = courier + ":" + trackingNumber;
            adminService.updateTrackingInfo(purchaseNo, trackingNo);
        }
        // 구매 상태 업데이트 및 재고 조정
        adminService.updatePurchaseState(purchaseNo, purchaseState, currentState, pNo, size);
        return new ResponseEntity<>("Purchase updated successfully", HttpStatus.OK);
    }

    // 어드민 상품 상세 조회
    @GetMapping("/product/detail/{pNo}")
    public ResponseEntity<Map<String, Object>> getProductDetail(@PathVariable("pNo") int pNo) throws Exception {
        Product product = productService.getProductBypNo(pNo);
        List<ProductOption> option =  productService.adminOptionsByProductId(pNo);
        Files file = new Files();
        file.setParentNo(pNo);
        file.setParentTable(product.getCategory());
        List<Files> images = fileService.listByParent(file);
        List<Brand> brandList = brandService.list();

        Map<String, Object> response = new HashMap<>();
        response.put("product", product);
        response.put("option", option);
        response.put("images", images);
        response.put("brandList", brandList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 어드민 상품 수정 처리
    @PutMapping("/updateProduct")
    public ResponseEntity<String> updateProduct(@ModelAttribute UpdateProductRequest updateProductRequest, @RequestParam Map<String, String> params, @RequestParam("productFiles") List<MultipartFile> productFiles) throws Exception {
        log.info("Received Update Request: {}", updateProductRequest);
        Product product = new Product();
        product.setPNo(updateProductRequest.getPNo());
        product.setProductName(updateProductRequest.getProductName());
        product.setInitialPrice(updateProductRequest.getInitialPrice());
        product.setBName(updateProductRequest.getBName());
        product.setCategory(updateProductRequest.getCategory());
        List<ProductOption> options = new ArrayList<>();
        int index = 0;
        while (params.containsKey("optionIds[" + index + "]")) {
            ProductOption option = new ProductOption();
            option.setOptionId(Integer.parseInt(params.get("optionIds[" + index + "]")));
            option.setPNo(Integer.parseInt(params.get("optionPNos[" + index + "]")));
            option.setSize(params.get("sizes[" + index + "]"));
            option.setOptionPrice(Integer.parseInt(params.get("optionPrices[" + index + "]")));
            String addedStockQuantityStr = params.get("addedStockQuantities[" + index + "]");
            if (addedStockQuantityStr != null && !addedStockQuantityStr.isEmpty()) {
                option.setAddedStockQuantity(Integer.parseInt(addedStockQuantityStr));
            } else {
                option.setAddedStockQuantity(0); // 기본값 설정
            }
            option.setStatus(params.get("status[" + index + "]"));
            options.add(option);
            index++;
        }
        product.setOptions(options);
        log.info("Product options: {}", product.getOptions());
        productService.updateProduct(product);
        Files file = new Files();
        int pNo = product.getPNo();
        String parentTable = product.getCategory();
        file.setParentTable(parentTable);
        file.setParentNo(pNo);
        List<Files> productImgs = fileService.listByParent(file);
        // 기존 상품 이미지 삭제처리
        for (Files files : productImgs) {
            fileService.deleteByParent(file);
        }
        int mainImgIndex = updateProductRequest.getMainImgIndex();
        if (!productFiles.isEmpty()) {
            for (int i = 0; i < productFiles.size(); i++) {
                log.info(i+"번 인덱스 파일 처리중...");
                MultipartFile attachedFile = productFiles.get(i);
                if (attachedFile.isEmpty()) {
                    continue;
                }
                Files uploadFile = new Files();
                uploadFile.setParentNo(pNo);          
                uploadFile.setFile(attachedFile);      
                if (i == mainImgIndex) {
                    uploadFile.setFileCode(1);
                }
                boolean uploadcheck = fileService.upload(uploadFile, parentTable);
                if (uploadcheck) {
                    log.info((i+1) + "번째 파일 업로드 성공...");
                }
            }
        }
        return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
    }
}
