import { FileAttachment } from "@/components/CompleteEvidenceUploader";

export const convertFileToBase64 = async (uri: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      let result = reader.result as string;
      // reader.result en web puede venir como data URL, convertimos a base64
      if (result.startsWith("data:")) {
        result = result.split(",")[1];
      }
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const processEvidenceFiles = async (files: FileAttachment[]) => {
  const processedFiles = [];

  for (const file of files) {
    try {
      const base64Data = await convertFileToBase64(file.uri);
      processedFiles.push({
        filename: file.name,
        contentType: file.type,
        base64Data,
      });
    } catch (error) {
      console.error(`Error procesando ${file.name}:`, error);
    }
  }

  return processedFiles;
};
