<%@page import="com.webstore.app.model.Item"%>
<%@page import="java.util.Map"%>
<%@ page import="com.webstore.app.model.Cart"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Thế giới nội thất</title>
<!-- for-mobile-apps -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords"
	content="Best Store Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, 
              Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />
<script type="application/x-javascript">
	 addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
            function hideURLbar(){ window.scrollTo(0,1); } 
</script>
<!-- //for-mobile-apps -->
<link
	href="${pageContext.request.contextPath}/resources/css/bootstrap.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="${pageContext.request.contextPath}/resources/css/style.css"
	rel="stylesheet" type="text/css" media="all" />
<!-- js -->
<script
	src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/bootstrap-notify.min.js"></script>
<!-- //js -->
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/resources/css/jquery-ui.css">
<!-- for bootstrap working -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/bootstrap-3.1.1.min.js"></script>
<!-- //for bootstrap working -->
<link
	href='//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic'
	rel='stylesheet' type='text/css'>
<link
	href='//fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic'
	rel='stylesheet' type='text/css'>
<!-- animation-effect -->
<link
	href="${pageContext.request.contextPath}/resources/css/animate.min.css"
	rel="stylesheet">
<script src="${pageContext.request.contextPath}/resources/js/wow.min.js"></script>
<script>
            new WOW().init();
            $(document).ready(function() {
            	$('.product').addClass('active');
            });
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id))
                    return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.8&appId=352114845163521";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        
        	function addItem(id){
        		$.ajax({
    				url : "${pageContext.request.contextPath}/cart/plus/"+id,
    				type : "GET",
    				async : false,
    				success : function(result) {
    					window.location.reload();
    				},
    				error : function(jqXHR, status, errorThrown) {
    					console.log(errorThrown);
    				}
    				});
        	}
        	function subItem(id){
        		$.ajax({
    				url : "${pageContext.request.contextPath}/cart/sub/"+id,
    				type : "GET",
    				async : false,
    				success : function(result) {
    					window.location.reload();
    				},
    				error : function(jqXHR, status, errorThrown) {
    					console.log(errorThrown);
    				}
    				});
        	}
        	function removeItem(id){
        		$.ajax({
    				url : "${pageContext.request.contextPath}/cart/remove/"+id,
    				type : "GET",
    				async : false,
    				success : function(result) {
    					window.location.reload();
    				},
    				error : function(jqXHR, status, errorThrown) {
    					console.log(errorThrown);
    				}
    				});
        	}
        	
        </script>
<!-- //animation-effect -->

</head>
<body>
	<%
		Cart cart = (Cart) session.getAttribute("cart");
		if (cart == null) {
			cart = new Cart();
			session.setAttribute("cart", cart);
		}
	%>

	<jsp:include page="header.jsp"></jsp:include>
	<div class="checkout">
		<div class="container">
			<div class="checkout-right animated wow slideInUp"
				data-wow-delay=".5s">
				<table class="timetable_sub">
					<thead>
						<tr>
							<th>STT</th>
							<th>Hình Sản Phẩm</th>
							<th>Số Lượng</th>
							<th>Tên Sản Phẩm</th>
							<th>Đơn Giá</th>
							<th>Tùy Chọn</th>
						</tr>
					</thead>
					<%
						int count = 0;
						for (Map.Entry<Long, Item> list : cart.getCartItems().entrySet()) {
							count++;
					%>
					<tr class="rem1">
						<td class="invert"><%=count%></td>
						<td class="invert-image" style="width: 25%">
						<a
							href="${pageContext.request.contextPath}/single/<%=list.getValue().getProduct().getProductID()%>"> <img
								src="${pageContext.request.contextPath}<%=list.getValue().getProduct().getProductImage()%>"
								alt=" " class="img-responsive" />
						</a></td>
						<td class="invert" style="width: 15%">
							<div class="quantity">
								<div class="quantity-select">
									<a style="cursor: pointer"
										onclick="subItem(<%=list.getValue().getProduct().getProductID()%>)">
										<div class="entry value-minus">&nbsp;</div>
									</a>
									<div class="entry value" id="valuequantity">
										<span><%=list.getValue().getQuantity()%></span>
									</div>

									<a style="cursor: pointer"
										onclick="addItem(<%=list.getValue().getProduct().getProductID()%>)">
										<div class="entry value-plus active">&nbsp;</div>
									</a>
								</div>
							</div>
						</td>
						<td class="invert" style="width: 30%"><%=list.getValue().getProduct().getProductName()%></td>
						<td class="invert"><%=list.getValue().getProduct().getProductPrice().longValue()%></td>
						<td class="invert" style="width: 10%"><a
							style="cursor: pointer"
							onclick="removeItem(<%=list.getValue().getProduct().getProductID()%>)">
								<img
								src="${pageContext.request.contextPath}/resources/images/delete-xxl.png"
								alt="" style="width: 30%; height: 10%" />
						</a></td>
					</tr>
					<%
						}
					%>

				</table>
			</div>
			<div class="checkout-left">
				<div class="checkout-left-basket animated wow slideInLeft"
					data-wow-delay=".5s">
					<h4>Tính Tiền</h4>
					<ul>
						<%
							double totalmoney = 0;
							for (Map.Entry<Long, Item> list : cart.getCartItems().entrySet()) {
						%>
						<li><%=list.getValue().getProduct().getProductName()%> <span><%=list.getValue().getQuantity()%></span>
							<span style="margin-left: 3px; margin-right: 3px">X</span> <span><%=list.getValue().getProduct().getProductPrice().longValue()%></span>
						</li>
						<%
							totalmoney = totalmoney
										+ (list.getValue().getQuantity() * list.getValue().getProduct().getProductPrice());
							}
						%>

						<li>Tổng Tiền: <span> <fmt:formatNumber
									value="${totalPrices}" type="currency" currencySymbol="" /> VNĐ
						</span></li>
					</ul>
				</div>
				<div class="checkout-right-basket animated wow slideInRight"
					data-wow-delay=".5s">
					<a href="${pageContext.request.contextPath}/history"><span
						class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>Lịch
						sử mua hàng</a> <a href="${pageContext.request.contextPath}/"><span
						class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>Tiếp
						Tục Mua Hàng</a> <a href="thanhtoan"><span
						class="glyphicon glyphicon-menu-left" class="simpleCart_checkout"
						aria-hidden="true"></span>Thanh Toán Đơn Hàng</a>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>
