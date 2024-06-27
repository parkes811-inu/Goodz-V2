package com.springproject.goodz.controller;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springproject.goodz.post.dto.Post;
import com.springproject.goodz.post.service.PostService;
import com.springproject.goodz.product.dto.Product;
import com.springproject.goodz.product.dto.ProductOption;
import com.springproject.goodz.product.service.ProductService;
import com.springproject.goodz.utils.dto.Files;
import com.springproject.goodz.utils.service.FileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class MainController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private FileService fileService;

    @Autowired
    private PostService postService;

    // DecimalFormat 인스턴스 한 번 생성
    DecimalFormat decimalFormat = new DecimalFormat("#,### 원");

    @GetMapping("/{page}")
    public ResponseEntity<String> page(@PathVariable("page") String page) {
        return ResponseEntity.ok(page);
    }

    // footer 하단 링크 
    @GetMapping("/footer/{id}")
    public ResponseEntity<String> getFooterMapping(@PathVariable("id") int id) {
        String template;
        switch (id) {
            case 1:
                template = "common/privacy"; // templates/common/privacy.html
                break;
            case 2:
                template = "common/inspection"; // templates/common/inspection.html
                break;
            case 3:
                template = "common/store_info"; // templates/common/store_info.html
                break;
            case 4:
                template = "common/guideLine"; // templates/common/community_guidelines.html
                break;
            default:
                template = "/"; // default to home
        }
        return ResponseEntity.ok(template);
    }
    
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> newArrivals() throws Exception {
        List<Product> newArrivalsList = productService.newArrivals();

        // 👔 최근 입고 제품
        for (Product product : newArrivalsList) {
            // 상품 옵션 설정
            List<ProductOption> options = productService.getProductOptionsByProductId(product.getPNo());
            product.setOptions(options);

            // 상품 이미지 설정
            Files file = new Files();
            file.setParentNo(product.getPNo());
            file.setParentTable(product.getCategory());
            List<Files> productImages = fileService.listByParent(file);

            // 최저 가격 계산
            if (!options.isEmpty()) {
                int minPrice = options.stream()
                                    .mapToInt(ProductOption::getOptionPrice)
                                    .min()
                                    .orElse(0);
                // 원화 형식으로 변환
                String formattedMinPrice = decimalFormat.format(minPrice);
                product.setFormattedMinPrice(formattedMinPrice);
            } else {
                // 옵션이 없는 경우 기본 가격 설정 및 형식 변환
                int initialPrice = product.getInitialPrice();
                String formattedMinPrice = decimalFormat.format(initialPrice);
                product.setFormattedMinPrice(formattedMinPrice);
            }

            // 첫 번째 이미지 URL 설정
            if (!productImages.isEmpty()) {
                product.setImageUrl(productImages.get(0).getFilePath());
            } else {
                product.setImageUrl("/files/img?imgUrl=no-image.png"); // 기본 이미지 경로 설정
            }
        }
        // 📄인기게시글 4개
        List<Post> popularPosts = postService.popularPosts(0, 4);
        
        Map<String, Object> response = new HashMap<>();
        response.put("newArrivalsList", newArrivalsList);
        response.put("popularPosts", popularPosts);
        
        return ResponseEntity.ok(response);
    }

    // 인피니티 스크롤을 위한 컨트롤러
    @GetMapping("/index/posts")
    public ResponseEntity<List<Post>> getPostList(@RequestParam("page") int page, @RequestParam("size") int size) throws Exception {
        // 📄인기게시글 4개씩 추가 
        int offset = page * size;

        List<Post> popularPosts = postService.popularPosts(offset, 4);

        // 쿼리 결과를 로그로 확인
        System.out.println("쿼리 결과: " + popularPosts);

        return ResponseEntity.ok(popularPosts);
    }

}
