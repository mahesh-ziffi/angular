import { isBlank } from 'angular2/src/facade/lang';
import { unimplemented } from 'angular2/src/facade/exceptions';
import { ViewUtils } from './view_utils';
/**
 * Represents an instance of a Component created via a {@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
 * method.
 */
export class ComponentRef {
    /**
     * Location of the Host Element of this Component Instance.
     */
    get location() { return unimplemented(); }
    /**
     * The injector on which the component instance exists.
     */
    get injector() { return unimplemented(); }
    /**
     * The instance of the Component.
     */
    get instance() { return unimplemented(); }
    ;
    /**
     * The {@link ViewRef} of the Host View of this Component instance.
     */
    get hostView() { return unimplemented(); }
    ;
    /**
     * The {@link ChangeDetectorRef} of the Component instance.
     */
    get changeDetectorRef() { return unimplemented(); }
    /**
     * The component type.
     */
    get componentType() { return unimplemented(); }
}
export class ComponentRef_ extends ComponentRef {
    constructor(_hostElement, _componentType) {
        super();
        this._hostElement = _hostElement;
        this._componentType = _componentType;
    }
    get location() { return this._hostElement.elementRef; }
    get injector() { return this._hostElement.injector; }
    get instance() { return this._hostElement.component; }
    ;
    get hostView() { return this._hostElement.parentView.ref; }
    ;
    get changeDetectorRef() { return this.hostView; }
    ;
    get componentType() { return this._componentType; }
    destroy() { this._hostElement.parentView.destroy(); }
    onDestroy(callback) { this.hostView.onDestroy(callback); }
}
const EMPTY_CONTEXT = new Object();
/*@ts2dart_const*/
export class ComponentFactory {
    constructor(selector, _viewFactory, _componentType) {
        this.selector = selector;
        this._viewFactory = _viewFactory;
        this._componentType = _componentType;
    }
    get componentType() { return this._componentType; }
    /**
     * Creates a new component.
     */
    create(injector, projectableNodes = null, rootSelectorOrNode = null) {
        var vu = injector.get(ViewUtils);
        if (isBlank(projectableNodes)) {
            projectableNodes = [];
        }
        // Note: Host views don't need a declarationAppElement!
        var hostView = this._viewFactory(vu, injector, null);
        var hostElement = hostView.create(EMPTY_CONTEXT, projectableNodes, rootSelectorOrNode);
        return new ComponentRef_(hostElement, this._componentType);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50X2ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXV4Z0t5c084LnRtcC9hbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvY29tcG9uZW50X2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQ08sRUFBa0IsT0FBTyxFQUFDLE1BQU0sMEJBQTBCO09BQzFELEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDO09BSXJELEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYztBQUd0Qzs7Ozs7O0dBTUc7QUFDSDtJQUNFOztPQUVHO0lBQ0gsSUFBSSxRQUFRLEtBQWlCLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdEQ7O09BRUc7SUFDSCxJQUFJLFFBQVEsS0FBZSxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXBEOztPQUVHO0lBQ0gsSUFBSSxRQUFRLEtBQVUsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7SUFFL0M7O09BRUc7SUFDSCxJQUFJLFFBQVEsS0FBYyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOztJQUVuRDs7T0FFRztJQUNILElBQUksaUJBQWlCLEtBQXdCLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdEU7O09BRUc7SUFDSCxJQUFJLGFBQWEsS0FBVyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBV3ZELENBQUM7QUFFRCxtQ0FBbUMsWUFBWTtJQUM3QyxZQUFvQixZQUF3QixFQUFVLGNBQW9CO1FBQUksT0FBTyxDQUFDO1FBQWxFLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQU07SUFBYSxDQUFDO0lBQ3hGLElBQUksUUFBUSxLQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ25FLElBQUksUUFBUSxLQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDL0QsSUFBSSxRQUFRLEtBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7SUFDM0QsSUFBSSxRQUFRLEtBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0lBQ3BFLElBQUksaUJBQWlCLEtBQXdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7SUFDcEUsSUFBSSxhQUFhLEtBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBRXpELE9BQU8sS0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0QsU0FBUyxDQUFDLFFBQWtCLElBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFFRCxNQUFNLGFBQWEsR0FBc0IsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUV0RCxrQkFBa0I7QUFDbEI7SUFDRSxZQUFtQixRQUFnQixFQUFVLFlBQXNCLEVBQy9DLGNBQW9CO1FBRHJCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUMvQyxtQkFBYyxHQUFkLGNBQWMsQ0FBTTtJQUFHLENBQUM7SUFFNUMsSUFBSSxhQUFhLEtBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBRXpEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFFBQWtCLEVBQUUsZ0JBQWdCLEdBQVksSUFBSSxFQUNwRCxrQkFBa0IsR0FBaUIsSUFBSTtRQUM1QyxJQUFJLEVBQUUsR0FBYyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNELHVEQUF1RDtRQUN2RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUN2RixNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3RCxDQUFDO0FBQ0gsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge3VuaW1wbGVtZW50ZWR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJy4vZWxlbWVudF9yZWYnO1xuaW1wb3J0IHtWaWV3UmVmLCBWaWV3UmVmX30gZnJvbSAnLi92aWV3X3JlZic7XG5pbXBvcnQge0FwcEVsZW1lbnR9IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQge1ZpZXdVdGlsc30gZnJvbSAnLi92aWV3X3V0aWxzJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnN0YW5jZSBvZiBhIENvbXBvbmVudCBjcmVhdGVkIHZpYSBhIHtAbGluayBDb21wb25lbnRGYWN0b3J5fS5cbiAqXG4gKiBgQ29tcG9uZW50UmVmYCBwcm92aWRlcyBhY2Nlc3MgdG8gdGhlIENvbXBvbmVudCBJbnN0YW5jZSBhcyB3ZWxsIG90aGVyIG9iamVjdHMgcmVsYXRlZCB0byB0aGlzXG4gKiBDb21wb25lbnQgSW5zdGFuY2UgYW5kIGFsbG93cyB5b3UgdG8gZGVzdHJveSB0aGUgQ29tcG9uZW50IEluc3RhbmNlIHZpYSB0aGUge0BsaW5rICNkZXN0cm95fVxuICogbWV0aG9kLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50UmVmIHtcbiAgLyoqXG4gICAqIExvY2F0aW9uIG9mIHRoZSBIb3N0IEVsZW1lbnQgb2YgdGhpcyBDb21wb25lbnQgSW5zdGFuY2UuXG4gICAqL1xuICBnZXQgbG9jYXRpb24oKTogRWxlbWVudFJlZiB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH1cblxuICAvKipcbiAgICogVGhlIGluamVjdG9yIG9uIHdoaWNoIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgZXhpc3RzLlxuICAgKi9cbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTsgfVxuXG4gIC8qKlxuICAgKiBUaGUgaW5zdGFuY2Ugb2YgdGhlIENvbXBvbmVudC5cbiAgICovXG4gIGdldCBpbnN0YW5jZSgpOiBhbnkgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIFZpZXdSZWZ9IG9mIHRoZSBIb3N0IFZpZXcgb2YgdGhpcyBDb21wb25lbnQgaW5zdGFuY2UuXG4gICAqL1xuICBnZXQgaG9zdFZpZXcoKTogVmlld1JlZiB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH07XG5cbiAgLyoqXG4gICAqIFRoZSB7QGxpbmsgQ2hhbmdlRGV0ZWN0b3JSZWZ9IG9mIHRoZSBDb21wb25lbnQgaW5zdGFuY2UuXG4gICAqL1xuICBnZXQgY2hhbmdlRGV0ZWN0b3JSZWYoKTogQ2hhbmdlRGV0ZWN0b3JSZWYgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wb25lbnQgdHlwZS5cbiAgICovXG4gIGdldCBjb21wb25lbnRUeXBlKCk6IFR5cGUgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgYW5kIGFsbCBvZiB0aGUgZGF0YSBzdHJ1Y3R1cmVzIGFzc29jaWF0ZWQgd2l0aCBpdC5cbiAgICovXG4gIGFic3RyYWN0IGRlc3Ryb3koKTogdm9pZDtcblxuICAvKipcbiAgICogQWxsb3dzIHRvIHJlZ2lzdGVyIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICAgKi9cbiAgYWJzdHJhY3Qgb25EZXN0cm95KGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRSZWZfIGV4dGVuZHMgQ29tcG9uZW50UmVmIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaG9zdEVsZW1lbnQ6IEFwcEVsZW1lbnQsIHByaXZhdGUgX2NvbXBvbmVudFR5cGU6IFR5cGUpIHsgc3VwZXIoKTsgfVxuICBnZXQgbG9jYXRpb24oKTogRWxlbWVudFJlZiB7IHJldHVybiB0aGlzLl9ob3N0RWxlbWVudC5lbGVtZW50UmVmOyB9XG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB0aGlzLl9ob3N0RWxlbWVudC5pbmplY3RvcjsgfVxuICBnZXQgaW5zdGFuY2UoKTogYW55IHsgcmV0dXJuIHRoaXMuX2hvc3RFbGVtZW50LmNvbXBvbmVudDsgfTtcbiAgZ2V0IGhvc3RWaWV3KCk6IFZpZXdSZWYgeyByZXR1cm4gdGhpcy5faG9zdEVsZW1lbnQucGFyZW50Vmlldy5yZWY7IH07XG4gIGdldCBjaGFuZ2VEZXRlY3RvclJlZigpOiBDaGFuZ2VEZXRlY3RvclJlZiB7IHJldHVybiB0aGlzLmhvc3RWaWV3OyB9O1xuICBnZXQgY29tcG9uZW50VHlwZSgpOiBUeXBlIHsgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFR5cGU7IH1cblxuICBkZXN0cm95KCk6IHZvaWQgeyB0aGlzLl9ob3N0RWxlbWVudC5wYXJlbnRWaWV3LmRlc3Ryb3koKTsgfVxuICBvbkRlc3Ryb3koY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7IHRoaXMuaG9zdFZpZXcub25EZXN0cm95KGNhbGxiYWNrKTsgfVxufVxuXG5jb25zdCBFTVBUWV9DT05URVhUID0gLypAdHMyZGFydF9jb25zdCovIG5ldyBPYmplY3QoKTtcblxuLypAdHMyZGFydF9jb25zdCovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzZWxlY3Rvcjogc3RyaW5nLCBwcml2YXRlIF92aWV3RmFjdG9yeTogRnVuY3Rpb24sXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFR5cGU6IFR5cGUpIHt9XG5cbiAgZ2V0IGNvbXBvbmVudFR5cGUoKTogVHlwZSB7IHJldHVybiB0aGlzLl9jb21wb25lbnRUeXBlOyB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29tcG9uZW50LlxuICAgKi9cbiAgY3JlYXRlKGluamVjdG9yOiBJbmplY3RvciwgcHJvamVjdGFibGVOb2RlczogYW55W11bXSA9IG51bGwsXG4gICAgICAgICByb290U2VsZWN0b3JPck5vZGU6IHN0cmluZyB8IGFueSA9IG51bGwpOiBDb21wb25lbnRSZWYge1xuICAgIHZhciB2dTogVmlld1V0aWxzID0gaW5qZWN0b3IuZ2V0KFZpZXdVdGlscyk7XG4gICAgaWYgKGlzQmxhbmsocHJvamVjdGFibGVOb2RlcykpIHtcbiAgICAgIHByb2plY3RhYmxlTm9kZXMgPSBbXTtcbiAgICB9XG4gICAgLy8gTm90ZTogSG9zdCB2aWV3cyBkb24ndCBuZWVkIGEgZGVjbGFyYXRpb25BcHBFbGVtZW50IVxuICAgIHZhciBob3N0VmlldyA9IHRoaXMuX3ZpZXdGYWN0b3J5KHZ1LCBpbmplY3RvciwgbnVsbCk7XG4gICAgdmFyIGhvc3RFbGVtZW50ID0gaG9zdFZpZXcuY3JlYXRlKEVNUFRZX0NPTlRFWFQsIHByb2plY3RhYmxlTm9kZXMsIHJvb3RTZWxlY3Rvck9yTm9kZSk7XG4gICAgcmV0dXJuIG5ldyBDb21wb25lbnRSZWZfKGhvc3RFbGVtZW50LCB0aGlzLl9jb21wb25lbnRUeXBlKTtcbiAgfVxufVxuIl19