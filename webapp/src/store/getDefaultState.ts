import { LinkObj } from '@/types';

export interface State {
  isAuthenticated: boolean,
  jwt: string,
  user: {
    email: string,
    name: string,
    id: string,
  },
  shortenedLinks: Array<LinkObj>
}

export default function getDefaultState() : State {
  return {
    isAuthenticated: false,
    jwt: '',
    user: {
      email: '',
      name: '',
      id: '',
    },
    shortenedLinks: [],
  };
}
