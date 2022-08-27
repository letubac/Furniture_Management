package com.webstore.app.model;

import java.util.HashMap;
import java.util.Map;

//tạo giỏ hàng
public class Cart {

	//Tạo một HashMapđối tượng gọi là cartItems sẽ lưu trữ Long các khóa và Item giá trị
    private HashMap<Long, Item> cartItems;

    public Cart() {
        cartItems = new HashMap<>();
    }

    public Cart(HashMap<Long, Item> cartItems) {
        this.cartItems = cartItems;
    }

    public HashMap<Long, Item> getCartItems() {
        return cartItems;
    }

    public void setCartItems(HashMap<Long, Item> cartItems) {
        this.cartItems = cartItems;
    }

    //thêm vào giỏ hàng nó tạo giỏ hàng bằng hàm có sẵn chứ k tự code @@
    public void plusToCart(Long key, Item item) {
        boolean bln = cartItems.containsKey(key);
        System.out.println("item = " +item );
        System.out.println("bln = " +bln );
        if (bln) {
        	
            int quantity_old = item.getQuantity();
            System.out.println("quantity_old = " +quantity_old );
            item.setQuantity(quantity_old + 1);
            cartItems.put(item.getProduct().getProductID(), item);
        } else {
        	 System.out.println("else của card = " );
            cartItems.put(item.getProduct().getProductID(), item);
        }
    }     

    //trừ số lượng sản phẩm từ giỏ hàng
    public void subToCart(Long key, Item item) {
        boolean check = cartItems.containsKey(key);
        if (check) {
            int quantity_old = item.getQuantity();
            if (quantity_old <= 1) {
                cartItems.remove(key);
            } else {
                item.setQuantity(quantity_old - 1);
                cartItems.put(key, item);
            }
        }
    }

    //xóa sản phẩm trong giỏ hàng
    public void removeToCart(Long product) {
        boolean bln = cartItems.containsKey(product);
        if (bln) {
            cartItems.remove(product);
        }
    }
    
    //đếm số lượng sản phẩm
    public int countItem() {
        int count = 0;
        count = cartItems.size();
        return count;
    }

    //toàn bộ giỏ hàng
    public double totalCart() {
        double count = 0;
        // dùng for-each để iterate Map.entrySet() 
        for (Map.Entry<Long, Item> list : cartItems.entrySet()) {
            count += list.getValue().getProduct().getProductPrice() * list.getValue().getQuantity();
        }
        return count;

    }
}
