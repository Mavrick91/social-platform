import { CollectionFragmentFragment } from '@/__generated__/graphql';
import { DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ArrowLeft, Check } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '..';
import { Button } from '@/components/ui/button';

type Props = {
  picturesFromSaved: CollectionFragmentFragment;
  selectedPictures: number[];
  handlePictureClick: (pic: number) => void;
  setCurrentStep?: (step: number) => void;
  onSubmit: (data: FormData) => void;
};

export const AddPicturesStep = ({
  picturesFromSaved,
  selectedPictures,
  handlePictureClick,
  setCurrentStep,
  onSubmit,
}: Props) => {
  const { handleSubmit } = useFormContext<FormData>();

  return (
    <DialogContent
      className="p-0 rounded-lg max-w-[400px] overflow-hidden min-h-[691px] gap-0 flex flex-col"
      showClose={false}
    >
      <div className="flex justify-between bg-gray-100 py-2.5 px-3 items-center">
        {setCurrentStep && (
          <button onClick={() => setCurrentStep(0)}>
            <ArrowLeft size={18} />
          </button>
        )}
        <h2 className="font-semibold text-center w-full">Add from saved</h2>
        <div />
      </div>
      <div className="flex flex-col grow">
        <div className="grid grid-cols-3">
          {picturesFromSaved.pictures.map((pic, index) => {
            return (
              <button
                key={index}
                onClick={() => handlePictureClick(pic.pictureId)}
                className="col-span-1 aspect-square relative"
              >
                <img
                  src={pic.picture.sizes.small}
                  alt="collection"
                  className="object-cover aspect-square"
                />
                {selectedPictures.includes(pic.pictureId) && (
                  <div
                    className={cn(
                      'absolute inset-0 bg-white/30 flex items-center justify-center'
                    )}
                  >
                    <Check color="white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <Separator />
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          variant="blue-link"
          className="p-0"
        >
          Done
        </Button>
      </div>
    </DialogContent>
  );
};
