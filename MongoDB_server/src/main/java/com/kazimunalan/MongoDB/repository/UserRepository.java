package com.kazimunalan.MongoDB.repository;

import com.kazimunalan.MongoDB.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by kazimunalan on 30/10/2017.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public User findByName(String name);
}