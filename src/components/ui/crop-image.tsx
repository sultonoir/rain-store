"use client";

import React, { type SyntheticEvent, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type FileWithPath } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";
import { ImagePlus, Trash2Icon, UploadIcon } from "lucide-react";
import { Label } from "./label";
import { useUploadThing } from "@/lib/uploadthing";
import { api } from "@/trpc/react";
import { LoadingButton } from "../templates/button/loading-button";
import { useRouter } from "next/navigation";

// Define type for files with preview
export type FileWithPreview = FileWithPath & {
  preview: string;
};

interface ImageCropperProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: FileWithPreview | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
}

export function ImageCropper({
  dialogOpen,
  setDialogOpen,
  selectedFile,
  setSelectedFile,
}: ImageCropperProps) {
  const { startUpload } = useUploadThing("media");
  const [loading, setLoading] = useState(false);
  const aspect = 1; // Set aspect ratio (1:1)

  // Refs and state
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  // const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>("");

  // Handle image load and set initial crop area
  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>): void => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  // Handle crop completion and update cropped image URL
  const onCropComplete = async (crop: PixelCrop): Promise<void> => {
    if (imgRef.current && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
          imgRef.current,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY,
        );
      }

      // Create both data URL and File
      const fileName = selectedFile?.name ?? "cropped-image.png";
      const croppedImageFile = await getCanvasToFile(canvas, fileName);

      setCroppedFile(croppedImageFile);
    }
  };

  // Convert canvas to Blob
  const getCanvasToBlob = (
    canvas: HTMLCanvasElement,
    type = "image/png",
    quality = 1.0,
  ): Promise<Blob> => {
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          }
        },
        type,
        quality,
      );
    });
  };

  // Convert canvas to File
  const getCanvasToFile = async (
    canvas: HTMLCanvasElement,
    fileName: string,
    type = "image/png",
    quality = 1.0,
  ): Promise<File> => {
    const blob = await getCanvasToBlob(canvas, type, quality);
    return new File([blob], fileName, { type });
  };

  const router = useRouter();
  const { mutate } = api.user.update.useMutation({
    onSuccess: (data) => {
      setDialogOpen(false);
      setCroppedImage(data.image ?? "");
      router.refresh();
    },
  });
  // Trigger the crop action and close the dialog
  const onCrop = async (): Promise<void> => {
    setLoading(true);
    try {
      const images = await startUpload([croppedFile!]);
      const image = images?.at(0)?.url ?? "";
      mutate({ image });
    } catch (error) {
      const err = error as Error;
      alert(`Something went wrong! ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setSelectedFile(fileWithPreview);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Avatar className="size-36 cursor-pointer ring-2 ring-slate-200 ring-offset-2">
          <AvatarImage
            src={croppedImage ? croppedImage : selectedFile?.preview}
            alt="Avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0">
        <div className="size-full p-6">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={onCropComplete}
            aspect={aspect}
            className="w-full"
          >
            <Avatar className="size-full rounded-none bg-red-500">
              <AvatarImage
                ref={imgRef}
                className="size-full rounded-none"
                alt="Image Cropper Shell"
                src={selectedFile?.preview}
                onLoad={onImageLoad}
              />
              <AvatarFallback className="size-full min-h-[460px] rounded-none">
                Loading...
              </AvatarFallback>
            </Avatar>
          </ReactCrop>
        </div>
        <DialogFooter className="justify-center p-6 pt-0">
          <DialogClose asChild>
            <Button
              size="sm"
              type="reset"
              className="w-fit"
              variant="outline"
              onClick={() => {
                setSelectedFile(null);
              }}
            >
              <Trash2Icon className="mr-1.5 size-4" />
              Cancel
            </Button>
          </DialogClose>

          <Label
            htmlFor="upload"
            className="inline-flex h-9 w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-3 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onFileChange}
            />
            <ImagePlus size={16} />
            Change image
          </Label>
          <LoadingButton
            loading={loading}
            disabled={loading}
            size="sm"
            className="w-fit"
            onClick={onCrop}
          >
            <UploadIcon className="mr-1.5 size-4" />
            Upload
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to center the crop
export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 50,
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
