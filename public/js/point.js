$("#btnSave").click(function(){
	let searchText = $("#searchText").val();
	window/location.replace('?searchText=' + searchText);
});