import {
  GET_SUMMARIZED_WEEKLY_REPORT,
  GET_EXTENDED_WEEKLY_REPORT,
  SAVE_WEEKLY_REPORT
} from './constants';

export const getSummarizedWeeklyReport = (data) => ({
  type: GET_SUMMARIZED_WEEKLY_REPORT,
  data
});

export const getExtendedWeeklyReport = (data) => ({
  type: GET_EXTENDED_WEEKLY_REPORT,
  data
});

export const saveWeeklyReport = (data) => ({
  type: SAVE_WEEKLY_REPORT,
  data
});
