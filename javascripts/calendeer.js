$(function(){

  var rightNow = new Date();

  var Calendeer = function( options ) {
    var opts = $.extend( {},Calendeer.defaults, options );
    this.dates = {
      today: opts.timeSupport ? rightNow : Utils.trimDate( rightNow ),
      start: null,
      end: null
    };
    this.times = {
      start: null,
      end: null
    };
    this.options = opts;
    this.Calendars = {};
    this.focused = "start";
    this.timeFocused = "start";
    this.visibleIndexes = [];
    this.setup();
  };

  $.extend( Calendeer.prototype, {
    setup: function() {
      var numCalendars = this.options.numberOfCalendars,
          date = rightNow;
      this.el = $( "<div></div>", {"class": "calendeers"} );
      this.show( date );
      this.toggleFocused( "start" );
      this.setupHandlers();
      this.handleOptions( this.options );
      var noon = new Date();
          noon.setHours(12);
          noon.setMinutes(0);
          noon.setSeconds(0);
          noon.setMilliseconds(0);
      this.setTime("start", noon, false );
      this.setTime("end", noon, false );
    },
    get: function( type ) {
      if ( Utils.isDate( this.dates[type] ) &&
           Utils.isDate( this.times[type] ) ) {
        return Utils.combineDateTime( this.dates[type], this.times[type] );
      }
      return;
    },
    set: function( type, date ) {},
    handleOptions: function( options ) {
      var self = this,
          actions = {
            target: this.attach,
            startInput: function( input ) {
              this.setupInput( "start", input );
            },
            endInput: function( input ) {
              this.setupInput( "end", input );
            },
            startTimeInput: function( input ) {
              if ( options.timeSupport ) {
                this.setupTimeInput( "start", input );
              }
            },
            endTimeInput: function( input ) {
              if ( options.timeSupport ) {
                this.setupTimeInput( "end", input );
              }
            }
          };

      $.each( options, function(k, v) {
        if ( Object.prototype.hasOwnProperty.call(actions, k) ) {
          actions[k].call( self, v );
        }
      } );
    },
    setupHandlers: function() {
      this.el.on( "mouseup", ".calendeer-day", {scope: this}, function( event ) {
        var self = event.data.scope;
        var date = self.options.timeSupport ?
          Utils.combineDateTime(
            $(this).data("calendeer").dateObject,
            self.times[self.focused]
          ) :
          $(this).data("calendeer").dateObject;

        self.setDate( self.focused, date );
      } );
      this.el.on( "mouseenter", ".calendeer-day", function( event ) {
        var data = $( this ).data( "calendeer" );
        if ( ! data.isPast() ) data.el.addClass( "hovered" );
      } );
      this.el.on( "mouseleave", ".calendeer-day", function( event ) {
        $( this ).data( "calendeer" ).el.removeClass( "hovered" );
      } );
      this.el.on( "mouseup", ".calendeer-next", $.proxy( this.next, this ) );
      this.el.on( "mouseup", ".calendeer-previous", $.proxy( this.previous, this ) );
      this.el.on( "mousedown", ".calendeer-next, .calendeer-previous, .calendeer-day", function( e ) {
        e.preventDefault();
      } );
    },
    inputHandler: function( event ) {
      var date, isValid,
          data = event.data,
          $this = $( this ),
          val = $this.val();

      if ( data.scope.options.useSugar ) {
        isValid = false;
        if ( $.trim(val) ) {
          date = Date.create( val );
          isValid = date.isValid();
        }
      } else {
        isValid = Date.parse( val );
        date = new Date( isValid );
      }

      if ( isValid ) {
        data.scope.setDate( data.type, Utils.trimDate(date), true );
      } else {
        data.scope.clearDates( data.type, true );
      }
    },
    inputTimeHandler: function( event ) {
      var date, isValid,
          data = event.data,
          $this = $( this ),
          val = $this.val();

      isValid = false;
      if ( $.trim(val) ) {
        date = Date.create( val );
        isValid = date.isValid();
      }

      if ( isValid ) {
        data.scope.setTime( data.type, date, true );
      } else {
        data.scope.clearTimes( data.type, true );
      }
    },
    setupTimeInput: function( type, input ) {
      var $input = $( input );
      if ( ! $input.length ) {
        return this;
      }
      var useSugar = this.options.useSugar;
      this.el.bind( "setTime", { type: type }, function( e, type, date, suppress ) {
        if ( type === e.data.type && ! suppress ) {
          if ( useSugar && Utils.isDate(date) && date.isValid() ) {
            date = date.format( "{h}:{mm}{tt}" );
          } else {
            throw new Error( "Config error. Time support requires sugar." );
          }
          $input.val( date );
        }
      } );
      $input.on( "keyup.calendeer." + type, { type: type, scope: this }, this.inputTimeHandler );
      $input.on( "focus.calendeer." + type, { type: type, scope: this }, $.proxy( function(e) {
        this.toggleTimeFocused(e.data.type);
        this.show( e.data.type );
      }, this ) );
    },
    setupInput: function( type, input ) {
      var $input = $( input );
      if ( ! $input.length ) {
        return this;
      }
      var useSugar = this.options.useSugar;
      this.el.bind( "setDate", { type: type }, function( e, type, date, suppress ) {
        if ( type === e.data.type && ! suppress ) {
          if ( useSugar && Utils.isDate(date) && date.isValid() ) {
            date = date.short();
          }
          $input.val( date );
        }
      } );
      $input.on( "keyup.calendeer." + type, { type: type, scope: this }, this.inputHandler );
      $input.on( "focus.calendeer." + type, { type: type, scope: this }, $.proxy( function(e) {
        this.toggleFocused(e.data.type);
        this.show( e.data.type );
      }, this ) );
    },
    attach: function( $el ) {
      if ( this.el ) {
        this.el.appendTo( $el );
      }
      return this;
    },
    getCalendar: function( date ) {
      var diff;
      if ( ! App.Utils.isDate(date) && typeof date === "number" ) {
        diff = date;
        date = App.Utils.addMonth( rightNow, diff );
      } else {
        diff = App.Utils.monthDiff( rightNow, date );
      }
      if ( diff >= 0 &&
           (this.options.maxCalendars === 0 || diff < this.options.maxCalendars) ) {
        if ( this.Calendars[diff] ) {
          return this.Calendars[ diff ];
        } else {
          var calendar = this.Calendars[ diff ] = new App.Calendar(date);
          calendar.attach.apply( calendar, this.attachmentPoint(diff) );
          return calendar;
        }
      }
      throw new Error( "get fail" );
    },
    attachmentPoint: function( diff ) {
      var attachment;
      while( diff-- && attachment === undefined ) {
        attachment = this.Calendars[diff];
      }
      if ( attachment === undefined ) {
        return [ this.el ];
      } else {
        return [ attachment.el, true ];
      }
    },
    toggleFocused: function( focused ) {
      if ( focused !== "start" && focused !== "end" ) {
        focused = this.focused === "start" ? "end" : "start";
      }
      if ( focused === "end" ) {
        $( this.options.endInput ).addClass( "calendeer-focused-input" );
        $( this.options.startInput ).removeClass( "calendeer-focused-input" );
        this.focused = "end";
        this.el.addClass( "end-focus" );
        this.el.removeClass( "start-focus" );
      } else {
        $( this.options.startInput ).addClass( "calendeer-focused-input" );
        $( this.options.endInput ).removeClass( "calendeer-focused-input" );
        this.focused = "start";
        this.el.addClass( "start-focus" );
        this.el.removeClass( "end-focus" );
      }
    },
    toggleTimeFocused: function( focused ) {
      if ( focused !== "start" && focused !== "end" ) {
        focused = this.timeFocused === "start" ? "end" : "start";
      }
      if ( focused === "end" ) {
        $( this.options.endTimeInput ).addClass( "calendeer-focused-input" );
        $( this.options.startTimeInput ).removeClass( "calendeer-focused-input" );
        this.timeFocused = "end";
        this.el.addClass( "end-time-focus" );
        this.el.removeClass( "start-time-focus" );
      } else {
        $( this.options.startTimeInput ).addClass( "calendeer-focused-input" );
        $( this.options.endTimeInput ).removeClass( "calendeer-focused-input" );
        this.timeFocused = "start";
        this.el.addClass( "start-time-focus" );
        this.el.removeClass( "end-time-focus" );
      }
    },
    show: function( date, index ) {
      if ( typeof index !== "number" ||
           index < 0 ||
           index > this.options.numberOfCalendars - 1 ) {
        // default to middle
        index = Math.ceil( this.options.numberOfCalendars / 2 ) - 1;
      }
      if ( typeof date === "string" && Utils.isDate(this.dates[date]) ) {
        if ( date === "start" ) {
          index = this.options.numberOfCalendars - 1;
        } else if ( date === "end" ) {
          index = 0;
        }
        date = this.dates[date];
        if ( this.isVisible( date ) ) {
          return this;
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
          calendar = this.getCalendar( showIndex );
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
    clearDates: function( type, fromHandler ) {
      if ( typeof type === "string" && this.dates[type] !== undefined ) {
        type = type.toLowerCase();
        this.dates[type] = null;
        if ( type !== "start" && type !== "end" ) {
          delete this.dates[type];
        } else {
          this.el.removeClass( type + "-date" );
          this.el.trigger( "setDate", [type, null, fromHandler] );
          this.drawState( this.dates.start, this.dates.end );
        }
      } else {
        this.dates.start = null;
        this.dates.end = null;
        this.drawState( this.dates.start, this.dates.end );
      }
    },
    clearTimes: function( type, fromHandler ) {
      if ( typeof type === "string" && this.dates[type] !== undefined ) {
        type = type.toLowerCase();
        this.times[type] = rightNow;
        if ( type !== "start" && type !== "end" ) {
          delete this.times[type];
        } else {
          this.el.removeClass( type + "-time" );
          this.el.trigger( "setTime", [type, rightNow, fromHandler] );
        }
      } else {
        this.dates.start = null;
        this.dates.end = null;
        this.drawState( this.dates.start, this.dates.end );
      }
    },
    validateDate: function( date, type ) {
      var dateConditions = Utils.isDate( date ),
          futureConditions = ( this.options.maxCalendars !== 0 ?
          Utils.monthDiff( this.dates.today, date ) < this.options.maxCalendars :
          true ),
          pastConditions = Utils.dateTimeComparator( date, this.dates.today ) + 1;

      return !! ( dateConditions &&
             futureConditions &&
             pastConditions );
    },
    setDate: function( type, date, fromHandler ) {
      if ( typeof type !== "string" ||
           ( ! Utils.isDate(date) && date != undefined  ) ) {
        throw new Error( "setDate invalid arguments" );
      }
      type = type.toLowerCase();
      if ( ! this.validateDate( date, type ) ) return this;
      this.dates[ type ] = date;
      this.el.addClass( type + "-date" );
      if ( type === "start" ) {
        if ( this.dates.end && Utils.dateComparator(date,this.dates.end)===1 ) {
          this.clearDates( "end" );
        }
        if ( Utils.isDate(date) && ! this.isVisible(date) ) {
          this.show( date, 0 );
        }
        this.drawState( this.dates.start, this.dates.end );
      } else if ( type === "end" ) {
        if ( this.dates.start && Utils.dateComparator(date,this.dates.start)===-1 ) {
          this.clearDates( "start" );
        }
        if ( Utils.isDate(date) && ! this.isVisible(date) ) {
          this.show( date, this.options.numberOfCalendars - 1 );
        }
        this.drawState( this.dates.start, this.dates.end );
      }
      this.el.trigger( "setDate", [type, date, fromHandler] );
      var dateTime = this.get( type );
      if ( dateTime != undefined ) {
        this.el.trigger( "setDateTime", [type, Utils.toISO(dateTime), dateTime] );
      }
      if ( ! fromHandler ) {
        this.toggleFocused();
      }
      return this;
    },
    setTime: function( type, date, fromHandler ) {
      if ( typeof type !== "string" ||
           ( ! Utils.isDate(date) && date != undefined  ) ) {
        throw new Error( "setTime invalid arguments" );
      }
      type = type.toLowerCase();
      // if ( ! this.validateDate( date, type ) ) return this;
      this.times[ type ] = date;
      this.el.addClass( type + "-time" );
      this.el.trigger( "setTime", [type, date, fromHandler] );
      var dateTime = this.get( type );
      if ( dateTime != undefined ) {
        this.el.trigger( "setDateTime", [type, Utils.toISO(dateTime), dateTime] );
      }
      if ( ! fromHandler ) {
        this.toggleTimeFocused();
      }
      return this;
    },
    next: function( steps ) {
      steps = parseInt( steps, 10 );
      if ( isNaN(steps) ) {
        steps = 1;
      }
      this.show( this.getCalendar( this.visibleIndexes[0] + steps ).dateObject, 0 );
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
      this.show( this.getCalendar( this.visibleIndexes[ last ] - steps ).dateObject, last );
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
    maxCalendars: 0,
    timeSupport: true,
    useSugar: typeof (new Date()).isValid === "function"
  };

  window.App = window.App || {};
  window.App.Calendeer = Calendeer;
});
