import { createReducer, on } from '@ngrx/store';
import { Item } from 'app/youtube/models/search-result-item.model';
import {
  addApiVideo,
  getApiVideos,
  setApiVideos,
  toggleApiVideoFavorite,
} from '../actions/apiVideo.action';

export const initialApiVideosState: Item[] = [];

export const apiVideosReduser = createReducer(
  initialApiVideosState,
  on(getApiVideos, (state, { apiVideos }) => [...apiVideos]),
  on(setApiVideos, (state, { apiVideos }) => {
    console.log(apiVideos);
    return [...apiVideos];
  }),
  on(addApiVideo, (state, { apiVideo }) => [...state, apiVideo]),
  on(toggleApiVideoFavorite, (state, { id }) =>
    state.map((videoData) => {
      if (videoData.id === id) {
        return { ...videoData, favorite: !videoData.favorite };
      }
      return videoData;
    }))
);
