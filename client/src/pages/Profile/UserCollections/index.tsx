import NewCollectionDialog from '@/components/NewCollectionDialog';
import useGetPicturesFromSaved from '@/hooks/useGetPicturesFromSaved';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Link } from 'react-router-dom';

export default function UserCollections() {
  const user = useUserInfo();
  const picturesFromSaved = useGetPicturesFromSaved();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-xs text-zinc-500">
          Only you can see what you've saved
        </span>
        <NewCollectionDialog picturesFromSaved={picturesFromSaved} />
      </div>
      <div>
        <div className="grid grid-cols-3 gap-1">
          {user.collections?.map((collection) => (
            <Link
              to={collection.nameId}
              key={collection.id}
              type="button"
              className="relative col-span-1 grid grid-cols-2 bg-gradient-to-t from-black/50 hover:from-black/40 to-transparent aspect-square border border-separator rounded-md"
            >
              {collection.pictures.slice(0, 4).map((pic) => (
                <img
                  key={pic.pictureId}
                  className="col-span-1 aspect-square object-cover"
                  src={pic.picture.sizes.small}
                  alt="collection"
                  loading="lazy"
                  width={150}
                  height={150}
                />
              ))}
              <h2 className="absolute bottom-5 left-5 text-white text-xl">
                {collection.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
