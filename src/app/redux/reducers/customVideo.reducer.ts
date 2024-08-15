import { createReducer, on } from '@ngrx/store';
import { Item } from 'app/youtube/models/search-result-item.model';
import {
  addCustomVideo,
  getCustomVideos,
  toggleCustomVideoFavorite,
  delteCustomVideo,
} from '../actions/customVideo.action';

export const initialCustomVideosState: Item[] = [];

export const customVideosReduser = createReducer(
  initialCustomVideosState,
  on(getCustomVideos, (state, { customVideos }) => [...customVideos]),
  on(addCustomVideo, (state, { customVideo }) => [...state, customVideo]),
  on(toggleCustomVideoFavorite, (state, { id }) =>
    [...state].map((customVideo) => {
      if (customVideo.id === id) {
        return { ...customVideo, favorite: !customVideo.favorite };
      }
      return customVideo;
    })),
  on(delteCustomVideo, (state, { id }) => {
    const st = state.filter((customVideo) => customVideo.id !== id);
    console.log(st);
    return st;
  })
);
