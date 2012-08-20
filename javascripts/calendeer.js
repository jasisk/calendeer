$(function(){

  var rightNow = new Date();

  var Calendeer = function( options ) {
    var opts = $.extend( {},Calendeer.defaults, options );
    this.dates = {
      today: rightNow,
      start: null,
      end: null
    };
    this.options = opts;
    this.Calendars = {};
    this.visibleIndexes = [];
    this.setup();
  };

  $.extend( Calendeer.prototype, {
    setup: function() {
      var numCalendars = this.options.numberOfCalendars,
          date = rightNow;
      this.el = $( "<div></div>", {"class": "calendeers"} );
      this.show( date );
      if ( this.options.target ) {
        this.attach( this.options.target );
      }
      if ( this.options.startInput ) {
        this.setInput( "start", this.options.startInput );
      }
      if ( this.options.endInput ) {
        this.setInput( "end", this.options.endInput );
      }
    },
    setInput: function( type, input ) {
      var $input = $( input );
      if ( ! $input.length ) {
        return this;
      }
    },
    attach: function( $el ) {
      if ( this.el ) {
        this.el.appendTo( $el );
      }
      return this;
    },
    get: function( date ) {
      var diff;
      if ( ! App.Utils.isDate(date) && typeof date === "number" ) {
        diff = date;
        date = App.Utils.addMonth( rightNow, diff );
      } else {
        diff = App.Utils.monthDiff( rightNow, date );
      }
      if ( diff >= 0 &&
           (this.options.maxCalendars === 0 || diff < this.options.maxCalendars) ) {
        return this.Calendars[ diff ] ||
        ( this.Calendars[ diff ] = (new App.Calendar(date)).attach(this.el) );
      }
      throw new Error( "get fail" );
    },
    show: function( date, index ) {
      if ( typeof index !== "number" ||
           index < 0 ||
           index > this.options.numberOfCalendars - 1 ) {
        // default to middle
        index = Math.ceil( this.options.numberOfCalendars / 2 ) - 1;
      }
      if ( typeof date === "string" && Utils.isDate(this.dates[date]) ) {
        date = this.dates[date];
        if ( date === "start" ) {
          index = 0;
        } else if ( date === "end" ) {
          index = this.options.numberOfCalendars - 1;
        }
      }
      if ( App.Utils.isDate(date) ) {
        var diff = App.Utils.monthDiff( rightNow, date );
        if ( diff < 0 || (this.options.maxCalendars !== 0 && diff >= this.options.maxCalendars) ) {
          return this;
        } else {
          if ( diff < index ) {
            index = diff;
          } else {
            if ( this.options.maxCalendars ) {
              if ( this.options.numberOfCalendars > this.options.maxCalendars - diff ) {
                index = this.options.numberOfCalendars - this.options.maxCalendars + diff;
              }
            }
          }
        }
        this.hide();
        var numCalendars = -1, showIndex;
        this.visibleIndexes = [];
        while( ++numCalendars < this.options.numberOfCalendars ) {
          showIndex = diff - index + numCalendars;
          this.visibleIndexes.push( showIndex );
          calendar = this.get( showIndex );
          calendar.show();
          calendar.togglePreviousButton( numCalendars === 0 &&
                                         showIndex !== 0 );
          calendar.toggleNextButton(
            numCalendars === this.options.numberOfCalendars - 1 &&
            showIndex !== this.options.maxCalendars - 1
          );
        }
        this.drawState( this.dates.start, this.dates.end );
      }
      return this;
    },
    hide: function( index ) {
      if ( typeof index === "number" ) {
        var calendar = this.Calendars[ index ];
        if ( calendar ) {
          calendar.hide();
        }
      } else if ( index == undefined ) {
        $.each( this.Calendars, function(k,v) {
          this.hide();
        } );
      }
      return this;
    },
    clearDates: function( type ) {
      if ( typeof type === "string" && this.dates[type] !== undefined ) {
        type = type.toLowerCase();
        this.dates[type] = null;
        if ( type !== "start" && type !== "end" ) {
          delete this.dates[type];
        } else {
          this.drawState( this.dates.start, this.dates.end );
        }
      } else {
        this.dates.start = null;
        this.dates.end = null;
        this.drawState( this.dates.start, this.dates.end );
      }
    },
    setDate: function( type, date ) {
      if ( typeof type !== "string" ||
           ( ! Utils.isDate(date) && date != undefined  ) ) {
        throw new Error( "setDate invalid arguments" );
      }
      type = type.toLowerCase();
      this.dates[ type ] = date;
      if ( type === "start" ) {
        if ( Utils.isDate(date) && ! this.isVisible(date) ) {
          this.show( date, 0 );
        }
        this.drawState( this.dates.start, this.dates.end );
      } else if ( type === "end" ) {
        if ( Utils.isDate(date) && ! this.isVisible(date) ) {
          this.show( date, this.options.numberOfCalendars - 1 );
        }
        this.drawState( this.dates.start, this.dates.end );
      }
      return this;
    },
    next: function( steps ) {
      steps = parseInt( steps, 10 );
      if ( isNaN(steps) ) {
        steps = 1;
      }
      this.show( this.get( this.visibleIndexes[0] + steps ).dateObject, 0 );
    },
    nextPage: function() {
      this.next( this.options.numberOfCalendars );
    },
    previous: function( steps ) {
      steps = parseInt( steps, 10 );
      if ( isNaN(steps) ) {
        steps = 1;
      }
      var last = this.visibleIndexes.length - 1;
      this.show( this.get( this.visibleIndexes[ last ] - steps ).dateObject, last );
    },
    previousPage: function() {
      this.previous( this.options.numberOfCalendars );
    },
    isVisible: function( date ) {
      var diff = Utils.monthDiff( rightNow, date );
      return !!( ~$.inArray(diff, this.visibleIndexes) );
    },
    callOnVisibles: function() {
      if ( ! arguments.length ) {
        return this;
      }
      var args = $.makeArray( arguments ),
          callback = args.shift();
      if ( typeof callback !== "function" ) {
        return this;
      }
      for ( var index, i = 0, l = this.visibleIndexes.length;
            index = this.visibleIndexes[i], i < l;
            i++ ) {
        callback.apply( this.Calendars[ index ], args );
      }
      return this;
    },
    drawState: function() {
      var args = arguments;
      this.callOnVisibles( function(){
        this.drawState.apply( this, args );
      } );
      return this;
    }
  } );

  Calendeer.defaults = {
    target: null,
    startInput: null,
    endInput: null,
    eventDelegate: null,
    numberOfCalendars: 2,
    maxCalendars: 0
  };

  window.App = window.App || {};
  window.App.Calendeer = Calendeer;
});
