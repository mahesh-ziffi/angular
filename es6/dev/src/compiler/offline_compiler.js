import { CompileIdentifierMetadata, createHostComponentMeta } from './compile_metadata';
import { BaseException } from 'angular2/src/facade/exceptions';
import { ListWrapper } from 'angular2/src/facade/collection';
import * as o from './output/output_ast';
import { ComponentFactory } from 'angular2/src/core/linker/component_factory';
import { MODULE_SUFFIX } from './util';
var _COMPONENT_FACTORY_IDENTIFIER = new CompileIdentifierMetadata({
    name: 'ComponentFactory',
    runtime: ComponentFactory,
    moduleUrl: `asset:angular2/lib/src/core/linker/component_factory${MODULE_SUFFIX}`
});
export class SourceModule {
    constructor(moduleUrl, source) {
        this.moduleUrl = moduleUrl;
        this.source = source;
    }
}
export class NormalizedComponentWithViewDirectives {
    constructor(component, directives, pipes) {
        this.component = component;
        this.directives = directives;
        this.pipes = pipes;
    }
}
export class OfflineCompiler {
    constructor(_directiveNormalizer, _templateParser, _styleCompiler, _viewCompiler, _outputEmitter) {
        this._directiveNormalizer = _directiveNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._outputEmitter = _outputEmitter;
    }
    normalizeDirectiveMetadata(directive) {
        return this._directiveNormalizer.normalizeDirective(directive);
    }
    compileTemplates(components) {
        if (components.length === 0) {
            throw new BaseException('No components given');
        }
        var statements = [];
        var exportedVars = [];
        var moduleUrl = _templateModuleUrl(components[0].component);
        components.forEach(componentWithDirs => {
            var compMeta = componentWithDirs.component;
            _assertComponent(compMeta);
            var compViewFactoryVar = this._compileComponent(compMeta, componentWithDirs.directives, componentWithDirs.pipes, statements);
            exportedVars.push(compViewFactoryVar);
            var hostMeta = createHostComponentMeta(compMeta.type, compMeta.selector);
            var hostViewFactoryVar = this._compileComponent(hostMeta, [compMeta], [], statements);
            var compFactoryVar = `${compMeta.type.name}NgFactory`;
            statements.push(o.variable(compFactoryVar)
                .set(o.importExpr(_COMPONENT_FACTORY_IDENTIFIER)
                .instantiate([
                o.literal(compMeta.selector),
                o.variable(hostViewFactoryVar),
                o.importExpr(compMeta.type)
            ], o.importType(_COMPONENT_FACTORY_IDENTIFIER, null, [o.TypeModifier.Const])))
                .toDeclStmt(null, [o.StmtModifier.Final]));
            exportedVars.push(compFactoryVar);
        });
        return this._codegenSourceModule(moduleUrl, statements, exportedVars);
    }
    compileStylesheet(stylesheetUrl, cssText) {
        var plainStyles = this._styleCompiler.compileStylesheet(stylesheetUrl, cssText, false);
        var shimStyles = this._styleCompiler.compileStylesheet(stylesheetUrl, cssText, true);
        return [
            this._codegenSourceModule(_stylesModuleUrl(stylesheetUrl, false), _resolveStyleStatements(plainStyles), [plainStyles.stylesVar]),
            this._codegenSourceModule(_stylesModuleUrl(stylesheetUrl, true), _resolveStyleStatements(shimStyles), [shimStyles.stylesVar])
        ];
    }
    _compileComponent(compMeta, directives, pipes, targetStatements) {
        var styleResult = this._styleCompiler.compileComponent(compMeta);
        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, compMeta.type.name);
        var viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, o.variable(styleResult.stylesVar), pipes);
        ListWrapper.addAll(targetStatements, _resolveStyleStatements(styleResult));
        ListWrapper.addAll(targetStatements, _resolveViewStatements(viewResult));
        return viewResult.viewFactoryVar;
    }
    _codegenSourceModule(moduleUrl, statements, exportedVars) {
        return new SourceModule(moduleUrl, this._outputEmitter.emitStatements(moduleUrl, statements, exportedVars));
    }
}
function _resolveViewStatements(compileResult) {
    compileResult.dependencies.forEach((dep) => { dep.factoryPlaceholder.moduleUrl = _templateModuleUrl(dep.comp); });
    return compileResult.statements;
}
function _resolveStyleStatements(compileResult) {
    compileResult.dependencies.forEach((dep) => {
        dep.valuePlaceholder.moduleUrl = _stylesModuleUrl(dep.sourceUrl, dep.isShimmed);
    });
    return compileResult.statements;
}
function _templateModuleUrl(comp) {
    var moduleUrl = comp.type.moduleUrl;
    var urlWithoutSuffix = moduleUrl.substring(0, moduleUrl.length - MODULE_SUFFIX.length);
    return `${urlWithoutSuffix}.ngfactory${MODULE_SUFFIX}`;
}
function _stylesModuleUrl(stylesheetUrl, shim) {
    return shim ? `${stylesheetUrl}.shim${MODULE_SUFFIX}` : `${stylesheetUrl}${MODULE_SUFFIX}`;
}
function _assertComponent(meta) {
    if (!meta.isComponent) {
        throw new BaseException(`Could not compile '${meta.type.name}' because it is not a component.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtdXhnS3lzTzgudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9vZmZsaW5lX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBRUwseUJBQXlCLEVBRXpCLHVCQUF1QixFQUN4QixNQUFNLG9CQUFvQjtPQUVwQixFQUFDLGFBQWEsRUFBZ0IsTUFBTSxnQ0FBZ0M7T0FDcEUsRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0M7T0FNbkQsS0FBSyxDQUFDLE1BQU0scUJBQXFCO09BQ2pDLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw0Q0FBNEM7T0FFcEUsRUFDTCxhQUFhLEVBQ2QsTUFBTSxRQUFRO0FBRWYsSUFBSSw2QkFBNkIsR0FBRyxJQUFJLHlCQUF5QixDQUFDO0lBQ2hFLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixTQUFTLEVBQUUsdURBQXVELGFBQWEsRUFBRTtDQUNsRixDQUFDLENBQUM7QUFFSDtJQUNFLFlBQW1CLFNBQWlCLEVBQVMsTUFBYztRQUF4QyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7QUFDakUsQ0FBQztBQUVEO0lBQ0UsWUFBbUIsU0FBbUMsRUFDbkMsVUFBc0MsRUFBUyxLQUE0QjtRQUQzRSxjQUFTLEdBQVQsU0FBUyxDQUEwQjtRQUNuQyxlQUFVLEdBQVYsVUFBVSxDQUE0QjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQXVCO0lBQUcsQ0FBQztBQUNwRyxDQUFDO0FBRUQ7SUFDRSxZQUFvQixvQkFBeUMsRUFDekMsZUFBK0IsRUFBVSxjQUE2QixFQUN0RSxhQUEyQixFQUFVLGNBQTZCO1FBRmxFLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsb0JBQWUsR0FBZixlQUFl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QUM7QUFFRCwwQkFBMEIsSUFBOEI7SUFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLElBQUksYUFBYSxDQUFDLHNCQUFzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksa0NBQWtDLENBQUMsQ0FBQztJQUNsRyxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSxcbiAgQ29tcGlsZVBpcGVNZXRhZGF0YSxcbiAgY3JlYXRlSG9zdENvbXBvbmVudE1ldGFcbn0gZnJvbSAnLi9jb21waWxlX21ldGFkYXRhJztcblxuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCB1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7U3R5bGVDb21waWxlciwgU3R5bGVzQ29tcGlsZURlcGVuZGVuY3ksIFN0eWxlc0NvbXBpbGVSZXN1bHR9IGZyb20gJy4vc3R5bGVfY29tcGlsZXInO1xuaW1wb3J0IHtWaWV3Q29tcGlsZXIsIFZpZXdDb21waWxlUmVzdWx0fSBmcm9tICcuL3ZpZXdfY29tcGlsZXIvdmlld19jb21waWxlcic7XG5pbXBvcnQge1RlbXBsYXRlUGFyc2VyfSBmcm9tICcuL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge0RpcmVjdGl2ZU5vcm1hbGl6ZXJ9IGZyb20gJy4vZGlyZWN0aXZlX25vcm1hbGl6ZXInO1xuaW1wb3J0IHtPdXRwdXRFbWl0dGVyfSBmcm9tICcuL291dHB1dC9hYnN0cmFjdF9lbWl0dGVyJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge0NvbXBvbmVudEZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeSc7XG5cbmltcG9ydCB7XG4gIE1PRFVMRV9TVUZGSVgsXG59IGZyb20gJy4vdXRpbCc7XG5cbnZhciBfQ09NUE9ORU5UX0ZBQ1RPUllfSURFTlRJRklFUiA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgbmFtZTogJ0NvbXBvbmVudEZhY3RvcnknLFxuICBydW50aW1lOiBDb21wb25lbnRGYWN0b3J5LFxuICBtb2R1bGVVcmw6IGBhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JHtNT0RVTEVfU1VGRklYfWBcbn0pO1xuXG5leHBvcnQgY2xhc3MgU291cmNlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1vZHVsZVVybDogc3RyaW5nLCBwdWJsaWMgc291cmNlOiBzdHJpbmcpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBOb3JtYWxpemVkQ29tcG9uZW50V2l0aFZpZXdEaXJlY3RpdmVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICBwdWJsaWMgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhW10sIHB1YmxpYyBwaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgT2ZmbGluZUNvbXBpbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGlyZWN0aXZlTm9ybWFsaXplcjogRGlyZWN0aXZlTm9ybWFsaXplcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdGVtcGxhdGVQYXJzZXI6IFRlbXBsYXRlUGFyc2VyLCBwcml2YXRlIF9zdHlsZUNvbXBpbGVyOiBTdHlsZUNvbXBpbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF92aWV3Q29tcGlsZXI6IFZpZXdDb21waWxlciwgcHJpdmF0ZSBfb3V0cHV0RW1pdHRlcjogT3V0cHV0RW1pdHRlcikge31cblxuICBub3JtYWxpemVEaXJlY3RpdmVNZXRhZGF0YShkaXJlY3RpdmU6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6XG4gICAgICBQcm9taXNlPENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YT4ge1xuICAgIHJldHVybiB0aGlzLl9kaXJlY3RpdmVOb3JtYWxpemVyLm5vcm1hbGl6ZURpcmVjdGl2ZShkaXJlY3RpdmUpO1xuICB9XG5cbiAgY29tcGlsZVRlbXBsYXRlcyhjb21wb25lbnRzOiBOb3JtYWxpemVkQ29tcG9uZW50V2l0aFZpZXdEaXJlY3RpdmVzW10pOiBTb3VyY2VNb2R1bGUge1xuICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ05vIGNvbXBvbmVudHMgZ2l2ZW4nKTtcbiAgICB9XG4gICAgdmFyIHN0YXRlbWVudHMgPSBbXTtcbiAgICB2YXIgZXhwb3J0ZWRWYXJzID0gW107XG4gICAgdmFyIG1vZHVsZVVybCA9IF90ZW1wbGF0ZU1vZHVsZVVybChjb21wb25lbnRzWzBdLmNvbXBvbmVudCk7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudFdpdGhEaXJzID0+IHtcbiAgICAgIHZhciBjb21wTWV0YSA9IDxDb21waWxlRGlyZWN0aXZlTWV0YWRhdGE+Y29tcG9uZW50V2l0aERpcnMuY29tcG9uZW50O1xuICAgICAgX2Fzc2VydENvbXBvbmVudChjb21wTWV0YSk7XG4gICAgICB2YXIgY29tcFZpZXdGYWN0b3J5VmFyID0gdGhpcy5fY29tcGlsZUNvbXBvbmVudChjb21wTWV0YSwgY29tcG9uZW50V2l0aERpcnMuZGlyZWN0aXZlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFdpdGhEaXJzLnBpcGVzLCBzdGF0ZW1lbnRzKTtcbiAgICAgIGV4cG9ydGVkVmFycy5wdXNoKGNvbXBWaWV3RmFjdG9yeVZhcik7XG5cbiAgICAgIHZhciBob3N0TWV0YSA9IGNyZWF0ZUhvc3RDb21wb25lbnRNZXRhKGNvbXBNZXRhLnR5cGUsIGNvbXBNZXRhLnNlbGVjdG9yKTtcbiAgICAgIHZhciBob3N0Vmlld0ZhY3RvcnlWYXIgPSB0aGlzLl9jb21waWxlQ29tcG9uZW50KGhvc3RNZXRhLCBbY29tcE1ldGFdLCBbXSwgc3RhdGVtZW50cyk7XG4gICAgICB2YXIgY29tcEZhY3RvcnlWYXIgPSBgJHtjb21wTWV0YS50eXBlLm5hbWV9TmdGYWN0b3J5YDtcbiAgICAgIHN0YXRlbWVudHMucHVzaChvLnZhcmlhYmxlKGNvbXBGYWN0b3J5VmFyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0KG8uaW1wb3J0RXhwcihfQ09NUE9ORU5UX0ZBQ1RPUllfSURFTlRJRklFUilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluc3RhbnRpYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmxpdGVyYWwoY29tcE1ldGEuc2VsZWN0b3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnZhcmlhYmxlKGhvc3RWaWV3RmFjdG9yeVZhciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uaW1wb3J0RXhwcihjb21wTWV0YS50eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uaW1wb3J0VHlwZShfQ09NUE9ORU5UX0ZBQ1RPUllfSURFTlRJRklFUiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50b0RlY2xTdG10KG51bGwsIFtvLlN0bXRNb2RpZmllci5GaW5hbF0pKTtcbiAgICAgIGV4cG9ydGVkVmFycy5wdXNoKGNvbXBGYWN0b3J5VmFyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5fY29kZWdlblNvdXJjZU1vZHVsZShtb2R1bGVVcmwsIHN0YXRlbWVudHMsIGV4cG9ydGVkVmFycyk7XG4gIH1cblxuICBjb21waWxlU3R5bGVzaGVldChzdHlsZXNoZWV0VXJsOiBzdHJpbmcsIGNzc1RleHQ6IHN0cmluZyk6IFNvdXJjZU1vZHVsZVtdIHtcbiAgICB2YXIgcGxhaW5TdHlsZXMgPSB0aGlzLl9zdHlsZUNvbXBpbGVyLmNvbXBpbGVTdHlsZXNoZWV0KHN0eWxlc2hlZXRVcmwsIGNzc1RleHQsIGZhbHNlKTtcbiAgICB2YXIgc2hpbVN0eWxlcyA9IHRoaXMuX3N0eWxlQ29tcGlsZXIuY29tcGlsZVN0eWxlc2hlZXQoc3R5bGVzaGVldFVybCwgY3NzVGV4dCwgdHJ1ZSk7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuX2NvZGVnZW5Tb3VyY2VNb2R1bGUoX3N0eWxlc01vZHVsZVVybChzdHlsZXNoZWV0VXJsLCBmYWxzZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXNvbHZlU3R5bGVTdGF0ZW1lbnRzKHBsYWluU3R5bGVzKSwgW3BsYWluU3R5bGVzLnN0eWxlc1Zhcl0pLFxuICAgICAgdGhpcy5fY29kZWdlblNvdXJjZU1vZHVsZShfc3R5bGVzTW9kdWxlVXJsKHN0eWxlc2hlZXRVcmwsIHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzb2x2ZVN0eWxlU3RhdGVtZW50cyhzaGltU3R5bGVzKSwgW3NoaW1TdHlsZXMuc3R5bGVzVmFyXSlcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGlsZUNvbXBvbmVudChjb21wTWV0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLCBwaXBlczogQ29tcGlsZVBpcGVNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10pOiBzdHJpbmcge1xuICAgIHZhciBzdHlsZVJlc3VsdCA9IHRoaXMuX3N0eWxlQ29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChjb21wTWV0YSk7XG4gICAgdmFyIHBhcnNlZFRlbXBsYXRlID0gdGhpcy5fdGVtcGxhdGVQYXJzZXIucGFyc2UoY29tcE1ldGEsIGNvbXBNZXRhLnRlbXBsYXRlLnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXMsIHBpcGVzLCBjb21wTWV0YS50eXBlLm5hbWUpO1xuICAgIHZhciB2aWV3UmVzdWx0ID0gdGhpcy5fdmlld0NvbXBpbGVyLmNvbXBpbGVDb21wb25lbnQoY29tcE1ldGEsIHBhcnNlZFRlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby52YXJpYWJsZShzdHlsZVJlc3VsdC5zdHlsZXNWYXIpLCBwaXBlcyk7XG4gICAgTGlzdFdyYXBwZXIuYWRkQWxsKHRhcmdldFN0YXRlbWVudHMsIF9yZXNvbHZlU3R5bGVTdGF0ZW1lbnRzKHN0eWxlUmVzdWx0KSk7XG4gICAgTGlzdFdyYXBwZXIuYWRkQWxsKHRhcmdldFN0YXRlbWVudHMsIF9yZXNvbHZlVmlld1N0YXRlbWVudHModmlld1Jlc3VsdCkpO1xuICAgIHJldHVybiB2aWV3UmVzdWx0LnZpZXdGYWN0b3J5VmFyO1xuICB9XG5cblxuICBwcml2YXRlIF9jb2RlZ2VuU291cmNlTW9kdWxlKG1vZHVsZVVybDogc3RyaW5nLCBzdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydGVkVmFyczogc3RyaW5nW10pOiBTb3VyY2VNb2R1bGUge1xuICAgIHJldHVybiBuZXcgU291cmNlTW9kdWxlKFxuICAgICAgICBtb2R1bGVVcmwsIHRoaXMuX291dHB1dEVtaXR0ZXIuZW1pdFN0YXRlbWVudHMobW9kdWxlVXJsLCBzdGF0ZW1lbnRzLCBleHBvcnRlZFZhcnMpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfcmVzb2x2ZVZpZXdTdGF0ZW1lbnRzKGNvbXBpbGVSZXN1bHQ6IFZpZXdDb21waWxlUmVzdWx0KTogby5TdGF0ZW1lbnRbXSB7XG4gIGNvbXBpbGVSZXN1bHQuZGVwZW5kZW5jaWVzLmZvckVhY2goXG4gICAgICAoZGVwKSA9PiB7IGRlcC5mYWN0b3J5UGxhY2Vob2xkZXIubW9kdWxlVXJsID0gX3RlbXBsYXRlTW9kdWxlVXJsKGRlcC5jb21wKTsgfSk7XG4gIHJldHVybiBjb21waWxlUmVzdWx0LnN0YXRlbWVudHM7XG59XG5cblxuZnVuY3Rpb24gX3Jlc29sdmVTdHlsZVN0YXRlbWVudHMoY29tcGlsZVJlc3VsdDogU3R5bGVzQ29tcGlsZVJlc3VsdCk6IG8uU3RhdGVtZW50W10ge1xuICBjb21waWxlUmVzdWx0LmRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXApID0+IHtcbiAgICBkZXAudmFsdWVQbGFjZWhvbGRlci5tb2R1bGVVcmwgPSBfc3R5bGVzTW9kdWxlVXJsKGRlcC5zb3VyY2VVcmwsIGRlcC5pc1NoaW1tZWQpO1xuICB9KTtcbiAgcmV0dXJuIGNvbXBpbGVSZXN1bHQuc3RhdGVtZW50cztcbn1cblxuZnVuY3Rpb24gX3RlbXBsYXRlTW9kdWxlVXJsKGNvbXA6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6IHN0cmluZyB7XG4gIHZhciBtb2R1bGVVcmwgPSBjb21wLnR5cGUubW9kdWxlVXJsO1xuICB2YXIgdXJsV2l0aG91dFN1ZmZpeCA9IG1vZHVsZVVybC5zdWJzdHJpbmcoMCwgbW9kdWxlVXJsLmxlbmd0aCAtIE1PRFVMRV9TVUZGSVgubGVuZ3RoKTtcbiAgcmV0dXJuIGAke3VybFdpdGhvdXRTdWZmaXh9Lm5nZmFjdG9yeSR7TU9EVUxFX1NVRkZJWH1gO1xufVxuXG5mdW5jdGlvbiBfc3R5bGVzTW9kdWxlVXJsKHN0eWxlc2hlZXRVcmw6IHN0cmluZywgc2hpbTogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiBzaGltID8gYCR7c3R5bGVzaGVldFVybH0uc2hpbSR7TU9EVUxFX1NVRkZJWH1gIDogYCR7c3R5bGVzaGVldFVybH0ke01PRFVMRV9TVUZGSVh9YDtcbn1cblxuZnVuY3Rpb24gX2Fzc2VydENvbXBvbmVudChtZXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEpIHtcbiAgaWYgKCFtZXRhLmlzQ29tcG9uZW50KSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENvdWxkIG5vdCBjb21waWxlICcke21ldGEudHlwZS5uYW1lfScgYmVjYXVzZSBpdCBpcyBub3QgYSBjb21wb25lbnQuYCk7XG4gIH1cbn1cbiJdfQ==