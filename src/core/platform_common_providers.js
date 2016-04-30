'use strict';"use strict";
var console_1 = require('angular2/src/core/console');
var reflection_1 = require('./reflection/reflection');
var reflector_reader_1 = require('./reflection/reflector_reader');
var testability_1 = require('angular2/src/core/testability/testability');
var application_ref_1 = require('./application_ref');
function _reflector() {
    return reflection_1.reflector;
}
var __unused; // prevent missing use Dart warning.
/**
 * A default set of providers which should be included in any Angular platform.
 */
exports.PLATFORM_COMMON_PROVIDERS = [
    application_ref_1.PLATFORM_CORE_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: reflection_1.Reflector, useFactory: _reflector, deps: [] },
    /*@ts2dart_Provider*/ { provide: reflector_reader_1.ReflectorReader, useExisting: reflection_1.Reflector },
    testability_1.TestabilityRegistry,
    console_1.Console
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fY29tbW9uX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtdWtXeHJnZXoudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL3BsYXRmb3JtX2NvbW1vbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLHdCQUFzQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ2xELDJCQUFtQyx5QkFBeUIsQ0FBQyxDQUFBO0FBQzdELGlDQUE4QiwrQkFBK0IsQ0FBQyxDQUFBO0FBQzlELDRCQUFrQywyQ0FBMkMsQ0FBQyxDQUFBO0FBQzlFLGdDQUFzQyxtQkFBbUIsQ0FBQyxDQUFBO0FBRTFEO0lBQ0UsTUFBTSxDQUFDLHNCQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVELElBQUksUUFBYyxDQUFDLENBQUUsb0NBQW9DO0FBRXpEOztHQUVHO0FBQ1UsaUNBQXlCLEdBQTJEO0lBQy9GLHlDQUF1QjtJQUN2QixxQkFBcUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxzQkFBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQztJQUM1RSxxQkFBcUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxrQ0FBZSxFQUFFLFdBQVcsRUFBRSxzQkFBUyxFQUFDO0lBQ3hFLGlDQUFtQjtJQUNuQixpQkFBTztDQUNSLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0NvbnNvbGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NvbnNvbGUnO1xuaW1wb3J0IHtSZWZsZWN0b3IsIHJlZmxlY3Rvcn0gZnJvbSAnLi9yZWZsZWN0aW9uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtSZWZsZWN0b3JSZWFkZXJ9IGZyb20gJy4vcmVmbGVjdGlvbi9yZWZsZWN0b3JfcmVhZGVyJztcbmltcG9ydCB7VGVzdGFiaWxpdHlSZWdpc3RyeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtQTEFURk9STV9DT1JFX1BST1ZJREVSU30gZnJvbSAnLi9hcHBsaWNhdGlvbl9yZWYnO1xuXG5mdW5jdGlvbiBfcmVmbGVjdG9yKCk6IFJlZmxlY3RvciB7XG4gIHJldHVybiByZWZsZWN0b3I7XG59XG5cbnZhciBfX3VudXNlZDogVHlwZTsgIC8vIHByZXZlbnQgbWlzc2luZyB1c2UgRGFydCB3YXJuaW5nLlxuXG4vKipcbiAqIEEgZGVmYXVsdCBzZXQgb2YgcHJvdmlkZXJzIHdoaWNoIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBhbnkgQW5ndWxhciBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IGNvbnN0IFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlM6IEFycmF5PGFueSB8IFR5cGUgfCBQcm92aWRlciB8IGFueVtdPiA9IC8qQHRzMmRhcnRfY29uc3QqL1tcbiAgUExBVEZPUk1fQ09SRV9QUk9WSURFUlMsXG4gIC8qQHRzMmRhcnRfUHJvdmlkZXIqLyB7cHJvdmlkZTogUmVmbGVjdG9yLCB1c2VGYWN0b3J5OiBfcmVmbGVjdG9yLCBkZXBzOiBbXX0sXG4gIC8qQHRzMmRhcnRfUHJvdmlkZXIqLyB7cHJvdmlkZTogUmVmbGVjdG9yUmVhZGVyLCB1c2VFeGlzdGluZzogUmVmbGVjdG9yfSxcbiAgVGVzdGFiaWxpdHlSZWdpc3RyeSxcbiAgQ29uc29sZVxuXTtcbiJdfQ==