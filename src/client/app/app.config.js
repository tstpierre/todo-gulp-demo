(function () {
    'use strict';

    angular
        .module('app')
        .config(configure);

    /** ngInject */
    function configure ($urlRouterProvider) {

        $urlRouterProvider.otherwise('todo');
    }
})();