package com.webstore.app.adm.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.webstore.app.entity.User;
import com.webstore.app.mysql.repo.UserRepository;

@Controller
public class ManagerUserController {

  private @Autowired UserRepository userRepository;
  private final static int customer_group = 1;
  
  //xử lý đăng nhập
  @RequestMapping("/do-login")
  protected String userlogin(@RequestParam String command, @RequestParam String email, @RequestParam(required = false) String phone, @RequestParam String password, HttpServletRequest request) {
      String url = "";
      User users = new User();
      HttpSession session = request.getSession();
      switch (command) {
          case "insert": //tạo tài khoản
              users.setUserEmail(email);
              users.setUserPass(password);
              users.setUserRole(false);
              users.setGroupid(customer_group);
              users.setPhone(phone);
              userRepository.save(users);
              session.setAttribute("user", users);
              url = "/homepage";
              break;

          case "login"://đăng nhập
              users = userRepository.findByUserEmailAndUserPassAndGroupid(email, password, customer_group);
              if (users != null) {
                  session.setAttribute("user", users);
                  url = "/homepage";
              } else {
                  session.setAttribute("error", "Email hoặc mật khẩu không đúng.!");
                  url = "/login";
              }
              break;
      }
      return "redirect:/" + url;
  }
}
