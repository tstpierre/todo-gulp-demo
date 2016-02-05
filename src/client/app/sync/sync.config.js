(function () {
    'use strict';

    angular
        .module('app.sync')
        .config(configure);

    /** ngInject */
    function configure ($stateProvider) {

        $stateProvider
            .state('sync', {
                url: '/sync',
                templateUrl: 'app/sync/index.html',
                controller: 'SyncCtrl',
                controllerAs: 'vm'
            });
    }
})();