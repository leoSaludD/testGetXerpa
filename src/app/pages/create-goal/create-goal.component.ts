import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/models/goal';
import { Rule } from 'src/app/models/rule';
import { SimulatorService } from 'src/app/services/simulator/simulator.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { RuleFormComponent } from './rule-form/rule-form/rule-form.component';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.scss']
})
export class CreateGoalComponent {

  @ViewChild(RuleFormComponent) ruleFormComponent: RuleFormComponent;
  editing: boolean = false;
  goalId: number = 0;
  goalTypes: string[] = ['Comprar Algo', 'Hacer Algo', 'Solo Ahorrar', 'Viajar'];
  rules: Rule[] = [];
  
  goalForm: FormGroup = new FormGroup({
    type: new FormControl('Solo Ahorrar'),
    date: new FormControl(new Date(), this.dateValidator),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  constructor(
    private simulatorService: SimulatorService, 
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackbarService
  ) { }

  ngAfterViewInit() { 
    const goalId: number = parseInt(this.route.snapshot.params['goalId']);
    if (isNaN(goalId))
      return;
    
    this.editing = true;
    this.goalId = goalId;
    setTimeout(() => {
      this.setupEditingFields();
    });
  }

  private setupEditingFields() {
    const goal: Goal = this.simulatorService.getGoal(this.goalId);
    this.goalForm.patchValue({
      type: goal.type,
      date: goal.date,
      amount: goal.amount
    });
    this.rules = goal.rules;
    this.ruleFormComponent.refreshRuleTable(this.rules);
  }

  private dateValidator(control: AbstractControl) {
    let goalDate = control.value.getTime();
    let today = new Date().getTime();
    if(Math.round((goalDate-today)/(1000*60*60*24)) >= 30)
      return null;
    else
      return { invalidDate: true };
  }

  submitForm(): void {
    if (this.editing) {
      this.updateGoal();
    } else { 
      this.createNewGoal();
    }
  }

  updateGoal() { 
    let formVal = this.goalForm.value;
    let goal = this.simulatorService.getGoal(this.goalId);
    
    goal.type = formVal.type;
    goal.amount = formVal.amount;
    goal.date = formVal.date;
    goal.rules = this.ruleFormComponent.getRules();

    this.snackBarService.showSnackBar('Meta modificada correctamente');
    this.router.navigateByUrl('');
  }

  createNewGoal() { 
    let formVal = this.goalForm.value;
    let newGoal = new Goal(formVal.type, formVal.date, formVal.amount);
    this.simulatorService.addGoal(newGoal);
    this.snackBarService.showSnackBar('Meta creada correctamente');
    this.router.navigateByUrl('');
  }

  cancel(): void { 
    this.router.navigateByUrl('');
  }
}
