package com.kazimunalan.MongoDB.controller;


import com.kazimunalan.MongoDB.model.User;
import com.kazimunalan.MongoDB.repository.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by kazimunalan on 30/10/2017.
 */
@RestController
@RequestMapping("user")
public class UserController {


    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody User user) {
        userRepository.save(user);
    }

    @RequestMapping(value = "/{id}")
    public User get(@PathVariable String id) {

        return userRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@RequestBody User user) {
        userRepository.save(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") String id) {
        userRepository.delete(id);
    }


    @RequestMapping()
    public List<User> getAll() {
        return userRepository.findAll();
    }


//    @GetMapping("/all")
//    public List<User> getAll() {
//        List<User> customerList = this.userRepository.findAll();
//        return customerList;
//    }
}
