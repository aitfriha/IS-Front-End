import {
  GET_DATA_BY_CURRENCY_TYPE,
  GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES
} from './constants';

export const getDataByCurrencyType = (data) => ({
  type: GET_DATA_BY_CURRENCY_TYPE,
  data
});

export const getDataAssociatedWithCurrencyTypes = () => ({
  type: GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES
});
