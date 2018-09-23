/*
	csv.question.js Viewer
	Show a csv file as a remember sheet.
	
	Made with jQuery.
	
	(C)2018 Soruto Project.
	License:MIT
*/

window.onload = function () {
	//get URL Parameter
	var arg = new Object;
	var pair = location.search.substring(1).split('&');
	for (var i = 0; pair[i]; i++) {
		var kv = pair[i].split('=');
		arg[kv[0]] = kv[1];
	}

	var fileName = arg.file;
	if (arg.file === undefined || arg.file == "") {
		document.getElementById("contents").innerHTML = "Error:filename is not set.";
	} else {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "../" + fileName, true);
		xhr.onreadystatechange = function () {
			// 本番用
			if (xhr.readyState === 4 && xhr.status === 200) {
				load(xhr.responseText);
			}
			// ローカルファイル用
			if (xhr.readyState === 4 && xhr.status === 0) {
				load(xhr.responseText);
			}

			if (xhr.readyState === 4 && xhr.status === 404) {
				document.getElementById("contents").innerHTML = "Error:not found.";
			}
		};
		xhr.send(null);
	}
}

function load(csv) {
	var contents = document.getElementById("contents");
	contents.innerHTML = ""; //clear
	var lineSplit = csv.split("\n");
	var title = lineSplit[0].split(",")[0];
	document.title = title;
	contents.innerHTML = "<b>" + title + "</b>";
	var table = document.createElement("table");
	table.id = "contentsTable";
	contents.appendChild(table);
	for (var i = 1; i < lineSplit.length; i++) {
		var qa = lineSplit[i].split(",");
		var tr = document.createElement("tr");
		for (var qi = 0; qi < qa.length - 1; qi++) {
			var text = qa[qi];
			console.log(text);
			var elem = document.createElement("td");
			elem.innerHTML = text;
			if (elem.innerHTML !== "") {
				tr.appendChild(elem);
			}
		}
		document.getElementById("contentsTable").appendChild(tr);
	}
}
