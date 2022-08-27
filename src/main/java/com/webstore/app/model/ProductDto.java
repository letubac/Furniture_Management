package com.webstore.app.model;

//tạo xem chi tiết sản phẩm
public class ProductDto {
	private Long prodId;
	private String command;
	private Long cateId;
	private String prodName;
	private Double price;
	private Double buy;
	private String descrip;
	private int quantity;
	private String provider;
	private String image;

	public ProductDto() {
		super();
	}
	
	

	public ProductDto(Long prodId, String command, Long cateId, String prodName, Double price, Double buy,
			String descrip, int quantity, String provider, String image) {
		
	}



	public ProductDto(long productID, String productName, Double productPrice, Double productBuy,
			String productDescription, String productProvider, Integer productQuantity, Long cateId, String image, String command) {
		super();
		this.prodId = cateId;
		this.command = command;
		this.cateId = cateId;
		this.prodName = productName;
		this.price = productPrice;
		this.buy = productBuy;
		this.descrip = productDescription;
		this.quantity = productQuantity;
		this.provider = productProvider;
		this.image = image;
	}

	public Double getBuy() {
		return buy;
	}

	public void setBuy(Double buy) {
		this.buy = buy;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}

	public Long getProdId() {
		return prodId;
	}

	public void setProdId(Long prodId) {
		this.prodId = prodId;
	}

	public String getCommand() {
		return command;
	}

	public void setCommand(String command) {
		this.command = command;
	}

	public Long getCateId() {
		return cateId;
	}

	public void setCateId(Long cateId) {
		this.cateId = cateId;
	}

	public String getProdName() {
		return prodName;
	}

	public void setProdName(String prodName) {
		this.prodName = prodName;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescrip() {
		return descrip;
	}

	public void setDescrip(String descrip) {
		this.descrip = descrip;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	// ghi đè
	@Override
	public String toString() {
		return "ProductDto [prodId=" + prodId + ", command=" + command + ", cateId=" + cateId + ", prodName=" + prodName
				+ ", price=" + price + ", descrip=" + descrip + ", image=" + image + "]";
	}
}
