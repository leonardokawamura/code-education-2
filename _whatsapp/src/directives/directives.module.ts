import { NgModule } from '@angular/core';
import { GroupViewerDirective } from './group-viewer/group-viewer';
import { DomMutationDirective } from './dom-mutation/dom-mutation';
@NgModule({
	declarations: [GroupViewerDirective,
    DomMutationDirective],
	imports: [],
	exports: [GroupViewerDirective,
    DomMutationDirective]
})
export class DirectivesModule {}
