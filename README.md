# Many Windows

https://many-windows.com

## Explanation

https://www.youtube.com/watch?v=56ZeaIX4qT4

## Goal

Allow users to save windows, open/close multiple windows at a time.


## Development

Follow standard NextJS SSR development process.
Follow standard Amplify NextJS SSR Development standard

Helpful commands:

```
# Local development
npm run build
npm run dev
```

```
# Deployment using CI/CD
# Make a change and push to amplify-connected github branch, CI/CD will take over
```

## SOPs

### 1. Expired API Key

Signal: When many-windows.com shows "not found"

```
amplify pull # sync up local env with Amplify cloud
amplify env pull  # download aws-exports.ts file
amplify update api
# Select update new API Key, 365 days
amplify push
# A. If push successful, good, check webapp.
# B. If UPDATE_FAILED cloud-formation not found API Key, follow https://github.com/aws-amplify/amplify-cli/issues/1450#issuecomment-567449897
#      This is because Amplify auto-deletes expired key, which conflicts with cloud-formation expecting that key to still exists. Lolol.

# Push up to github so Amplify can trigger and update Client Web
git add . && git commit -m "<msg>"
git push origin mainline
```
