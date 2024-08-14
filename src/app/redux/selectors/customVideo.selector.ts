import { createSelector } from '@ngrx/store';
import { DetailsCard } from 'app/youtube/models/search-result-item.model';
import { AppState } from '../reducers/app.reducer';

// export const selectCustomVideos = createFeatureSelector<AppState, Item[]>(
//   'customVideos',
// );

export const emptyCard: DetailsCard = {
  title: '',
  imgurl: '',
  date: '',
  statusDate: new Date(),
  likes: '',
  dislikes: '',
  comments: '',
  views: '',
  description: '',
  favorite: false,
};

export const selectCustomVideos = (state: AppState) => state.customVideos;

export const selectAllCustomVideos = createSelector(
  selectCustomVideos,
  (customVideos) => customVideos
);

export const selectFavoriteCustomVideos = createSelector(
  selectCustomVideos,
  (customVideos) => customVideos.filter((v) => v.favorite)
);

export const selectCustomVideoById = (id: string) =>
  createSelector(selectAllCustomVideos, (customVideos) => {
    if (customVideos.length) {
      const video = customVideos.filter((v) => v.id === id)[0];
      const videoDetails: DetailsCard = {
        title: video.snippet.title,
        imgurl: video.snippet.thumbnails.maxres!.url,
        date: video.snippet.publishedAt,
        statusDate: new Date(video.snippet.publishedAt),
        likes: video.statistics.likeCount,
        dislikes: video.statistics.dislikeCount,
        comments: video.statistics.commentCount,
        views: video.statistics.viewCount,
        favorite: video.favorite ?? false,
        description: video.snippet.description,
      };
      return { videoDetails, type: video.type };
    }
    return { videoDetails: emptyCard, type: undefined };
  });

export const selectTotalCurrentVideos = createSelector(
  selectCustomVideos,
  (customVideos) => customVideos.length
);

export const selectCustomVideosForCurrentPage = (
  page: number,
  itemsPerPage: number
) =>
  createSelector(selectAllCustomVideos, (customVideos) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return customVideos.slice(startIndex, endIndex);
  });
