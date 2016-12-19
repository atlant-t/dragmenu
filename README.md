# ��� ������?
������� ��������� ����, ������� ����� ���������� �� �������.
# ����������
� jQuery<br>
� Bootstrap

# �������������
## ����������� �� ��������� �������
���������� Drugmenu
```html
<head>
	<!-- ����� Bootstrap -->
	<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/bootstrap/css/bootstrap-theme.min.css">
	
	<!-- ����� Drugmenu -->
	<link rel="stylesheet" href="/dragmenu/css/dragmenu.css">
	
	<!-- jQuery -->
	<script src="/jquery-3.1.0.js"></script>
	<!-- Bootstrap -->
	<script src="/bootstrap/js/bootstrap.js"></script>
	
	<!-- ������ Drugmenu -->
	<script src="/dragmenu/js/dragmenu.js"></script>
</head>
```
���������� � ������
```html
	<div class="container">
		<div class="row">
			<!-- ����� ������ ������ ����� col- -->
			<div class="col-xs-6 dragmenu-xs dragmenu-close">
				<!-- ������� ������ ��� ������� -->
				<div class="dragmenu-btn">
					<p>���������</p>
				</div>
				<!-- ���� ������ -->
				<div class="dragmenu-content bg-gray-light">
					<ul id="dragmenu-content">
						<li><a href="/">����� 1</a></li>
						<li><a href="/">����� 2</a></li>
						<li><a href="/">����� 3</a></li>
						<li><a href="/">����� 4</a></li>
						<li><a href="/">����� 5</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
```
## ����������� �� ��������� jQuery
```js
$('#my-drugmenu').drugmenu()
```
# ������
dragmenu-close � ��������� ����
# �������
stay.bs.block.dragmenu � ���������� �������� ����<br>
drag.bs.block.dragmenu � ������ ����������� ���� ��������������