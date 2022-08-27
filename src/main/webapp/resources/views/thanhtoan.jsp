<%@page import="com.webstore.app.entity.User"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Thanh Toan</title>
        <!-- for-mobile-apps -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="keywords" content="Best Store Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, 
              Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />
        <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
            function hideURLbar(){ window.scrollTo(0,1); } </script>
        <!-- //for-mobile-apps -->
        <link href="${pageContext.request.contextPath}/resources/css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
        <link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet" type="text/css" media="all" />
        <!-- js -->
        <script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
        <!-- //js -->
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/jquery-ui.css">
        <!-- for bootstrap working -->
        <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-3.1.1.min.js"></script>
        <!-- //for bootstrap working -->
        <link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
        <link href='//fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
        <!-- animation-effect -->
        <link href="${pageContext.request.contextPath}/resources/css/animate.min.css" rel="stylesheet"> 
        <script src="${pageContext.request.contextPath}/resources/js/wow.min.js"></script>
        <script>
            new WOW().init();
        </script>
        <!-- //animation-effect -->
    </head>
    <body>
        <jsp:include page="header.jsp"></jsp:include>

            <div class="login">
                <div class="container">
                    <h3 class="animated wow zoomIn" data-wow-delay=".5s">Thanh Toán Đơn Hàng</h3>
                    <div class="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form action="checkout" method="POST">
                            <div>
                                <span>Địa chỉ(*)</span>
                                <input type="text" name="address">
                            </div>
                            <div>
                            	<span>SDT liên lạc(*)</span>
                            	<input type="text" name="phone" required/>
                            </div> 	
                            <div>
                                <span>Hình thức thanh toán(*)</span>
                                <select name="payment">
                                	<option value="Ví AirPa"> Ví AirPay</option>
                                    <option value="Thẻ ATM nội địa (Internet Banking)"> Thẻ ATM nội địa (Internet Banking) </option>
                                    <option value="Thẻ tín dụng/Ghi nợ"> Thẻ tín dụng/Ghi nợ </option>
                                    <option value="Thanh toán khi nhận hàng"> Thanh toán khi nhận hàng</option>
                                </select>
                            </div> 			
                            <input type="submit" value="Đặt hàng"> 
                        </form>
                    </div>

                </div>
            </div>

        <jsp:include page="footer.jsp"></jsp:include>
    </body>
</html>
