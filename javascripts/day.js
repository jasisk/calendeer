$(function(){
  var stateFromFlags = {},
      Utils = App.Utils;

  stateFromFlags[ Utils.FLAGS.BEFORE ]                    = "before-date";
  stateFromFlags[ Utils.FLAGS.START ]                     = "start-date";
  stateFromFlags[ Utils.FLAGS.BETWEEN ]                   = "between-date";
  stateFromFlags[ Utils.FLAGS.END ]                       = "end-date";
  stateFromFlags[ Utils.FLAGS.START | Utils.FLAGS.END ]   = "start-end-date";
  stateFromFlags[ Utils.FLAGS.AFTER ]                     = "after-date";

  var confs = {
        states: $.map(stateFromFlags,function(v){return v;}),
        prefix: "calendeer",
        classes: {
          day: "day",
          past: "past",
          today: "today"
        }
      },
      rightNowMidnight = Utils.trimDate( new Date() );

  var Day = function( day, calendarObject ) {
    if ( calendarObject == undefined || ! calendarObject instanceof App.Calendar ) {
      throw new DayError( "Invalid calendar instance in constructor" );
    } else {
      this.state = null;
      this.props = {};
      this.calendar = calendarObject;
      this._setup( day );
    }
  };

  $.extend( Day.prototype, {
    _setup: function( day ) {
      var self = this,
          props = self.props;

      if ( typeof day !== "number" ) {
        throw new DayError( "Invalid date" );
      }

      if ( day < 1 || day > self.calendar.daysInMonth ) {
        throw new DayError( "Date out of range" );
      }
      self.date = day;
      self.dateObject = new Date( self.calendar.year, self.calendar.month, day );
      props.firstOfMonth = self.date === 1;
      props.lastOfMonth = self.date === self.calendar.daysInMonth;
      props.index = self.dateObject.getDay();
      props.past = Utils.dateComparator(self.dateObject, rightNowMidnight ) === -1;
      props.today = Utils.datesEqual(self.dateObject, rightNowMidnight );
      self.el = $( "<div></div>", {
        "class": confs.prefix + "-" + confs.classes.day,
        "text": day,
        "data-date": day,
        "data": { "calendeer": this }
      } );
      if ( self.isToday() ) {
        self.el.addClass( confs.classes.today );
      }
    },
    isFirst: function() { return this.props.firstOfMonth; },
    isLast: function() { return this.props.lastOfMonth; },
    index: function() { return this.props.index; },
    isPast: function() { return this.props.past; },
    isToday: function() { return this.props.today; },
    _setState: function( startDate, endDate ) {
      var flag;

      if ( Utils.isDate(startDate) || Utils.isDate(endDate) ) {
        flag = Utils.rangeComparator( this.dateObject, startDate, endDate );
      }

      this.state = stateFromFlags[ flag ];

      return this;
    },
    drawState: function() {
      this._setState.apply( this, arguments );
      this.el.removeClass( confs.states.join(" ") );
      this.el.addClass( this.state );
    }
  } );

  var DayError = function( message ) {
    this.name = "DayError";
    this.message = message || "Unspecified exception";
  };

  DayError.prototype = new Error();
  DayError.prototype.constructor = DayError;

  window.App = window.App || {};
  window.App.Day = Day;

});