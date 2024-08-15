import { createAction, props } from '@ngrx/store';
import { Item } from 'app/youtube/models/search-result-item.model';

export const getApiVideos = createAction(
  '[Items] Get API Videos Data',
  props<{ apiVideos: Item[] }>(),
);
export const requestApiVideos = createAction(
  '[Items] Request API Videos Data',
  props<{ query: string }>(),
);
export const setApiVideos = createAction(
  '[Items] Set API Videos Data',
  props<{ apiVideos: Item[] }>(),
);
export const addApiVideo = createAction(
  '[Item] Add API Video Data',
  props<{ apiVideo: Item }>(),
);
export const toggleApiVideoFavorite = createAction(
  '[Item] Toogle API Video favorite',
  props<{ id: string }>(),
);
