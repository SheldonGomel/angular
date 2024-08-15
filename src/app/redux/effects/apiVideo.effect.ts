import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DataService } from 'app/youtube/services/videosdata.service';
import { requestApiVideos, setApiVideos } from '../actions/apiVideo.action';

@Injectable()
export class VideoEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {}

  searchVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestApiVideos),
      mergeMap((action) =>
        this.dataService.searchData(action.query).pipe(
          switchMap((searchData) => {
            const videoIds = searchData.items.map((item) => item.id.videoId);
            if (videoIds.length === 0) throw new Error('Videos not found!');
            return this.dataService.getData(videoIds.join(',')).pipe(
              map((videoResponse) =>
                setApiVideos({ apiVideos: videoResponse.items })),
              catchError(() => of({ type: '[Video] API Request Failed' }))
            );
          }),
          catchError(() => of({ type: '[Video] API Request Failed' }))
        ))
    ));
}
