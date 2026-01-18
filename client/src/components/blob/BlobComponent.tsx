// import React, { useEffect, useState } from "react";
// import { getAllBlobs } from "./blob.networkcalls";

// interface BlobItem {
//   blob_url: string;
// }

// const BlobComponent = () => {
//   const [blobData, setblobDate] = useState<BlobItem[]>([]);
//   useEffect(() => {
//     fetchBlobdata();
//   }, []);

//   const fetchBlobdata = async () => {
//     const resp = await getAllBlobs();
//     setblobDate(resp.blob_items);
//   };
//   console.log(blobData, "TEST");

//   return (
//     <div className="p-4">
//       {/* Layout */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-white">Blob Container</h1>
//         <div>
//           <input
//             type="file"
//             className="border-2 border-white p-2 rounded-lg cursor-pointer"
//           />
//           <div>Upload a Blob</div>
//         </div>
//       </div>
//       {/* Body */}
//       <div className="flex flex-wrap">
//         {blobData.map((item, ind) => {
//           return (
//             <div key={ind} className="m-4 w-1/6 ">
//               <img src={item.blob_url} className="h-[20vh]" alt="" />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BlobComponent;



import React, { useEffect, useRef, useState } from "react";
import { getAllBlobs, removeBlob, uploadBlob } from "./blob.networkcalls";

interface BlobItem {
  blob_url: string;
}

const BlobComponent: React.FC = () => {
  const [blobData, setBlobData] = useState<BlobItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchBlobdata();
  }, []);

  const fetchBlobdata = async () => {
    try {
      const resp = await getAllBlobs();
      setBlobData(resp.blob_items || []);
    } catch (err) {
      console.error("Failed to fetch blobs:", err);
    }
  };

  const handleUploadClick = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      await uploadBlob(file, (pct: number) => setProgress(pct));

      // Refresh list after successful upload
      await fetchBlobdata();

      // Clear the input for subsequent uploads
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Upload complete!");
    } catch (err: any) {
      console.error("Upload failed:", err);
      alert(err?.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const hanldeRemove = async(item:any)=>{
   
try {
    // Call the API; ignore the response body unless you need it
    await removeBlob(item.blob_item_name);

    // Safely update state using functional form (avoids stale closures)
    setBlobData(prev =>
      prev.filter((b:any) => b.blob_item_name !== item.blob_item_name)
    );
  } catch (err) {
    console.error("Failed to delete blob:", err);
    alert("Failed to delete blob. Please try again.");
  }

  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">Blob Container</h1>

        {/* Upload controls */}
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            className="border-2 border-white p-2 rounded-lg cursor-pointer text-white"
            // If you want immediate auto-upload on select, uncomment:
            // onChange={handleUploadClick}
          />
          <div
            className={`border-2 border-white p-2 rounded-lg cursor-pointer text-white ${
              uploading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={!uploading ? handleUploadClick : undefined}
            role="button"
            aria-disabled={uploading}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleUploadClick();
            }}
          >
            Upload a Blob
          </div>
        </div>
      </div>

      {/* Optional progress UI */}
      {uploading && (
        <div className="text-white text-sm mb-4">
          Uploading… {progress}%
          <div className="w-full bg-white/20 h-2 rounded mt-1">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-wrap">
        {blobData.map((item, ind) => (
          <div key={ind} className="m-4 w-1/6 flex items-start">
            <img src={item.blob_url} className="h-[20vh]" alt={`blob-${ind}`} />
            <button className="p-1 bg-red-300 m-1" onClick={()=>hanldeRemove(item)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlobComponent;
``
