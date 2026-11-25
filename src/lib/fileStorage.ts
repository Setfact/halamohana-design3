const DB_NAME = 'hm_cms_files_db';
const STORE_NAME = 'uploaded_blobs';
const memoryFallback = new Map<string, Blob>();

function openFilesDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/**
 * Persists an uploaded file (e.g., 5 MB PDF CV or document) in IndexedDB
 * so it remains previewable/downloadable even after full browser reloads,
 * avoiding localStorage's ~5 MB QuotaExceededError.
 */
export async function saveUploadedFileBlob(key: string, file: Blob): Promise<void> {
  memoryFallback.set(key, file);
  const db = await openFilesDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(file, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function getUploadedFileBlob(key: string): Promise<Blob | null> {
  const mem = memoryFallback.get(key);
  if (mem) return mem;

  const db = await openFilesDb();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as Blob) || null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function deleteUploadedFileBlob(key: string): Promise<void> {
  memoryFallback.delete(key);
  const db = await openFilesDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}
