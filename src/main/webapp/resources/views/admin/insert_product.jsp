<%@page import="com.webstore.app.entity.User"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Thêm sản phẩm</title>

<link
	href="${pageContext.request.contextPath}/resources/css/mos-style.css"
	rel='stylesheet' type='text/css' />
<script
	src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
</head>
<body>

	<%
		User users = (User) session.getAttribute("useradmin");
		if (users == null) {
			response.sendRedirect("../../admin/login");
		}

		String error = "";
		if (request.getParameter("error") != null) {
			error = (String) request.getParameter("error");
		}
	%>

	<jsp:include page="header.jsp"></jsp:include>

	<div id="wrapper">

		<jsp:include page="menu.jsp"></jsp:include>
		<div id="rightContent">
			<h3>Thông tin sản phẩm</h3>
			<form:form
				action="${pageContext.request.contextPath}/admin/manager_product_add"
				method="post" id="test" modelAttribute="product_add"
				enctype="multipart/form-data">
				${error}
				<table width="95%">
					<tr>
						<td>
							<b>Tên sản phẩm</b>
						</td>
						<td>
							<form:input type="text" class="sedang prodName" path="prodName" />
						</td>
					</tr>

					<tr>
						<td>
							<b>Giá bán</b>
						</td>
						<td>
							<!-- <input type="text" class="sedang price" name="gia"> -->
							<form:input type="text" class="textfield sedang price"
								path="price" value="" id="extra7"
								onkeypress="return isNumber(event)" />
						</td>
					</tr>
					<tr>
						<td>
							<b>Giá nhập</b>
						</td>
						<td>
							<form:input type="text" class="textfield sedang buy" path="buy"
								value="${product.productBuy.longValue()}" id="extra7"
								onkeypress="return isNumber(event)" />
							<%=error%>
						</td>
					</tr>
					<tr>
						<td>
							<b>Số lượng</b>
						</td>
						<td>
							<form:input type="text" class="textfield sedang quantity"
								path="quantity" value="${product.productQuantity}" id="extra7"
								onkeypress="return isNumber(event)" />
							<%=error%>
						</td>
					</tr>
					<tr>
						<td>
							<b>Nhà cung cấp</b>
						</td>
						<td>
							<form:input type="text" class="sedang provider" path="provider"
								value="${product.productProvider}" />
							<%=error%>
						</td>
					</tr>
					<tr>
						<td>
							<b>Loại sản phẩm</b>
						</td>
						<td>
							<form:select path="cateId" class="cateId">
								<c:forEach items="${cates}" var="c">
									<option value="${c.categoryID}">${c.categoryName}</option>
								</c:forEach>
							</form:select>
						</td>
					</tr>

					<tr>
						<td>
							<b>Mô tả sản phẩm</b>
						</td>
						<td>
							<form:textarea class="form-textarea" id="noiDung" path="descrip"></form:textarea>
						</td>
					</tr>
					<tr>
						<td>
							<b>Hình ảnh</b>
						</td>
						<td>
							<input type="file" name ="image_test">
						</td>
					</tr>

					<tr>
						<td></td>
						<td>
							
							<input type="hidden" name="id" value="">
							<input type="submit" class="button" value="Lưu dữ liệu">
						</td>
					</tr>
				</table>
			</form:form>
		</div>
		<div class="clear"></div>

		<jsp:include page="footer.jsp"></jsp:include>
		<script>
			
		function isNumber(evt) {
		    evt = (evt) ? evt : window.event;
		    var charCode = (evt.which) ? evt.which : evt.keyCode;
		    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		        return false;
		    }
		    return true;
		}
			
		function postData(img) {
			var body = {
					command: $('.command').val(),
					image: img,
					descrip: $('#noiDung').val(),
					cateId: $('.cateId').val(),
					price: $('.price').val(),
					prodName: $('.prodName').val(),
					prodId: $('.prodId').val(),
					buy: $('.buy').val(),
					quantity: $('.quantity').val(),
					provider: $('.provider').val()
			};
			
			$.ajax({
					url : "${pageContext.request.contextPath}/admin/product/manager_product",
					type : "POST",
					contentType : "application/json",
					dataType:"json",
					data : JSON.stringify(body),
					async : false,
					success : function(result) {
						window.location.href = result.url;
					},
					error : function(jqXHR, status, errorThrown) {
					}
			});
		}
		
		function postFormData() {
			var form = new FormData();
			var file = $('#productImg')[0].files[0];
			
			if (file.name){
				form.append('hinhanh',file, file.name);
			}
				$.ajax({
					url : "${pageContext.request.contextPath}/admin/product/file",
					type : "POST",
					data : form,
					processData : false,
					contentType : false,
					async : false,
					success : function(result) {
						postData(result);
					},
					error : function(jqXHR, status, errorThrown) {
					}
				});
		}
	</script>
	</div>


</body>
</html>
