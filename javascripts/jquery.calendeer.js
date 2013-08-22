$(function() {

  $.fn.calendeerWidget = function( options ){
    return this.each( function(){
      var opts = $.extend( {}, options );
      init.apply( this, [ "calendeer_start_input", "calendeer_end_input", opts ] );
    } );
  };

  var init = function( startClass, endClass ){
    var $startInput = $(this).find("." + startClass),
    $endInput = $(this).find("." + endClass),
    $startTimeInput,
    $endTimeInput,
    startName = $startInput.attr( "name" ),
    endName = $endInput.attr( "name" ),
    $startHidden = $( '<input type="hidden" />' ).attr( {
      name: startName,
      id: startClass
    } ),
    $endHidden = $( '<input type="hidden" />' ).attr( {
      name: endName,
      id: endClass
    } );

    $startInput.attr( "class", startClass + "_calendeer" ).removeAttr( "name" );
    $endInput.attr( "class", endClass + "_calendeer" ).removeAttr( "name" );
    $startTimeInput = $startInput.clone().attr( "class", startClass + "_time_calendeer" );
    $endTimeInput = $endInput.clone().attr( "class", endClass + "_time_calendeer" );

    $startInput.after( $startTimeInput ).after( $startHidden );
    $endInput.after( $endTimeInput ).after( $endHidden );

    // pass inputs to Calendeer object
    var calendeer = new App.Calendeer( {
      startInput: $startInput,
      startTimeInput: $startTimeInput,
      endInput: $endInput,
      endTimeInput: $endTimeInput
    } );

    // update the hidden input's time representation on every setDateTime call
    $(this).bind( "setDateTime", function( e, type, isoDate, dateObject ) {
      if ( type === "start" ) {
        $startHidden.val( isoDate );
      } else if ( type === "end" ) {
        $endHidden.val( isoDate );
      }
    } );

    calendeer.el.insertAfter( $endTimeInput );
    calendeer.clearEventQueue();

    // hide Calendeer unless one of the four inputs is selected
    $(this).delegate(':input', 'focus', function() { 
      var ae = document.activeElement;
      var focusedClasses = ae.className;
      var inputClasses = [ startClass + "_calendeer",
                           endClass + "_calendeer",
                           startClass + "_time_calendeer",
                           endClass + "_time_calendeer" ];
      var showCalendeer = false;

      $.each( inputClasses, function( i, cl ) {
        showCalendeer = showCalendeer || ( focusedClasses.indexOf( cl ) !== -1 );
      });

      showCalendeer ? calendeer.el.slideDown() : calendeer.el.slideUp();
    });

    calendeer.el.hide();
  }

});
