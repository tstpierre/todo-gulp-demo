(function () {
    'use strict';

    angular.module('app', [
       'app.core',
       'app.services',

       // feature modules
       'app.templates',
       'app.todo'
    ]);
})();