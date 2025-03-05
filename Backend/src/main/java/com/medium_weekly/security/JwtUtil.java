package com.medium_weekly.security;

import com.medium_weekly.Exception.BadRequest;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Service.ITokenBlacklistService;
import com.medium_weekly.Service.impl.TokenBlacklistService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    private Key signingKey;

    @PostConstruct
    public void init() {

        byte[] keyBytes = Base64.getEncoder().encode(secretKey.getBytes(StandardCharsets.UTF_8));
        signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generarToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getNombre())
                .claim("Id", usuario.getId_usuario())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extraerNombre(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            System.out.println("Error al extraer el nombre de usuario del token: " + e.getMessage());
            return null;
        }
    }

    public String extraerToken(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if(token == null || !token.startsWith("Bearer ")) throw new BadRequest("invalid jwt");
        token = token.substring(7);

        return token;
    }

    public Long extraerId(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();


            return claims.get("Id", Long.class);
        } catch (JwtException e) {
            System.out.println("Error al extraer el ID del token: " + e.getMessage());
            return null;
        }
    }

    @Autowired
    private ITokenBlacklistService tokenBlacklistService;

    public boolean validarToken(String token, UserDetails userDetails) {
        if (tokenBlacklistService.isTokenBlacklisted(token)) {
            return false;
        }

        String nombreUsuario = extraerNombre(token);
        return (nombreUsuario != null && nombreUsuario.equals(userDetails.getUsername()) && !estaExpirado(token));
    }

    private boolean estaExpirado(String token) {
        Date fechaExpiracion = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return fechaExpiracion.before(new Date());
    }
}
