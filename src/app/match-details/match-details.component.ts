import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { MatchesService } from '../services/matches.service';
import { PlayerService } from '../services/players.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  match: Match;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router,
    private matchesService: MatchesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      let players = this.playerService.getPlayers();
      let match = this.matchesService.getMatch(id);

      forkJoin(players, match).subscribe((results) => {

        results[1].player1 = results[0].find((player: Player) => player.id == results[1].player1).name;
        results[1].player2 = results[0].find((player: Player) => player.id == results[1].player2).name;

        this.match = results[1];

    }, (err) => {
      this.router.navigate(['/']);
    });
    } else {
      this.router.navigate(['/']);
    }
  }

}
