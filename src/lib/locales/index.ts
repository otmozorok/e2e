import { I18n } from 'i18n-js';
import en from './json/en.json';
import ru from './json/ru.json';

const i18n = new I18n({ ru, en });

i18n.defaultLocale = 'ru';
i18n.locale = 'ru';

export default i18n;
