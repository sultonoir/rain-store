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
  addSize: (value: string) => void;
}

export default function SizeCreator({ addSize }: Props) {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="Add Sizes" size="icon">
        <PlusIcon className="size-5" />
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelForm onSubmit={addSize}>
          <FloatingPanelBody className="pt-0">
            <FloatingPanelLabel htmlFor="note-input">Sizes</FloatingPanelLabel>
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
