package com.webstore.app.mysql.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.webstore.app.entity.User;

// truy vấn trực tiếp trên các class, các field của class mà không cần quan tâm tới việc đang dùng loại database nào, dữ liệu database ra sao
//tạo kho người dùng để đi xét xem từng tài khoản đó là người dùng hay admin
public interface UserRepository extends JpaRepository<User, Long> {
  User findByUserEmail(String mail);
  User findByUserEmailAndUserPassAndGroupid(String mail, String password, int groupId);
  
  @Query(value = "Select * from users where user_email = ?1 and user_pass = ?2 and usergroup_id = 2", nativeQuery = true)
  User findAdmin(String email, String password);
}