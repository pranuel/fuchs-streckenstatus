# Steps taken to setup this project
* `amplify init`
    * more info: https://aws-amplify.github.io/docs/cli-toolchain/quickstart#concepts-1
    * name: fuchs-streckenstatus
    * environment: dev
        * use dev on development branch
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
* `amplify add api`
    * ? Please select from one of the below mentioned services: REST
    * ? Provide a friendly name for your resource to be used as a label for this category in the project: fuchsstreckenstatusreadonlyapi
    * ? Provide a path (e.g., /items) /status
    * ? Choose a Lambda source Create a new Lambda function
    * ? Provide a friendly name for your resource to be used as a label for this category in the project: fuchsstreckenstatusreadonlyfunction
    * ? Provide the AWS Lambda function name: fuchsstreckenstatusreadonlyfunction
    * ? Choose the function template that you want to use: CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB)
    * ? Choose a DynamoDB data source option Use DynamoDB table configured in the current Amplify project
    * ? Choose from one of the already configured DynamoDB tables fuchsstreckenstatusdynamo
    * ? Do you want to access other resources created in this project from your Lambda function? No
    * ? Do you want to edit the local lambda function now? No
    * ? Restrict API access No
    * ? Do you want to add another path? No
    * edit the app.js file and remove put, post and delete methods (only keep the 2 get methods)
        * this makes the api readonly ;)
        * you can reach the api endpoint at something like this: https://4kst5mok57.execute-api.eu-central-1.amazonaws.com/dev/status/object/1
            * go to the AWS management console and find the id of your API: https://eu-central-1.console.aws.amazon.com/apigateway/main/apis?region=eu-central-1
            * replace `4kst5mok57` in the url above with the actual id of your API
* `amplify push`
* `amplify publish`
* `amplify env add`
    * more info: https://aws-amplify.github.io/docs/cli-toolchain/quickstart#setting-up-master-and-dev-environments
    * use prod on master branch
    * ? Do you want to use an existing environment? No
    * ? Enter a name for the environment prod
    * ? Do you want to use an AWS profile? Yes
    * ? Please choose the profile you want to use default