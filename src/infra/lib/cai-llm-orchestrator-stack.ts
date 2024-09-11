import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DcpHelper } from './common/helper/DcpHelper';
import { ChatStack } from './chat-stack/chat-stack';

export class CaiLLMOrchestratorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, {
      ...props,
      ...{
        synthesizer: new cdk.DefaultStackSynthesizer({
          generateBootstrapVersionRule: false,
          qualifier: 'dcp-svc',
          ...DcpHelper.getCdkOverrideRoles(props.env),
        }),
      },
    });

    new ChatStack(this, 'ChatStack');
  }
}
