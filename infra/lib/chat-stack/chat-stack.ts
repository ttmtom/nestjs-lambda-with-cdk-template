import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
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
import { Construct } from 'constructs';

export class ChatStack extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const chatRole = new Role(this, 'LambdaHandlerRole', {
      roleName: `dcp-svc-chat-stack-role-${process.env.ENVIRONMENT}`,
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

    new Function(this, 'ApiNestHandler', {
      code: Code.fromAsset(path.join(__dirname, '../../../')),
      runtime: Runtime.NODEJS_20_X,
      handler: 'dist/main.handler',
      environment: {},
      role: chatRole,
    });
  }
}
