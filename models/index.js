// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TabGroups } = initSchema(schema);

export {
  TabGroups
};