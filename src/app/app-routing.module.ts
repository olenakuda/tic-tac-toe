import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardComponent } from './board/board.component';
import { PlayerComponent } from './player/player.component';

const appRoutes: Routes = [
  { path: 'board', component: BoardComponent },
  { path: 'player', component: PlayerComponent },
  { path:'**', redirectTo:'player', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
