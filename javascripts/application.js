/*
 *  Sugar Library v1.3
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2012 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */
(function(){var j=true,k=null,m=false;function aa(a){return function(){return a}}var p=Object,r=Array,s=RegExp,t=Date,u=String,v=Number,w=Math,ba=typeof global!=="undefined"?global:this,ca=p.defineProperty&&p.defineProperties,x="Array,Boolean,Date,Function,Number,String,RegExp".split(","),da=y(x[0]),ea=y(x[1]),fa=y(x[2]),z=y(x[3]),D=y(x[4]),E=y(x[5]),F=y(x[6]);function y(a){return function(b){return ga(b,a)}}function ga(a,b){return p.prototype.toString.call(a)==="[object "+b+"]"}
function ha(a){if(!a.SugarMethods){ia(a,"SugarMethods",{});G(a,m,m,{restore:function(){var b=arguments.length===0,c=H(arguments);I(a.SugarMethods,function(d,e){if(b||c.indexOf(d)>-1)ia(e.za?a.prototype:a,d,e.method)})},extend:function(b,c,d){G(a,d!==m,c,b)}})}}function G(a,b,c,d){var e=b?a.prototype:a,g;ha(a);I(d,function(f,i){g=e[f];if(typeof c==="function")i=ja(e[f],i,c);if(c!==m||!e[f])ia(e,f,i);a.SugarMethods[f]={za:b,method:i,Ga:g}})}
function J(a,b,c,d,e){var g={};d=E(d)?d.split(","):d;d.forEach(function(f,i){e(g,f,i)});G(a,b,c,g)}function ja(a,b,c){return function(){return a&&(c===j||!c.apply(this,arguments))?a.apply(this,arguments):b.apply(this,arguments)}}function ia(a,b,c){if(ca)p.defineProperty(a,b,{value:c,configurable:j,enumerable:m,writable:j});else a[b]=c}function H(a,b){var c=[],d=0;for(d=0;d<a.length;d++){c.push(a[d]);b&&b.call(a,a[d],d)}return c}function K(a){return a!==void 0}function L(a){return a===void 0}
function ka(a){return a&&typeof a==="object"}function la(a){return!!a&&ga(a,"Object")&&u(a.constructor)===u(p)}function ma(a,b){return p.hasOwnProperty.call(a,b)}function I(a,b){for(var c in a)if(ma(a,c))if(b.call(a,c,a[c])===m)break}function na(a,b){I(b,function(c){a[c]=b[c]});return a}function M(a){na(this,a)}M.prototype.constructor=p;function N(a,b,c,d){var e=[];a=parseInt(a);for(var g=d<0;!g&&a<=b||g&&a>=b;){e.push(a);c&&c.call(this,a);a+=d||1}return e}
function O(a,b,c){c=w[c||"round"];var d=w.pow(10,w.abs(b||0));if(b<0)d=1/d;return c(a*d)/d}function P(a,b){return O(a,b,"floor")}function Q(a,b,c,d){d=w.abs(a).toString(d||10);d=oa(b-d.replace(/\.\d+/,"").length,"0")+d;if(c||a<0)d=(a<0?"-":"+")+d;return d}function qa(a){if(a>=11&&a<=13)return"th";else switch(a%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}
function ra(){return"\t\n\u000b\u000c\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff"}function oa(a,b){return r(w.max(0,K(a)?a:1)+1).join(b||"")}function sa(a,b){var c=a.toString().match(/[^/]*$/)[0];if(b)c=(c+b).split("").sort().join("").replace(/([gimy])\1+/g,"$1");return c}function R(a){E(a)||(a=u(a));return a.replace(/([\\/'*+?|()\[\]{}.^$])/g,"\\$1")}
function S(a,b){var c,d,e,g,f,i,h=typeof a;if(h==="string")return a;d=p.prototype.toString.call(a);c=d==="[object Object]";e=d==="[object Array]";if(a!=k&&c||e){b||(b=[]);if(b.length>1)for(f=b.length;f--;)if(b[f]===a)return"CYC";b.push(a);c=u(a.constructor);g=e?a:p.keys(a).sort();for(f=0;f<g.length;f++){i=e?f:g[f];c+=i+S(a[i],b)}b.pop()}else c=1/a===-Infinity?"-0":u(a&&a.valueOf());return h+d+c}
function ta(a,b,c){var d=[],e=a.length,g=b[b.length-1]!==m,f;H(b,function(i){if(ea(i))return m;if(g){i%=e;if(i<0)i=e+i}f=c?a.charAt(i)||"":a[i];d.push(f)});return d.length<2?d[0]:d}function ua(a,b){J(b,j,m,a,function(c,d){c[d+(d==="equal"?"s":"")]=function(){return p[d].apply(k,[this].concat(H(arguments)))}})}ha(p);I(x,function(a,b){ha(ba[b])});
G(p,m,m,{keys:function(a){var b=[];if(!ka(a)&&!F(a)&&!z(a))throw new TypeError("Object required");I(a,function(c){b.push(c)});return b}});function va(a,b,c,d){var e=a.length,g=d==-1,f=g?e-1:0;c=isNaN(c)?f:parseInt(c>>0);if(c<0)c=e+c;if(!g&&c<0||g&&c>=e)c=f;for(;g&&c>=0||!g&&c<e;){if(a[c]===b)return c;c+=d}return-1}
function wa(a,b,c,d){var e=a.length,g=0,f=K(c);xa(b);if(e==0&&!f)throw new TypeError("Reduce called on empty array with no initial value");else if(f)c=c;else{c=a[d?e-1:g];g++}for(;g<e;){f=d?e-g-1:g;if(f in a)c=b(c,a[f],f,a);g++}return c}function xa(a){if(!a||!a.call)throw new TypeError("Callback is not callable");}function ya(a){if(a.length===0)throw new TypeError("First argument must be defined");}G(r,m,m,{isArray:function(a){return ga(a,"Array")}});
G(r,j,m,{every:function(a,b){var c=this.length,d=0;for(ya(arguments);d<c;){if(d in this&&!a.call(b,this[d],d,this))return m;d++}return j},some:function(a,b){var c=this.length,d=0;for(ya(arguments);d<c;){if(d in this&&a.call(b,this[d],d,this))return j;d++}return m},map:function(a,b){var c=this.length,d=0,e=Array(c);for(ya(arguments);d<c;){if(d in this)e[d]=a.call(b,this[d],d,this);d++}return e},filter:function(a,b){var c=this.length,d=0,e=[];for(ya(arguments);d<c;){d in this&&a.call(b,this[d],d,this)&&
e.push(this[d]);d++}return e},indexOf:function(a,b){if(E(this))return this.indexOf(a,b);return va(this,a,b,1)},lastIndexOf:function(a,b){if(E(this))return this.lastIndexOf(a,b);return va(this,a,b,-1)},forEach:function(a,b){var c=this.length,d=0;for(xa(a);d<c;){d in this&&a.call(b,this[d],d,this);d++}},reduce:function(a,b){return wa(this,a,b)},reduceRight:function(a,b){return wa(this,a,b,j)}});G(t,m,m,{now:function(){return(new t).getTime()}});
(function(){var a=ra().match(/^\s+$/);try{u.prototype.trim.call([1])}catch(b){a=m}G(u,j,!a,{trim:function(){return this.toString().trimLeft().trimRight()},trimLeft:function(){return this.replace(s("^["+ra()+"]+"),"")},trimRight:function(){return this.replace(s("["+ra()+"]+$"),"")}})})();
(function(){var a=m;if(Function.prototype.ta){a=function(){};var b=a.ta();a=new b instanceof b&&!(new a instanceof b)}G(Function,j,!a,{bind:function(c){var d=this,e=H(arguments).slice(1),g,f;if(!z(this))throw new TypeError("Function.prototype.bind called on a non-function");f=function(){return d.apply(d.prototype&&this instanceof d?this:c,e.concat(H(arguments)))};g=function(){};g.prototype=this.prototype;f.prototype=new g;return f}})})();
(function(){var a=new t(t.UTC(1999,11,31));a=a.toISOString&&a.toISOString()==="1999-12-31T00:00:00.000Z";J(t,j,!a,"toISOString,toJSON",function(b,c){b[c]=function(){return Q(this.getUTCFullYear(),4)+"-"+Q(this.getUTCMonth()+1,2)+"-"+Q(this.getUTCDate(),2)+"T"+Q(this.getUTCHours(),2)+":"+Q(this.getUTCMinutes(),2)+":"+Q(this.getUTCSeconds(),2)+"."+Q(this.getUTCMilliseconds(),3)+"Z"}})})();
function za(a,b,c,d){var e=j;if(a===b)return j;else if(F(b)&&E(a))return s(b).test(a);else if(z(b))return b.apply(c,d);else if(la(b)&&ka(a)){I(b,function(g){za(a[g],b[g],c,[a[g],a])||(e=m)});return p.keys(b).length>0&&e}else return S(a)===S(b)}function T(a,b,c,d){return L(b)?a:z(b)?b.apply(c,d||[]):z(a[b])?a[b].call(a):a[b]}
function U(a,b,c,d){var e,g;if(c<0)c=a.length+c;g=isNaN(c)?0:c;for(c=d===j?a.length+g:a.length;g<c;){e=g%a.length;if(e in a){if(b.call(a,a[e],e,a)===m)break}else return Aa(a,b,g,d);g++}}function Aa(a,b,c){var d=[],e;for(e in a)e in a&&e>>>0==e&&e!=4294967295&&e>=c&&d.push(parseInt(e));d.sort().each(function(g){return b.call(a,a[g],g,a)});return a}function Ba(a,b,c,d,e){var g,f;U(a,function(i,h,l){if(za(i,b,l,[i,h,l])){g=i;f=h;return m}},c,d);return e?f:g}
function Ca(a,b){var c=[],d={},e,g;U(a,function(f,i){g=b?T(f,b,a,[f,i,a]):f;e=S(g);if(!(e in d&&(typeof f!=="function"||f===d[e]))){d[e]=g;c.push(f)}});return c}function Da(a,b,c){var d=[],e={};b.each(function(g){e[S(g)]=g});a.each(function(g){var f=S(g);if((f in e&&(typeof g!=="function"||g===e[f]))!=c){delete e[f];d.push(g)}});return d}function Ga(a,b,c){b=b||Infinity;c=c||0;var d=[];U(a,function(e){if(da(e)&&c<b)d=d.concat(Ga(e,b,c+1));else d.push(e)});return d}
function Ha(a){var b=[];H(a,function(c){b=b.concat(c)});return b}function Ia(a,b,c,d){var e,g=[],f=c==="max",i=c==="min",h=Array.isArray(a);I(a,function(l){var n=a[l];l=T(n,b,a,h?[n,parseInt(l),a]:[]);if(l===e)g.push(n);else if(L(e)||f&&l>e||i&&l<e){g=[n];e=l}});h||(g=Ga(g,1));return d?g:g[0]}function Ja(a){if(r[Ka])a=a.toLowerCase();return a.replace(r[La],"")}function Ma(a,b){var c=a.charAt(b);return(r[Na]||{})[c]||c}function Oa(a){var b=r[Pa];return a?b.indexOf(a):k}
var Pa="AlphanumericSortOrder",La="AlphanumericSortIgnore",Ka="AlphanumericSortIgnoreCase",Na="AlphanumericSortEquivalents";G(r,m,m,{create:function(){var a=[];H(arguments,function(b){if(b&&b.callee)b=H(b);a=a.concat(b)});return a}});
G(r,j,m,{find:function(a,b,c){return Ba(this,a,b,c)},findAll:function(a,b,c){var d=[];U(this,function(e,g,f){za(e,a,f,[e,g,f])&&d.push(e)},b,c);return d},findIndex:function(a,b,c){a=Ba(this,a,b,c,j);return L(a)?-1:a},count:function(a){if(L(a))return this.length;return this.findAll(a).length},removeAt:function(a,b){if(L(a))return this;if(L(b))b=a;for(var c=0;c<=b-a;c++)this.splice(a,1);return this},include:function(a,b){return this.clone().add(a,b)},exclude:function(){return r.prototype.remove.apply(this.clone(),
arguments)},clone:function(){return na([],this)},unique:function(a){return Ca(this,a)},flatten:function(a){return Ga(this,a)},union:function(){return Ca(this.concat(Ha(arguments)))},intersect:function(){return Da(this,Ha(arguments),m)},subtract:function(){return Da(this,Ha(arguments),j)},at:function(){return ta(this,arguments)},first:function(a){if(L(a))return this[0];if(a<0)a=0;return this.slice(0,a)},last:function(a){if(L(a))return this[this.length-1];return this.slice(this.length-a<0?0:this.length-
a)},from:function(a){return this.slice(a)},to:function(a){if(L(a))a=this.length;return this.slice(0,a)},min:function(a,b){return Ia(this,a,"min",b)},max:function(a,b){return Ia(this,a,"max",b)},least:function(a,b){return Ia(this.groupBy.apply(this,[a]),"length","min",b)},most:function(a,b){return Ia(this.groupBy.apply(this,[a]),"length","max",b)},sum:function(a){a=a?this.map(a):this;return a.length>0?a.reduce(function(b,c){return b+c}):0},average:function(a){a=a?this.map(a):this;return a.length>0?
a.sum()/a.length:0},inGroups:function(a,b){var c=arguments.length>1,d=this,e=[],g=O(this.length/a,void 0,"ceil");N(0,a-1,function(f){f=f*g;var i=d.slice(f,f+g);c&&i.length<g&&N(1,g-i.length,function(){i=i.add(b)});e.push(i)});return e},inGroupsOf:function(a,b){var c=[],d=this.length,e=this,g;if(d===0||a===0)return e;if(L(a))a=1;if(L(b))b=k;N(0,O(d/a,void 0,"ceil")-1,function(f){for(g=e.slice(a*f,a*f+a);g.length<a;)g.push(b);c.push(g)});return c},isEmpty:function(){return this.compact().length==0},
sortBy:function(a,b){var c=this.clone();c.sort(function(d,e){var g,f;g=T(d,a,c,[d]);f=T(e,a,c,[e]);if(E(g)&&E(f)){g=g;f=f;var i,h,l,n,o=0,q=0;g=Ja(g);f=Ja(f);do{l=Ma(g,o);n=Ma(f,o);i=Oa(l);h=Oa(n);if(i===-1||h===-1){i=g.charCodeAt(o)||k;h=f.charCodeAt(o)||k}l=l!==g.charAt(o);n=n!==f.charAt(o);if(l!==n&&q===0)q=l-n;o+=1}while(i!=k&&h!=k&&i===h);g=i===h?q:i<h?-1:1}else g=g<f?-1:g>f?1:0;return g*(b?-1:1)});return c},randomize:function(){for(var a=this.concat(),b,c,d=a.length;d;b=parseInt(w.random()*
d),c=a[--d],a[d]=a[b],a[b]=c);return a},zip:function(){var a=H(arguments);return this.map(function(b,c){return[b].concat(a.map(function(d){return c in d?d[c]:k}))})},sample:function(a){var b=[],c=this.clone(),d;if(L(a))a=1;for(;b.length<a;){d=P(w.random()*(c.length-1));b.push(c[d]);c.removeAt(d);if(c.length==0)break}return arguments.length>0?b:b[0]},each:function(a,b,c){U(this,a,b,c);return this},add:function(a,b){if(!D(v(b))||isNaN(b))b=this.length;r.prototype.splice.apply(this,[b,0].concat(a));
return this},remove:function(){var a,b=this;H(arguments,function(c){for(a=0;a<b.length;)if(za(b[a],c,b,[b[a],a,b]))b.splice(a,1);else a++});return b},compact:function(a){var b=[];U(this,function(c){if(da(c))b.push(c.compact());else if(a&&c)b.push(c);else!a&&c!=k&&c.valueOf()===c.valueOf()&&b.push(c)});return b},groupBy:function(a,b){var c=this,d={},e;U(c,function(g,f){e=T(g,a,c,[g,f,c]);d[e]||(d[e]=[]);d[e].push(g)});b&&I(d,b);return d},none:function(){return!this.any.apply(this,arguments)}});
G(r,j,m,{all:r.prototype.every,any:r.prototype.some,insert:r.prototype.add});function Qa(a){if(a&&a.valueOf)a=a.valueOf();return p.keys(a)}function Ra(a,b){J(p,m,m,a,function(c,d){c[d]=function(e,g,f){f=r.prototype[d].call(Qa(e),function(i){return b?T(e[i],g,e,[i,e[i],e]):za(e[i],g,e,[i,e[i],e])},f);if(da(f))f=f.reduce(function(i,h){i[h]=e[h];return i},{});return f}});ua(a,M)}
G(p,m,m,{map:function(a,b){return Qa(a).reduce(function(c,d){c[d]=T(a[d],b,a,[d,a[d],a]);return c},{})},reduce:function(a){var b=Qa(a).map(function(c){return a[c]});return b.reduce.apply(b,H(arguments).slice(1))},size:function(a){return Qa(a).length}});(function(){J(r,j,function(){var a=arguments;return a.length>0&&!z(a[0])},"map,every,all,some,any,none,filter",function(a,b){a[b]=function(c){return this[b](function(d,e){return b==="map"?T(d,c,this,[d,e,this]):za(d,c,this,[d,e,this])})}})})();
(function(){r[Pa]="A\u00c1\u00c0\u00c2\u00c3\u0104BC\u0106\u010c\u00c7D\u010e\u00d0E\u00c9\u00c8\u011a\u00ca\u00cb\u0118FG\u011eH\u0131I\u00cd\u00cc\u0130\u00ce\u00cfJKL\u0141MN\u0143\u0147\u00d1O\u00d3\u00d2\u00d4PQR\u0158S\u015a\u0160\u015eT\u0164U\u00da\u00d9\u016e\u00db\u00dcVWXY\u00ddZ\u0179\u017b\u017d\u00de\u00c6\u0152\u00d8\u00d5\u00c5\u00c4\u00d6".split("").map(function(b){return b+b.toLowerCase()}).join("");var a={};U("A\u00c1\u00c0\u00c2\u00c3\u00c4,C\u00c7,E\u00c9\u00c8\u00ca\u00cb,I\u00cd\u00cc\u0130\u00ce\u00cf,O\u00d3\u00d2\u00d4\u00d5\u00d6,S\u00df,U\u00da\u00d9\u00db\u00dc".split(","),
function(b){var c=b.charAt(0);U(b.slice(1).split(""),function(d){a[d]=c;a[d.toLowerCase()]=c.toLowerCase()})});r[Ka]=j;r[Na]=a})();Ra("each,any,all,none,count,find,findAll,isEmpty");Ra("sum,average,min,max,least,most",j);ua("map,reduce,size",M);
var V,Sa,Ta=["ampm","hour","minute","second","ampm","utc","offset_sign","offset_hours","offset_minutes","ampm"],Ua="({t})?\\s*(\\d{1,2}(?:[,.]\\d+)?)(?:{h}(\\d{1,2}(?:[,.]\\d+)?)?{m}(?::?(\\d{1,2}(?:[,.]\\d+)?){s})?\\s*(?:({t})|(Z)|(?:([+-])(\\d{2,2})(?::?(\\d{2,2}))?)?)?|\\s*({t}))",Va={},Wa,Xa,Ya,Za=[],$a=[{ba:"f{1,4}|ms|milliseconds",format:function(a){return a.getMilliseconds()}},{ba:"ss?|seconds",format:function(a){return a.getSeconds()}},{ba:"mm?|minutes",format:function(a){return a.getMinutes()}},
{ba:"hh?|hours|12hr",format:function(a){a=W(a,"get",void 0,"Hours");return a===0?12:a-P(a/13)*12}},{ba:"HH?|24hr",format:function(a){return a.getHours()}},{ba:"dd?|date|day",format:function(a){return a.getDate()}},{ba:"dow|weekday",ma:j,format:function(a,b,c){return b.weekdays[a.getDay()+(c-1)*7]}},{ba:"MM?",format:function(a){return a.getMonth()+1}},{ba:"mon|month",ma:j,format:function(a,b,c){return b.months[a.getMonth()+(c-1)*12]}},{ba:"y{2,4}|year",format:function(a){return a.getFullYear()}},{ba:"[Tt]{1,2}",
format:function(a,b,c,d){a=b.ampm[P(a.getHours()/12)];if(d.length===1)a=a.slice(0,1);if(d.slice(0,1)==="T")a=a.toUpperCase();return a}},{ba:"z{1,4}|tz|timezone",text:j,format:function(a,b,c,d){a=a.getUTCOffset();if(d=="z"||d=="zz")a=a.replace(/(\d{2})(\d{2})/,function(e,g){return Q(g,d.length)});return a}},{ba:"iso(tz|timezone)",format:function(a){return a.getUTCOffset(j)}},{ba:"ord",format:function(a){a=a.getDate();return a+qa(a)}}],X=[{$:"year",method:"FullYear",da:function(a){return(365+(a?a.isLeapYear()?
1:0:0.25))*24*60*60*1E3}},{$:"month",method:"Month",na:j,da:function(a,b){var c=30.4375,d;if(a){d=a.daysInMonth();if(b<=d.days())c=d}return c*24*60*60*1E3}},{$:"week",method:"Week",da:aa(6048E5)},{$:"day",method:"Date",na:j,da:aa(864E5)},{$:"hour",method:"Hours",da:aa(36E5)},{$:"minute",method:"Minutes",da:aa(6E4)},{$:"second",method:"Seconds",da:aa(1E3)},{$:"millisecond",method:"Milliseconds",da:aa(1)}],ab={};function bb(a){na(this,a);this.ha=Za.concat()}
bb.prototype={getMonth:function(a){return D(a)?a-1:this.months.indexOf(a)%12},ra:function(a){return this.weekdays.indexOf(a)%7},qa:function(a){var b;return D(a)?a:a&&(b=this.numbers.indexOf(a))!==-1?(b+1)%10:1},xa:function(a){var b=this;return a.replace(s(this.num,"g"),function(c){return b.qa(c)||""})},va:function(a){return V.units[this.units.indexOf(a)%8]},Da:function(a){return this.pa(a,a[2]>0?"future":"past")},ua:function(a){return this.pa(cb(a),"duration")},ya:function(a){a=a||this.code;return a===
"en"||a==="en-US"?j:this.variant},Ba:function(a){return a===this.ampm[1]},pa:function(a,b){var c=a[0],d=a[1],e=a[2],g,f,i;if(this.code=="ru"){i=c.toString().slice(-1);switch(j){case i==1:i=1;break;case i>=2&&i<=4:i=2;break;default:i=3}}else i=this.plural&&c>1?1:0;f=this.units[i*8+d]||this.units[d];if(this.capitalizeUnit)f=db(f);g=this.modifiers.filter(function(h){return h.name=="sign"&&h.value==(e>0?1:-1)})[0];return this[b].replace(/\{(.*?)\}/g,function(h,l){switch(l){case "num":return c;case "unit":return f;
case "sign":return g.src}})},wa:function(){return this.oa?[this.oa].concat(this.ha):this.ha},addFormat:function(a,b,c,d,e){var g=c||[],f=this,i;a=a.replace(/\s+/g,"[-,. ]*");a=a.replace(/\{([^,]+?)\}/g,function(h,l){var n=l.match(/\?$/),o=l.match(/(\d)(?:-(\d))?/),q=l.match(/^\d+$/),B=l.replace(/[^a-z]+$/,""),C,A;if(q)C=f.optionals[q[0]];else if(f[B])C=f[B];else if(f[B+"s"]){C=f[B+"s"];if(o){A=[];C.forEach(function(Ea,pa){var Fa=pa%(f.units?8:C.length);if(Fa>=o[1]&&Fa<=(o[2]||o[1]))A.push(Ea)});C=
A}C=eb(C)}if(q)return"(?:"+C+")?";else{c||g.push(B);return"("+C+")"+(n?"?":"")}});if(b){b=fb(Ua,f,e);e=["t","[\\s\\u3000]"].concat(f.timeMarker);i=a.match(/\\d\{\d,\d\}\)+\??$/);gb(f,"(?:"+b+")[,\\s\\u3000]+?"+a,Ta.concat(g),d);gb(f,a+"(?:[,\\s]*(?:"+e.join("|")+(i?"+":"*")+")"+b+")?",g.concat(Ta),d)}else gb(f,a,g,d)}};function hb(a,b){var c;E(a)||(a="");c=ab[a]||ab[a.slice(0,2)];if(b===m&&!c)throw Error("Invalid locale.");return c||Sa}
function ib(a,b){function c(i){var h=f[i];if(E(h))f[i]=h.split(",");else h||(f[i]=[])}function d(i,h){i=i.split("+").map(function(l){return l.replace(/(.+):(.+)$/,function(n,o,q){return q.split("|").map(function(B){return o+B}).join("|")})}).join("|");return i.split("|").forEach(h)}function e(i,h,l){var n=[];if(f[i]){f[i].forEach(function(o,q){d(o,function(B,C){n[C*l+q]=B.toLowerCase()})});if(h)n=n.concat(f[i].map(function(o){return o.slice(0,3).toLowerCase()}));return f[i]=n}}function g(i,h,l){i=
"\\d{"+i+","+h+"}";if(l)i+="|(?:"+eb(f.numbers)+")+";return i}var f;f=new bb(b);c("modifiers");"months,weekdays,units,numbers,articles,optionals,timeMarker,ampm,timeSuffixes,dateParse,timeParse".split(",").forEach(c);e("months",j,12);e("weekdays",j,7);e("units",m,8);e("numbers",m,10);f.code=a;f.date=g(1,2,f.digitDate);f.year=g(4,4);f.num=function(){var i=["\\d+"].concat(f.articles);if(f.numbers)i=i.concat(f.numbers);return eb(i)}();(function(){var i=[];f.ia={};f.modifiers.forEach(function(h){var l=
h.name;d(h.src,function(n){var o=f[l];f.ia[n]=h;i.push({name:l,src:n,value:h.value});f[l]=o?o+"|"+n:n})});f.day+="|"+eb(f.weekdays);f.modifiers=i})();if(f.monthSuffix){f.month=g(1,2);f.months=N(1,12).map(function(i){return i+f.monthSuffix})}f.full_month=g(1,2)+"|"+eb(f.months);f.timeSuffixes.length>0&&f.addFormat(fb(Ua,f),m,Ta);f.addFormat("{day}",j);f.addFormat("{month}"+(f.monthSuffix||""));f.addFormat("{year}"+(f.yearSuffix||""));f.timeParse.forEach(function(i){f.addFormat(i,j)});f.dateParse.forEach(function(i){f.addFormat(i)});
return ab[a]=f}function gb(a,b,c,d){a.ha.unshift({Ea:d,Aa:a,Ca:s("^"+b+"$","i"),to:c})}function db(a){return a.slice(0,1).toUpperCase()+a.slice(1)}function eb(a){return a.filter(function(b){return!!b}).join("|")}function jb(a,b){var c;if(la(a[0]))return a;else if(D(a[0])&&!D(a[1]))return[a[0]];else if(E(a[0])&&b)return[kb(a[0]),a[1]];c={};Xa.forEach(function(d,e){c[d.$]=a[e]});return[c]}
function kb(a,b){var c={};match=a.match(/^(\d+)?\s?(\w+?)s?$/i);if(L(b))b=parseInt(match[1])||1;c[match[2].toLowerCase()]=b;return c}function lb(a,b){var c={},d,e;b.forEach(function(g,f){d=a[f+1];if(!(L(d)||d==="")){if(g==="year")c.Fa=d;e=parseFloat(d.replace(/,/,"."));c[g]=!isNaN(e)?e:d.toLowerCase()}});return c}function mb(a){a=a.trim().replace(/^(just )?now|\.+$/i,"");return nb(a)}
function nb(a){return a.replace(Wa,function(b,c,d){var e=0,g=1,f,i;if(c)return b;d.split("").reverse().forEach(function(h){h=Va[h];var l=h>9;if(l){if(f)e+=g;g*=h/(i||1);i=h}else{if(f===m)g*=10;e+=g*h}f=l});if(f)e+=g;return e})}
function ob(a,b,c){var d=new t,e=m,g,f,i,h,l,n,o,q,B;if(fa(a))d=a.clone();else if(D(a))d=new t(a);else if(la(a)){d=(new t).set(a,j);h=a}else if(E(a)){g=hb(b);a=mb(a);g&&I(g.wa(),function(C,A){var Ea=a.match(A.Ca);if(Ea){i=A;f=i.Aa;h=lb(Ea,i.to,f);f.oa=i;if(h.timestamp){h=h.timestamp;return m}if(i.Ea&&!E(h.month)&&(E(h.date)||g.ya(b))){q=h.month;h.month=h.date;h.date=q}if(h.year&&h.Fa.length===2)h.year=O((new t).getFullYear()/100)*100-O(h.year/100)*100+h.year;if(h.month){h.month=f.getMonth(h.month);
if(h.shift&&!h.unit)h.unit=f.units[7]}if(h.weekday&&h.date)delete h.weekday;else if(h.weekday){h.weekday=f.ra(h.weekday);if(h.shift&&!h.unit)h.unit=f.units[5]}if(h.day&&(q=f.ia[h.day])){h.day=q.value;d.reset();e=j}else if(h.day&&(n=f.ra(h.day))>-1){delete h.day;if(h.num&&h.month){B=function(){pb(d,{weekday:n+7*(h.num-1)},m,m,m,1)};h.day=1}else h.weekday=n}if(h.date&&!D(h.date))h.date=f.xa(h.date);if(f.Ba(h.ampm)&&h.hour<12)h.hour+=12;if("offset_hours"in h||"offset_minutes"in h){h.utc=j;h.offset_minutes=
h.offset_minutes||0;h.offset_minutes+=h.offset_hours*60;if(h.offset_sign==="-")h.offset_minutes*=-1;h.minute-=h.offset_minutes}if(h.unit){e=j;o=f.qa(h.num);l=f.va(h.unit);if(h.shift||h.edge){o*=(q=f.ia[h.shift])?q.value:0;if(l==="month"&&K(h.date)){d.set({day:h.date},j);delete h.date}if(l==="year"&&K(h.month)){d.set({month:h.month,day:h.date},j);delete h.month;delete h.date}}if(h.sign&&(q=f.ia[h.sign]))o*=q.value;if(K(h.weekday)){d.set({weekday:h.weekday},j);delete h.weekday}h[l]=(h[l]||0)+o}if(h.year_sign===
"-")h.year*=-1;Ya.slice(1,4).forEach(function(pa,Fa){var xb=h[pa.$],yb=xb%1;if(yb){h[Ya[Fa].$]=O(yb*(pa.$==="second"?1E3:60));h[pa.$]=P(xb)}});return m}});if(i)if(e)d.advance(h);else{h.utc&&d.reset();pb(d,h,j,h.utc,m,c)}else d=a?new t(a):new t;if(h&&h.edge){q=f.ia[h.edge];I(Ya.slice(4),function(C,A){if(K(h[A.$])){l=A.$;return m}});if(l==="year")h.fa="month";else if(l==="month"||l==="week")h.fa="day";d[(q.value<0?"endOf":"beginningOf")+db(l)]();q.value===-2&&d.reset()}B&&B()}return{ea:d,set:h}}
function qb(a){a.addDays(4-(a.getDay()||7)).reset();return 1+P(a.daysSince(a.clone().beginningOfYear())/7)}function cb(a){var b,c=w.abs(a),d=c,e=0;Ya.slice(1).forEach(function(g,f){b=P(O(c/g.da()*10)/10);if(b>=1){d=b;e=f+1}});return[d,e,a]}
function rb(a,b,c,d){var e,g=hb(d),f=s(/^[A-Z]/);if(a.isValid())if(Date[b])b=Date[b];else{if(z(b)){e=cb(a.millisecondsFromNow());b=b.apply(a,e.concat(g))}}else return"Invalid Date";if(!b&&c){e=e||cb(a.millisecondsFromNow());if(e[1]===0){e[1]=1;e[0]=1}return g.Da(e)}b=b||"long";b=g[b]||b;$a.forEach(function(i){b=b.replace(s("\\{("+i.ba+")(\\d)?\\}",i.ma?"i":""),function(h,l,n){h=i.format(a,g,n||1,l);n=l.length;var o=l.match(/^(.)\1+$/);if(i.ma){if(n===3)h=h.slice(0,3);if(o||l.match(f))h=db(h)}else if(o&&
!i.text)h=(D(h)?Q(h,n):h.toString()).slice(-n);return h})});return b}function sb(a,b,c){var d=ob(b),e=0,g=b=0,f;if(c>0){b=g=c;f=j}if(!d.ea.isValid())return m;if(d.set&&d.set.fa){X.forEach(function(h){if(h.$===d.set.fa)e=h.da(d.ea,a-d.ea)-1});c=db(d.set.fa);if(d.set.edge||d.set.shift)d.ea["beginningOf"+c]();if(d.set.fa==="month")i=d.ea.clone()["endOf"+c]().getTime();if(!f&&d.set.sign&&d.set.fa!="millisecond"){b=50;g=-50}}f=a.getTime();c=d.ea.getTime();var i=i||c+e;return f>=c-b&&f<=i+g}
function pb(a,b,c,d,e,g){function f(n){return K(b[n])?b[n]:b[n+"s"]}var i;if(D(b)&&e)b={milliseconds:b};else if(D(b)){a.setTime(b);return a}if(b.date)b.day=b.date;I(Ya,function(n,o){var q=o.$==="day";if(K(f(o.$))||q&&K(f("weekday"))){b.fa=o.$;return m}else if(c&&o.$!=="week"&&(!q||!K(f("week"))))W(a,"set",d,o.method,q?1:0)});X.forEach(function(n,o){var q=n.$,B=n.method,C=X[o-1],A;A=f(q);if(!L(A)){g&&n.na&&!K(f(C.$))&&W(new t,"get",d,n.method)>=A===(g===1)&&a[C.ja](g);if(e){if(q==="week"){A=(b.day||
0)+A*7;B="Date"}A=A*e+W(a,"get",m,B)}else q==="month"&&K(f("day"))&&a.setDate(15);W(a,"set",d,B,A);if(e&&q==="month"){q=A;if(q<0)q+=12;q%12!=a.getMonth()&&a.setDate(0)}}});if(!e&&!K(f("day"))&&K(f("weekday"))){i=f("weekday");var h,l;if(K(g)){h=W(a,"get",d,"Day")-i%7>=0;l=g===1;if(h===l)i+=g*7}W(a,"set",d,"Weekday",i)}return a}function W(a,b,c,d,e){return a[b+(c?"UTC":"")+d](e)}
function fb(a,b,c){var d={h:0,m:1,s:2},e;b=b||V;return a.replace(/{([a-z])}/g,function(g,f){var i=[],h=f==="h",l=h&&!c;if(f==="t")return b.ampm.join("|");else{h&&i.push(":");if(e=b.timeSuffixes[d[f]])i.push(e+"\\s*");return i.length===0?"":"(?:"+i.join("|")+")"+(l?"":"?")}})}function tb(a,b){var c;c=D(a[1])?jb(a)[0]:a[0];return ob(c,a[1],b).ea}
t.extend({create:function(){return tb(arguments)},past:function(){return tb(arguments,-1)},future:function(){return tb(arguments,1)},addLocale:function(a,b){return ib(a,b)},setLocale:function(a){var b=hb(a,m);Sa=b;if(a&&a!=b.code)b.code=a;return b},getLocale:function(a){return!a?Sa:hb(a,m)},addFormat:function(a,b,c){gb(hb(c),a,b)}},m,m);
t.extend({set:function(){var a=jb(arguments);return pb(this,a[0],a[1])},setUTC:function(){var a=jb(arguments);return pb(this,a[0],a[1],j)},setWeekday:function(a){L(a)||this.setDate(this.getDate()+a-this.getDay())},setUTCWeekday:function(a){L(a)||this.setDate(this.getUTCDate()+a-this.getDay())},setWeek:function(a){if(!L(a)){this.setMonth(0);this.setDate(a*7+1)}},setUTCWeek:function(a){if(!L(a)){this.setMonth(0);this.setUTCDate(a*7+1)}},getWeek:function(){return qb(this)},getUTCWeek:function(){return qb(this.toUTC())},
getUTCOffset:function(a){var b=this.la?0:this.getTimezoneOffset(),c=a===j?":":"";if(!b&&a)return"Z";return Q(O(-b/60),2,j)+c+Q(b%60,2)},toUTC:function(){if(this.la)return this;var a=this.clone().addMinutes(this.getTimezoneOffset());a.la=j;return a},isUTC:function(){return this.la||this.getTimezoneOffset()===0},advance:function(){var a=jb(arguments,j);return pb(this,a[0],a[1],m,1)},rewind:function(){var a=jb(arguments,j);return pb(this,a[0],a[1],m,-1)},isValid:function(){return!isNaN(this.getTime())},
isAfter:function(a,b){return this.getTime()>t.create(a).getTime()-(b||0)},isBefore:function(a,b){return this.getTime()<t.create(a).getTime()+(b||0)},isBetween:function(a,b,c){var d=this.getTime();a=t.create(a).getTime();var e=t.create(b).getTime();b=w.min(a,e);a=w.max(a,e);c=c||0;return b-c<d&&a+c>d},isLeapYear:function(){var a=this.getFullYear();return a%4===0&&a%100!==0||a%400===0},daysInMonth:function(){return 32-(new t(this.getFullYear(),this.getMonth(),32)).getDate()},format:function(a,b){return rb(this,
a,m,b)},relative:function(a,b){if(E(a)){b=a;a=k}return rb(this,a,j,b)},is:function(a,b){var c;if(this.isValid()){if(E(a)){a=a.trim().toLowerCase();switch(j){case a==="future":return this.getTime()>(new t).getTime();case a==="past":return this.getTime()<(new t).getTime();case a==="weekday":return this.getDay()>0&&this.getDay()<6;case a==="weekend":return this.getDay()===0||this.getDay()===6;case (c=V.weekdays.indexOf(a)%7)>-1:return this.getDay()===c;case (c=V.months.indexOf(a)%12)>-1:return this.getMonth()===
c}}return sb(this,a,b)}},reset:function(a){var b={},c;a=a||"hours";if(a==="date")a="days";c=X.some(function(d){return a===d.$||a===d.$+"s"});b[a]=a.match(/^days?/)?1:0;return c?this.set(b,j):this},clone:function(){return new t(this.getTime())}});t.extend({iso:function(){return this.toISOString()},getWeekday:t.prototype.getDay,getUTCWeekday:t.prototype.getUTCDay});
function ub(a,b){function c(){return O(this*b)}function d(){return tb(arguments)[a.ja](this)}function e(){return tb(arguments)[a.ja](-this)}var g=a.$,f={};f[g]=c;f[g+"s"]=c;f[g+"Before"]=e;f[g+"sBefore"]=e;f[g+"Ago"]=e;f[g+"sAgo"]=e;f[g+"After"]=d;f[g+"sAfter"]=d;f[g+"FromNow"]=d;f[g+"sFromNow"]=d;v.extend(f)}v.extend({duration:function(a){return hb(a).ua(this)}});
V=Sa=t.addLocale("en",{plural:j,timeMarker:"at",ampm:"am,pm",months:"January,February,March,April,May,June,July,August,September,October,November,December",weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",units:"millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s",numbers:"one,two,three,four,five,six,seven,eight,nine,ten",articles:"a,an,the",optionals:"the,st|nd|rd|th,of","short":"{Month} {d}, {yyyy}","long":"{Month} {d}, {yyyy} {h}:{mm}{tt}",full:"{Weekday} {Month} {d}, {yyyy} {h}:{mm}:{ss}{tt}",
past:"{num} {unit} {sign}",future:"{num} {unit} {sign}",duration:"{num} {unit}",modifiers:[{name:"day",src:"yesterday",value:-1},{name:"day",src:"today",value:0},{name:"day",src:"tomorrow",value:1},{name:"sign",src:"ago|before",value:-1},{name:"sign",src:"from now|after|from|in",value:1},{name:"edge",src:"last day",value:-2},{name:"edge",src:"end",value:-1},{name:"edge",src:"first day|beginning",value:1},{name:"shift",src:"last",value:-1},{name:"shift",src:"the|this",value:0},{name:"shift",src:"next",
value:1}],dateParse:["{num} {unit} {sign}","{sign} {num} {unit}","{num} {unit=4-5} {sign} {day}","{month} {year}","{shift} {unit=5-7}","{0} {edge} of {shift?} {unit=4-7?}{month?}{year?}"],timeParse:["{0} {num}{1} {day} of {month} {year?}","{weekday?} {month} {date}{1} {year?}","{date} {month} {year}","{shift} {weekday}","{shift} week {weekday}","{weekday} {2} {shift} week","{0} {date}{1} of {month}","{0}{month?} {date?}{1} of {shift} {unit=6-7}"]});Ya=X.concat().reverse();Xa=X.concat();
Xa.splice(2,1);
J(t,j,m,X,function(a,b,c){var d=b.$,e=db(d),g=b.da(),f,i;b.ja="add"+e+"s";f=function(h,l){return O((this.getTime()-t.create(h,l).getTime())/g)};i=function(h,l){return O((t.create(h,l).getTime()-this.getTime())/g)};a[d+"sAgo"]=i;a[d+"sUntil"]=i;a[d+"sSince"]=f;a[d+"sFromNow"]=f;a[b.ja]=function(h,l){var n={};n[d]=h;return this.advance(n,l)};ub(b,g);c<3&&["Last","This","Next"].forEach(function(h){a["is"+h+e]=function(){return this.is(h+" "+d)}});if(c<4){a["beginningOf"+e]=function(){var h={};switch(d){case "year":h.year=
this.getFullYear();break;case "month":h.month=this.getMonth();break;case "day":h.day=this.getDate();break;case "week":h.weekday=0}return this.set(h,j)};a["endOf"+e]=function(){var h={hours:23,minutes:59,seconds:59,milliseconds:999};switch(d){case "year":h.month=11;h.day=31;break;case "month":h.day=this.daysInMonth();break;case "week":h.weekday=6}return this.set(h,j)}}});V.addFormat("([+-])?(\\d{4,4})[-.]?{full_month}[-.]?(\\d{1,2})?",j,["year_sign","year","month","date"],m,j);
V.addFormat("(\\d{1,2})[-.\\/]{full_month}(?:[-.\\/](\\d{2,4}))?",j,["date","month","year"],j);V.addFormat("{full_month}[-.](\\d{4,4})",m,["month","year"]);V.addFormat("\\/Date\\((\\d+(?:\\+\\d{4,4})?)\\)\\/",m,["timestamp"]);V.addFormat(fb(Ua,V),m,Ta);Za=V.ha.slice(0,7).reverse();V.ha=V.ha.slice(7).concat(Za);J(t,j,m,"short,long,full",function(a,b){a[b]=function(c){return rb(this,b,m,c)}});
"\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07".split("").forEach(function(a,b){if(b>9)b=w.pow(10,b-9);Va[a]=b});"\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19".split("").forEach(function(a,b){Va[a]=b});Wa=s("([\u671f\u9031\u5468])?([\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19]+)(?!\u6628)","g");
(function(){var a="today,yesterday,tomorrow,weekday,weekend,future,past".split(","),b=V.weekdays.slice(0,7),c=V.months.slice(0,12);J(t,j,m,a.concat(b).concat(c),function(d,e){d["is"+db(e)]=function(){return this.is(e)}})})();t.extend({RFC1123:"{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}",RFC1036:"{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}",ISO8601_DATE:"{yyyy}-{MM}-{dd}",ISO8601_DATETIME:"{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}"},m,m);
function vb(a,b){this.start=t.create(a);this.end=t.create(b)}vb.prototype.toString=function(){return this.isValid()?this.start.full()+".."+this.end.full():"Invalid DateRange"};
G(vb,j,m,{isValid:function(){return this.start<this.end},duration:function(){return this.isValid()?this.end.getTime()-this.start.getTime():NaN},contains:function(a){var b=this;return(a.start&&a.end?[a.start,a.end]:[a]).every(function(c){return c>=b.start&&c<=b.end})},every:function(a,b){var c=this.start.clone(),d=[],e=0,g;if(E(a)){c.advance(kb(a,0),j);g=kb(a)}else g={milliseconds:a};for(;c<=this.end;){d.push(c);b&&b(c,e);c=c.clone().advance(g,j);e++}return d},union:function(a){return new vb(this.start<
a.start?this.start:a.start,this.end>a.end?this.end:a.end)},intersect:function(a){return new vb(this.start>a.start?this.start:a.start,this.end<a.end?this.end:a.end)}});J(vb,j,m,"Millisecond,Second,Minute,Hour,Day,Week,Month,Year",function(a,b){a["each"+b]=function(c){return this.every(b,c)}});G(t,m,m,{range:function(a,b){return new vb(a,b)}});
function wb(a,b,c,d,e){if(!a.ga)a.ga=[];D(b)||(b=0);a.ga.push(setTimeout(function(){a.ga.splice(g,1);c.apply(d,e||[])},b));var g=a.ga.length}
G(Function,j,m,{lazy:function(a,b){function c(){if(!(g&&e.length>b-2)){e.push([this,arguments]);f()}}var d=this,e=[],g=m,f,i,h;a=a||1;b=b||Infinity;i=O(a,void 0,"ceil");h=O(i/a);f=function(){if(!(g||e.length==0)){for(var l=w.max(e.length-h,0);e.length>l;)Function.prototype.apply.apply(d,e.shift());wb(c,i,function(){g=m;f()});g=j}};return c},delay:function(a){var b=H(arguments).slice(1);wb(this,a,this,this,b);return this},throttle:function(a){return this.lazy(a,1)},debounce:function(a){var b=this;
return function(){b.cancel();wb(b,a,b,this,arguments)}},cancel:function(){if(da(this.ga))for(;this.ga.length>0;)clearTimeout(this.ga.shift());return this},after:function(a){var b=this,c=0,d=[];if(D(a)){if(a===0){b.call();return b}}else a=1;return function(){var e;d.push(H(arguments));c++;if(c==a){e=b.call(this,d);c=0;d=[];return e}}},once:function(){var a=this;return function(){return ma(a,"memo")?a.memo:a.memo=a.apply(this,arguments)}},fill:function(){var a=this,b=H(arguments);return function(){var c=
H(arguments);b.forEach(function(d,e){if(d!=k||e>=c.length)c.splice(e,0,d)});return a.apply(this,c)}}});
function zb(a,b,c,d,e,g){var f=a.toFixed(20),i=f.search(/\./);f=f.search(/[1-9]/);i=i-f;if(i>0)i-=1;e=w.max(w.min((i/3).floor(),e===m?c.length:e),-d);d=c.charAt(e+d-1);if(i<-9){e=-3;b=i.abs()-9;d=c.slice(0,1)}return(a/(g?(2).pow(10*e):(10).pow(e*3))).round(b||0).format()+d.trim()}
G(v,m,m,{random:function(a,b){var c,d;if(arguments.length==1){b=a;a=0}c=w.min(a||0,L(b)?1:b);d=w.max(a||0,L(b)?1:b);return O(w.random()*(d-c)+c)}});
G(v,j,m,{log:function(a){return w.log(this)/(a?w.log(a):1)},abbr:function(a){return zb(this,a,"kmbt",0,4)},metric:function(a,b){return zb(this,a,"n\u03bcm kMGTPE",4,L(b)?1:b)},bytes:function(a,b){return zb(this,a,"kMGTPE",0,L(b)?4:b,j)+"B"},isInteger:function(){return this%1==0},isOdd:function(){return!this.isMultipleOf(2)},isEven:function(){return this.isMultipleOf(2)},isMultipleOf:function(a){return this%a===0},format:function(a,b,c){var d,e,g=/(\d+)(\d{3})/;if(u(b).match(/\d/))throw new TypeError("Thousands separator cannot contain numbers.");
d=D(a)?O(this,a||0).toFixed(w.max(a,0)):this.toString();b=b||",";c=c||".";e=d.split(".");d=e[0];for(e=e[1]||"";d.match(g);)d=d.replace(g,"$1"+b+"$2");if(e.length>0)d+=c+oa((a||0)-e.length,"0")+e;return d},hex:function(a){return this.pad(a||1,m,16)},upto:function(a,b,c){return N(this,a,b,c||1)},downto:function(a,b,c){return N(this,a,b,-(c||1))},times:function(a){if(a)for(var b=0;b<this;b++)a.call(this,b);return this.toNumber()},chr:function(){return u.fromCharCode(this)},pad:function(a,b,c){return Q(this,
a,b,c)},ordinalize:function(){var a=this.abs();a=parseInt(a.toString().slice(-2));return this+qa(a)},toNumber:function(){return parseFloat(this,10)}});J(v,j,m,"round,floor,ceil",function(a,b){a[b]=function(c){return O(this,c,b)}});J(v,j,m,"abs,pow,sin,asin,cos,acos,tan,atan,exp,pow,sqrt",function(a,b){a[b]=function(c,d){return w[b](this,c,d)}});
var Ab="isObject,isNaN".split(","),Bb="keys,values,each,merge,clone,equal,watch,tap,has".split(",");
function Cb(a,b,c,d){var e=/^(.+?)(\[.*\])$/,g,f,i;if(d!==m&&(f=b.match(e))){i=f[1];b=f[2].replace(/^\[|\]$/g,"").split("][");b.forEach(function(h){g=!h||h.match(/^\d+$/);if(!i&&da(a))i=a.length;a[i]||(a[i]=g?[]:{});a=a[i];i=h});if(!i&&g)i=a.length.toString();Cb(a,i,c)}else a[b]=c.match(/^[\d.]+$/)?parseFloat(c):c==="true"?j:c==="false"?m:c}G(p,m,j,{watch:function(a,b,c){if(ca){var d=a[b];p.defineProperty(a,b,{enumerable:j,configurable:j,get:function(){return d},set:function(e){d=c.call(a,b,d,e)}})}}});
G(p,m,function(a,b){return z(b)},{keys:function(a,b){var c=p.keys(a);c.forEach(function(d){b.call(a,d,a[d])});return c}});
G(p,m,m,{isObject:function(a){return la(a)},isNaN:function(a){return D(a)&&a.valueOf()!==a.valueOf()},equal:function(a,b){return S(a)===S(b)},extended:function(a){return new M(a)},merge:function(a,b,c,d){var e,g;if(a&&typeof b!="string")for(e in b)if(ma(b,e)&&a){g=b[e];if(K(a[e])){if(d===m)continue;if(z(d))g=d.call(b,e,a[e],b[e])}if(c===j&&g&&ka(g))if(fa(g))g=new t(g.getTime());else if(F(g))g=new s(g.source,sa(g));else{a[e]||(a[e]=r.isArray(g)?[]:{});p.merge(a[e],b[e],c,d);continue}a[e]=g}return a},
values:function(a,b){var c=[];I(a,function(d,e){c.push(e);b&&b.call(a,e)});return c},clone:function(a,b){if(!ka(a))return a;if(r.isArray(a))return a.concat();var c=a instanceof M?new M:{};return p.merge(c,a,b)},fromQueryString:function(a,b){var c=p.extended();a=a&&a.toString?a.toString():"";decodeURIComponent(a.replace(/^.*?\?/,"")).split("&").forEach(function(d){d=d.split("=");d.length===2&&Cb(c,d[0],d[1],b)});return c},tap:function(a,b){var c=b;z(b)||(c=function(){b&&a[b]()});c.call(a,a);return a},
has:function(a,b){return ma(a,b)}});J(p,m,m,x,function(a,b){var c="is"+b;Ab.push(c);a[c]=function(d){return ga(d,b)}});(function(){G(p,m,function(){return arguments.length===0},{extend:function(){ua(Ab.concat(Bb),p)}})})();ua(Bb,M);
G(s,m,m,{escape:function(a){return R(a)}});
G(s,j,m,{getFlags:function(){return sa(this)},setFlags:function(a){return s(this.source,a)},addFlag:function(a){return this.setFlags(sa(this,a))},removeFlag:function(a){return this.setFlags(sa(this).replace(a,""))}});
var Db,Eb;
G(u,j,m,{escapeRegExp:function(){return R(this)},escapeURL:function(a){return a?encodeURIComponent(this):encodeURI(this)},unescapeURL:function(a){return a?decodeURI(this):decodeURIComponent(this)},escapeHTML:function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},unescapeHTML:function(){return this.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")},encodeBase64:function(){return Db(this)},decodeBase64:function(){return Eb(this)},each:function(a,b){var c,
d;if(z(a)){b=a;a=/[\s\S]/g}else if(a)if(E(a))a=s(R(a),"gi");else{if(F(a))a=s(a.source,sa(a,"g"))}else a=/[\s\S]/g;c=this.match(a)||[];if(b)for(d=0;d<c.length;d++)c[d]=b.call(this,c[d],d,c)||c[d];return c},shift:function(a){var b="";a=a||0;this.codes(function(c){b+=u.fromCharCode(c+a)});return b},codes:function(a){for(var b=[],c=0;c<this.length;c++){var d=this.charCodeAt(c);b.push(d);a&&a.call(this,d,c)}return b},chars:function(a){return this.each(a)},words:function(a){return this.trim().each(/\S+/g,
a)},lines:function(a){return this.trim().each(/^.*$/gm,a)},paragraphs:function(a){var b=this.trim().split(/[\r\n]{2,}/);return b=b.map(function(c){if(a)var d=a.call(c);return d?d:c})},startsWith:function(a,b){if(L(b))b=j;var c=F(a)?a.source.replace("^",""):R(a);return s("^"+c,b?"":"i").test(this)},endsWith:function(a,b){if(L(b))b=j;var c=F(a)?a.source.replace("$",""):R(a);return s(c+"$",b?"":"i").test(this)},isBlank:function(){return this.trim().length===0},has:function(a){return this.search(F(a)?
a:R(a))!==-1},add:function(a,b){b=L(b)?this.length:b;return this.slice(0,b)+a+this.slice(b)},remove:function(a){return this.replace(a,"")},reverse:function(){return this.split("").reverse().join("")},compact:function(){return this.trim().replace(/([\r\n\s\u3000])+/g,function(a,b){return b==="\u3000"?b:" "})},at:function(){return ta(this,arguments,j)},from:function(a){return this.slice(a)},to:function(a){if(L(a))a=this.length;return this.slice(0,a)},dasherize:function(){return this.underscore().replace(/_/g,
"-")},underscore:function(){return this.replace(/[-\s]+/g,"_").replace(u.Inflector&&u.Inflector.acronymRegExp,function(a,b){return(b>0?"_":"")+a.toLowerCase()}).replace(/([A-Z\d]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").toLowerCase()},camelize:function(a){return this.underscore().replace(/(^|_)([^_]+)/g,function(b,c,d,e){b=d;b=(c=u.Inflector)&&c.acronyms[b];b=E(b)?b:void 0;e=a!==m||e>0;if(b)return e?b:b.toLowerCase();return e?d.capitalize():d})},spacify:function(){return this.underscore().replace(/_/g,
" ")},stripTags:function(){var a=this;H(arguments.length>0?arguments:[""],function(b){a=a.replace(s("</?"+R(b)+"[^<>]*>","gi"),"")});return a},removeTags:function(){var a=this;H(arguments.length>0?arguments:["\\S+"],function(b){b=s("<("+b+")[^<>]*(?:\\/>|>.*?<\\/\\1>)","gi");a=a.replace(b,"")});return a},truncate:function(a,b,c,d){var e="",g="",f=this.toString(),i="["+ra()+"]+",h="[^"+ra()+"]*",l=s(i+h+"$");d=L(d)?"...":u(d);if(f.length<=a)return f;switch(c){case "left":a=f.length-a;e=d;f=f.slice(a);
l=s("^"+h+i);break;case "middle":a=P(a/2);g=d+f.slice(f.length-a).trimLeft();f=f.slice(0,a);break;default:a=a;g=d;f=f.slice(0,a)}if(b===m&&this.slice(a,a+1).match(/\S/))f=f.remove(l);return e+f+g},pad:function(a,b){return oa(b,a)+this+oa(b,a)},padLeft:function(a,b){return oa(b,a)+this},padRight:function(a,b){return this+oa(b,a)},first:function(a){if(L(a))a=1;return this.substr(0,a)},last:function(a){if(L(a))a=1;return this.substr(this.length-a<0?0:this.length-a)},repeat:function(a){var b="",c=0;if(D(a)&&
a>0)for(;c<a;){b+=this;c++}return b},toNumber:function(a){var b=this.replace(/,/g,"");return b.match(/\./)?parseFloat(b):parseInt(b,a||10)},capitalize:function(a){var b;return this.toLowerCase().replace(a?/[\s\S]/g:/^\S/,function(c){var d=c.toUpperCase(),e;e=b?c:d;b=d!==c;return e})},assign:function(){var a={};H(arguments,function(b,c){if(la(b))na(a,b);else a[c+1]=b});return this.replace(/\{([^{]+?)\}/g,function(b,c){return ma(a,c)?a[c]:b})},namespace:function(a){a=a||ba;I(this.split("."),function(b,
c){return!!(a=a[c])});return a}});G(u,j,m,{insert:u.prototype.add});
(function(a){if(this.btoa){Db=this.btoa;Eb=this.atob}else{var b=/[^A-Za-z0-9\+\/\=]/g;Db=function(c){var d="",e,g,f,i,h,l,n=0;do{e=c.charCodeAt(n++);g=c.charCodeAt(n++);f=c.charCodeAt(n++);i=e>>2;e=(e&3)<<4|g>>4;h=(g&15)<<2|f>>6;l=f&63;if(isNaN(g))h=l=64;else if(isNaN(f))l=64;d=d+a.charAt(i)+a.charAt(e)+a.charAt(h)+a.charAt(l)}while(n<c.length);return d};Eb=function(c){var d="",e,g,f,i,h,l=0;if(c.match(b))throw Error("String contains invalid base64 characters");c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");
do{e=a.indexOf(c.charAt(l++));g=a.indexOf(c.charAt(l++));i=a.indexOf(c.charAt(l++));h=a.indexOf(c.charAt(l++));e=e<<2|g>>4;g=(g&15)<<4|i>>2;f=(i&3)<<6|h;d+=u.fromCharCode(e);if(i!=64)d+=u.fromCharCode(g);if(h!=64)d+=u.fromCharCode(f)}while(l<c.length);return d}}})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");})();(function(){
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
    if ( Utils.isDate(month) ) {
      year = month.getFullYear();
      month = month.getMonth();
    }
    this.dateObject = null;
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
      this.dateObject = new Date( this.year, this.month, 1 );
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
        } ).hide();
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

      this.el = e.calendeer;
      $(".calendeers").append( e.calendeer );

    },
    attach: function( $el, sibling ) {
      if ( ! this.el ) {
        return this;
      }
      if ( sibling ) {
        this.el.insertAfter( $el );
      } else {
        this.el.prependTo( $el );
      }
      return this;
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
    },
    drawState: function() {
      var day,
          days = this.daysInMonth;
      while( days-- ) {
        day = this.days[ days ];
        day.drawState.apply( day, arguments );
      }
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
});$(function(){
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
      if ( self.isPast() ) {
        self.el.addClass( confs.classes.past );
      }
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
      if ( this.isPast() ) {
        return this;
      }

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

});$(function(){

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
$(function(){

  var init = function( startID, endID ) {
    var $startInput = $("#" + startID),
        $endInput = $("#" + endID),
        $startTimeInput,
        $endTimeInput,
        startName = $startInput.attr( "name" ),
        endName = $endInput.attr( "name" ),
        $startHidden = $( '<input type="hidden" />' ).attr( {
          name: startName,
          id: startID
        } ),
        $endHidden = $( '<input type="hidden" />' ).attr( {
          name: endName,
          id: endID
        } );

    $startInput.attr( "id", startID + "_calendeer" ).removeAttr( "name" );
    $endInput.attr( "id", endID + "_calendeer" ).removeAttr( "name" );
    $startTimeInput = $startInput.clone().attr( "id", startID + "_time_calendeer" );
    $endTimeInput = $endInput.clone().attr( "id", endID + "_time_calendeer" );

    $startInput.after( $startTimeInput ).after( $startHidden );
    $endInput.after( $endTimeInput ).after( $endHidden );

    var calendeer = new App.Calendeer( {
      startInput: $startInput,
      startTimeInput: $startTimeInput,
      endInput: $endInput,
      endTimeInput: $endTimeInput
    } );

    $(document).bind( "setDateTime", function( e, type, isoDate, dateObject ) {
      if ( type === "start" ) {
        $startHidden.val( isoDate );
      } else if ( type === "end" ) {
        $endHidden.val( isoDate );
      }
    } );

    return function() {
      calendeer.el.insertAfter( $endTimeInput );      
    };

  };

  var callback = function() {};
  if ( $('#offerStartDate_ID').length ) {
    // Page 1
    callback = init( "offerStartDate_ID", "offerEndDate_ID" );
  } else if ( $('#startAdvTargetDate_ID').length ) {
    // Page 3
    callback = init( "startAdvTargetDate_ID", "endAdvTargetDate_ID" );
  }

  $( "<link />", {
    href: "//paypal-moonwalk.s3.amazonaws.com/stylesheets/calendeer.css",
    rel: "stylesheet",
    type: "text/css"
  } ).appendTo( $("head") ).bind( "load", callback );

});