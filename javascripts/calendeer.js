$(function(){

  var confs = {
    numberOfCalendars: 2,
    maxCalendars: 0
  };

  var Calendeer = function( start, end ) {
    this.Calendars = [];
    this.setup();
  };

  $.extend( Calendeer.prototype, {
    setup: function() {
      var numCalendars = confs.numberOfCalendars,
          month;
      while(numCalendars--){
        this.Calendars.push( new App.Calendar( month ) );
        month = this.Calendars[ this.Calendars.length - 1 ].month + 1;
      }

    }
  } );

  window.App = window.App || {};
  window.App.Calendeer = Calendeer;
});