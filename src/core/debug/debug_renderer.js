'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var debug_node_1 = require('angular2/src/core/debug/debug_node');
var DebugDomRootRenderer = (function () {
    function DebugDomRootRenderer(_delegate) {
        this._delegate = _delegate;
    }
    DebugDomRootRenderer.prototype.renderComponent = function (componentProto) {
        return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
    };
    return DebugDomRootRenderer;
}());
exports.DebugDomRootRenderer = DebugDomRootRenderer;
var DebugDomRenderer = (function () {
    function DebugDomRenderer(_delegate) {
        this._delegate = _delegate;
    }
    DebugDomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
        var debugEl = new debug_node_1.DebugElement(nativeEl, null, debugInfo);
        debug_node_1.indexDebugNode(debugEl);
        return nativeEl;
    };
    DebugDomRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
        var nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
        var debugEl = new debug_node_1.DebugElement(nativeEl, debug_node_1.getDebugNode(parentElement), debugInfo);
        debugEl.name = name;
        debug_node_1.indexDebugNode(debugEl);
        return nativeEl;
    };
    DebugDomRenderer.prototype.createViewRoot = function (hostElement) { return this._delegate.createViewRoot(hostElement); };
    DebugDomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
        var comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
        var debugEl = new debug_node_1.DebugNode(comment, debug_node_1.getDebugNode(parentElement), debugInfo);
        debug_node_1.indexDebugNode(debugEl);
        return comment;
    };
    DebugDomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
        var text = this._delegate.createText(parentElement, value, debugInfo);
        var debugEl = new debug_node_1.DebugNode(text, debug_node_1.getDebugNode(parentElement), debugInfo);
        debug_node_1.indexDebugNode(debugEl);
        return text;
    };
    DebugDomRenderer.prototype.projectNodes = function (parentElement, nodes) {
        var debugParent = debug_node_1.getDebugNode(parentElement);
        if (lang_1.isPresent(debugParent) && debugParent instanceof debug_node_1.DebugElement) {
            var debugElement_1 = debugParent;
            nodes.forEach(function (node) { debugElement_1.addChild(debug_node_1.getDebugNode(node)); });
        }
        this._delegate.projectNodes(parentElement, nodes);
    };
    DebugDomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
        var debugNode = debug_node_1.getDebugNode(node);
        if (lang_1.isPresent(debugNode)) {
            var debugParent = debugNode.parent;
            if (viewRootNodes.length > 0 && lang_1.isPresent(debugParent)) {
                var debugViewRootNodes = [];
                viewRootNodes.forEach(function (rootNode) { return debugViewRootNodes.push(debug_node_1.getDebugNode(rootNode)); });
                debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
            }
        }
        this._delegate.attachViewAfter(node, viewRootNodes);
    };
    DebugDomRenderer.prototype.detachView = function (viewRootNodes) {
        viewRootNodes.forEach(function (node) {
            var debugNode = debug_node_1.getDebugNode(node);
            if (lang_1.isPresent(debugNode) && lang_1.isPresent(debugNode.parent)) {
                debugNode.parent.removeChild(debugNode);
            }
        });
        this._delegate.detachView(viewRootNodes);
    };
    DebugDomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        viewAllNodes.forEach(function (node) { debug_node_1.removeDebugNodeFromIndex(debug_node_1.getDebugNode(node)); });
        this._delegate.destroyView(hostElement, viewAllNodes);
    };
    DebugDomRenderer.prototype.listen = function (renderElement, name, callback) {
        var debugEl = debug_node_1.getDebugNode(renderElement);
        if (lang_1.isPresent(debugEl)) {
            debugEl.listeners.push(new debug_node_1.EventListener(name, callback));
        }
        return this._delegate.listen(renderElement, name, callback);
    };
    DebugDomRenderer.prototype.listenGlobal = function (target, name, callback) {
        return this._delegate.listenGlobal(target, name, callback);
    };
    DebugDomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        var debugEl = debug_node_1.getDebugNode(renderElement);
        if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
            debugEl.properties[propertyName] = propertyValue;
        }
        this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
    };
    DebugDomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        var debugEl = debug_node_1.getDebugNode(renderElement);
        if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
            debugEl.attributes[attributeName] = attributeValue;
        }
        this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    DebugDomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    DebugDomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        this._delegate.setElementClass(renderElement, className, isAdd);
    };
    DebugDomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        this._delegate.setElementStyle(renderElement, styleName, styleValue);
    };
    DebugDomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        this._delegate.invokeElementMethod(renderElement, methodName, args);
    };
    DebugDomRenderer.prototype.setText = function (renderNode, text) { this._delegate.setText(renderNode, text); };
    return DebugDomRenderer;
}());
exports.DebugDomRenderer = DebugDomRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdfcmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXVrV3hyZ2V6LnRtcC9hbmd1bGFyMi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXdCLDBCQUEwQixDQUFDLENBQUE7QUFPbkQsMkJBT08sb0NBQW9DLENBQUMsQ0FBQTtBQUU1QztJQUNFLDhCQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQUcsQ0FBQztJQUUvQyw4Q0FBZSxHQUFmLFVBQWdCLGNBQW1DO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSw0QkFBb0IsdUJBTWhDLENBQUE7QUFFRDtJQUNFLDBCQUFvQixTQUFtQjtRQUFuQixjQUFTLEdBQVQsU0FBUyxDQUFVO0lBQUcsQ0FBQztJQUUzQyw0Q0FBaUIsR0FBakIsVUFBa0IsY0FBNEIsRUFBRSxTQUEwQjtRQUN4RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHlCQUFZLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxRCwyQkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELHdDQUFhLEdBQWIsVUFBYyxhQUFrQixFQUFFLElBQVksRUFBRSxTQUEwQjtRQUN4RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxh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LENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsMENBQWUsR0FBZixVQUFnQixhQUFrQixFQUFFLFNBQWlCLEVBQUUsS0FBYztRQUNuRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCwwQ0FBZSxHQUFmLFVBQWdCLGFBQWtCLEVBQUUsU0FBaUIsRUFBRSxVQUFrQjtRQUN2RSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCw4Q0FBbUIsR0FBbkIsVUFBb0IsYUFBa0IsRUFBRSxVQUFrQixFQUFFLElBQVc7UUFDckUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxrQ0FBTyxHQUFQLFVBQVEsVUFBZSxFQUFFLElBQVksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLHVCQUFDO0FBQUQsQ0FBQyxBQXBIRCxJQW9IQztBQXBIWSx3QkFBZ0IsbUJBb0g1QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1xuICBSZW5kZXJlcixcbiAgUm9vdFJlbmRlcmVyLFxuICBSZW5kZXJDb21wb25lbnRUeXBlLFxuICBSZW5kZXJEZWJ1Z0luZm9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge1xuICBEZWJ1Z05vZGUsXG4gIERlYnVnRWxlbWVudCxcbiAgRXZlbnRMaXN0ZW5lcixcbiAgZ2V0RGVidWdOb2RlLFxuICBpbmRleERlYnVnTm9kZSxcbiAgcmVtb3ZlRGVidWdOb2RlRnJvbUluZGV4XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUnO1xuXG5leHBvcnQgY2xhc3MgRGVidWdEb21Sb290UmVuZGVyZXIgaW1wbGVtZW50cyBSb290UmVuZGVyZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kZWxlZ2F0ZTogUm9vdFJlbmRlcmVyKSB7fVxuXG4gIHJlbmRlckNvbXBvbmVudChjb21wb25lbnRQcm90bzogUmVuZGVyQ29tcG9uZW50VHlwZSk6IFJlbmRlcmVyIHtcbiAgICByZXR1cm4gbmV3IERlYnVnRG9tUmVuZGVyZXIodGhpcy5fZGVsZWdhdGUucmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFByb3RvKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlYnVnRG9tUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RlbGVnYXRlOiBSZW5kZXJlcikge31cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogc3RyaW5nIHwgYW55LCBkZWJ1Z0luZm86IFJlbmRlckRlYnVnSW5mbyk6IGFueSB7XG4gICAgdmFyIG5hdGl2ZUVsID0gdGhpcy5fZGVsZWdhdGUuc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGUsIGRlYnVnSW5mbyk7XG4gICAgdmFyIGRlYnVnRWwgPSBuZXcgRGVidWdFbGVtZW50KG5hdGl2ZUVsLCBudWxsLCBkZWJ1Z0luZm8pO1xuICAgIGluZGV4RGVidWdOb2RlKGRlYnVnRWwpO1xuICAgIHJldHVybiBuYXRpdmVFbDtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQocGFyZW50RWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGRlYnVnSW5mbzogUmVuZGVyRGVidWdJbmZvKTogYW55IHtcbiAgICB2YXIgbmF0aXZlRWwgPSB0aGlzLl9kZWxlZ2F0ZS5jcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQsIG5hbWUsIGRlYnVnSW5mbyk7XG4gICAgdmFyIGRlYnVnRWwgPSBuZXcgRGVidWdFbGVtZW50KG5hdGl2ZUVsLCBnZXREZWJ1Z05vZGUocGFyZW50RWxlbWVudCksIGRlYnVnSW5mbyk7XG4gICAgZGVidWdFbC5uYW1lID0gbmFtZTtcbiAgICBpbmRleERlYnVnTm9kZShkZWJ1Z0VsKTtcbiAgICByZXR1cm4gbmF0aXZlRWw7XG4gIH1cblxuICBjcmVhdGVWaWV3Um9vdChob3N0RWxlbWVudDogYW55KTogYW55IHsgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmNyZWF0ZVZpZXdSb290KGhvc3RFbGVtZW50KTsgfVxuXG4gIGNyZWF0ZVRlbXBsYXRlQW5jaG9yKHBhcmVudEVsZW1lbnQ6IGFueSwgZGVidWdJbmZvOiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnkge1xuICAgIHZhciBjb21tZW50ID0gdGhpcy5fZGVsZWdhdGUuY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudCwgZGVidWdJbmZvKTtcbiAgICB2YXIgZGVidWdFbCA9IG5ldyBEZWJ1Z05vZGUoY29tbWVudCwgZ2V0RGVidWdOb2RlKHBhcmVudEVsZW1lbnQpLCBkZWJ1Z0luZm8pO1xuICAgIGluZGV4RGVidWdOb2RlKGRlYnVnRWwpO1xuICAgIHJldHVybiBjb21tZW50O1xuICB9XG5cbiAgY3JlYXRlVGV4dChwYXJlbnRFbGVtZW50OiBhbnksIHZhbHVlOiBzdHJpbmcsIGRlYnVnSW5mbzogUmVuZGVyRGVidWdJbmZvKTogYW55IHtcbiAgICB2YXIgdGV4dCA9IHRoaXMuX2RlbGVnYXRlLmNyZWF0ZVRleHQocGFyZW50RWxlbWVudCwgdmFsdWUsIGRlYnVnSW5mbyk7XG4gICAgdmFyIGRlYnVnRWwgPSBuZXcgRGVidWdOb2RlKHRleHQsIGdldERlYnVnTm9kZShwYXJlbnRFbGVtZW50KSwgZGVidWdJbmZvKTtcbiAgICBpbmRleERlYnVnTm9kZShkZWJ1Z0VsKTtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHByb2plY3ROb2RlcyhwYXJlbnRFbGVtZW50OiBhbnksIG5vZGVzOiBhbnlbXSkge1xuICAgIHZhciBkZWJ1Z1BhcmVudCA9IGdldERlYnVnTm9kZShwYXJlbnRFbGVtZW50KTtcbiAgICBpZiAoaXNQcmVzZW50KGRlYnVnUGFyZW50KSAmJiBkZWJ1Z1BhcmVudCBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgbGV0IGRlYnVnRWxlbWVudCA9IGRlYnVnUGFyZW50O1xuICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4geyBkZWJ1Z0VsZW1lbnQuYWRkQ2hpbGQoZ2V0RGVidWdOb2RlKG5vZGUpKTsgfSk7XG4gICAgfVxuICAgIHRoaXMuX2RlbGVnYXRlLnByb2plY3ROb2RlcyhwYXJlbnRFbGVtZW50LCBub2Rlcyk7XG4gIH1cblxuICBhdHRhY2hWaWV3QWZ0ZXIobm9kZTogYW55LCB2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHZhciBkZWJ1Z05vZGUgPSBnZXREZWJ1Z05vZGUobm9kZSk7XG4gICAgaWYgKGlzUHJlc2VudChkZWJ1Z05vZGUpKSB7XG4gICAgICB2YXIgZGVidWdQYXJlbnQgPSBkZWJ1Z05vZGUucGFyZW50O1xuICAgICAgaWYgKHZpZXdSb290Tm9kZXMubGVuZ3RoID4gMCAmJiBpc1ByZXNlbnQoZGVidWdQYXJlbnQpKSB7XG4gICAgICAgIHZhciBkZWJ1Z1ZpZXdSb290Tm9kZXM6IERlYnVnTm9kZVtdID0gW107XG4gICAgICAgIHZpZXdSb290Tm9kZXMuZm9yRWFjaCgocm9vdE5vZGUpID0+IGRlYnVnVmlld1Jvb3ROb2Rlcy5wdXNoKGdldERlYnVnTm9kZShyb290Tm9kZSkpKTtcbiAgICAgICAgZGVidWdQYXJlbnQuaW5zZXJ0Q2hpbGRyZW5BZnRlcihkZWJ1Z05vZGUsIGRlYnVnVmlld1Jvb3ROb2Rlcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2RlbGVnYXRlLmF0dGFjaFZpZXdBZnRlcihub2RlLCB2aWV3Um9vdE5vZGVzKTtcbiAgfVxuXG4gIGRldGFjaFZpZXcodmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICB2aWV3Um9vdE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHZhciBkZWJ1Z05vZGUgPSBnZXREZWJ1Z05vZGUobm9kZSk7XG4gICAgICBpZiAoaXNQcmVzZW50KGRlYnVnTm9kZSkgJiYgaXNQcmVzZW50KGRlYnVnTm9kZS5wYXJlbnQpKSB7XG4gICAgICAgIGRlYnVnTm9kZS5wYXJlbnQucmVtb3ZlQ2hpbGQoZGVidWdOb2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5kZXRhY2hWaWV3KHZpZXdSb290Tm9kZXMpO1xuICB9XG5cbiAgZGVzdHJveVZpZXcoaG9zdEVsZW1lbnQ6IGFueSwgdmlld0FsbE5vZGVzOiBhbnlbXSkge1xuICAgIHZpZXdBbGxOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IHJlbW92ZURlYnVnTm9kZUZyb21JbmRleChnZXREZWJ1Z05vZGUobm9kZSkpOyB9KTtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5kZXN0cm95Vmlldyhob3N0RWxlbWVudCwgdmlld0FsbE5vZGVzKTtcbiAgfVxuXG4gIGxpc3RlbihyZW5kZXJFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHZhciBkZWJ1Z0VsID0gZ2V0RGVidWdOb2RlKHJlbmRlckVsZW1lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQoZGVidWdFbCkpIHtcbiAgICAgIGRlYnVnRWwubGlzdGVuZXJzLnB1c2gobmV3IEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmxpc3RlbihyZW5kZXJFbGVtZW50LCBuYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBsaXN0ZW5HbG9iYWwodGFyZ2V0OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5saXN0ZW5HbG9iYWwodGFyZ2V0LCBuYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KSB7XG4gICAgdmFyIGRlYnVnRWwgPSBnZXREZWJ1Z05vZGUocmVuZGVyRWxlbWVudCk7XG4gICAgaWYgKGlzUHJlc2VudChkZWJ1Z0VsKSAmJiBkZWJ1Z0VsIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBkZWJ1Z0VsLnByb3BlcnRpZXNbcHJvcGVydHlOYW1lXSA9IHByb3BlcnR5VmFsdWU7XG4gICAgfVxuICAgIHRoaXMuX2RlbGVnYXRlLnNldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJFbGVtZW50LCBwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpO1xuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50OiBhbnksIGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgYXR0cmlidXRlVmFsdWU6IHN0cmluZykge1xuICAgIHZhciBkZWJ1Z0VsID0gZ2V0RGVidWdOb2RlKHJlbmRlckVsZW1lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQoZGVidWdFbCkgJiYgZGVidWdFbCBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgZGVidWdFbC5hdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlVmFsdWU7XG4gICAgfVxuICAgIHRoaXMuX2RlbGVnYXRlLnNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudCwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICB9XG5cbiAgc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5zZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gIH1cblxuICBzZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5zZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudCwgY2xhc3NOYW1lLCBpc0FkZCk7XG4gIH1cblxuICBzZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZGVsZWdhdGUuc2V0RWxlbWVudFN0eWxlKHJlbmRlckVsZW1lbnQsIHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSk7XG4gIH1cblxuICBpbnZva2VFbGVtZW50TWV0aG9kKHJlbmRlckVsZW1lbnQ6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSkge1xuICAgIHRoaXMuX2RlbGVnYXRlLmludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudCwgbWV0aG9kTmFtZSwgYXJncyk7XG4gIH1cblxuICBzZXRUZXh0KHJlbmRlck5vZGU6IGFueSwgdGV4dDogc3RyaW5nKSB7IHRoaXMuX2RlbGVnYXRlLnNldFRleHQocmVuZGVyTm9kZSwgdGV4dCk7IH1cbn1cbiJdfQ==