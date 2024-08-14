import { ActionReducerMap } from '@ngrx/store';
import { Item } from 'app/youtube/models/search-result-item.model';
import { apiVideosReduser } from './apiVideo.reducer';
import { customVideosReduser } from './customVideo.reducer';

export interface AppState {
  apiVideos: Item[];
  customVideos: Item[];
}

// const initialState: AppState = {
//   apiVideos: [],
//   customVideos: [],
// };

export const reducers: ActionReducerMap<AppState> = {
  apiVideos: apiVideosReduser,
  customVideos: customVideosReduser,
};
