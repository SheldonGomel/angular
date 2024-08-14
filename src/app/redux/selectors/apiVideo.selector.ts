import { createSelector } from '@ngrx/store';
import { DetailsCard } from 'app/youtube/models/search-result-item.model';
import { AppState } from '../reducers/app.reducer';
import { emptyCard } from './customVideo.selector';

export const selectApiVideos = (state: AppState) => state.apiVideos;

export const selectAllApiVideos = createSelector(
  selectApiVideos,
  (apiVideos) => apiVideos,
);

export const selectFavoriteApiVideos = createSelector(
  selectApiVideos,
  (apiVideos) => apiVideos.filter((v) => v.favorite),
);

export const selectApiVideoById = (id: string) =>
  createSelector(selectAllApiVideos, (apiVideos) => {
    if (apiVideos.length) {
      const video = apiVideos.filter((v) => v.id === id)[0];
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

export const selectTotalApiVideos = createSelector(
  selectApiVideos,
  (apiVideos) => apiVideos.length
);

export const selectApiVideosForCurrentPage = (
  page: number,
  itemsPerPage: number,
) =>
  createSelector(selectAllApiVideos, (apiVideos) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return apiVideos.slice(startIndex, endIndex);
  });
