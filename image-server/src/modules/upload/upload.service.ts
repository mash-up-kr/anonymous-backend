import {
  PutObjectCommand,
  PutObjectRequest,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  AWS_REGION,
  BUCKET_PATH_PREFIX,
  BUCKET_PUBLIC,
  CDN_HOST,
} from 'src/constants';
import { uuid } from 'uuidv4';
import { ImageFormat } from './dto/upload-image-option.dto';

@Injectable()
export class UploadService {
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: AWS_REGION,
    });
  }

  async uploadImage(
    file: Buffer,
    format: ImageFormat,
  ): Promise<{ url: string }> {
    const id = await this.generateUUID(format);
    const { cdn: url, key: Key } = this.createPath(id, format);
    const payload = new PutObjectCommand({
      Bucket: BUCKET_PUBLIC,
      Key,
      ACL: 'public-read',
      ContentType: `image/${format}`,
      Body: file,
    });

    await this.client.send(payload);
    return { url };
  }

  private async generateUUID(format: ImageFormat, retry = 5): Promise<string> {
    while (retry--) {
      const id = uuid();
      try {
        await axios.head(this.createPath(id, format).cdn);
      } catch (e) {
        // If id not exist;
        return id;
      }
    }
    throw new Error(`Cannot generate UUID, retry count = ${retry}`);
  }

  private createPath(id: string, ext: ImageFormat) {
    return {
      key: `${BUCKET_PATH_PREFIX}/${id}.${ext}`,
      cdn: `https://${CDN_HOST}/${BUCKET_PATH_PREFIX}/${id}.${ext}`,
    };
  }
}
