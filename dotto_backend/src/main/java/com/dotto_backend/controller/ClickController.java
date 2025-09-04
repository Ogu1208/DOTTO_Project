package com.dotto_backend.controller;

import com.dotto_backend.dto.ClickResponse;
import com.dotto_backend.service.ClickService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clicks")
public class ClickController {

    private final ClickService service;

    public ClickController(ClickService service) {
        this.service = service;
    }

    @PostMapping("/increment")
    public ResponseEntity<ClickResponse> increment() {
        long total = service.incrementAndGet();
        return ResponseEntity.ok(new ClickResponse(total));
    }

    @GetMapping
    public ResponseEntity<ClickResponse> get() {
        return ResponseEntity.ok(new ClickResponse(service.getTotal()));
    }
}