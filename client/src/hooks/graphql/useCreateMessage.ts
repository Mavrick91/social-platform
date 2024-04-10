import { useCreateMessageMutation } from '@/__generated__/graphql.ts';
import { Reference } from '@apollo/client';

function useCreateMessage(threadId: string) {
  return useCreateMessageMutation({
    update(cache, { data }) {
      if (!data?.createMessage) return;

      const threadCacheId = cache.identify({
        __typename: 'Thread',
        id: threadId,
      });

      cache.modify({
        id: threadCacheId,
        fields: {
          messages(existingMessagesRefs = [], { toReference }) {
            const newMessageRef = toReference(data.createMessage);

            if (
              newMessageRef &&
              existingMessagesRefs.some(
                (ref: Reference) => ref.__ref === newMessageRef.__ref
              )
            ) {
              return existingMessagesRefs;
            }

            return [...existingMessagesRefs, newMessageRef];
          },
        },
      });
    },
  });
}

export default useCreateMessage;
