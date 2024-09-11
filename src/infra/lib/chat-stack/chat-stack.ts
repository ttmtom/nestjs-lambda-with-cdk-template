import { Construct } from 'constructs';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { DcpPolicyStatement } from '../common/iam/DcpPolicyStatement';
import {
  ManagedPolicy,
  Policy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

export class ChatStack extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const chatRole = new Role(this, 'LambdaHandlerRole', {
      roleName: `${process.env.ENVIRONMENT}-chat-stack-role`,
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      permissionsBoundary: ManagedPolicy.fromManagedPolicyName(
        scope,
        'WorkloadRolePermissionsBoundary',
        'WorkloadRolePermissionsBoundary',
      ),
    });

    const dcpPolicyStatement = new DcpPolicyStatement(this);
    const policyStatements: PolicyStatement[] = [
      dcpPolicyStatement.functionLogsPolicyStatement(),
      dcpPolicyStatement.lambdaInvoke(),
      dcpPolicyStatement.webSocketConnectionLambdaInvoke(),
      dcpPolicyStatement.secretsManager(),
    ];

    new Policy(this, 'CommonPolicy', {
      statements: policyStatements,
      roles: [chatRole],
    });

    const apiNestHandlerFunction = new Function(this, 'ApiNestHandler', {
      code: Code.fromAsset(path.basename(__dirname) + '/dist'),
      runtime: Runtime.NODEJS_20_X,
      handler: 'main.handler',
      environment: {},
      role: chatRole,
    });
  }
}
