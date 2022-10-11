import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Rule } from 'src/app/models/rule';
import { SimulatorService } from 'src/app/services/simulator/simulator.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html',
  styleUrls: ['./rule-form.component.scss']
})
export class RuleFormComponent implements OnInit {

  @Input() rules: Rule[];
  displayedColumns: string[] = ['type', 'event', 'amount', 'actions'];
  dataSource = new MatTableDataSource<Rule>();

  events: string[] = ['Gane', 'Juegue', 'Meta Gol']
  teams: string[] = [];

  ruleForm: FormGroup = new FormGroup({
    team: new FormControl('', Validators.required),
    event: new FormControl('Juegue', Validators.required),
    amount: new FormControl(0, Validators.min(0)),
  });

  constructor(
    private simulationService: SimulatorService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    if (this.simulationService.dataLoaded) {
      this.load();
    } else {
      this.simulationService.dataLoadedEvent.subscribe(() => {
        this.load();
      });
    }
  }

  deleteRule(rule: Rule) {
    let newRules = this.rules.filter(r => {
       return r.team != rule.team || r.event != rule.event;
      });
      this.refreshRuleTable(newRules);
  }

  load() {
    this.teams = this.simulationService.teams;
    this.refreshRuleTable(this.rules);
  }

  refreshRuleTable(rules: Rule[]) {
    this.rules = rules;
    this.dataSource = new MatTableDataSource<Rule>(rules);
  }

  addRule(): void {
    let formValue = this.ruleForm.value;
    if (!this.validateNewRule(formValue)) {
      return;
    }

    this.rules.push(new Rule(formValue.team, formValue.event, formValue.amount));
    this.refreshRuleTable(this.rules);
  }

  validateNewRule(newRule: any) {
    if (this.rules.length >= 5) {
      this.snackBarService.showSnackBar('No puedes agregar mas reglas');
      return false;
    }

    if (this.rules.filter(r => r.team == newRule.team && r.event == newRule.event).length > 0) {
      this.snackBarService.showSnackBar('No puedes repetir reglas');
      return false;
    }

    return true;
  }

  getRules(): Rule[] {
    return this.rules;
  }

}
