import { UpdateUserProfileMutationVariables } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ACCEPTED_IMAGE_TYPES } from '@/constant/image';
import { useUpdateUserProfile } from '@/hooks/useUpdateUserProfile';
import uploadImage from '@/lib/uploadImage';
import { cn } from '@/lib/utils';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FileUploadArea from '../UploadPictureDialog/FileUploadArea';
import UserAvatar from '../UserAvatar';

type Props = {
  children: React.ReactNode;
};

const ProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .transform((val) => val.trim()),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .transform((val) => val.trim()),
  bio: z
    .string()
    .max(150, 'Bio must be 150 characters or less')
    .transform((val) => val.trim())
    .optional(),
  avatar: z.any().optional(),
});

type FormData = z.infer<typeof ProfileSchema>;

export default function EditProfileDialog({ children }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const { user } = useUserInfo();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio ?? '',
      avatar: user.avatar,
    },
  });

  const bioWatch = watch('bio');
  const [updateUserProfile, { loading: mutationLoading }] =
    useUpdateUserProfile();

  const onSubmit = async (data: FormData) => {
    try {
      let avatarUrl: string | undefined;
      let avatarName: string | undefined;

      if (data.avatar[0]) {
        setUploadStatus(true);
        const { fileUrl, fileKey } = await uploadImage(data.avatar[0]);
        avatarUrl = fileUrl;
        avatarName = fileKey;
      }

      const variables: UpdateUserProfileMutationVariables = {
        profileId: user.id,
        updateUserInput: {
          firstName: data.firstName,
          lastName: data.lastName,
          bio: data.bio,
        },
      };

      if (avatarUrl) {
        variables.updateUserInput.avatar = avatarUrl;
        variables.updateUserInput.avatarName = avatarName;
      }

      await updateUserProfile({ variables });
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to update user profile:', error);
    } finally {
      setUploadStatus(false);
    }
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex items-center space-x-4">
            <Label className="w-24 h-24 m-0 cursor-pointer" htmlFor="avatar">
              <span
                className={cn(
                  'flex w-full h-full relative items-center group justify-center border-2 rounded-full text-gray-500',
                  {
                    'border-dashed border-gray-300': !user.avatar,
                  }
                )}
              >
                <FileUploadArea defaultPreview={user.avatar}>
                  {(handleFileChange, _, previewUrl) => (
                    <>
                      {previewUrl ? (
                        <>
                          <UserAvatar
                            avatar={previewUrl}
                            className="h-full w-full"
                          />
                          <div className="absolute opacity-0 group-hover:opacity-100 flex transition items-center justify-center z-20 inset-0 bg-black bg-opacity-50 rounded-full">
                            <UploadIcon className="w-6 h-6" color="white" />
                          </div>
                        </>
                      ) : (
                        <>
                          <UploadIcon className="w-6 h-6" />
                          <span className="sr-only">Upload new avatar</span>
                        </>
                      )}
                      <input
                        type="file"
                        id="avatar"
                        {...register('avatar')}
                        onChange={handleFileChange}
                        accept={ACCEPTED_IMAGE_TYPES.join(',')}
                        className="sr-only"
                      />
                    </>
                  )}
                </FileUploadArea>
              </span>
            </Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                {...register('firstName')}
                error={errors.firstName?.message}
                id="first-name"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                {...register('lastName')}
                error={errors.lastName?.message}
                id="last-name"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>

            <div>
              <Textarea
                {...register('bio')}
                id="bio"
                placeholder="Enter your bio"
                error={errors.bio?.message}
              />
              <span className="text-sm text-gray-800">
                {bioWatch?.length} / 150 characters
              </span>
            </div>
          </div>
          <Button
            className="mt-4 ml-auto"
            type="submit"
            loading={uploadStatus || mutationLoading}
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
