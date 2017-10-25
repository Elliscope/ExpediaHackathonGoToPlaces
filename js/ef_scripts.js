function searchButtonClicked() {
    
    //prevent the submit function that triggers the page to refresh

    //Global variable:
    var apiServerIP = "http://localhost:8080/";



    // ________________________________________________________________




    event.preventDefault();
    var departure_location = document.getElementById("departureFrom_ef").value;
    departure_location=departure_location.replace(" ","%20");
    var destination = document.getElementById("travelTo_ef").value;
    destination=destination.replace(" ","%20");
    var departing = document.getElementById("departing_ef").value;
    var returning = document.getElementById("returning_ef").value;
    var budget = document.getElementById("budget_ef").value;

    //convert date format
    departing = dateFormat(departing);
    returning = dateFormat(returning);


    var jsonText;
    var path ;  

    if(destination){
      path = apiServerIP+"Test/test?start_date="+departing+"&end_date="+returning+"&departureCity="+departure_location+"&destinationCity="+destination+"&budget="+budget;
    }else{
    }
          path =apiServerIP+"Test/test?start_date="+departing+"&end_date="+returning+"&departureCity="+departure_location+"&budget="+budget;

   //temporary assign to non dest


    console.log("This is Destination value");
    console.log(destination);
    console.log(path);
    //use theUrl for static testing purpose
    var theUrl = apiServerIP+"Test/test?start_date=2017-10-26&end_date=2017-10-30&departureCity=Seattle&budget=3000";


      $.ajax({
        url: path,
        type: 'GET',
        async: false,
        header: 'Access-Control-Allow-Origin',
        success: function(msg) {
            document.getElementById("json").innerHTML = msg;
            jsonText = msg;
        }
     }); 

     //Conver the Json Text to Javascript Object
     var noDestJsonObjList = JSON.parse(jsonText);
     //append the flex card into the html and display the destination for the 

   for (var i = 0, len = noDestJsonObjList.length; i < len; ++i) {
         var noDestContent = noDestJsonObjList[i];
         var picUrl = 'css/'+ noDestContent.CityName.replace(/\s/g, '')+'.jpg';
         var dest = noDestContent.CityName;
         var destApiFormat = dest.replace(" ","%20");
         var pric = noDestContent.MinPrice;
         var apiId = apiServerIP + "Test/test?start_date="+departing+"&end_date="+returning+"&departureCity="+departure_location+"&destinationCity="+dest+"&budget="+budget;

         var flexCardComponent = "<div id='"+apiId+"' onclick= 'nonDestTileClicked(this.id)' class='uitk-col '><div class='flex-card has-link' id='"+apiId+"' onclick= 'nonDestTileClicked(this.id)><div class='flex-figure'><figure class='image aspect-ratio16-9 loading' data-media-type='image' data-lazy='true' data-src="+picUrl+" data-aspect-ratio='16-9' data-class='tile-media'><noscript><img src='path/to/image.jpg' alt=' class='tile-media' /></noscript><span class='media-loader'><span class=' loader-primary loader-light loader-static loading' aria-hidden='true' title='Loading...'></span></span></figure></div><div class='message-flag flex-flag'>Save Huge!</div><div class='flex-content'><div class='flex-area-primary'><h2 class='flex-title truncate'>"+dest+"</h2><p class='secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed lobortis leo.</p></div><div class='flex-area-secondary'><p><span class='flex-price'>"+pric+"</span></p></div></div><div class='flex-area-tertiary'><button type='button' data-control='remove' data-target-id='ace-hotel' class='btn-primary btn-close module-close flex-close'><span class='icon icon-close' aria-hidden='true'></span><span class='alt'>Close</span></button></div></div></div>"
         insertNoDestFlexCardContent("#no-destination-content",flexCardComponent);   
      }

   
   // $( "#WizardHero" ).hide();
}

function insertNoDestFlexCardContent(parent_id,component){
   $( parent_id ).append(component);
   // $( "#ace-hotel1" ).show();
}

   
function dateFormat(date){
    var dateAr = date.split('/');
    var newDate = dateAr[2] + '-' + dateAr[0] + '-' + dateAr[1];
    return newDate;
}

function nonDestTileClicked(api_path){
   alert("nonDestTileClicked Trigged Path: " + api_path);
   // var destJsonText;


   // //ajax call to the api to retrive the bundle info
   //   $.ajax({
   //      url: api_path,
   //      type: 'GET',
   //      async: false,
   //      header: 'Access-Control-Allow-Origin',
   //      success: function(msg) {
   //          document.getElementById("json").innerHTML = msg;
   //          destJsonText = msg;
   //      }
   //   }); 

   //   //Conver the Json Text to Javascript Object
   //   var DestJsonObjList = JSON.parse(destJsonText);
   //   //append the flex card into the html and display the destination for the 

   // for (var i = 0, len = DestJsonObjList.length; i < len; ++i) {
   //       var DestContent = DestJsonObjList[i];
   //       var picUrl = 'css/'+ noDestContent.CityName.replace(/\s/g, '')+'.jpg';
   //       var dest = noDestContent.CityName;
   //       var pric = noDestContent.MinPrice;
   //       var apiId = apiServerIP + "Test/test?start_date="+departing+"&end_date="+returning+"&departureCity="+departure_location+"&destinationCity="+dest+"&budget="+budget;

   //       var flexCardComponent = "<div id='"+apiServerIP+"' onclick= 'nonDestTileClicked(this.id)' class='uitk-col '><div class='flex-card has-link'><div class='flex-figure'><figure class='image aspect-ratio16-9 loading' data-media-type='image' data-lazy='true' data-src="+picUrl+" data-aspect-ratio='16-9' data-class='tile-media'><noscript><img src='path/to/image.jpg' alt=' class='tile-media' /></noscript><span class='media-loader'><span class=' loader-primary loader-light loader-static loading' aria-hidden='true' title='Loading...'></span></span></figure></div><div class='message-flag flex-flag'>Save Huge!</div><div class='flex-content'><div class='flex-area-primary'><h2 class='flex-title truncate'>"+dest+"</h2><p class='secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed lobortis leo.</p></div><div class='flex-area-secondary'><p><span class='flex-price'>"+pric+"</span></p></div></div><a class='flex-link' href='http:/'>link info</a><div class='flex-area-tertiary'><button type='button' data-control='remove' data-target-id='ace-hotel' class='btn-primary btn-close module-close flex-close'><span class='icon icon-close' aria-hidden='true'></span><span class='alt'>Close</span></button></div></div></div>"
   //       insertNoDestFlexCardContent("#no-destination-content",flexCardComponent);   
   //    }
}


 