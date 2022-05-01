import { Match } from "../models/match.model";


export const getWinner = (match: Match) : string => {
    const score = getWonSets(match.player1Points, match.player2Points);
    if (score[0] > score[1]) {
      return match.player1;
    } else {
      return match.player2;
    }
}

export const getWonSets = (p1Points: number[], p2Points: number[]) : [number, number] => {
    let p1Score = 0;
    let p2Score = 0;

    p1Points.forEach((p1Points, index) => {
      if (p1Points > p2Points[index]) {
        p1Score++;
      } else {
        p2Score++;
      }
    });

    return [p1Score, p2Score];
}