export const API_PREFIX = 'v1/image';
export const DOC_PATH = API_PREFIX + '/docs';

// AWS environment
export const CDN_HOST = process.env.CDN_HOST;
export const AWS_REGION = process.env.AWS_REGION;
export const BUCKET_PUBLIC = process.env.BUCKET_PUBLIC;
export const BUCKET_PATH_PREFIX = 'upload';

// image option
export const MAX_IMAGE_WIDTH = 1920;
export const MAX_IMAGE_RESIZE_COUNT = 10;
