import * as allLanguage from 'date-fns/locale';


const findlanguage = (ln) => {
  let language = null;
  const lng = ln.substring(0, 2);
  Object.values(allLanguage).forEach((item) => {
    if (item.code === lng) {
      language = item;
    }
  });
  return language;
};

export default findlanguage;
