package com.webstore.app.mysql.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webstore.app.entity.BillDetail;

// truy vấn trực tiếp trên các class, các field của class mà không cần quan tâm tới việc đang dùng loại database nào, dữ liệu database ra sao
//lấy id của bill để đi xem chi tiết bill đó
public interface BillDetailRepository extends JpaRepository<BillDetail, Long> {

  List<BillDetail> findByBillId(Long id);
}
