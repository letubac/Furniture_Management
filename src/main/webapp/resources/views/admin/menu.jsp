<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>menu</title>
    <link href="${pageContext.request.contextPath}/resources/css/mos-style.css" rel='stylesheet' type='text/css' />

</head>
<body>

    <div id="leftBar">
        <ul>
            <li><a href="${pageContext.request.contextPath}/admin/home">Trang Chủ</a></li>
            <li><a href="${pageContext.request.contextPath}/admin/manager_category">Loại SP</a></li>
            <li><a href="${pageContext.request.contextPath}/admin/manager_product">Sản Phẩm</a></li>
            <li><a href="${pageContext.request.contextPath}/admin/manager_bill">Hóa Đơn</a></li>
            <li><a href="${pageContext.request.contextPath}/admin/chart">Thống Kê</a></li>
        </ul>
    </div>

</body>
</html>
