var num = 0;
var splitLine;
var questionBlock = false;
var answerBlock = false;
window.onload = function(){
    document.getElementById("click").addEventListener("click",function(){
        next();
    });
    //get URL Parameter
	var arg = new Object;
	var pair = location.search.substring(1).split('&');
	for (var i = 0; pair[i]; i++) {
		var kv = pair[i].split('=');
		arg[kv[0]] = kv[1];
	}

	var fileName = arg.file;
	if (arg.file === undefined || arg.file == "") {
		document.getElementById("question").innerHTML = "Error:filename is not set.";
	} else {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', fileName, true);
		xhr.onreadystatechange = function () {
			// 本番用
			if (xhr.readyState === 4 && xhr.status === 200) {
				load(xhr.responseText);
				next();
			}
			// ローカルファイル用
			if (xhr.readyState === 4 && xhr.status === 0) {
				load(xhr.responseText);
				next();
			}

			if (xhr.readyState === 4 && xhr.status === 404) {
				document.getElementById("question").innerHTML = "Error:not found.";
			}
		};
		xhr.send(null);
	}
}

function load(csv){
		splitLine = csv.split("\n");
		num = 0;
		document.title = splitLine[0].split(",")[0];
		//問題と答えの列が設定されている場合
		if(splitLine[0].split(",")[1] !== undefined && splitLine[0].split(",")[1] !== ""){
			questionBlock =  splitLine[0].split(",")[1].split("|")[0];
			answerBlock = splitLine[0].split(",")[1].split("|")[1];
			if(splitLine[0].split(",")[1].split("|")[2]){
				 num = parseInt(splitLine[0].split(",")[1].split("|")[2]) - 1;
			}
		}
}
function next(){
		var answerElemDisplay = document.getElementById("answer").style.display;
		if(answerElemDisplay == "block"){
				num++;
				var qAndA = splitLine[num].split(",");
				if(questionBlock !== false && answerBlock !== false){
						var questionLine = parseInt(questionBlock);
						var answerLine = parseInt(answerBlock);
				}else{
						var questionLine = 0;
						var answerLine = 1;
				}
				
				var question = qAndA[questionLine];
				var answer = qAndA[answerLine];
				
				document.getElementById("answer").style.display = "none";
				
				document.getElementById("question").textContent = question;
				document.getElementById("answer").textContent = answer;
		}else{
				document.getElementById("answer").style.display = "block";
		}
}
