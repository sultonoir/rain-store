// "use client";
// import NextImage from "next/image";
// import React, { useState, type ChangeEvent } from "react";
// import { blurImage } from "@/lib/blur";

// // Helper function to blur image using canvas

// const ImageUpload: React.FC = () => {
//   const [images, setImages] = useState<string[]>([]);
//   const [blurring, setBlurring] = useState<boolean>(false);

//   const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       setBlurring(true); // Start blurring process
//       const newImages = Array.from(files).map((file) =>
//         URL.createObjectURL(file),
//       );
//       const blurredImages: string[] = [];

//       for (const imageSrc of newImages) {
//         const blurredImage = await blurImage(imageSrc, 540);

//         blurredImages.push(blurredImage);
//       }

//       setImages((prevImages) => [...prevImages, ...blurredImages]);
//       setBlurring(false); // End blurring process
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         onChange={handleFileChange}
//       />
//       {blurring && <p>Processing...</p>}
//       <div className="flex flex-wrap gap-2">
//         {images.map((image, index) => (
//           <div key={index} className="image-wrapper">
//             <NextImage
//               src={image}
//               alt={`upload-preview-${index}`}
//               width={400}
//               height={400}
//               priority
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
"use client";
import React from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import { ImageCropper } from "./crop-image";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useSession } from "@/lib/auth-client";

export type FileWithPreview = FileWithPath & {
  preview: string;
};

const accept = {
  "image/*": [],
};

const ImageUpload = () => {
  const { data } = useSession();
  const user = data?.user;
  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }

    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    setSelectedFile(fileWithPreview);
    setDialogOpen(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div className="relative">
      {selectedFile ? (
        <ImageCropper
          dialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      ) : (
        <Avatar
          {...getRootProps()}
          className="size-36 cursor-pointer ring-2 ring-slate-200 ring-offset-2"
        >
          <input {...getInputProps()} />
          <AvatarImage
            src={user?.image ?? "./avatar-placeholder.png"}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ImageUpload;
