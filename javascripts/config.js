$(function(){

  var init = function( startID, endID ) {
    var $startInput = $("#" + startID),
        $endInput = $("#" + endID),
        $startTimeInput,
        $endTimeInput,
        startName = $startInput.attr( "name" ),
        endName = $endInput.attr( "name" ),
        $startHidden = $( '<input type="hidden" />' ).attr( {
          name: startName,
          id: startID
        } ),
        $endHidden = $( '<input type="hidden" />' ).attr( {
          name: endName,
          id: endID
        } );

    $startInput.attr( "id", startID + "_calendeer" ).removeAttr( "name" );
    $endInput.attr( "id", endID + "_calendeer" ).removeAttr( "name" );
    $startTimeInput = $startInput.clone().attr( "id", startID + "_time_calendeer" );
    $endTimeInput = $endInput.clone().attr( "id", endID + "_time_calendeer" );

    $startInput.after( $startTimeInput ).after( $startHidden );
    $endInput.after( $endTimeInput ).after( $endHidden );

    var calendeer = new App.Calendeer( {
      startInput: $startInput,
      startTimeInput: $startTimeInput,
      endInput: $endInput,
      endTimeInput: $endTimeInput
    } );

    $(document).bind( "setDateTime", function( e, type, isoDate, dateObject ) {
      if ( type === "start" ) {
        $startHidden.val( isoDate );
      } else if ( type === "end" ) {
        $endHidden.val( isoDate );
      }
    } );

    return function() {
      calendeer.el.insertAfter( $endTimeInput );
    };

  };

  var callback = function() {};
  if ( $('#offerStartDate_ID').length ) {
    // Page 1
    callback = init( "offerStartDate_ID", "offerEndDate_ID" );
  } else if ( $('#startAdvTargetDate_ID').length ) {
    // Page 3
    callback = init( "startAdvTargetDate_ID", "endAdvTargetDate_ID" );
  }

  $( "<link />", {
    href: "//paypal-moonwalk.s3.amazonaws.com/stylesheets/calendeer.css",
    rel: "stylesheet",
    type: "text/css"
  } ).appendTo( $("head") ).bind( "load", callback );

});