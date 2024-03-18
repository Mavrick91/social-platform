import { useGetMockedUserQuery } from '@/__generated__/graphql';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormSetValue } from 'react-hook-form';

type Props = {
  setValue: UseFormSetValue<{ email: string; password: string }>;
};

export default function MockedForm({ setValue }: Props) {
  const { data, loading } = useGetMockedUserQuery();

  const handleOnChange = (email: string) => {
    setValue('email', email);
    setValue('password', 'test');
  };

  return (
    <Select onValueChange={handleOnChange}>
      <SelectTrigger className="w-full h-12">
        <SelectValue placeholder="Choose an user" />
      </SelectTrigger>
      <SelectContent>
        {loading || !data ? (
          <SelectItem value="Loading...">Loading...</SelectItem>
        ) : (
          data.mockedUser.map((user) => (
            <SelectItem key={user.id} value={user.email}>
              {user.email}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
