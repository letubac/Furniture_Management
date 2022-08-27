<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Mail</title>

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
        
        <div class="container">
			<h3>Liên Hệ Với Chúng Tôi</h3>
			<p class="est"></p>
			<div class="mail-grids">
				<div class="col-md-8 mail-grid-left animated wow slideInLeft" data-wow-delay=".5s">
					<form>
						<input type="text" value="Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}" required="">
						<input type="email" value="Email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" required="">
						<input type="text" value="Subject" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Subject';}" required="">
						<textarea type="text"  onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Message...';}" required="">Nhắn Tin.....</textarea>
						<input type="submit" value="Xác Nhận" >
					</form>
				</div>
				<div class="col-md-4 mail-grid-right animated wow slideInRight" data-wow-delay=".5s">
					<div class="mail-grid-right1">
						
						<h4>PersonalName</h4>
						<ul class="phone-mail">
							<li><i class="glyphicon glyphicon-earphone" aria-hidden="true"></i>Phone: +84386240987</li>
							<li><i class="glyphicon glyphicon-envelope" aria-hidden="true"></i>Email: <a href="mailto:info@example.com">Chungquex2@gmail.com</a></li>
						</ul>
						<ul class="social-icons">
							<li><a href="https://www.facebook.com/Letubac99/" class="facebook"></a></li>
							<li><a href="https://twitter.com/Mo0nS1" class="twitter"></a></li>
							<li><a href="https://mail.google.com/mail/u/0/#inbox" class="gmail"></a></li>
							<li><a href="https://www.instagram.com/letubac/" class="instagram"></a></li>
						</ul>
					</div>
				</div>
				<div class="clearfix"> </div>
			</div>
			<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1hSZ2SrvBClxolpFGOFuVPyMOAJw" width="1140" height="380"></iframe>
		</div>
        <jsp:include page="footer.jsp"></jsp:include>
    </body>
</html>
