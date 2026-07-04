package com.plant_pals.server.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.plant_pals.server.dto.CreateRequestParams;
import com.plant_pals.server.dto.UpdateRequestParams;
import com.plant_pals.server.entity.Plant;
import com.plant_pals.server.entity.PlantStatus;
import com.plant_pals.server.entity.Request;
import com.plant_pals.server.entity.RequestStatus;
import com.plant_pals.server.entity.Role;
import com.plant_pals.server.entity.User;
import com.plant_pals.server.repository.PlantRepository;
import com.plant_pals.server.repository.RequestRepository;
import com.plant_pals.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;
    private final PlantRepository plantRepository;

    public Request createRequest(CreateRequestParams params) {
        Request request = new Request();
        User user = userRepository.findById(params.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Plant plant = plantRepository.findById(params.getPlantId())
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        LocalDateTime now = LocalDateTime.now();
        request.setStatus(RequestStatus.PENDING);
        request.setUser(user);
        request.setPlant(plant);
        request.setCreatedAt(now);
        request.setUpdatedAt(now);
        return requestRepository.save(request);
    }

    public Iterable<Request> getRequests() {
        return requestRepository.findAll();
    }

    public Iterable<Request> getPendingRequests() {
        return requestRepository.findByStatus(RequestStatus.PENDING);
    }

    public Iterable<Request> getRequestsByUserId(Long userId) {
        return requestRepository.findByUserId(userId);
    }

    public Request getRequestById(Long id) {
        return requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
    }

    private Request updateRequestStatus(Long id, RequestStatus status) {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        request.setUpdatedAt(LocalDateTime.now());
        return requestRepository.save(request);
    }

    public Boolean approveRequest(UpdateRequestParams params) {
        User user = userRepository.findById(params.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only admins can approve requests");
        }
        Request request = updateRequestStatus(params.getRequestId(), RequestStatus.APPROVED);
        Plant plant = request.getPlant();
        plant.setStatus(PlantStatus.ADOPTED);
        plantRepository.save(plant);
        return request.getStatus() == RequestStatus.APPROVED;
    }

    public Boolean rejectRequest(UpdateRequestParams params) {
        User user = userRepository.findById(params.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only admins can reject requests");
        }
        Request request = updateRequestStatus(params.getRequestId(), RequestStatus.REJECTED);
        return request.getStatus() == RequestStatus.REJECTED;
    }

    public Boolean cancelRequest(UpdateRequestParams params) {
        Request request = requestRepository.findById(params.getRequestId())
                .orElseThrow(() -> new RuntimeException("Request not found"));
        if (!request.getUser().getId().equals(params.getUserId())) {
            throw new RuntimeException("Only the request owner can cancel requests");
        }
        Request newRequest = updateRequestStatus(params.getRequestId(), RequestStatus.CANCELED);
        return newRequest.getStatus() == RequestStatus.CANCELED;
    }
}
