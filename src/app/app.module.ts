import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { MatchesComponent } from './matches/matches.component';
import { AppRoutingModule } from './app-routing.module';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { PlayerService } from './services/players.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatchesService } from './services/matches.service';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { MatchDetailsComponent } from './match-details/match-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    LeaderboardComponent,
    AddMatchComponent,
    CreatePlayerComponent,
    PlayerDetailComponent,
    MatchDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [PlayerService, ApiService, MatchesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
