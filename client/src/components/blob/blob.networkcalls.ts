import { axiosInstanceV2 } from "../../utils/axios.utils";

export const getAllBlobs = async () => {
  const bloblist = await axiosInstanceV2.get("/blobstorage/all");
  return bloblist.data;
};

export const uploadBlob = async (
  file: File,
  onProgress?: (pct: number) => void
) => {
  const formData = new FormData();
  formData.append("file", file); // ensure server expects 'file'

  await axiosInstanceV2.post("/blobstorage/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (evt) => {
      if (!evt.total) return;
      const pct = Math.round((evt.loaded * 100) / evt.total);
      onProgress?.(pct);
    },
  });
};

export const removeBlob = async (blob_id: string) => {
  const bloblist = await axiosInstanceV2.delete(
    "/blobstorage/delete/" + blob_id
  );
  return bloblist.data;
};
