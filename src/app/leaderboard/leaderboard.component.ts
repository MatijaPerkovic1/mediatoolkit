import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/players.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboard: Array<{}> = [];
  displayedColumns: string[] = [ 'rank', 'name', 'wins' ];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe((data: []) => {
      this.leaderboard = data.sort((player1: Player, player2: Player)  => player1.wins > player2.wins ? -1 : 1);
    });
  }

}
