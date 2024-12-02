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
  FloatingPanelTrigger,
} from "@/components/ui/floating-panel";
import { PlusIcon } from "lucide-react";

interface Props {
  addSubCategory: (value: string) => void;
}

export default function SubCategoryCreator({ addSubCategory }: Props) {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="Add Sub Categories" size="icon">
        <PlusIcon className="size-5" />
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelForm onSubmit={addSubCategory}>
          <FloatingPanelBody className="pt-0">
            <FloatingPanelLabel htmlFor="note-input">
              Sub Categories
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
