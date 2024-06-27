package com.springproject.goodz.post.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springproject.goodz.post.dto.Post;
import com.springproject.goodz.post.dto.Tag;
import com.springproject.goodz.post.mapper.TagMapper;
import com.springproject.goodz.product.dto.Product;
import com.springproject.goodz.product.mapper.ProductMapper;
import com.springproject.goodz.utils.dto.Files;
import com.springproject.goodz.utils.mapper.FileMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TagServiceImpl implements TagService{

    @Autowired
    private TagMapper tagMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private FileMapper fileMapper;

    // 상품태그 리스트 조회 - 게시글 번호 기준
    @Override
    public Map<String, Object> tagList(int postNo) throws Exception {
        List<Tag> tagList = tagMapper.tagList(postNo);

        // Tag -> Product로 전환 ; 카테고리, 상품번호로 이미지 조회해야하므로.
        List<Product> taggedProducts = new ArrayList<>();

        log.info("::::태그된 상품 정보::::");
        if (!tagList.isEmpty()) {
            for (Tag tag : tagList) {
                int productno = tag.getPNo();
                Product item = productMapper.getProductBypNo(productno);

                // 상품 대표이미지 가져오기
                Files file = new Files();
                file.setParentTable(item.getCategory());
                file.setParentNo(item.getPNo());
                Files mainImg = fileMapper.selectMainImg(file);

                // 대표 이미지 번호 저장
                item.setMainImgNo(mainImg.getNo());
                
                // 태그 리스트에 저장
                taggedProducts.add(item);

                log.info(item.toString());
            }
        }

        Map<String, Object> tagDetails = new HashMap<>();
        tagDetails.put("tagList", taggedProducts);  // 태그 리스트
        tagDetails.put("tagCount", taggedProducts.size());       // 태그 수

        return tagDetails;
    }

    // 상품태그 리스트 조회 - 상품번호 기준
    @Override
    public List<Post> taggedProduct(int productNo) throws Exception{
        return tagMapper.taggedProduct(productNo);
    }

    // 상품태그 추가 - 게시글 등록 시
    @Override
    public int insert(Tag tag) throws Exception {

        return tagMapper.insert(tag);

    }

    // 게시글에 종속된 상품태그 삭제 - 게시글 수정 시
    @Override
    public int delete(int postNo) throws Exception {
        return tagMapper.delete(postNo);
    }


    
}
