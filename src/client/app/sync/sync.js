(function () {
    'use strict';

    angular
        .module('app.sync')
        .controller('SyncCtrl', SyncController);

    /** ngInject */
    function SyncController () {
        var vm = this;

        vm.caption = 'Sync actions across connected browsers';
    }
})();