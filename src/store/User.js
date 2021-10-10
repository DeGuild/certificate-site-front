// eslint-disable-next-line import/prefer-default-export
export const UserModule = {
  namespaced: true,
  state: {
    user: null,
    certificates: null,
    certificateSelected: null,
    certificateToFetch: null,
    certificatePage: 0,
    certificateSharing: '',
    fetching: false,
    dialog: 'Share your certificate and show your skill!',
    background: '../assets/cert_bg.png',
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_FETCHING(state, fetch) {
      state.fetching = fetch;
    },
    SET_CERTIFICATES(state, cer) {
      state.certificates = cer;
    },
    SET_CHOSEN_CERTIFICATE(state, cer) {
      state.certificateSelected = cer;
    },
    SET_SHARING_CERTIFICATE(state, link) {
      state.certificateSharing = link;
    },
    SET_TO_FETCH_CERTIFICATE(state, cer) {
      state.certificateToFetch = cer;
    },
    SET_DIALOG(state, text) {
      state.dialog = text;
    },
    SET_PAGE(state, text) {
      state.certificatePage = text;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    setFetching({ commit }, fetch) {
      commit('SET_FETCHING', fetch);
    },
    setCertificates({ commit }, certs) {
      commit('SET_CERTIFICATES', certs);
    },
    setChosenCertificate({ commit }, cert) {
      commit('SET_CHOSEN_CERTIFICATE', cert);
    },
    setSharingCertificate({ commit }, link) {
      commit('SET_SHARING_CERTIFICATE', link);
    },
    setCertificateToFetch({ commit }, cert) {
      commit('SET_TO_FETCH_CERTIFICATE', cert);
    },
    setCertificatePage({ commit }, page) {
      commit('SET_PAGE', page);
    },
    setDialog({ commit }, text) {
      commit('SET_DIALOG', text);
    },
    reset({ commit }) {
      commit('SET_USER', null);
      commit('SET_CERTIFICATES', null);
      commit('SET_CHOSEN_CERTIFICATE', null);
      commit('SET_TO_FETCH_CERTIFICATE', null);
      commit('SET_DIALOG', 'Share your certificate and show your skill!');
      commit('SET_PAGE', 0);
    },
  },
  modules: {},
};
