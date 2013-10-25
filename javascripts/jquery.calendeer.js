$(function() {

  $.fn.calendeerWidget = function( options ){
    return this.each( function(){
      var opts = $.extend( {}, options );
      init.apply( this, [ "calendeer_start_input", "calendeer_end_input", opts ] );
    } );
  };

  var init = function( startClass, endClass, opts ){
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

    // Initialize times
    var startDate = new Date();
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        startDate.setMilliseconds(0);

    var endDate = new Date();
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        endDate.setMilliseconds(0);

    // pass inputs to Calendeer object
    var calendeer = new App.Calendeer( {
      startInput: $startInput,
      startTimeInput: $startTimeInput,
      endInput: $endInput,
      endTimeInput: $endTimeInput,
      defaultStartDate: startDate,
      defaultStartTime: startDate,
      defaultEndTime: endDate
    } );

    // update the hidden input's time representation on every setDateTime call
    $(this).bind( "setDateTime", function( e, type, isoDate, dateObject ) {
      if (!calendeer.options.useSugar) {
        throw new Error("Config error. Time support requires sugar.");
      } else if (!(Utils.isDate(dateObject) && dateObject.isValid())) {
        throw new Error("User error. " + dateObject + " is not a valid date");
      }

      if ( type === "start" ) {
        $startHidden.val( dateObject.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}") );
      } else if ( type === "end" ) {
        $endHidden.val( dateObject.format("{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}") );
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
