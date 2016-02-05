(function () {
    'use strict';

    angular
        .module('app.todo')
        .controller('TodoCtrl', TodoController);

    /** ngInject */
    function TodoController (TodoFactory) {
        var vm = this;

        vm.list = [];
        vm.todo = '';
        vm.add = add;
        vm.finish = finish;

        activate();
        ///////////

        function activate () {

            getTasks();
        }

        function add () {

            var task = {
                name: vm.todo
            };

            TodoFactory.create(task);

            vm.todo = '';
            getTasks();
        }

        function finish (taskId) {

            TodoFactory.remove(taskId);
            getTasks();
        }

        function getTasks () {

            vm.tasks = TodoFactory.list();
        }
    }
})();