package com.webstore.app.mysql.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.webstore.app.entity.Bill;

//@Repository: nó nhận vào một Entity class tương ứng với java class đại diện cho một bảng trong database
@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

  //@Transactional: 1 loạt các hành động được phải được thực hiện thành công cùng nhau, 
  @Transactional
  @Modifying 
  @Query(value = "update bill set status = ?2 where bill_id = ?1", nativeQuery = true)
  void updateStatus(Long id, Short stt);
  
  List<Bill> findByUserId(Long userId);
  
  @Query(value = "select b from Bill b where b.noti = false")
  List<Bill> findByNotiIsFalse();
}
