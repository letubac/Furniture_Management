package com.webstore.app.model;

//Class Message chứa các hàm phục vụ hiển thị message
public class Message {

  private String mess;

  public Message(String mess) {
    this.mess = mess;
  }
  
  public String getMess() {
    return mess;
  }

  public void setMess(String mess) {
    this.mess = mess;
  }
  
}
