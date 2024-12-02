import React from "react";
import {
  FloatingPanelBody,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from "@/components/ui/floating-panel";
import { PlusIcon } from "lucide-react";

interface Props {
  addCategory: (value: string) => void;
}

export default function CategoryCreator({ addCategory }: Props) {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="Add Category" size="icon">
        <PlusIcon className="size-5" />
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelTitle>Add Category</FloatingPanelTitle>
        <FloatingPanelForm onSubmit={addCategory}>
          <FloatingPanelBody className="pt-0">
            <FloatingPanelLabel htmlFor="note-input">
              Category
            </FloatingPanelLabel>
            <FloatingPanelTextarea id="note-input" className="min-h-[100px]" />
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}
