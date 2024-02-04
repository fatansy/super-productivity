import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { UiModule } from '../../ui/ui.module';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { WorkContextMenuModule } from '../work-context-menu/work-context-menu.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    UiModule,
    CommonModule,
    RouterModule,
    DragulaModule,
    WorkContextMenuModule,
    FormsModule,
  ],
  declarations: [SideNavComponent],
  exports: [SideNavComponent],
})
export class SideNavModule {}
