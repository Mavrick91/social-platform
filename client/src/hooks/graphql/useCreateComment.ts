import { useCommentPictureMutation } from '@/__generated__/graphql';
import { modifyCommentCount } from '@/lib/cacheUtils';

export function useCreateComment() {
  return useCommentPictureMutation({
    update(cache, { data }) {
      if (data?.createComment) {
        const newComment = data.createComment;
        const pictureId = newComment.pictureId;

        if (!pictureId) return;

        modifyCommentCount(cache, pictureId, 1);
      }
    },
  });
}
