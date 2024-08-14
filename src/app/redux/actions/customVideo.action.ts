import { createAction, props } from '@ngrx/store';
import { Item } from 'app/youtube/models/search-result-item.model';

export const getCustomVideos = createAction(
  '[Items] Get custom Videos Data',
  props<{ customVideos: Item[] }>(),
  // (videosData: Item[]) => ({ videosData }),
);
export const addCustomVideo = createAction(
  '[Item] Add custom Video Data',
  props<{ customVideo: Item }>(),
  // (customVideo: Item) => ({ customVideo }),
);
export const toggleCustomVideoFavorite = createAction(
  '[Item] Toogle custom Video favorite',
  props<{ id: string }>(),
  // (id: string) => ({ id })
);
export const delteCustomVideo = createAction(
  '[Item] Delete custom Video',
  props<{ id: string }>(),
  // (id: string) => ({ id })
);
