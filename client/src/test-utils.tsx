import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GET_USER_PROFILE } from './graphql/queries/user';
import { UserInfoProvider } from './providers/UserInfoProvider';

interface AllTheProvidersProps {
  children: React.ReactNode;
  mocks?: MockedResponse[];
}

const defaultMockUser = {
  id: 9,
  firstName: 'Camilla',
  lastName: 'Conn',
  username: 'torey13',
  avatar: 'https://avatars.githubusercontent.com/u/6927779',
  bio: null,
  __typename: 'User',
  _count: {
    pictures: 1,
    initiatedFollows: 2,
    receivedFollows: 0,
    __typename: 'UserCount',
  },
};

interface AllTheProvidersProps {
  children: React.ReactNode;
  withUserInfoProvider?: boolean;
  withMockedProvider?: boolean;
  mocks?: MockedResponse[];
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({
  children,
  withUserInfoProvider = false,
  withMockedProvider = false,
  mocks = [],
}) => {
  let content = children;

  if (withUserInfoProvider) {
    content = <UserInfoProvider>{content}</UserInfoProvider>;
  }

  if (withMockedProvider) {
    content = <MockedProvider mocks={mocks}>{content}</MockedProvider>;
  }

  return <Router>{content}</Router>;
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withUserInfoProvider?: boolean;
  withMockedProvider?: boolean;
  mocks?: MockedResponse[];
  userProperties?: Partial<typeof defaultMockUser>;
  userQueryVariables?: Record<string, unknown>;
}

const customRender = (
  ui: React.ReactElement,
  {
    withUserInfoProvider = false,
    withMockedProvider = false,
    mocks = [],
    userProperties,
    userQueryVariables,
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  if (withUserInfoProvider && withMockedProvider && mocks.length === 0) {
    const userMock = {
      ...defaultMockUser,
      ...userProperties,
    };

    const mockUserQuery = {
      request: {
        query: GET_USER_PROFILE,
        variables: userQueryVariables || { username: 'testuser' },
      },
      result: {
        data: {
          user: userMock,
        },
      },
    };

    mocks.push(mockUserQuery);
  }

  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders
        withUserInfoProvider={withUserInfoProvider}
        withMockedProvider={withMockedProvider}
        mocks={mocks}
        {...props}
      />
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
