#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { FrontendStack } from '../lib/frontend-stack'

const app = new cdk.App()

new FrontendStack(app, process.env.STACK_NAME || 'ninjarrm-frontend', {
  domainName: process.env.DOMAIN_NAME!,
  certificateArn: process.env.CERTIFICATE_ARN!,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
  }
})
