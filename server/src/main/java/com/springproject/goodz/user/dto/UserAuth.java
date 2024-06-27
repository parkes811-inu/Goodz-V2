package com.springproject.goodz.user.dto;

import lombok.Data;

@Data
public class UserAuth {
    private int authNo;
    private String userId;
    private String auth;        // ROLE_USER, ROLE_ADMIN ...

    // Default Constructor
    public UserAuth() {

    }

    public UserAuth(String userId, String auth) {
        this.userId = userId;
        this.auth = auth;
    }
}