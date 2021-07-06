import axios from 'axios';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getDefaultState, { State } from '@/store/getDefaultState';
import {
  AuthedUser,
  RegisterFormData,
  LinkObj,
  UserResponse,
  LinkFormData,
  LoginFormData,
} from '@/types';
import {
  API_AUTH_REGISTER_URL,
  API_LINKS_FETCH_URL,
  API_LINKS_CREATE_URL,
  API_AUTH_LOGIN_URL,
} from '@/meta/api_constants';

function setupClient(jwt: string) {
  axios.defaults.headers = { Authorization: jwt };
}

const store = createStore<State>({
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    jwt: (state) => state.jwt,
    shortenedLinks: (state) => state.shortenedLinks,
    userData: (state) => state.user,
  },
  mutations: {
    setAuthedUser(state, payload: AuthedUser) {
      state.user = payload;
      state.isAuthenticated = true;
    },
    resetState(state) {
      const defaultState = getDefaultState();
      Object.assign(
        state,
        defaultState,
      );
    },
    resetShortenedLinks(state) {
      state.shortenedLinks = [];
    },
    setShortenedLinks(state, payload: Array<LinkObj>) {
      const concat: Array<LinkObj> = [...state.shortenedLinks, ...payload];

      concat.filter((v, i, a) => a.findIndex(
        (t) => (t.linkId === v.linkId),
      ) === i);

      state.shortenedLinks = concat;
    },
    setJwt(state, payload: string) {
      state.jwt = payload;
    },
  },
  actions: {
    registerUser: async ({ dispatch },
      payload: RegisterFormData): Promise<AuthedUser | null> => {
      try {
        const authedUser = await axios.post(
          API_AUTH_REGISTER_URL,
          payload,
        );

        const data = authedUser.data as UserResponse;

        await dispatch('setupAuthedUser', data);

        return data.user;
      } catch (error) {
        console.error(error);

        return null;
      }
    },
    loginUser: async (
      { dispatch },
      payload: LoginFormData): Promise<AuthedUser | null> => {
      try {
        const authedUser = await axios.post(
          API_AUTH_LOGIN_URL,
          payload,
        );

        const data = authedUser.data as UserResponse;

        await dispatch('setupAuthedUser', data);

        return data.user;
      } catch (error) {
        console.error(error);

        return null;
      }
    },
    setupAuthedUser: ({ commit }, payload: UserResponse) => {
      commit('setAuthedUser', payload.user);

      commit('setJwt', payload.jwt);

      commit('resetShortenedLinks');

      setupClient(payload.jwt);
    },
    getLinks: async (
      { commit }): Promise<Array<LinkObj> | null> => {
      try {
        const links = await axios.get(
          API_LINKS_FETCH_URL,
        );

        const data = links.data as Array<LinkObj>;

        commit('setShortenedLinks', data);

        return data;
      } catch (error) {
        console.error(error);

        return null;
      }
    },
    createLink: async (
      { commit }, payload: LinkFormData): Promise<LinkObj | null> => {
      try {
        const links = await axios.post(
          API_LINKS_CREATE_URL,
          payload,
        );

        const data = links.data as LinkObj;

        commit('setShortenedLinks', [data]);

        return data;
      } catch (error) {
        console.error(error);

        return null;
      }
    },
    logout: ({ commit }): void => {
      commit('resetState');
    },
  },
  modules: {
  },
});

store.dispatch('setupAuthedUser', {
  user: store.getters.userData,
  jwt: store.getters.jwt,
} as UserResponse);

export default store;
