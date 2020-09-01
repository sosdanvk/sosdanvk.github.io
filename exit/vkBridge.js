/*
 __     __  _    _   _  __  _____       _   _   __   
 \ \   / / | |  | | | |/ / |_   _|     | \ | |  \ \  
  \ \_/ /  | |  | | | ' /    | |       |  \| |   \ \ 
   \   /   | |  | | |  <     | |       | . ` |    > >
    | |    | |__| | | . \   _| |_   _  | |\  |   / / 
    |_|     \____/  |_|\_\ |_____| (_) |_| \_|  /_/  

    vk.com/sosdan
*/
        document.addEventListener("DOMContentLoaded", function(event) {
			//debugger;
			vkBridge.send("VKWebAppInit");
			
			vkBridge.subscribe(event => {
				if (!event.detail) {
					return;
				}
		 
				const { type, data } = event.detail;
				if (type === 'VKWebAppViewHide') {
					//document.body.innerHTML = "<br>";
				}
				if (type === 'VKWebAppViewRestore') {
					if(ended) {
						document.location.reload();
					} else {
						printLe();
					}
				}
			});
		});
		
		function shareApp() {
			var divBtn = document.createElement("div");
			divBtn.style.position = "fixed";
			divBtn.style.width = "100%";
			divBtn.style.bottom = "0";
			divBtn.style.textAlign = "center";
			document.body.appendChild(divBtn);
			
			let btnRestart = document.createElement("button");
			btnRestart.innerHTML = btnsTxt[0];
			btnRestart.onclick = function(){
				document.location.reload();
			};
			divBtn.appendChild(btnRestart);
			
			let btnShare = document.createElement("button");
			btnShare.innerHTML = btnsTxt[1];
			btnShare.onclick = function(){
				vkBridge.send("VKWebAppShare", {"link": "https://vk.com/app7583491"});
			};
			divBtn.appendChild(btnShare);
			
			/*let btnGroup  = document.createElement("button");
			btnGroup.innerHTML = btnsTxt[2];
			btnGroup.onclick = function(){
				vkBridge.send("VKWebAppJoinGroup", {"group_id": 11233397});
			};*/
			divBtn.appendChild(btnGroup);
			
		}