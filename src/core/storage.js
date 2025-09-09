import { StorageClient } from '@supabase/storage-js';

const storageUrl = process.env.STORAGE_URL;
const storageKey = process.env.STORAGE_KEY;

if (!storageUrl) throw new Error('STORAGE_URL must be specified');
if (!storageKey) throw new Error('STORAGE_KEY must be specified');

export default new StorageClient(storageUrl, {
  Authorization: `Bearer ${storageKey}`,
});
