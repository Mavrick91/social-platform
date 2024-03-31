import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CreateNewCollectionName from '@/components/CreateNewCollectionName';
import { useUpdateNameCollectionMutation } from '@/__generated__/graphql';
import { toast } from 'react-toastify';

const formSchema = z.object({
  collectionName: z.string().min(1, { message: 'Collection name is required' }),
});

export type FormData = z.infer<typeof formSchema>;

type Props = {
  collectionName: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  collectionId: number;
};

export const EditCollectionName: React.FC<Props> = ({
  collectionName,
  isOpen,
  setIsOpen,
  collectionId,
}) => {
  const [updateName] = useUpdateNameCollectionMutation();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionName,
    },
  });

  const onSubmitEditName = async (data: { collectionName: string }) => {
    try {
      await updateName({
        variables: { collectionId: collectionId, newName: data.collectionName },
      });
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error)
        toast.error("Failed to update collection's name");
    }
  };

  return (
    <FormProvider {...methods}>
      <CreateNewCollectionName
        onClickNext={methods.handleSubmit(onSubmitEditName)}
        open={isOpen}
        setOpen={setIsOpen}
        labelSubmit="Done"
      />
    </FormProvider>
  );
};
