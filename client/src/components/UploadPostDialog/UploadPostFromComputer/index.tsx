import AddPictureSVG from '@/components/SVG/AddPictureSVG';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

export default function UploadPostFromComputer() {
  const { setValue, register } = useFormContext();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files === null ||
      event.target.files.length === 0 ||
      event.target.files[0] === null
    )
      return;
    setValue('picture', event.target.files[0]);
  };

  return (
    <div className="max-w-[755px] aspect-square flex items-center justify-center flex-col">
      <AddPictureSVG />
      <div className="text-xl my-4">Drag photo here</div>
      <label className={cn('cursor-pointer', buttonVariants({ size: 'xs' }))}>
        Select From Computer
        <input
          type="file"
          className="sr-only"
          {...register('picture')}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
