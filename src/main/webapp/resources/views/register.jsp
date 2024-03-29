
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Đăng ký</title>
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
        <script src="${pageContext.request.contextPath}/ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"  type="text/javascript"></script>   
        <script type="text/javascript">
            $(document).ready(function ()
            {
                var x_timer;
                $("#email").keyup(function (e)
                {
                    clearTimeout(x_timer);
                    var user_name = $(this).val();
                    x_timer = setTimeout(function ()
                    {
                        check_username_ajax(user_name);
                    }, 1000);
                });
                function check_username_ajax(username)
                {
                    $("#user-result").html('<img src="${pageContext.request.contextPath}/img/ajax-loader.gif" />');
                    $.post('CheckEmailServlet', {'username': username}, function (data)
                    {
                        $("#user-result").html(data);
                    });
                }
            });
        </script> 
        <jsp:include page="header.jsp"></jsp:include>
            <!-- breadcrumbs -->
            <div class="breadcrumbs">
                <div class="container">
                    <ol class="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><a href="${pageContext.request.contextPath}/"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>Trang Chủ</a></li>
                        <li class="active">Đăng Ký</li>
                    </ol>
                </div>
            </div>
            <!-- //breadcrumbs -->
            <!-- register -->
            <div class="register">
                <div class="container">
                    <h3 class="animated wow zoomIn" data-wow-delay=".5s">ĐĂNG KÝ</h3>
                    <p class="est animated wow zoomIn" data-wow-delay=".5s"></p>
                    <div class="login-form-grids">
                        <form class="animated wow slideInUp form-regis" data-wow-delay=".5s"  action="${pageContext.request.contextPath}/do-login" method="POST" >
                            <input type="email" placeholder="Email" required name="email" id="email">
                            <input type="password" placeholder="Mật khẩu" class="pwd" name="password" required >
                            <input type="password" placeholder="Nhập lại mật khẩu" class="repwd" required >
                            <input type="text" placeholder="Nhập số điện thoại" name="phone" required >
                            <div class="register-check-box">
                                <div class="check">
                                </div>
                            </div>
                            <input type="hidden" value="insert" name="command">
                            <button type="button" class="info" onclick="validatePhone()">Đăng Ký</button>
                            <!-- <input type="submit" value="Đăng Ký" /> -->
                        </form>
                    </div>
                    <div class="register-home animated wow slideInUp" data-wow-delay=".5s">
                        <a href="${pageContext.request.contextPath}/">Trang Chủ</a>
                    </div>
                </div>
            </div>
            <!-- //register -->
		<script type="text/javascript">
			function validatePhone(){
				if ($(".pwd").val() == $(".repwd").val()){
					$(".form-regis").submit();
				} else {
					alert("Số điện thoại không khớp");
				}
			}
		</script>
        <jsp:include page="footer.jsp"></jsp:include>
    </body>
</html>
