import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Errors } from '../models/errors.mode';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { MatchesService } from '../services/matches.service';
import { PlayerService } from '../services/players.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { getWonSets } from '../utils/match-utils';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  errors: Errors = {errors: {}};
  isSubmitting = false;
  matchForm: FormGroup;
  players: Array<Player> = [];
  selectedPlayers: Array<Player>;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private matchService: MatchesService,
    private router: Router
  ) { 
    this.matchForm = this.fb.group({
      'player1': ['', Validators.required],
      'player2': ['', Validators.required],
      'p1sets': this.fb.group({
        's1p1': [0, Validators.required],
        's2p1': [0, Validators.required],
        's3p1': [0, Validators.required],
        's4p1': [0, Validators.required],
        's5p1': [0, Validators.required]
      }),
      'p2sets': this.fb.group({
        's1p2': [0, Validators.required],
        's2p2': [0, Validators.required],
        's3p2': [0, Validators.required],
        's4p2': [0, Validators.required],
        's5p2': [0, Validators.required]
      })
    }, { validator: this.validateSets });

    this.validateSets = this.validateSets.bind(this);
  }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe((data) => {
      this.players = data;
    })
  }

  validateSets(control: AbstractControl) {
    const p1Sets = control.get('p1sets')?.value;
    const p2Sets = control.get('p2sets')?.value;

    var p1SetsArray = Object.keys(p1Sets).map((key) => p1Sets[key]);
    var p2SetsArray = Object.keys(p2Sets).map((key) => p2Sets[key]);

    let formValid = true;

    p1SetsArray.forEach((p1Score, index) => {
      let p2Score = p2SetsArray[index];
      if (
        (p1Score < 11 && p2Score < 11) || 
        (p1Score == p2Score) || 
        ((p1Score > 11 || p2Score > 11) && (Math.abs(p1Score - p2Score) != 2))
      ) {
        formValid = false;
      }
    });

    return !formValid ? { setValidationError: true } : null

  }

  submitForm() {
    this.isSubmitting = true;

    const data = this.matchForm.value;

    var p1SetsArray = Object.keys(data.p1sets).map((key) => data.p1sets[key]);
    var p2SetsArray = Object.keys(data.p2sets).map((key) => data.p2sets[key]);

    const match: Match = {
      id: uuidv4(),
      player1: data.player1.id,
      player2: data.player2.id,
      player1Points: p1SetsArray,
      player2Points: p2SetsArray
    };

    this.matchService.addMatch(match).subscribe(() => {
      const wonSets = getWonSets(p1SetsArray, p2SetsArray);
      data.player1.wins += wonSets[0];
      data.player2.wins += wonSets[1];

      this.playerService.updatePlayer(data.player1).subscribe(() => {
        this.playerService.updatePlayer(data.player2).subscribe(() => {this.router.navigate(['/']);});
      });
      
    });
  }

  changePlayer() {
    const player1 = this.matchForm.get('player1')?.value;
    const player2 = this.matchForm.get('player2')?.value;

    this.selectedPlayers = [player1, player2];
  }

}
