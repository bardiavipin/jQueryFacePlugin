	


    function addATag(){
    	var tagNames= document.getElementsByClassName("tag");
		if($('#queryfill').val()!='' && tagNames[1]!=undefined){
    		tagNames[1].parentNode.removeChild(tagNames[1]);
    		return;
    	}	
    	if($('#queryfill').val()!='' && tagNames[1]==undefined){
	    	editTag(1);
	    	editTagImage();
    	}
    }

    function removeTags(){
    	var tagNames= document.getElementsByClassName("tag");
    	if(tagNames[0]!=undefined){
			tagNames[0].parentNode.removeChild(tagNames[0]);
    	}
    }
    function removeAlltags(){
    	var tagNames= document.getElementsByClassName("tag");
    	for(var i=0;i<tagNames.length;i++){
    		tagNames[i].parentNode.removeChild(tagNames[i]);
    	}
    }
    function removeATag(){
    	removeTags();
    	removeTagById(divCount);
    	clearInputBox();
    	divCount--;
    }
    function removeTagById(tagId){
    	removeMapArea(tagId);
    	removeRectangle(tagId);
    	removeTagArea(tagId);
    	removeInputElement(tagId);
    }
    function changeATag(){
    	alert($('#queryfill').val());
    }
    function editTagImage(){
    	$('#target').Jcrop({
            onChange:   showCoords,
            onSelect:   showCoords,
            onRelease:  clearCoords},function(){
            j_crop=this;
          });
		showAllArea();
    }
    
    function editTag(no){
    	destroyCrop();
		if(no==1){
			divCount++;
			createMapAreas();
			drawrectangle("blackrectangle");
    	}
		else if(no==0){
			hideAllArea();			
		}
    }
    function createInputElements(topHeight){
		var coordinatesNTag= $('#x1').val() + "," + $('#y1').val() + "," + $('#x2').val() + "," + $('#y2').val() + "," + $('#w').val() + "," + $('#h').val() + "," +  $('#queryfill').val() + "," +topHeight;
		var hiddenId="inputEl"+divCount;
		var $hiddenInput = $('<input/>',{type:'hidden',id:hiddenId,name:'tagValues',value:coordinatesNTag});
		$hiddenInput.appendTo('#coords');
	}
    function createMapAreas(){
    	var newMap = document.getElementById('imageMap');
    	var newarea = document.createElement('area');
    	var coordinates= $('#x1').val() + "," + $('#y1').val() + "," + $('#x2').val() + "," + $('#y2').val()  ;
    	
    	newarea.setAttribute('href','#');
    	newarea.setAttribute('shape', 'rect');
    	newarea.setAttribute('coords', coordinates);
    	newarea.setAttribute('alt', $('#queryfill').val());
    	newarea.setAttribute('title', $('#queryfill').val());
    	newarea.setAttribute("onmousemove","displayArea(" + divCount + ")");
    	newarea.setAttribute("id","area" + divCount);
    	
    	newMap.appendChild(newarea);
    }
    function removeMapArea(areaIdMap){
    	mapArea = document.getElementById("area" + areaIdMap);
    	mapArea.parentNode.removeChild(mapArea);
    }
    function removeRectangle(rectangleId){
    	rectangle = document.getElementById("rect" + rectangleId);
    	rectangle.parentNode.removeChild(rectangle);
    }
    function removeTagArea(tagDivId){
    	tagArea = document.getElementById("tagDiv" + tagDivId);
    	tagArea.parentNode.removeChild(tagArea);
    }
    function removeInputElement(inputId){
    	inputEl = document.getElementById("inputEl" + inputId);
    	inputEl.parentNode.removeChild(inputEl);
    }
    function createTag(){
    	//alert($('#queryfill').val());
    }
    // Simple event handler, called from onChange and onSelect
    // event handlers, as per the Jcrop invocation above
    function showCoords(c)
    {
      $('#x1').val(c.x);
      $('#y1').val(c.y);
      $('#x2').val(c.x2);
      $('#y2').val(c.y2);
      $('#w').val(c.w);
      $('#h').val(c.h);
      changePosition(c.x,c.y2);
      clearInputBox();
  	  removeTags();
      displayBox();
	  startfocus();
    };

    function clearCoords()
    {
      $('#coords input[text]').val('');
      destroyCrop();
      hideBox();
      
      var imgTarget = document.getElementById("target");
      imgTarget.setAttribute( "style", "" );
    };
    function destroyCrop(){
    	j_crop.destroy();
    }
	function changePosition(left,top){
		var box = document.getElementById('moveMe');

		box.style.position = 'absolute';  // position it
		box.style.left = left + 20 + "px";
		box.style.top = top + 60 + "px";
	}
	function hideBox(){
		var box = document.getElementById('moveMe');
		box.style.display="none";
		clearInputBox();
		removeAlltags();
	}
	function clearInputBox(){
		$('#queryfill').val("");
	}
	function displayBox(){
		var box = document.getElementById('moveMe');
		box.style.display="block";
	}

	function startfocus() {
		jQuery("#queryfill_tag").focus();
	}

	function submitURL() {
		var str = $('#queryfill').val();
		return (str.trim() != "");
	}

	
	function drawrectangle(myclass)
	{
		var pos = $("#target").position(); // returns an object with the attribute top and left
	    var bodylist = document.getElementById("MainDiv");
	    var rect = document.createElement( "div" );
	    var topHeight=Number(pos.top)+ Number($('#y1').val());
	 
	    var mystyle = 'position:absolute;top:' + topHeight +"px;left:" + $('#x1').val() + 'px;width:' + $('#w').val() + "px;height:" + $('#h').val() + "px;display:block";
	    rect.setAttribute( "id",  "rect" + divCount);
	    rect.setAttribute( "class",  myclass );
	    rect.setAttribute( "style", mystyle );
	    rect.setAttribute( "onclick", "hitTaggedUser(" + divCount + ")");
	    bodylist.appendChild(rect);
	    createRectElements();
	    createInputElements(topHeight);
	}
	
	function createRectElements(){
		createInnerRect();
		createLinkView();
	}
	function createInnerRect(){
		var structForRect="<div class='innerTag' id='tagNameOnDiv" + divCount + "'>" + $("#area"+divCount).attr("title") + "</div><a href= '#' class='photoTag-delete' onclick='removeTagById(" + divCount+ ");return false;'></a>";
		$("#rect"+divCount).html(structForRect);
	}
	function createLinkView(){
		var structForTagName="<div class='innerTag innerTagAddMargin' id='tagDiv"+ divCount + "'><span onclick='hitTaggedUser(" + divCount + ")'  onmouseout='hideArea(" + divCount +")' onmousemove='displayArea(" + divCount + ")'>" + $("#area"+divCount).attr("title") + "</span><a href= '#' class='photoTag-delete-anthr' onmousemove='displayArea(" + divCount + ")' onmouseout='hideArea(" + divCount +")' onclick='removeTagById(" + divCount+ ");return false;'></a></div>";
		$("#tagNames").append(structForTagName);
	}
	function showAllArea(){
		$('.blackrectangle').show();
	}
	function hideAllArea(){
		$('.blackrectangle').hide();			
	}
	function displayArea(showMapAreaById){
		$("#rect"+showMapAreaById).show();
	}
	function hideArea(hideMapAreaById){
		$("#rect"+hideMapAreaById).hide();
	}

	function hitTaggedUser(tagId){
		UrlExists('/web/'+$("#area" + tagId).attr("title"));
	}
	function UrlExists(url) {
		  var http = new XMLHttpRequest();
		  http.open('HEAD', url, false);
		  http.send();
		  if(http.status==200){
			  document.location.href=url;
		  } else{
			  var halt=http.abort();
		  }
		}
	
	
