!function r(o,e,t){function n(i,c){if(!e[i]){if(!o[i]){var f="function"==typeof require&&require;if(!c&&f)return f(i,!0);if(u)return u(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var l=e[i]={exports:{}};o[i][0].call(l.exports,function(r){var e=o[i][1][r];return n(e?e:r)},l,l.exports,r,o,e,t)}return e[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)n(t[i]);return n}({1:[function(r,o,e){"use strict";var t=r("./module");console.log(t.add(1,1)),console.log(t.substract(1,1)),console.log("Hello World")},{"./module":2}],2:[function(r,o,e){"use strict";o.exports={add:function(r,o){return r+o},substract:function(r,o){return r-o}}},{}]},{},[1]);