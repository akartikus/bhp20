const translations = {
  greeting: { mg: 'Tongasoa!', fr: 'Bienvenue!' },
  score: { mg: 'Tarehimarika', fr: 'Score' },
  cancel: { mg: 'Hanafoana', fr: 'Annuler' },
  ok: { mg: 'Eny', fr: 'Oui' },
  no: { mg: 'Tsia', fr: 'Non' },
  next: { mg: 'Manaraka', fr: 'Suivant' },
  close: { mg: 'Akatona', fr: 'Fermer' },
  save: { mg: 'Raketina', fr: 'Enregistrer' },
  mode_label: { mg: 'Lalao', fr: 'Mode' },
  mode_level: { mg: 'Ambaratonga', fr: 'Niveau' },
  mode_wordsFound: { mg: 'Teny hita', fr: 'Mots trouvés' },
  menu_head: { mg: 'Kojakoja', fr: 'Parametres' },
  message_true: { mg: 'Hitanao ilay teny', fr: "C'était bien" },
  message_notFound: {
    mg: 'Indrisy :( inty ilay teny : ',
    fr: "Dommage :( c'était : ",
  },
  message_needToFinish: {
    mg: 'Farano aloha ny ambaratonga rehetra ',
    fr: "Finissez d'abord tout les niveaux",
  },
  message_levelDone: {
    mg: 'Vitanao ny ambaratonga rehetra, misafidiana lalao hafa',
    fr: 'Vous avez fini tout les niveaux, choisissez un autre mode',
  },
  message_congrats: { mg: 'Tena tsara!!', fr: 'Bravo!!' },
  label_next: { mg: 'Manaraka', fr: 'Suivant' },
  label_mode: {
    mg: 'Hisafidy lalao/ambaratonga',
    fr: 'Choisir niveau/adventure',
  },
  label_modeDone: {
    mg: 'Lalao efa vita',
    fr: 'Mode fini',
  },
  message_modeReplay: {
    mg: 'Efa novitaonao io lalao io, tiako ho averina atao ve?',
    fr: 'Vous avez déja fini ce mode, voullez vous le refaire?',
  },
  message_nextLevel: {
    mg: "Hiditra ami'ny ambaratonga manaraka ianao",
    fr: 'Vous passez au prochain niveau',
  },
  message_modeDone: {
    mg: 'Vitanao ilay lalao, misafidiana lalao hafa',
    fr: "Vous avez fini l'aventure",
  },
};

export const getI18n = (key, region) => {
  return translations[key][region];
};
