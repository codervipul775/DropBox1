export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const validateFileSize = (file) => {
  if (!file) {
    throw new Error('No file provided');
  }
  
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds 10MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
  }
  return true;
};