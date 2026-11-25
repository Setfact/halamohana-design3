export const MAX_PDF_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB (5,242,880 bytes)
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  formattedSize?: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Validates that a file is a genuine PDF document and does not exceed 5 MB.
 * Checks extension, MIME type, byte size, and `%PDF` file header magic bytes.
 */
export async function validatePdfFile(file: File): Promise<FileValidationResult> {
  const hasPdfExtension = file.name.toLowerCase().endsWith('.pdf');
  const isPdfMime = file.type === 'application/pdf' || file.type === '';

  if (!hasPdfExtension || !isPdfMime) {
    return {
      valid: false,
      error: 'Format file tidak didukung. Hanya dokumen format PDF (.pdf) yang diperbolehkan.',
    };
  }

  if (file.size <= 0) {
    return {
      valid: false,
      error: 'File PDF kosong atau tidak dapat dibaca.',
    };
  }

  if (file.size > MAX_PDF_SIZE_BYTES) {
    return {
      valid: false,
      error: `Ukuran file melebihi batas maksimal 5 MB (Ukuran berkas Anda: ${formatFileSize(file.size)}).`,
    };
  }

  try {
    const headerBuffer = await file.slice(0, 5).arrayBuffer();
    const headerText = new TextDecoder('ascii').decode(headerBuffer);
    if (!headerText.startsWith('%PDF')) {
      return {
        valid: false,
        error: 'Berkas tidak valid. Pastikan file merupakan dokumen PDF asli (bukan file lain yang diubah ekstensinya).',
      };
    }
  } catch {
    return {
      valid: false,
      error: 'Gagal membaca isi berkas PDF. Silakan coba pilih ulang file Anda.',
    };
  }

  return {
    valid: true,
    formattedSize: formatFileSize(file.size),
  };
}

/**
 * Validates an image file (PNG, JPG, WEBP) up to 5 MB for CMS uploads.
 */
export function validateImageFile(file: File): FileValidationResult {
  const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  const allowedExts = ['.png', '.jpg', '.jpeg', '.webp'];
  const lowerName = file.name.toLowerCase();
  const hasValidExt = allowedExts.some((ext) => lowerName.endsWith(ext));

  if (!hasValidExt || (file.type && !allowedMimes.includes(file.type))) {
    return {
      valid: false,
      error: 'Format gambar harus PNG, JPG/JPEG, atau WEBP.',
    };
  }

  if (file.size <= 0 || file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: `Ukuran gambar maksimal 5 MB (Ukuran file: ${formatFileSize(file.size)}).`,
    };
  }

  return {
    valid: true,
    formattedSize: formatFileSize(file.size),
  };
}
