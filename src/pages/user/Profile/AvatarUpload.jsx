import { Camera } from "lucide-react";
import { ImagePlus } from "lucide-react";
import { Loader2 } from "lucide-react";
import React from "react";
import { useRef } from "react";

const AvatarUpload = ({ user, uploading, onFileSelect }) => {
  const fileRef = useRef(null);
  const userName = user?.fullName[0].toUpperCase() || "U";

  const currentImage = user?.profileImage || null;

  const handleChange=(e)=>{
    const file=e.target.files?.[0]
    if(file) onFileSelect(file)
    e.target.value=null
  }
  return (
    <div className="relative group shrink-0">
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept="image/jpeg,image/png,image/webp,img/gif"
        onChange={handleChange}
      />

      <button onClick={() => fileRef.current?.click()} className="relative h-24 w-24 rounded-2xl border-4 border-white bg-primary shadow-lg overflow-hidden cursor-pointer disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
        {currentImage ? (
          <img src={currentImage} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <span className="text-white text-2xl font-bold flex items-center justify-center h-full w-full">
            {userName}{" "}
          </span>
        )}

        <div
          className={[
            "absolute inset-0 flex flex-col items-center justify-center gap-1 transition-all duration-200",
            uploading ? "bg-black/60" : "bg-black/0 group-hover:bg-black/50",
          ].join(" ")}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <>
              <Camera className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Change
              </span>
            </>
          )}
        </div>
      </button>
      <button
        title="Upload photo"
        onClick={() => fileRef.current?.click()}
        type="button"
        className="absolute -bottom-1.5 -right-1.5 h-7 w-7 rounded-full bg-primary border-2 border-white shadow-md flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ImagePlus className="w-3.5 h-3.5 text-white" />
      </button>
    </div>
  );
};

export default AvatarUpload;
