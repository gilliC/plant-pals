package com.plant_pals.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.plant_pals.server.dto.CreateRequestParams;
import com.plant_pals.server.dto.UpdateRequestParams;
import com.plant_pals.server.entity.Request;
import com.plant_pals.server.service.RequestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createRequest(@RequestBody CreateRequestParams request) {
        try {
            Request newRequest = requestService.createRequest(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(newRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/approve")
    public ResponseEntity<?> approveRequest(@RequestBody UpdateRequestParams request) {
        try {
            Boolean result = requestService.approveRequest(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/reject")
    public ResponseEntity<?> rejectRequest(@RequestBody UpdateRequestParams request) {
        try {
            Boolean result = requestService.rejectRequest(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancelRequest(@RequestBody UpdateRequestParams request) {
        try {
            Boolean result = requestService.cancelRequest(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
