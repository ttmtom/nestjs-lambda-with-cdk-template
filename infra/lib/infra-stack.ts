import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ChatStack } from './chat-stack/chat-stack';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, {
      ...props,
    });

    new ChatStack(this, 'ChatStack');
  }
}
