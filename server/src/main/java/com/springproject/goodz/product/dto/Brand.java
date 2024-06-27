package com.springproject.goodz.product.dto;

import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Jackson 라이브러리를 사용하는 동안 JSON 직렬화 설정이 변수명을 소문자로 변환할 수 있습니다. 이를 방지하기 위해 @JsonProperty 어노테이션을 사용하여 직렬화 시 변수명을 명시적으로 지정할 수 있습니다.
@Data
public class Brand {
    @JsonProperty("bNo")
    private int bNo;                // 브랜드 번호

    @JsonProperty("bName")
    private String bName;           // 브랜드 명

    private MultipartFile logoFile; // 첨부파일
}
