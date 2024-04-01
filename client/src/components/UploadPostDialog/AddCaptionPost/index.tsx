import UserAvatar from '@/components/UserAvatar';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import AccessibilityExpand from './AccessibilityExpand';
import AdvancedSettingsExpand from './AdvancedSettingsExpand';

type Props = {
  previewPicture: string;
  isEdit: boolean;
};

export default function AddCaptionPost({ previewPicture, isEdit }: Props) {
  const user = useUserInfo();
  const { register, watch } = useFormContext();

  const descriptionWatch = watch('description') || '';

  return (
    <div className="flex">
      <img
        src={previewPicture}
        className="max-w-[755px] w-full aspect-square object-cover"
      />
      <motion.div
        className="border-l border-separator"
        initial={{ width: 0 }}
        animate={{ width: '507px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="mt-4 mb-3 mx-4">
          <div className="flex gap-3 items-center">
            <UserAvatar avatar={user.avatar} className="size-7" />
            <div className="text-sm font-semibold">{user.username}</div>
          </div>
        </div>
        <div>
          <TextareaAutosize
            className="w-full focus:outline-none resize-none px-4"
            placeholder="Write a caption..."
            {...register('description')}
            minRows={7}
            maxRows={7}
          />
        </div>
        <div className="text-xs justify-end h-11 border-b border-[#DBDBDB] px-4 items-center flex">
          {descriptionWatch.length}/2,200
        </div>
        <AccessibilityExpand previewPicture={previewPicture} />
        {!isEdit && <AdvancedSettingsExpand />}
      </motion.div>
    </div>
  );
}
