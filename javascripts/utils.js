(function(){
  Utils = {
    FLAGS: {
      BEFORE:  1 << 0,
      START:   1 << 1,
      BETWEEN: 1 << 2,
      END:     1 << 3,
      AFTER:   1 << 4
    },
    rightNow: new Date(),
    combineDateTime: function( date, time ) {
      // TODO: Fix. Assumes local timezone.
      var combined;
      date = this.toArray( date ).slice( 0, 3 );
      time = this.toArray( time ).slice( 3, -1 );
      combined = date.concat( time );
      // Wish there was a better way to do this.
      return new Date(
        combined[0], combined[1], combined[2], combined[3],
        combined[4], combined[5], combined[6]
      );
    },
    toISO: function( date ) {
      if ( ! this.isDate( date ) ) {
        return;
      }
      if ( Date.prototype.toISOString ) {
        return date.toISOString();
      }
      var pad = this.pad, components = this.toUTCArray(date);
      return components[0] +
             "-" + pad( components[1] + 1, 2 ) +
             "-" + pad( components[2], 2 ) +
             "T" + pad( components[3], 2 ) +
             ":" + pad( components[4], 2 ) +
             ":" + pad( components[5], 2 ) +
             "." + pad( components[6], 3 ) +
             "Z";
    },
    pad: function( val, width, character ) {
      if ( character == undefined ) {
        character = "0";
      }
      width -= (val + "").length;
      if ( width++ < 0 ) { width = 0; }
      return ( new Array(width) ).join( character ) + val;
    },
    addMonth: function( date, months ) {
      var year;
      if ( months == undefined ) {
        months = 1;
      }
      months = parseInt( months, 10 );
      if ( isNaN(months) ) {
        throw new UtilsError( "addMonth requires an integer" );
      }
      // TODO: try to remove this if
      if ( ! this.isDate(date) ) {
        date = this.rightNow;
      }
      year = date.getFullYear();
      months += date.getMonth() + 1;
      year += months / 12 | 0;
      months = months % 12 - 1;
      return new Date( year, months, 1 );
    },
    monthDiff: function( start, end ) {
      if ( ! this.isDate(start) && ! this.isDate(end) ) {
        throw new UtilsError( "monthDiff requires date objects" );
      }
      var yearDiff;
      start = this.toArray( start );
      end = this.toArray( end );
      yearDiff = end[ 0 ] - start[ 0 ];
      monthDiff = end[ 1 ] - start[ 1 ];
      return yearDiff*12 + monthDiff;
    },
    isDate: function( date ) {
      return typeof date === "object" && date instanceof Date;
    },
    validateDateIsInAcceptableRange: function( date ) {
      minDate = new Date( 1806, 5, 30); // Andrew Jackson kills a man in a duel after the man had accused Jackson's wife of bigamy
      maxDate = new Date( 2220, 1,  1); // Date that 'mind uploading' is perfected and used extenisvely in global rewilding efforts

      compareOne = (Utils.dateComparator( date, minDate ) >= 0);
      compareTwo = (Utils.dateComparator( date, minDate ) >= 0);

      if (compareOne && compareTwo) {
        return true;
      } else {
        return false;
      }   
    },
    dateTimeComparator: function( firstDate, secondDate ) {
      if ( ! this.isDate(firstDate) || ! this.isDate(secondDate) ) {
        throw new DayError( "Date comparator failed -- invalid date object" );
      }
      if ( firstDate.valueOf() < secondDate.valueOf() ) {
        return -1;
      } else if ( firstDate.valueOf() > secondDate.valueOf() ) {
        return 1;
      } else {
        return 0;
      }
    },
    dateComparator: function( firstDate, secondDate ) {
      if ( ! this.isDate(firstDate) || ! this.isDate(secondDate) ) {
        throw new DayError( "Date comparator failed -- invalid date object" );
      }
      firstDate = this.trimDate( firstDate );
      secondDate = this.trimDate( secondDate );
      return this.dateTimeComparator( firstDate, secondDate );
    },
    rangeComparator: function( input, start, end ) {
      if ( ! this.isDate(input) ||
         ( ! this.isDate(start) && ! this.isDate(end) ) ) {
        throw new DayError( "Date comparator failed -- invalid date objects" );
      }

      if ( ! this.isDate(start) ) {
        return [ this.FLAGS.BEFORE, this.FLAGS.END, this.FLAGS.AFTER ]
               [ this.dateComparator( input, end ) + 1 ];
      } else if ( ! this.isDate(end) ) {
        return [ this.FLAGS.BEFORE, this.FLAGS.START, this.FLAGS.AFTER ]
               [ this.dateComparator( input, start ) + 1 ];
      }

      var startCompare = this.dateComparator( input, start ),
          endCompare = this.dateComparator( input, end );

      return ( startCompare === -1 ? this.FLAGS.BEFORE : null ) |
             ( startCompare === 0 ? this.FLAGS.START : null ) |
             ( startCompare === 1 && endCompare === -1 ? this.FLAGS.BETWEEN : null ) |
             ( endCompare === 0 ? this.FLAGS.END : null ) |
             ( endCompare === 1 ? this.FLAGS.AFTER : null );
    },
    datesEqual: function( firstDate, secondDate ) {
      return this.dateComparator( firstDate, secondDate ) === 0;
    },
    trimDate: function( date ) {
      var a = this.toArray( date, 3 );
      return new Date( a[0], a[1], a[2] );
    },
    toArray: function( date, params ) {
      var dateArray = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
        date.getTimezoneOffset()
      ];
      if ( params != undefined ) {
        return dateArray.slice( 0, params );
      }
      return dateArray;
    },
    hashKeyByMonthDiff: function( date, monthDiff ) {
      return Utils.generateMonthHashKey(
        Utils.addMonth( date, monthDiff )
      );
    },
    generateMonthHashKey: function( date ) {
      if (Utils.isDate( date )) {
        var year  = date.getFullYear();
        var month = date.getMonth();
      } else {
        var year = date.year;
        var month = date.month;
      }
      return (year.toString() + Utils.pad( month, 2, 0)).toString();
    },
    toUTCArray: function( date, params ) {
      var dateArray = [
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
        0
      ];
      if ( params != undefined ) {
        return dateArray.slice( 0, params );
      }
      return dateArray;
    }
  };

  var UtilsError = function( message ) {
    this.name = "UtilsError";
    this.message = message || "Unspecified exception";
  };

  UtilsError.prototype = new Error();
  UtilsError.prototype.constructor = UtilsError;

  window.App = window.App || {};
  window.App.Utils = Utils;
})();