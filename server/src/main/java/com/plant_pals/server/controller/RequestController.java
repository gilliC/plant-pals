package com.plant_pals.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.plant_pals.server.dto.CreateRequestParams;
import com.plant_pals.server.dto.UpdateRequestParams;
import com.plant_pals.server.entity.Request;
import com.plant_pals.server.service.RequestService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @GetMapping
    public ResponseEntity<?> getRequests(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String status) {
        try {
            if (userId != null) {
                return ResponseEntity.ok(requestService.getRequestsByUserId(userId));
            }
            if ("pending".equalsIgnoreCase(status)) {
                return ResponseEntity.ok(requestService.getPendingRequests());
            }
            return ResponseEntity.ok(requestService.getRequests());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createRequest(@Valid @RequestBody CreateRequestParams request) {
        try {
            Request newRequest = requestService.createRequest(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(newRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/approve")
    public ResponseEntity<?> approveRequest(@Valid @RequestBody UpdateRequestParams request) {
        try {
            Boolean result = requestService.approveRequest(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/reject")
    public ResponseEntity<?> rejectRequest(@Valid @RequestBody UpdateRequestParams request) {
        try {
            Boolean result = requestService.rejectRequest(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancelRequest(@Valid @RequestBody UpdateRequestParams request) {
        try {
            Boolean result = requestService.cancelRequest(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
