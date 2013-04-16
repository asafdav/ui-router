﻿var app = angular.module('sample', ['ui.bootstrap', 'ui.state']);
            $urlRouterProvider

            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        'main': {
                            templateUrl: 'tpl/home.html',
                            controller: function($rootScope) { $rootScope.page = "home"; }
                        },
                        'crumbs@': {
                            templateUrl: 'tpl/crumbs.html',
                            controller: function($scope) {
                                $scope.crumbs = [
                                    { link: '#/', title: 'home' }
                                ];
                            }
                        }
                    }
                })
                .state('blog', {
                    url: '/blog',
                    views: {
                        'main': {
                            templateUrl: 'tpl/blog.html',
                            controller: function($rootScope, $scope, blog) {
                                $rootScope.page = "blog";
                                $scope.categories = blog.getCategories();
                                $scope.archives = blog.getArchives();
                            }
                        },
                    }
                })
                .state('blog.category', {
                    url: '/category/{category}',
                    views: {
                        'crumbs@': {
                            templateUrl: 'tpl/crumbs.html',
                            controller: function($scope, $routeParams) {
                                $scope.crumbs = [
                                    { link: '#/blog', title: 'blog' },
                                    { link: '#/blog/category/' + $routeParams.category, title: "Category: " + $routeParams.category }
                                ];
                            }
                        }
                    }
                })
                .state('blog.archive', {
                    url: '/archive/{archive}',
                    views: {
                        'crumbs@': {
                            templateUrl: 'tpl/crumbs.html',
                            controller: function($scope, $routeParams) {
                                $scope.crumbs = [
                                    { link: '#/blog', title: 'blog' },
                                    { link: '#/blog/archive/' + $routeParams.archive, title: "Archive: " + $routeParams.archive }
                                ];
                            }
                        },
                        '': {
                            templateUrl: 'tpl/blog.list.html',
                            controller: function($scope, $routeParams, blog) {
                                $scope.title = $routeParams.archive;
                                $scope.posts = blog.getPostsByArchive($routeParams.archive);
                            }
                        }
                    }
                })
                .state('blog.post', {
                    url: '/post/{post}',
                    views: {
                        'crumbs@': {
                            templateUrl: 'tpl/crumbs.html',
                            controller: function($scope, $routeParams) {
                                $scope.crumbs = [
                                    { link: '#/blog', title: 'blog' },
                                    { link: '#/blog/post/' + $routeParams.post, title: "Post: " + $routeParams.post }
                                ];
                            }
                        }
                    }
                })
                .state('blog.post.comments', {
                    url: '/comments',
                    views: {
                        'crumbs@': {
                            templateUrl: 'tpl/crumbs.html',
                            controller: function($scope, $routeParams) {
                                $scope.crumbs = [
                                    { link: '#/blog', title: 'blog' },
                                    { link: '#/blog/post/' + $routeParams.post, title: $routeParams.post }
                                ];
                            }
                        },
                    }
                })
                .state('about', {
                    url: '/about',
                    views: {
                        'main': {
                            templateUrl: 'tpl/about.html',
                            controller: function($rootScope) { $rootScope.page = "about"; }
                        },
                        'crumbs@': {
                            templateUrl: 'tpl/crumbs.html',
                            controller: function($scope) {
                                $scope.crumbs = [
                                    { link: '#/about', title: 'about' }
                                ];
                            }
                        },
                    }
                });
       }]);

app.animation('wave-enter', function ($rootScope, $timeout) {
    return {
        setup: function (element) {
            //this is called before the animation
            var elm = $(element);
            var parent = elm.parent();
            elm.addClass('wave-enter-setup');
            parent.css({ 'height': elm.height() });
            parent.addClass('stage');

            return $rootScope.$watch(function () {
                parent.css({ 'height': elm.height() });
            });

        },
        start: function (element, done, memo) {
            //this is where the animation is expected to be run
            var elm = $(element);
            var parent = elm.parent();
            elm.addClass('wave-enter-start');

            $timeout(function () {
                memo();

                elm.removeClass('wave-enter-setup');
                elm.removeClass('wave-enter-start');

                parent.removeClass('stage');
                parent.css('height', null);

                done();
            }, 2000);

            //done();
            //jQuery(element).animate({
            //    'border-width': 20
            //}, function () {
            //    //call done to close when the animation is complete
            //    done();
            //});
        }
    };
});

app.animation('wave-enter', function ($rootScope, $timeout) {

function clean(state) {

}
function PageController($scope, $state) {
}

function printStack(message) {
    var e = new Error('dummy');
    var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
      .replace(/^\s+at\s+/gm, '')
      .replace(/^Object.\s*\(/gm, '{anonymous}()@')
      .split('\n');

    if (message) console.log(message);
    console.log(stack);
    console.log('');
}