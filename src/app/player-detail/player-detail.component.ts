import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../models/player.model';
import { PlayerService } from '../services/players.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player: Player;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.playerService.getPlayer(id).subscribe((data) => {
        this.player = data;
      }, (err) => {
        this.router.navigate(['/leaderboard']);
      });
    } else {
      this.router.navigate(['/']);
    }
  }

}
