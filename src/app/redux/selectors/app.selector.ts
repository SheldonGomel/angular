import { DetailsCard } from 'app/youtube/models/search-result-item.model';
import { createSelector } from '@ngrx/store';
import { selectAllApiVideos } from './apiVideo.selector';
import { emptyCard, selectAllCustomVideos } from './customVideo.selector';

export const selectAllVideos = createSelector(
  selectAllCustomVideos,
  selectAllApiVideos,
  (customVideos, apiVideos) => [...customVideos, ...apiVideos]
);

export const selectTotalVideos = createSelector(
  selectAllVideos,
  (videos) => videos.length
);

export const selectVideosForCurrentPage = (
  page: number,
  itemsPerPage: number
) =>
  createSelector(selectAllVideos, (videos) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return videos.slice(startIndex, endIndex);
  });

export const selectVideoById = (id: string) =>
  createSelector(selectAllVideos, (customVideos) => {
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

export const selectFavoriteVideos = createSelector(
  selectAllVideos,
  (videos) => videos.filter((v) => v.favorite)
);
