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
* `amplify push`
* `amplify publish`
    * Now you can sign up and sign in
* Manage Admins
    * go to https://eu-central-1.console.aws.amazon.com/cognito/users/?region=eu-central-1#/pool/eu-central-1_KpQRRuw1m/groups/Admins?_k=dfzg0l
    * click on `Add users`
    * click on `+` in front of user to add
* `amplify add api`
    * select REST
    * friendly name: fuchsstreckenstatusapi
    * path: /status
    * AWS Lambda function name: fuchsstreckenstatusfunction
    * select `CRUD function for Amazon DynamoDB table`
    * select `Create a new DynamoDB table`
    * fiendly name: fuchsstreckenstatusdynamo
    * table name: fuchsstreckenstatus
    * add column: id
    * data type: string
    * add column: status
    * data type: string
    * select id as key index
    * answer the rest with `no`
    * Do you want to edit the local lambda function now?: `Yes`
    * just hit enter in the console
    * Restrict API access: `Yes`
    * Restrict access by?: `Both`
    * Who should have access?: `Authenticated and Guest users`
    * What kind of access do you want for Authenticated users?: select only read
    * What kind of access do you want for Guest users?: select only read
    * Select groups: Admins
    * What kind of access do you want for Admins users?: select all 4 options
    * done
* `amplify push`
* `amplify publish`