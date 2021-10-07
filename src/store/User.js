// eslint-disable-next-line import/prefer-default-export
export const UserModule = {
  namespaced: true,
  state: {
    user: null,
    certificates: null,
    certificateSelected: null,
    dialog: '',
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_CERTIFICATES(state, cer) {
      state.certificates = cer;
    },
    SET_CHOSEN_CERTIFICATE(state, cer) {
      state.certificateSelected = cer;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    setCertificates({ commit }, certs) {
      commit('SET_CERTIFICATES', certs);
    },
    setChosenCertificate({ commit }, cert) {
      commit('SET_CHOSEN_CERTIFICATE', cert);
    },
  },
  modules: {},
};
