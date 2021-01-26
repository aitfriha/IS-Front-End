import {
  UPDATE_WEEKLY_REPORT_CONFIG,
  GET_WEEKLY_REPORT_CONFIG,
  GET_WEEKLY_REPORT_CONFIG_BY_ID,
} from './constants';

export const updateWeeklyReportConfig = (data) => ({
  type: UPDATE_WEEKLY_REPORT_CONFIG,
  data
});

export const getWeeklyReportConfigById = (data) => ({
  type: GET_WEEKLY_REPORT_CONFIG_BY_ID,
  data
});

export const getWeeklyReportConfig = () => ({
  type: GET_WEEKLY_REPORT_CONFIG,
});
