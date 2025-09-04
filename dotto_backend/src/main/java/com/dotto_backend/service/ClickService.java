package com.dotto_backend.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class ClickService {

    private static final String TOTAL_KEY = "dotto:clicks:total";
    private final StringRedisTemplate redis;

    public ClickService(StringRedisTemplate redis) {
        this.redis = redis;
    }

    public long incrementAndGet() {
        Long v = redis.opsForValue().increment(TOTAL_KEY);
        return v == null ? 0L : v;
    }

    public long getTotal() {
        String v = redis.opsForValue().get(TOTAL_KEY);
        return (v == null) ? 0L : Long.parseLong(v);
    }
}