import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FootballDataService } from './services/football-data/football-data.service';
import { SimulatorService } from './services/simulator/simulator.service';
import { CreateGoalComponent } from './pages/create-goal/create-goal.component';
import { MaterialModule } from './modules/material.module';
import { MainComponent } from './pages/main/main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { GoalListComponent } from './pages/goal-list/goal-list.component';
import { RuleFormComponent } from './pages/create-goal/rule-form/rule-form/rule-form.component';
import { GoalSimulationComponent } from './pages/goal-simulation/goal-simulation.component';
import { SnackbarService } from './services/snackbar/snackbar.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateGoalComponent,
    MainComponent,
    GoalListComponent,
    RuleFormComponent,
    GoalSimulationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClientModule,
    FootballDataService,
    SimulatorService,
    SnackbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
