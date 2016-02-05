(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('TodoFactory', TodoFactory);

    /** ngInject */
    function TodoFactory($localStorage) {

        var fact = {
            create: create,
            remove: remove,
            list: list
        };

        return fact;

        ////////////

        function list () {

            var tasks = $localStorage.tasks;

            return tasks;
        }

        function create(task) {
            var tasks = $localStorage.tasks;

            if(tasks === undefined) {
                tasks = [];
            }

            task.id = guid();
            tasks.push(task);

            $localStorage.tasks = tasks;
        }

        function remove(taskId) {

            var tasks = $localStorage.tasks;
            var newTasks = tasks.filter(filterOutId);

            $localStorage.tasks = newTasks;

            function filterOutId (task) {
                return task.id !== taskId;
            }
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();