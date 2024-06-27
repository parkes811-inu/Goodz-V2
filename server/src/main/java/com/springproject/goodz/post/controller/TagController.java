package com.springproject.goodz.post.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springproject.goodz.post.service.TagService;
import com.springproject.goodz.product.dto.Product;
import com.springproject.goodz.product.service.ProductService;
import com.springproject.goodz.utils.dto.Files;
import com.springproject.goodz.utils.service.FileService;

import lombok.extern.slf4j.Slf4j;


/*
 * 상품태그
 * [GET]        /tag?keyword=????      키워드에 맞는 게시글 조회 (상품태그 검색)
 * 
 */

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tag")
public class TagController {

    @Autowired
    public TagService tagService;

    @Autowired
    public ProductService productService;

    @Autowired
    public FileService fileService;
    
    @GetMapping("/keyword={keyword}")
    public ResponseEntity<?> search(@RequestParam("keyword") String keyword, Model model) {

            List<Product> searchedItems = new ArrayList<>();
        try {
            searchedItems = productService.search(keyword);

            if (searchedItems != null) {
                // log.info("요청감지");
                // log.info("keyword: " + keyword);
                // 상품 대표이미지 세팅
                for (Product product : searchedItems) {
                    // 상품 대표이미지 가져오기
                    Files file = new Files();
                    file.setParentTable(product.getCategory());
                    file.setParentNo(product.getPNo());
                    Files mainImg = fileService.selectMainImg(file);
                    // 대표 이미지 번호 저장
                    log.info("대표이미지번호: " + mainImg.getNo());
                    product.setMainImgNo(mainImg.getNo());
                }
            }
            
            return new ResponseEntity<>(searchedItems, HttpStatus.OK);

        } catch (Exception e) {
            log.info("상품 검색에 실패하였습니다.");
            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{postNo}")
    public ResponseEntity<?> tagList(@PathVariable("postNo") int postNo) {
        
        try {
            /**
             * 게시글에 종속된 상품태그 조회
             * "tagList" : List<Product> taggedProducts         태그리스트
             * "tagCount": List<Product> taggedProducts.size()  태그 수
             */
            Map<String, Object> tagList = tagService.tagList(postNo);
            return new ResponseEntity<>(tagList, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
}
