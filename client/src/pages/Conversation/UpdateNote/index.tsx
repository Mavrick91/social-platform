import BubbleThought from '@/components/BubbleThought';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useCreateThought from '@/hooks/graphql/useCreateThought';
import useUpdateThought from '@/hooks/graphql/useUpdateThought';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Users, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Visibility } from '@/__generated__/graphql.ts';

type Props = {
  toggleUpdateNote: (value: boolean) => void;
};

const schema = z.object({
  thought: z.string().transform((val) => val.trim()),
  visibility: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const activeShareOptions = [
  { label: 'Followers that you follow back', value: 'FOLLOWERS' },
  { label: 'Close friends', value: 'CLOSE_FRIENDS' },
];

export default function UpdateNote({ toggleUpdateNote }: Props) {
  const user = useUserInfo();
  const [createThought, { loading: createLoading }] = useCreateThought();
  const [updateThought, { loading: updateLoading }] = useUpdateThought();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      thought: '',
      visibility: 'FOLLOWERS',
    },
  });

  const { thought: thoughtWatch, visibility: visibilityWatch } = form.watch();

  const handleSubmit = async (data: FormData) => {
    const { thought, visibility } = data;

    if (user.thought) {
      await updateThought({
        variables: {
          updateThoughtInput: {
            id: user.thought.id,
            content: thought,
            visibility: visibility as Visibility,
          },
        },
      });
    } else {
      await createThought({
        variables: {
          createThoughtInput: {
            content: thought,
            userId: Number(user.id),
            visibility: visibility as Visibility,
          },
        },
      });
    }

    toggleUpdateNote(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col"
      >
        <div className="flex justify-between items-center p-4 py-5 w-full border-b border-separator">
          <button onClick={() => toggleUpdateNote(false)}>
            <X />
          </button>
          <h2 className="text-xl font-bold">New note</h2>
          {thoughtWatch ? (
            <Button
              variant="ghost"
              type="submit"
              className="font-semibold"
              loading={createLoading || updateLoading}
            >
              Share
            </Button>
          ) : (
            <div />
          )}
        </div>
        <main className="grow flex flex-col justify-center items-center">
          <div className="relative">
            <BubbleThought
              size="medium"
              bubbleText="Share a thought..."
              canEdit
              register={form.register}
              thoughtWatch={thoughtWatch}
            />
            <UserAvatar avatar={user.avatar} className="size-40" />
          </div>
          {thoughtWatch.length >= 55 && (
            <span className="text-destructive">{thoughtWatch.length} / 60</span>
          )}

          <div className="mt-24" />

          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger>
              <button className="text-primary-text flex gap-x-1 text-sm items-center">
                <Users size={14} /> <span>Shared with</span>{' '}
                <b>
                  {activeShareOptions.find(
                    (option) => option.value === visibilityWatch
                  )?.label || 'Followers that you follow back'}
                </b>{' '}
                <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white px-4 py-1 shadow-ig rounded-lg w-full">
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setDropdownOpen(false);
                        }}
                        defaultValue={field.value}
                        className="flex flex-col gap-0"
                      >
                        {activeShareOptions.map(({ value, label }) => (
                          <FormItem key={value} className="block py-3 gap-x-2">
                            <FormControl>
                              <RadioGroupItem value={value} />
                            </FormControl>
                            <FormLabel className="ml-3 mt-0 text-base font-normal">
                              {label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </main>
      </form>
    </Form>
  );
}
