package com.medium_weekly.Service.impl;

import com.medium_weekly.Service.ITokenBlacklistService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TokenBlacklistService implements ITokenBlacklistService {
    private final Set<String> invalidTokens = new HashSet<>();

    public void addTokenToBlacklist(String token) {
        invalidTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        return invalidTokens.contains(token);
    }
}
