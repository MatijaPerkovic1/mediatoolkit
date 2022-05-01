import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { MatchesService } from '../services/matches.service';
import { PlayerService } from '../services/players.service';
import { getWinner, getWonSets } from '../utils/match-utils';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  getWinner = getWinner;
  matches: Array<Match> = [];
  displayedColumns: string[] = [ 'player1', 'score', 'player2' ];

  constructor(
    private matchesService: MatchesService,
    private playerService: PlayerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let players = this.playerService.getPlayers();
    let matches = this.matchesService.getMatches();

    forkJoin(players, matches).subscribe((results) => {
      this.matches = results[1].map((match: Match) => {
        match.player1 = results[0].find((player: Player) => player.id == match.player1).name;
        match.player2 = results[0].find((player: Player) => player.id == match.player2).name;
        return match;
      });
    });
    }

  loadMatch(match: Match) {
    this.router.navigate(['/match', match.id]);
  }


  getSetsFormatted(match: Match) : string
  {
    const score = getWonSets(match.player1Points, match.player2Points);

    return `${score[0]}  ${score[1]}`;
  }

}
