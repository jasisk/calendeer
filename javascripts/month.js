$(function(){
  var confs = {
    prefix: "calendeer",
    classes: {
      header:     "header",
      previous:   "previous",
      next:       "next",
      grid:       "grid",
      gridHeader: "grid-header",
      dayName:    "day-name",
      weekRow:    "week-row",
      day:        "day"
    },
    weekStartIndex: 0
  };
  var rightNow = new Date();
  var Calendar = function( month, year ) {
    this.year = year || rightNow.getFullYear();
    this.elements = {};
    this._setup( month );
  };

  $.extend( Calendar.prototype, {
    _names: {
      en: [ "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December" ]
    },
    _days: [ "Su", "M", "Tu", "W", "Th", "F", "Sa" ],
    _setup: function( month ) {
      if ( month == undefined ) {
        month = rightNow.getMonth();
      }


      var self = this,
          index,
          months = $.map( this._names.en, function( el ) {
            return el.toLowerCase();
          } );
      if ( typeof month === "number" && month < 12 && month >= 0 ) {
        this.month = month;
      } else if ( typeof month === "string" && ~$.inArray(month.toLowerCase(), months) ) {
        this.month = $.inArray(month.toLowerCase(), months);
      } else {
        throw new CalendarError( "Invalid month in constructor" );
      }
      this.name = this._names.en[ this.month ];
      this.daysInMonth = (function(){
        month = self.month === 11  ? 0 : self.month + 1;
        year = self.month === 11  ? self.year + 1 : self.year;
        return ( new Date( year, month, 0 ) ).getDate();
      })();
      this.render();
    },
    render: function() {
      var day,
          i,
          blankDay,
          index,
          currentRow,
          currentDay,
          newRow,
          c = confs.classes,
          p = confs.prefix,
          pd = p + "-",
          e = this.elements;

      e.calendeer =
        $( "<div></div>", {
          "class": p,
          "data-month": this.name,
          "data": { "calendeer": this }
        } );
      e.header =
        $( "<div></div>", {"class": pd + c.header, "text": this.name + " " + this.year} );
      e.previousButton =
        $( "<div></div>", {"class": pd + c.previous, "html": "&#9664;", "css": {"display": "none"}} );
      e.nextButton =
        $( "<div></div>", {"class": pd + c.next, "html": "&#9654;", "css": {"display": "none"}} );
      e.grid =
        $( "<div></div>", {"class": pd + c.grid} );
      e.gridHeader =
        $( "<div></div>", {"class": pd + c.gridHeader} );
      e.dayName =
        $( "<div></div>", {"class": pd + c.dayName} );
      e.weekRow =
        $( "<div></div>", {"class": pd + c.weekRow} );
      e.day =
        $( "<div></div>", {"class": pd + c.day} );

      e.dayNames = [];
      e.weekRows = [];
      this.days = [];

      blankDay = function() {
        return e.day.clone().addClass( "empty" );
      };

      newRow = function() {
        var newWeek = e.weekRow.clone();
        e.weekRows.push( newWeek );
        return newWeek;
      };

      for ( i = 0; day = this._days[i], i < this._days.length; i++ ) {
        var newDay = e.dayName.clone().text( day );
        e.dayNames.push( newDay );
        e.gridHeader.append( newDay );
      }

      currentRow = newRow();

      for ( i = 1; i <= this.daysInMonth; i++ ) {
        currentDay = new App.Day( i, this );
        if ( currentDay.isFirst() ) {
          index = currentDay.index();
          while(index--) {
            currentRow.append( blankDay() );
          }
        }
        if ( currentDay.index() === 0 ) {
          currentRow = newRow();
        }
        this.days.push( currentDay );
        currentRow.append( currentDay.el );
      }

      e.grid.append( e.gridHeader );
      $.each( e.weekRows, function() {
        e.grid.append( this );
      } );

      e.header.prepend( e.previousButton );
      e.header.append( e.nextButton );

      e.calendeer.append( e.header );
      e.calendeer.append( e.grid );

      $(".calendeers").append( e.calendeer );

    },

    togglePreviousButton: function( visible ) {
      this.elements.previousButton.toggle( visible );
    },

    toggleNextButton: function( visible ) {
      this.elements.nextButton.toggle( visible );
    },

    toggle: function( visible ) {
      this.elements.calendeer.toggle( visible );
    },
    show: function() {
      this.elements.calendeer.show();
    },
    hide: function() {
      this.elements.calendeer.hide();
    }

  });

  var CalendarError = function( message ) {
    this.name = "CalendarError";
    this.message = message || "Unspecified exception";
  };

  CalendarError.prototype = new Error();
  CalendarError.prototype.constructor = CalendarError;

  window.App = window.App || {};
  window.App.Calendar = Calendar;
});