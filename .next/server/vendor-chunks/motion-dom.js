"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/motion-dom";
exports.ids = ["vendor-chunks/motion-dom"];
exports.modules = {

/***/ "(ssr)/./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   resolveElements: () => (/* binding */ resolveElements)\n/* harmony export */ });\nfunction resolveElements(elementOrSelector, scope, selectorCache) {\n    if (elementOrSelector == null) {\n        return [];\n    }\n    if (elementOrSelector instanceof EventTarget) {\n        return [elementOrSelector];\n    }\n    else if (typeof elementOrSelector === \"string\") {\n        let root = document;\n        if (scope) {\n            root = scope.current;\n        }\n        const elements = selectorCache?.[elementOrSelector] ??\n            root.querySelectorAll(elementOrSelector);\n        return elements ? Array.from(elements) : [];\n    }\n    return Array.from(elementOrSelector).filter((element) => element != null);\n}\n\n\n//# sourceMappingURL=resolve-elements.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbW90aW9uLWRvbS9kaXN0L2VzL3V0aWxzL3Jlc29sdmUtZWxlbWVudHMubWpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTJCO0FBQzNCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGFubWVsXFxHaXRodWJSZXBvc1xcc2FwLWRhc2hib2FyZFxcbm9kZV9tb2R1bGVzXFxtb3Rpb24tZG9tXFxkaXN0XFxlc1xcdXRpbHNcXHJlc29sdmUtZWxlbWVudHMubWpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlc29sdmVFbGVtZW50cyhlbGVtZW50T3JTZWxlY3Rvciwgc2NvcGUsIHNlbGVjdG9yQ2FjaGUpIHtcbiAgICBpZiAoZWxlbWVudE9yU2VsZWN0b3IgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGlmIChlbGVtZW50T3JTZWxlY3RvciBpbnN0YW5jZW9mIEV2ZW50VGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBbZWxlbWVudE9yU2VsZWN0b3JdO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZWxlbWVudE9yU2VsZWN0b3IgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgbGV0IHJvb3QgPSBkb2N1bWVudDtcbiAgICAgICAgaWYgKHNjb3BlKSB7XG4gICAgICAgICAgICByb290ID0gc2NvcGUuY3VycmVudDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGVtZW50cyA9IHNlbGVjdG9yQ2FjaGU/LltlbGVtZW50T3JTZWxlY3Rvcl0gPz9cbiAgICAgICAgICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbChlbGVtZW50T3JTZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiBlbGVtZW50cyA/IEFycmF5LmZyb20oZWxlbWVudHMpIDogW107XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnRPclNlbGVjdG9yKS5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQgIT0gbnVsbCk7XG59XG5cbmV4cG9ydCB7IHJlc29sdmVFbGVtZW50cyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzb2x2ZS1lbGVtZW50cy5tanMubWFwXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs\n");

/***/ })

};
;