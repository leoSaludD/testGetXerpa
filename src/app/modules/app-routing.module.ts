import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGoalComponent } from '../pages/create-goal/create-goal.component';
import { GoalSimulationComponent } from '../pages/goal-simulation/goal-simulation.component';

import { MainComponent } from '../pages/main/main.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'goal-form', component: CreateGoalComponent },
  { path: 'simulate-goal', component: GoalSimulationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
