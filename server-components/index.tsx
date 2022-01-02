import Amplify, { withSSRContext } from 'aws-amplify'
import config from "../aws-exports" // gitignored

// Amplify.Logger.LOG_LEVEL = 'DEBUG'

// Amplify SSR configuration needs to be done within each API route
Amplify.configure({
  ...config,
  ssr: true,
});

export default {
  configuredAwsAmplify: Amplify,
  configuredAwsWithSSRContext: withSSRContext
} 