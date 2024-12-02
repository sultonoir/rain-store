import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
interface FieldImageProps {
  images: File[];
  setImages: (values: File[]) => void;
}

export default function FieldImage({ images, setImages }: FieldImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Filter untuk hanya menerima satu file yang unik
      const uniqueNewFile = acceptedFiles.find(
        (file) =>
          !images.some((existingFile) => existingFile.name === file.name),
      );

      if (uniqueNewFile) {
        setImages([uniqueNewFile]); // Hanya menambahkan satu file
      }
    },
    [images, setImages], // Menjaga agar setImages tetap diperbarui
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
        isDragActive ? "border-primary bg-primary/10" : "border-border"
      }`}
    >
      <Input type="file" className="hidden" {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12" />
      <p className="mt-2 text-sm">
        {isDragActive
          ? "Drop the images here ..."
          : "Drag 'n' drop some images here, or click to select images"}
      </p>
    </div>
  );
}
