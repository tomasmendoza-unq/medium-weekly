package com.medium_weekly.Service;


public interface ITokenBlacklistService {

    public void addTokenToBlacklist(String token);

    public boolean isTokenBlacklisted(String token);
}
