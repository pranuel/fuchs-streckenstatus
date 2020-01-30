# Steps taken to setup this project
* `amplify init`
    * name: fuchs-streckenstatus
    * environment: dev
    * AWS profile: default
* `amplify add hosting`
    * select DEV
    * run `amplify update hosting` and select PRDO in order to deploy to prod environment later
* `amplify publish`
* `amplify add auth`
    * AWS docs for this stuff: https://aws-amplify.github.io/docs/cli-toolchain/quickstart#group-management
    * select `Default configuration`
    * sign in by Username
    * done
* `amplify update auth`
    * Create or update Cognito user pool groups
    * add the following User Pool Group: Admins
    * done