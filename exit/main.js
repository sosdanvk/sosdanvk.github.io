/*
 __     __  _    _   _  __  _____       _   _   __   
 \ \   / / | |  | | | |/ / |_   _|     | \ | |  \ \  
  \ \_/ /  | |  | | | ' /    | |       |  \| |   \ \ 
   \   /   | |  | | |  <     | |       | . ` |    > >
    | |    | |__| | | . \   _| |_   _  | |\  |   / / 
    |_|     \____/  |_|\_\ |_____| (_) |_| \_|  /_/  

    vk.com/sosdan
*/
        var curLoc = new URL(window.location.href);
        window.mobilecheck = function() {
            var check = false;
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) check = true;
            if(curLoc.searchParams.get("mobile")) check = true;
            return check;
        };
        var lang = "en";
        var started = false;
        var ended = false;
        var curTd = 0;
        var curLe = 0;
        
        document.addEventListener("DOMContentLoaded", function(event) {
            if (curLoc.searchParams.get("lang")) lang = curLoc.searchParams.get("lang");
        else if (navigator.language) lang = navigator.language.split('-')[0];
            var s = document.createElement("script");
            s.src = "./lang/" + lang + ".js";
            s.onload = function() {
			    start();
            }
            s.onerror = function() {
                s.src = "./lang/en.js";
            }
            document.body.appendChild(s);
        });

        function printLe() {
            let tds = document.getElementsByTagName("td");
            if (curTd < p.length) {

                let cursor = "_";

                if (curLe < p[curTd].length) {
                    if (" -".indexOf(p[curTd][curLe]) > -1)
                        cursor = "<wbr>_<wbr>";
                    if (p[curTd][curLe] == "\n")
                        cursor = "<br><wbr>_<wbr>";
                    if (p[curTd]==" ") cursor = " ";
                    let text = "";
                    text = p[curTd].slice(0, curLe).replace(/\n/g, "<br>")
                        + cursor
                        + "<span class='invisible'>"
                        + p[curTd].slice(curLe).slice(1).replace(/\n/g, "<br>")
                        + "</span>";
                    tds[curTd].innerHTML = text;
                    curLe++;
                } else {
                    curLe = 0;
                    curTd++;
                }
                if (curTd % 2 == 0 && curLe == 0) {
                    if (curTd > 0) tds[curTd - 1].innerHTML = p[curTd - 1].replace(/\n/g, "<br>") + "<span id='blink'><wbr>_</span>";
                    setTimeout(printLe, 4000/*speed * 50*/);
                } else {
                    if (curTd > 0) tds[curTd - 1].innerHTML = p[curTd - 1].replace(/\n/g, "<br>") + "<br><br>";
                    setTimeout(printLe, speed);
                }
				if (curTd >= p.length) {
					if (window.mobilecheck() || !document.hasFocus()) document.getElementById("buttons").style.display = "block";
					else end();
				}
            } else {
                tds[curTd - 1].innerHTML = p[curTd - 1].replace(/\n/g, "<br>") + "<span id='blink'><wbr>_</span>";
            }
			var blnk = document.getElementById("blink");
            window.scrollTo(0, blnk.clientTop + blnk.clientHeight);
        }

        function start() {
            if (!started) {
                let table = '<table><tr><td><span id="blink"><wbr>_</span></td><td></td></tr>';
                for (let i = 0; i < (p.length / 2) - 1; i++) {
                    table += '<tr><td></td><td></td></tr>';
                }
                table += '</table>';
                document.getElementById("console").innerHTML = table;
                setTimeout(printLe, 5000/*speed * 63*/);
                started = true;
            }
        }
        function end() {
            document.body.addEventListener("keydown", function (e) {
                if(!ended) {
                    if (e.keyCode == 13) {
                        play("enter");
                    } else {
                        play("n");
                    }
                }
                ended = true;
            });
        }
        function play(file) {
            let html = "<video autoplay='1' poster='./media/"+file+".jpg'>";
            html += "<source src='./media/"+file+".mp4' type='video/mp4'>";
            html += "<source src='./media/"+file+".webm' type='video/webm'>";
            html += "<img src='./media/"+file+".gif'>";
            html += "</video>";
            document.body.innerHTML = html;
			document.getElementsByTagName("video")[0].play();
        }