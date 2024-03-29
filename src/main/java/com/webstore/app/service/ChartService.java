package com.webstore.app.service;

import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.webstore.app.entity.Category;
import com.webstore.app.model.Value;
import com.webstore.app.mysql.repo.CategoryRepository;
import com.webstore.app.mysql.repo.ProductRepository;

@Component
public class ChartService {

  //Logger: để thu thập thông tin log
  private Logger log = LoggerFactory.getLogger(getClass());

  //@Autowired: Bean đã được tiêm vào và sẵn sàng phục vụ các action trong Controller
  private @Autowired CategoryRepository categoryRepository;
  private @Autowired ProductRepository productRepository;

  public List<Value> getAll() {
    List<Value> list = new LinkedList<>();
    for (Category category : categoryRepository.findAll()) {
      list.add(new Value(category.getCategoryName(),
          productRepository.findByCategoryId(category.getCategoryID()).size()));
    }
    return list;
  }
}
