// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.mod_resource')

/**
 * Mod resource prefetch handler.
 *
 * @module mm.addons.mod_resource
 * @ngdoc service
 * @name $mmaModResourcePrefetchHandler
 */
.factory('$mmaModResourcePrefetchHandler', function($mmaModResource, $mmSite, mmaModResourceComponent) {

    var self = {};

    self.component = mmaModResourceComponent;

    /**
     * Get the download size of a module.
     *
     * @module mm.addons.mod_resource
     * @ngdoc method
     * @name $mmaModResourcePrefetchHandler#getDownloadSize
     * @param {Object} module Module to get the size.
     * @return {Number}       Size.
     */
    self.getDownloadSize = function(module) {
        var size = 0;
        angular.forEach(module.contents, function(content) {
            if ($mmaModResource.isFileDownloadable(content) && content.filesize) {
                size = size + content.filesize;
            }
        });
        return size;
    };

    /**
     * Whether or not the module is enabled for the site.
     *
     * @module mm.addons.mod_resource
     * @ngdoc method
     * @name $mmaModResourcePrefetchHandler#isEnabled
     * @return {Boolean}
     */
    self.isEnabled = function() {
        return $mmSite.canDownloadFiles();
    };

    /**
     * Prefetch the module.
     *
     * @module mm.addons.mod_resource
     * @ngdoc method
     * @name $mmaModResourcePrefetchHandler#prefetch
     * @param  {Object} module   The module object returned by WS.
     * @param  {Number} courseId Course ID the module belongs to.
     * @param  {Boolean} single  True if we're downloading a single module, false if we're downloading a whole section.
     * @return {Promise}         Promise resolved when all files have been downloaded. Data returned is not reliable.
     */
    self.prefetch = function(module, courseId, single) {
        return $mmaModResource.prefetchContent(module);
    };

    return self;
});
