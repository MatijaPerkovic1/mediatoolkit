import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';

import { ApiService } from './api.service';


@Injectable()
export class PlayerService {

  constructor (
    private apiService: ApiService
  ) {}

  getPlayers() {
    return this.apiService.get('players');
  }

  createPlayer(player: Player) {
    return this.apiService.post('players', player);
  }

  getPlayer(id: string) {
    return this.apiService.get(`players/${id}`);
  }

  updatePlayer(player: Player) {
    return this.apiService.put(`players/${player.id}`, player);
  }

}