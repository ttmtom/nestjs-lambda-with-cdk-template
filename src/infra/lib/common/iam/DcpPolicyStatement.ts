import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class DcpPolicyStatement {
  private stack: Stack;

  constructor(private scope: Construct) {
    this.stack = Stack.of(scope);
  }

  functionLogsPolicyStatement() {
    return new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['logs:*'],
      resources: [`arn:aws:logs:${this.stack.region}:${this.stack.account}:*`],
    });
  }

  lambdaInvoke() {
    return new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['lambda:InvokeFunction'],
      resources: [
        `arn:aws:lambda:${this.stack.region}:${this.stack.account}:function:*`,
      ],
    });
  }

  webSocketConnectionLambdaInvoke() {
    return new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['execute-api:ManageConnections'],
      resources: [
        `arn:aws:execute-api:${this.stack.region}:${this.stack.account}:*/*/POST/@connections/*`,
      ],
    });
  }
  secretsManager() {
    return new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['secretsmanager:GetSecretValue'],
      resources: [
        `arn:aws:secretsmanager:${this.stack.region}:${this.stack.account}:secret:fwd/models/*/keys/*`,
        `arn:aws:secretsmanager:${this.stack.region}:${this.stack.account}:secret:${
          process.env.INTEGRATING_ENVIRONMENT || process.env.ENVIRONMENT
        }/genai-redis/*`,
      ],
    });
  }
}
