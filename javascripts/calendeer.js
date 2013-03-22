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
      this.setupHandlers();
      this.handleFieldOptions( this.options );
      var noon = new Date();
          noon.setHours(12);
          noon.setMinutes(0);
          noon.setSeconds(0);
          noon.setMilliseconds(0);
      this.setTime("start", noon, false );
      this.setTime("end", noon, false );
      this.handleDefaultDateOptions( this.options );
      this.preload();
      this.toggleFocused( "start" );
      this.removeInputHighlighting();
    },
    get: function( type ) {
      if ( Utils.isDate( this.dates[type] ) &&
           Utils.isDate( this.times[type] ) ) {
        return Utils.combineDateTime( this.dates[type], this.times[type] );
      }
      return;
    },
    set: function( type, date ) {
      if ( Utils.isDate(date) ) {
        this.setDate(type, date);
        if ( this.options.timeSupport ) { this.setTime(type, date); }
      } else if( typeof date === "number") {
        date = new Date( date );
        this.setDate(type, date);
        if ( this.options.timeSupport ) { this.setTime(type, date); }
      }
    },
    handleFieldOptions: function( options ) {
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
    handleDefaultDateOptions: function( options ) {
      var self = this,
          actions = {
            defaultStartTime: function( input ) {
              this.setTime("start", input, false );
            },
            defaultStartDate: function( input ) {
              this.setDate("start", input );
            },
            defaultEndTime: function( input ) {
              this.setTime("end", input, false );
            },
            defaultEndDate: function( input ) {
              this.setDate("end", input );
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

      var that = this;
      this.el.on( "mouseenter", function( event ) {
        var clazzes = that.el.attr("class");

        if (clazzes.indexOf( "start-focus" ) !== -1) {
          $( that.options.startInput ).addClass( "calendeer-focused-input-start" );
        } else {
          $( that.options.endInput ).addClass( "calendeer-focused-input-end" );
        }
      } );
      this.el.on( "mouseleave", function( event ) {
        $( that.options.startInput ).removeClass( "calendeer-focused-input-start" );
        $( that.options.endInput   ).removeClass( "calendeer-focused-input-end" );
      } );

      this.el.on( "mouseenter", ".calendeer-day", function( event ) {
        var data = $( this ).data( "calendeer" );
        data.el.addClass( "hovered" );
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
    preload: function() {
      var $input, existingDate;
      if ( this.options.startInput ) {
        $input = $( this.options.startInput );
        existingDate = Date.create( $input.val() );
        if ( existingDate.isValid() ) {
          this.set( "start", Date.parse(existingDate) );
        }
      }
      if ( this.options.endInput ) {
        $input = $( this.options.endInput );
        existingDate = Date.parse( $input.val() );
        if (! isNaN(existingDate) ) {
          existingDate = new Date( existingDate );
          this.set( "end", existingDate );
        }
      }
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

      isValid = isValid && Utils.validateDateIsInAcceptableRange( date );

      if ( isValid ) {
        data.scope.setDate( data.type, Utils.trimDate(date), true );
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
            date = date.format( "{Month} {date}, {year}" );
          }
          $input.val( date );
        }
      } );

      $input.on( "keyup.calendeer." + type, { type: type, scope: this }, this.inputHandler );
      $input.on( "focus.calendeer." + type, { type: type, scope: this }, $.proxy( function(e) {
        this.toggleFocused( e.data.type );
        this.show( e.data.type );
      }, this ) );
    },
    attach: function( $el ) {
      if ( this.el ) {
        this.el.appendTo( $el );
        this.clearEventQueue();
      }
      return this;
    },
    clearEventQueue: function() {
      if ( this._eventQueue ) {
        var currentEvent;
        while ( currentEvent = this._eventQueue.shift() ) {
          this.emitEvent( currentEvent[0], currentEvent[1] );
        }
        delete this._eventQueue;
      }
      return this;
    },
    emitEvent: function( eventType, args ) {
      if ( this.el.parent().length ) {
        this.emitEvent = function( _eventType, _args ) {
          this.el.trigger( _eventType, _args );
        };
        this.emitEvent( eventType, args );
      } else {
        this._eventQueue = this._eventQueue || [];
        this._eventQueue.push( [eventType, args] );
      }
    },
    getCalendar: function( date ) {
      var hashKey = "";
      if ( ! Utils.isDate(date) && typeof date === "number" ) {
        date    = Utils.addMonth( rightNow, date );
        hashKey = Utils.generateMonthHashKey( date );
      } else if( typeof date === "string" ) {
        hashKey = date;
      }

      var hashEntry = this.Calendars[ hashKey ];

      // check if element exists in hash already, otherwise
      // create it in the key value store
      if ( hashEntry ) {
        return hashEntry;
      } else {
        // create and insert into hash
        hashYear  = parseInt( hashKey.substring(0, 4), 10);
        hashMonth = parseInt( hashKey.substring(4)   , 10);
        var calendar = this.Calendars[ hashKey ] = new App.Calendar(hashMonth, hashYear);
        // insert into DOM
        calendar.attach.apply(calendar, this.attachmentPoint( calendar.dateObject ));
        return calendar;
      }
      throw new Error( "get fail" );
    },
    attachmentPoint: function( date ) {
      var attachment;
      var firstDOMMonth = this.el.children(":first");

      // if no DOM element exists, we can just attach as child of calendeers div
      if ( firstDOMMonth.length === 0 ){
        return [ this.el , "prepend" ];
      }

      // if this month is before the first DOM element, insert before that element
      var dateComparison = Utils.dateComparator( 
        date, firstDOMMonth.data('calendeer').dateObject 
      );
      if (dateComparison < 0) {
        return [ this.el, "prepend" ];
      } else if ( dateComparison === 0) {
        // don't attach; this is handled by Calendar.attach
        return undefined;
      }

      var lastDOMMonth = this.el.children(":last");

      dateComparison = Utils.dateComparator( 
        date, lastDOMMonth.data('calendeer').dateObject 
      );
      if ( dateComparison === 0) {
        // this is a special case, because the element we are trying to place,
        // when it is created, is placed at the end of the month elements. So 
        // if the elements are for the same month, we actually want to use the
        // one before this element because it is the actual last month in the DOM
        lastDOMMonth = lastDOMMonth.prev();
      }

      // if this month is after the last DOM element, insert after that element
      dateComparison = Utils.dateComparator( 
        date, lastDOMMonth.data('calendeer').dateObject 
      );
      if (dateComparison > 0) {
        return [ this.el , "append" ];
      } else if ( dateComparison === 0 ) {
        // don't attach; this is handled by Calendar.attach
        return undefined;
      }

      // otherwise, find most recent month before the current month,
      // and use that as an attachment point
      while( attachment === undefined ) {
        var currKey = Utils.hashKeyByMonthDiff( date, -1 );
        date = Utils.addMonth( date, -1 );
        attachment = this.Calendars[ currKey ]
      }

      return [ attachment.el, "sibling" ];
    },
    toggleFocused: function( focused ) {
      if ( focused !== "start" && focused !== "end" ) {
        focused = this.focused === "start" ? "end" : "start";
      }
      if ( focused === "end" ) {
        $( this.options.startInput ).removeClass( "calendeer-focused-input" );
        $( this.options.endInput   ).addClass(    "calendeer-focused-input" );

        this.focused = "end";
        this.el.addClass( "end-focus" );
        this.el.removeClass( "start-focus" );
      } else {
        $( this.options.startInput ).addClass(    "calendeer-focused-input" );
        $( this.options.endInput   ).removeClass( "calendeer-focused-input" );

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
    toggleInputHighlighting: function( focused ) {
      if ( focused !== "start" && focused !== "end" ) {
        focused = this.focused === "start" ? "end" : "start";
      }
      var notFocused = focused === "start" ? "end" : "start";

      $( this.options[ focused + "Input" ] ).addClass( 
        "calendeer-focused-input-" + focused
      );
      $( this.options[ notFocused + "Input" ] ).removeClass(
        "calendeer-focused-input-" + notFocused 
      );
    },
    removeInputHighlighting: function() {
      $( this.options.startInput ).removeClass( "calendeer-focused-input-start" );
      $( this.options.endInput   ).removeClass( "calendeer-focused-input-end" );
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
      if ( Utils.isDate(date) ) {
        this.hide();
        var numCalendars = -1, showIndex;
        this.visibleIndexes = [];
        while( ++numCalendars < this.options.numberOfCalendars ) {
          showIndex = Utils.hashKeyByMonthDiff( date, numCalendars - index );
          this.visibleIndexes.push( showIndex );
          calendar = this.getCalendar( showIndex );
          calendar.show();
          calendar.togglePreviousButton( 
            numCalendars === 0 
          );
          calendar.toggleNextButton(
            numCalendars === this.options.numberOfCalendars - 1
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
    clearTimes: function( type, fromHandler ) {
      if ( typeof type === "string" && this.dates[type] !== undefined ) {
        type = type.toLowerCase();
        this.times[type] = rightNow;
        if ( type !== "start" && type !== "end" ) {
          delete this.times[type];
        } else {
          this.el.removeClass( type + "-time" );
          this.emitEvent( "setTime", [type, rightNow, fromHandler] );
        }
      } else {
        this.dates.start = null;
        this.dates.end = null;
        this.drawState( this.dates.start, this.dates.end );
      }
    },
    setDate: function( type, date, fromHandler ) {
      if ( typeof type !== "string" ||
           ( ! Utils.isDate(date) && date != undefined  ) ) {
        throw new Error( "setDate invalid arguments" );
      }
      type = type.toLowerCase();
      this.dates[ type ] = date;
      this.el.addClass( type + "-date" );
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
      this.emitEvent( "setDate", [type, date, fromHandler] );
      var dateTime = this.get( type );
      if ( dateTime != undefined ) {
        this.emitEvent( "setDateTime", [type, Utils.toISO(dateTime), dateTime] );
      }
      if ( ! fromHandler ) {
        this.toggleInputHighlighting();
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
      this.times[ type ] = date;
      this.el.addClass( type + "-time" );
      this.emitEvent( "setTime", [type, date, fromHandler] );
      var dateTime = this.get( type );
      if ( dateTime != undefined ) {
        this.emitEvent( "setDateTime", [type, Utils.toISO(dateTime), dateTime] );
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
      var thisDate = this.Calendars[ this.visibleIndexes[0] ].dateObject;
      var nextMonthHashKey = Utils.hashKeyByMonthDiff( thisDate, steps );
      this.show( this.getCalendar( nextMonthHashKey ).dateObject, 0 );
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
      var thisDate = this.Calendars[ this.visibleIndexes[last] ].dateObject;
      var prevMonthHashKey = Utils.hashKeyByMonthDiff( thisDate, -steps );
      this.show( this.getCalendar( prevMonthHashKey ).dateObject, last );
    },
    previousPage: function() {
      this.previous( this.options.numberOfCalendars );
    },
    isVisible: function( date ) {
      // if date is a date object, must convert it to a hash key
      if ( Utils.isDate(date) ) {
        date = Utils.generateMonthHashKey( date );
      }
      // otherwise just use the given hash key, assuming it is a string
      return !!( ~$.inArray(date, this.visibleIndexes) );
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
    timeSupport: true,
    useSugar: typeof (new Date()).isValid === "function"
  };

  window.App = window.App || {};
  window.App.Calendeer = Calendeer;
});
