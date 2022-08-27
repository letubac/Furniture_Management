package com.webstore.app.mysql.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webstore.app.entity.Product;

//@Repository: nó nhận vào một Entity class tương ứng với java class đại diện cho một bảng trong database
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  List<Product> findByCategoryId(Long id);
  
  List<Product> findByProductName(String name);
}
