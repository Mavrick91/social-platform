import { registerEnumType } from '@nestjs/graphql';

export enum Visibility {
  FOLLOWERS = 'FOLLOWERS',
  CLOSE_FRIENDS = 'CLOSE_FRIENDS',
}

registerEnumType(Visibility, {
  name: 'Visibility',
});
