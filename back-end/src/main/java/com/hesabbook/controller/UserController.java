package com.hesabbook.controller;

import com.hesabbook.entity.account.User;
import com.hesabbook.service.UserService;
import com.hesabbook.utils.BusinessResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hesabbook/user")
public class UserController {
    @Autowired
    private UserService userService;


    @GetMapping("/get/{id}")
    public BusinessResponse getById(@PathVariable("id") Integer id) {
        BusinessResponse businessResponse = new BusinessResponse();
        User userResponse = userService.find(id);
        businessResponse.setCode(200);
        businessResponse.setStatus("SUCCESS");
        businessResponse.setResponse(userResponse);
        return businessResponse;
    }

    @GetMapping("/mobile/{id}")
    public BusinessResponse getByMobileNumber(@PathVariable("id") String id) {
        BusinessResponse businessResponse = new BusinessResponse();
        User userResponse = userService.findByMobileNumbers(id);
        businessResponse.setCode(200);
        businessResponse.setStatus("SUCCESS");
        businessResponse.setResponse(userResponse);
        return businessResponse;
    }

    @GetMapping("/update/first/time/{id}/{businessId}/{primary}")
    public BusinessResponse updateFirstTimeLogin(@PathVariable("id") String id, @PathVariable("businessId") String businessId, @PathVariable("primary") String primary) {
        BusinessResponse businessResponse = new BusinessResponse();
        User userResponse = userService.updateFirstTimeLogin(id, businessId, primary);
        businessResponse.setCode(200);
        businessResponse.setStatus("SUCCESS");
        businessResponse.setResponse(userResponse);
        return businessResponse;
    }

    @PostMapping("/save")
    public BusinessResponse updateSave(@RequestBody User user) {
        BusinessResponse businessResponse = new BusinessResponse();
        User users = new User();
        users.setId(user.getId());
        users.setDob(user.getDob());
        users.setEmail(user.getEmail());
        users.setGender(user.getGender());
        users.setToken(user.getToken());
        users.setIsLogin(user.getIsLogin());
        users.setLastName(user.getLastName());
        users.setMobileNumber(user.getMobileNumber());
        users.setPassword(user.getPassword());
        users.setRole(user.getRole());
        users.setTempPassword(user.getTempPassword());
        users.setFirstName(user.getFirstName());
        users.setPrimary_user_id(user.getPrimary_user_id());
        users.setSecondary_user_id(user.getSecondary_user_id());
        users.setToken(user.getToken());
        users.setIsLogin(user.getIsLogin());
        users.setLastLoginDate(user.getLastLoginDate());
        users.setBusinessId(user.getBusinessId());
        users.setFirstTimeLogin(user.getFirstTimeLogin());
        try {
            User responseUser = userService.save(users);
            businessResponse.setCode(200);
            businessResponse.setStatus("SUCCESS");
            businessResponse.setResponse(responseUser);
        } catch (Exception exception) {
            businessResponse.setCode(500);
            businessResponse.setStatus("FAILURE");
            businessResponse.setException(exception);
        }
        return businessResponse;
    }
}
