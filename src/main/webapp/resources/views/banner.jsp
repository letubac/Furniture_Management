
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <!-- banner -->
	<div class="banner" style="margin-top:20px">
		<div class="container">
			<div class="banner-info animated wow zoomIn" data-wow-delay=".5s">
				<h3>Mua sắm Online</h3>
				<h4>Giảm giá lên tới<span>50% <i></i></span></h4>
				<div class="wmuSlider example1">
					<div class="wmuSliderWrapper">
						<article style="position: absolute; width: 100%; opacity: 0;"> 
							<div class="banner-wrap">
								<div class="banner-info1">
									<p>Sản phẩm đa dạng</p>
								</div>
							</div>
						</article>
						<article style="position: absolute; width: 100%; opacity: 0;"> 
							<div class="banner-wrap">
								<div class="banner-info1">
									<p>Đảm bảo an toàn</p>
								</div>
							</div>
						</article>
						<article style="position: absolute; width: 100%; opacity: 0;"> 
							<div class="banner-wrap">
								<div class="banner-info1">
									<p>Tiện lợi cho người tiêu dùng </p>
								</div>
							</div>
						</article>
						
					</div>
				</div>
					<script src="${pageContext.request.contextPath}/resources/js/jquery.wmuSlider.js"></script> 
					<script>
						$('.example1').wmuSlider();         
					</script> 
			</div>
		</div>
	</div>
<!-- //banner -->
    </body>
</html>
