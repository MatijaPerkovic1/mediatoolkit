import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMatchComponent } from './add-match/add-match.component';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchesComponent } from './matches/matches.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

const routes: Routes = [
  { path: '', component: MatchesComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'add-match', component: AddMatchComponent },
  { path: 'create-player', component: CreatePlayerComponent },
  { path: 'player/:id', component: PlayerDetailComponent },
  { path: 'match/:id', component: MatchDetailsComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
