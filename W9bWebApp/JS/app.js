//The URIs of the REST endpoint
IUPS = "https://prod-21.northeurope.logic.azure.com:443/workflows/acea0df464eb4486a5a93e7bc3f2903b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yuRNqyjsurYI3RQft-cWmBKQbdB9R6gn_fPYdJL1Fd4";
RAI = "https://prod-25.northeurope.logic.azure.com:443/workflows/504c0ef09254483db935db3f12f8295c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9RD1i9_UsPKFDYApgvewJ6YuwcsSYgjAu2ZQOY591Yw";

BLOB_ACCOUNT = "https://vidshareb00777354.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

submitData = new FormData();

submitData.append('FileName',$('#FileName').val());
submitData.append('userID',$('#userID').val());
submitData.append('Title',$('#Title').val());
submitData.append('Publisher',$('#Publisher').val());
submitData.append('Genre',$('#Genre').val());
submitData.append('AgeRating',$('#AgeRating').val());
submitData.append('File',$('#UpFile')[0].files[0]);

$.ajax({
  url: IUPS,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success:function(data){

  }
});


}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){


$('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAI, function(data) {

    var items = [];

    console.log("Hello");

    $.each(data, function(key, val){
      items.push("<hr />");
      items.push("<video src='"+BLOB_ACCOUNT + val["filePath"] +"' width='320' height='240' controls></video><br />")
      items.push("File:"+val["fileName"] + "<br/>");
      items.push("Title:"+val["Title"] + "<br/>");
      items.push("Uploaded by:"+val['Publisher']+ "<br/>" + "(user id: "+val["userID"]+")<br/>");
      items.push("Producer:"+val["Producer"] + "<br/>");
      items.push("Genre:"+val["Genre"] + "<br/>");
      items.push("AgeRating:"+val["AgeRating"] + "<br/>");
      items.push("<hr />");

  });

  console.log(items)

  $('#ImageList').empty();

  $("<ul/>",{
    "class":"my-new-list",
    html: items.join("")
  }).appendTo("#ImageList");

  });
}

