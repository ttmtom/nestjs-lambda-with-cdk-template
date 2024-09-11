import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Function } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Construct } from 'constructs';

export class ChatStack extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new Function(this, 'ApiNestHandler', {
      code: Code.fromAsset(path.join(__dirname, '../../../app')),
      runtime: Runtime.NODEJS_20_X,
      handler: 'dist/main.handler',
      environment: {},
    });
  }
}
