function resize() {
 var canvas = document.getElementById("canvas");
 var parent = canvas.parentNode;
 var width = parent.clientWidth;
 var height = parent.clientHeight;
 canvas.width = width;
 canvas.height = height;
 canvas.style.display = displayBackup;
 }