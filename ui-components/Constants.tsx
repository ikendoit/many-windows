import type {HydratedTabGroupUnLocked} from '../types/api-components/index'

// Doing id="null" for defaultTabGroup to follow type convention ( dynamoDB object id must not be null), 
// backend must handle this "null" string gracefully by creating new tabGroup
// tags: rules, technical-logic, data-parse
export const DEFAULT_TAB_GROUP: HydratedTabGroupUnLocked = {
  id: 'null',
  unlocked: true,
  data: [{
    tabTitle: "Default",
    tabContent: [{
        link: 'https://vnexpress.net',
        title: 'Vnexpress',
        nw: [10, 0],
        se: [19, 9]
      },
      {
        link: 'https://cbc.ca',
        title: 'CBC news',
        nw: [10, 10],
        se: [19, 19]
      },
    ]
  },
  {
    tabTitle: "Finance",
    tabContent: [{
        link: 'https://github.com/ikendoit',
        title: 'Bank',
        nw: [0, 0],
        se: [9, 7]
      }
    ]
  },
  {
    tabTitle: "Cost-tracking",
    tabContent: [{
        link: 'https://github.com/ikendoit',
        title: 'Water Report',
        nw: [0, 0],
        se: [9, 7]
      },
      {
        link: 'https://github.com/ikendoit',
        title: 'Phone Report',
        nw: [10, 10],
        se: [19, 19]
      }
    ]
  },
]}