import { S3Client } from "@aws-sdk/client-s3";
import { SESClient } from "@aws-sdk/client-ses";
import { SQSClient } from "@aws-sdk/client-sqs";
import fp from "fastify-plugin";

export type AWSSDKOptions = {
  region: string;
  accessKeyId?: string;
  secretAccessKey?: string;
};

export default fp<AWSSDKOptions>(async (fastify, opts) => {
  // AWS SDK configuration and initialization
  const { region, accessKeyId, secretAccessKey } = opts as AWSSDKOptions;
  let credentials;
  if (accessKeyId && secretAccessKey) {
    credentials = {
      accessKeyId,
      secretAccessKey,
    };
  }

  // Initialize AWS SDK clients here
  const s3Client = new S3Client({
    region,
    credentials,
  });

  const sqsClient = new SQSClient({
    region,
    credentials,
  });

  const sesClient = new SESClient({
    region,
    credentials,
  });

  fastify.decorate("aws", {
    s3: s3Client,
    sqs: sqsClient,
    ses: sesClient,
  });
});

declare module "fastify" {
  interface FastifyInstance {
    aws: {
      s3: S3Client;
      sqs: SQSClient;
      ses: SESClient;
    };
  }
}
