/**
 * Filters out duplicate files based on their names and returns unique files and duplicates.
 * @param newFiles - Array of newly uploaded files.
 * @param existingFiles - Array of already uploaded files.
 * @returns An object with unique files and duplicate files.
 */
export const filterDuplicateFiles = (newFiles: File[], existingFiles: { name: string }[]) => {
  const uniqueFiles = newFiles.filter((file) => !existingFiles.some((existingFile) => existingFile.name === file.name));

  const duplicateFiles = newFiles.filter((file) =>
    existingFiles.some((existingFile) => existingFile.name === file.name)
  );

  return { uniqueFiles, duplicateFiles };
};
