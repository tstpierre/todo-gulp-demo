(function () {
    'use strict';

    angular
        .module('app.todo')
        .config(configure);

    /** ngInject */
    function configure($stateProvider) {

        $stateProvider
            .state('todo', {
                url: '/todo',
                templateUrl: 'app/todo/index.html',
                controller: 'TodoCtrl',
                controllerAs: 'vm'
            });
    }
})();