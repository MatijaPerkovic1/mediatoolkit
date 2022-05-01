import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors } from '../models/errors.mode';
import { PlayerService } from '../services/players.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  errors: Errors = {errors: {}};
  isSubmitting = false;
  playerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private router: Router
  ) { 
    this.playerForm = this.fb.group({
      'name': ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const data = this.playerForm.value;
    data.wins = 0;
    data.id = uuidv4();

    this.playerService.createPlayer(data).subscribe(() => {
      this.router.navigate(['/leaderboard']);
    });
  }

}
