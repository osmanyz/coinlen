import React from 'react';

const ASC = 'ascending';
const DESC = 'descending';

/**
 * @url https://www.smashingmagazine.com/2020/03/sortable-tables-react/
 *
 * @param {*} items
 * @param {*} config
 */
export const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === ASC ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === ASC ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = ASC;
    if (sortConfig && sortConfig.key === key && sortConfig.direction === ASC) {
      direction = DESC;
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

/**
 * That's for classNames
 *
 * @param {*} sortConfig
 * @param {*} name
 */
export const getClassNamesFor = (sortConfig, name) => {
  if (!sortConfig) {
    return;
  }

  return sortConfig.key === name ? sortConfig.direction : undefined;
};

export const getArrowDirection = (sortConfig, name) => {
  if (!sortConfig) {
    return;
  }

  let key = sortConfig.key === name ? sortConfig.direction : undefined;

  if (typeof key === 'undefined') {
    return 'asc';
  }

  if (typeof key !== 'undefined' && key === ASC) {
    return 'asc';
  } else if (typeof key !== 'undefined' && key === DESC) {
    return 'desc';
  }
};
