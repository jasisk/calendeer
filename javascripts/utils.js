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
    addMonth: function( date, months ) {
      var year;
      if ( months == undefined ) {
        months = 1;
      }
      months = parseInt( months, 10 );
      if ( isNaN(months) ) {
        throw new UtilsError( "addMonth requires an integer" );
      }
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
    dateComparator: function( firstDate, secondDate ) {
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
        date.getMilliseconds()
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
