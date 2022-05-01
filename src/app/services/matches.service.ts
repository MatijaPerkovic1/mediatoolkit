import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';

import { ApiService } from './api.service';


@Injectable()
export class MatchesService {

  constructor (
    private apiService: ApiService
  ) {}

  getMatches() {
    return this.apiService.get('matches');
  }

  addMatch(match: Match) {
    return this.apiService.post('matches', match);
  }

  getMatch(id: string) {
    return this.apiService.get(`matches/${id}`);
  }

}