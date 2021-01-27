import { FormattedMessage } from 'react-intl';
import React from 'react';

const localizationMaterialTable = (intl) => ({
  pagination: {
    labelDisplayedRows: '{from}-{to} ' + intl.formatMessage({ id: 'table.of.label' }) + ' {count}'
  },
  toolbar: {
    nRowsSelected: '{0} ' + intl.formatMessage({ id: 'table.row.label' }) + '(s) selected',
    searchPlaceholder: intl.formatMessage({ id: 'table.search.label' }),
    searchTooltip: <FormattedMessage id="table.search.label" />,
    exportTitle: intl.formatMessage({ id: 'table.export.label' }),
  },
  header: {
    actions: <FormattedMessage
      id="table.column.actions"
    />
  },
  body: {
    emptyDataSourceMessage: <FormattedMessage id="table.no_records_to_display.label" />,
    filterRow: {
      filterTooltip: <FormattedMessage id="table.filter.label" />
    },
    addTooltip: <FormattedMessage id="table.add.label" />,
    deleteTooltip: <FormattedMessage id="table.column.actions.delete" />,
    editTooltip: intl.formatMessage({ id: 'table.column.actions.edit' }),
  },
  grouping: {
    placeholder: intl.formatMessage({ id: 'table.drag_headers_here_to_display.label' }),
  }
});

export default localizationMaterialTable;
