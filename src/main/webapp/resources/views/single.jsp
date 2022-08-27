<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Chi tiết sản phẩm</title>

        <link href="${pageContext.request.contextPath}/resources/css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
        <link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet" type="text/css" media="all" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/flexslider.css" type="text/css" media="screen" />
        <!-- js -->
        <script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/bootstrap-notify.min.js"></script>
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
            $(document).ready(function() {
            	$('.active').removeClass('active');
            	$('.product').addClass('active');
            });
            function addItem(id){
            	console.log(id);
        		$.ajax({
    				url : "${pageContext.request.contextPath}/cart/plus/"+id,
    				type : "GET",
    				async : false,
    				success : function(result) {
    					generateNotify(result.message);
    					updateCart(result);
    				},
    				error : function(jqXHR, status, errorThrown) {
    					generateNotify(errorThrown);
    				}
    				});
        	}
        	function subItem(id){
        		$.ajax({
    				url : "${pageContext.request.contextPath}/cart/sub/"+id,
    				type : "GET",
    				async : false,
    				success : function(result) {
    					generateNotify(result.message);
    					updateCart(result);
    				},
    				error : function(jqXHR, status, errorThrown) {
    					generateNotify(errorThrown);
    				}
    				});
        	}
        	function removeItem(id){
        		$.ajax({
    				url : "${pageContext.request.contextPath}/cart/plus/"+id,
    				type : "GET",
    				async : false,
    				success : function(result) {
    					generateNotify(result.message);
    					updateCart(result);
    				},
    				error : function(jqXHR, status, errorThrown) {
    					generateNotify(errorThrown);
    				}
    				});
        	}
        	
        	function updateCart(data) {
        		$(".simpleCart_total").text(data.price);
        		$(".simpleCart_quantity").text(data.quantity);
        	}
        	
        	function generateNotify(mess) {
        			$.notify({
      			      title: '<strong>Thông báo: </strong>',
      			      icon: 'glyphicon glyphicon-star',
      			      message: mess
      			    },{
      			      type: 'info',
      			      animate: {
      					    enter: 'animated fadeInDown',
      			        	exit: 'animated fadeOutUp'
      			      },
      			      placement: {
      			        from: "top",
      			        align: "right"
      			      },
      			      newest_on_top: true,
      			      offset: 40,
      			      spacing: 10,
      			      z_index: 1031,
      			    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
      				'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
      				'<span data-notify="icon"></span> ' +
      				'<span data-notify="title">{1}</span> ' +
      				'<span data-notify="message">{2}</span>' +
      				'<div class="progress" data-notify="progressbar">' +
      					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      				'</div>' +
      				'<a href="{3}" target="{4}" data-notify="url"></a>' +
      			'</div>'
      			    });
        		}
        </script>
    </head>
    <body>
        <div class="container">
            <div class="header-grid">
                <div class="header-grid-left animated wow slideInLeft" data-wow-delay=".5s">
                    <ul>
                        <li><i class="glyphicon glyphicon-envelope" aria-hidden="true"></i><a href="mailto:info@example.com">Chungquex2@gmail.com</a></li>
                        <li><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i>+84386240987</li>
                        <%                                if (session.getAttribute("user") != null) {
                            %>
                        <li><i class="glyphicon glyphicon-book" aria-hidden="true"></i><a href='${pageContext.request.contextPath}/logout'>Thoát</a></li>

                        <%} else {%>
	                        <li><i class="glyphicon glyphicon-log-in" aria-hidden="true"></i><a href="${pageContext.request.contextPath}/login">Đăng Nhập</a></li>
	                        <li><i class="glyphicon glyphicon-book" aria-hidden="true"></i><a href="${pageContext.request.contextPath}/register">Đăng Ký</a></li>
                        <%}%>
                    </ul>
                </div>
                <div class="header-grid-right animated wow slideInRight" data-wow-delay=".5s">
                    <ul class="social-icons">
                        <li><a href="https://www.facebook.com/Letubac99/" class="facebook"></a></li>
						<li><a href="https://twitter.com/Mo0nS1" class="twitter"></a></li>
						<li><a href="https://mail.google.com/mail/u/0/#inbox" class="gmail"></a></li>
						<li><a href="https://www.instagram.com/letubac/" class="instagram"></a></li>
                    </ul>
                </div>
                <div class="clearfix"> </div>
            </div>
            <div class="logo-nav">
                <div class="logo-nav-left animated wow zoomIn" data-wow-delay=".5s">
                    <h1><a href="${pageContext.request.contextPath}/">Nội thất <span>Shop anywhere</span></a></h1>
                </div>
                <div class="logo-nav-left1">
                    <nav class="navbar navbar-default">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header nav_2">
                            <button type="button" class="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse" id="bs-megadropdown-tabs">
                            <ul class="nav navbar-nav">
                                <li><a href="${pageContext.request.contextPath}">Trang chủ</a></li>	
                                <!-- Mega Menu -->
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Sản phẩm <b class="caret"></b></a>
                                    <ul class="dropdown-menu multi-column columns-3">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <ul class="multi-column-dropdown">
                                                   <c:forEach items="${cates}" var="c">
							                        	<li> <a href="${pageContext.request.contextPath}/single/product/${c.categoryID}">${c.categoryName}</a> </li> 
							                        </c:forEach>
                                                </ul>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>                                       
                                    </ul>
                                </li>        
                                <li class="dropdown policy">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Chính Sách <b class="caret"></b></a>
                                    <ul class="dropdown-menu multi-column columns-3">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <ul class="multi-column-dropdown">                                                  
                                                    <li><a href="${pageContext.request.contextPath}/delivery">Chính Sách Giao Hàng</a></li>
                                                    <li><a href="${pageContext.request.contextPath}/delivery">Chính Sách Bảo Hành</a></li>
                                                </ul>
                                            </div>                                                                                       
                                            <div class="clearfix"></div>
                                        </div>
                                    </ul>
                                </li>                       
                                <li><a href="#">Liên hệ</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                 <div class="logo-nav-right">
                    <div class="search-box">
                        <div id="sb-search" class="sb-search sb-search-open">
                            <form action="${pageContext.request.contextPath}/product/search">
                                <input class="sb-search-input" name="keyword" placeholder="Tìm kiếm sản phẩm..." type="search" id="search">
                                <input class="sb-search-submit" type="submit" value="">
                                <span class="sb-icon-search"> </span>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="header-right">
                    <div class="cart box_1">
                        <a href="${pageContext.request.contextPath}/checkout">
                            <h3> <div class="total">
                                   <span class="simpleCart_total">${totalPrices.longValue()}</span> VNĐ
                                    (<span id="simpleCart_quantity" class="simpleCart_quantity">${quantity}</span> Sản Phẩm)
                                <img src="${pageContext.request.contextPath}/resources/images/bag.png" alt="" />
                            </h3>
                        </a>
                        <p><a href="javascript:;" class="simpleCart_empty">Giỏ Hàng</a></p>
                        <div class="clearfix"> </div>
                    </div>	
                </div>
                <div class="clearfix"> </div>
            </div>
        </div>
        <div class="container" style="margin-top: 40px;">
            <ol class="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><a href="${pageContext.request.contextPath}/"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>Trang chủ</a></li>
                <li class="active">Chi tiết sản phẩm</li>
            </ol>
        </div>
        <div class="container" style="padding-top: 20px;">
            <div class="col-md-4 products-left">
                
                <div class="categories animated wow slideInUp" data-wow-delay=".5s">
                    <h3>Lọc Sản Phẩm</h3>
                    <ul class="cate">
                        <c:forEach items="${cates}" var="c">
                        	<li><a 
                                href="${pageContext.request.contextPath}/single/product/${c.categoryID}">${c.categoryName}
                            </a> </li> 
                        </c:forEach>

                    </ul>
                </div>


            </div>
            <div class="col-md-8 single-right">
                <div class="col-md-5 single-right-left animated wow slideInUp" data-wow-delay=".5s">
                    <div class="flexslider">
                        <ul class="slides">
                            <li data-thumb="${product.productImage}">
                                <div class="thumb-image"> <img src="${pageContext.request.contextPath}/${product.productImage}" data-imagezoom="true" class="img-responsive"> </div>
                            </li> 
                        </ul>
                    </div>
                    <!-- flixslider -->
                    <script defer src="${pageContext.request.contextPath}/resources/js/jquery.flexslider.js"></script>
                    
                    <script>
                        // Can also be used with $(document).ready()
                        $(window).load(function () {
                            $('.flexslider').flexslider({
                                animation: "slide",
                                controlNav: "thumbnails"
                            });
                        });
                    </script>
                    <!-- flixslider -->
                </div>
                <div class="col-md-7 single-right-left simpleCart_shelfItem animated wow slideInRight" data-wow-delay=".5s">
                    <h3>${product.productName}</h3>
                    <h4><span class="item_price"><fmt:formatNumber value="${product.productPrice}" type="currency" currencySymbol=""/> VNĐ</span></h4>
                    <div class="rating1">
                        <span class="starRating">
                            <input id="rating5" type="radio" name="rating" value="5">
                            <label for="rating5">5</label>
                            <input id="rating4" type="radio" name="rating" value="4">
                            <label for="rating4">4</label>
                            <input id="rating3" type="radio" name="rating" value="3" checked>
                            <label for="rating3">3</label>
                            <input id="rating2" type="radio" name="rating" value="2">
                            <label for="rating2">2</label>
                            <input id="rating1" type="radio" name="rating" value="1">
                            <label for="rating1">1</label>
                        </span>
                    </div>
                    <div class="description">
                        <h5><i>Thông tin</i></h5>
                        <p>${product.productDescription}</p>
                    </div>
                    <div class="color-quality">


                        <div class="clearfix"> </div>
                    </div>

                    <div class="occasion-cart">
                        <a class="item_add" style="cursor:pointer" onclick="addItem(${productId})">Thêm vào giỏ hàng </a>
                    </div>
                </div>
                <div class="fb-comments" data-href="http://localhost:8080/${pageContext.request.contextPath}/single/${productId}" data-numposts="3" style="margin-top:50px"></div>
                <div class="clearfix"> </div>               
            </div>
            <div class="clearfix"> </div>
        </div>

        <jsp:include page="footer.jsp"></jsp:include>

    </body>
</html>
