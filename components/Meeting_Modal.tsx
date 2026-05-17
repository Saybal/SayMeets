import React, { Children, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { IconType } from "react-icons";

type Props = {
  isOpen: boolean;
  icon?: IconType;
  onClose: () => void;
  title: string;
  className: string;
  buttonText: string;
  handleClick: () => void;
  children?: ReactNode;
};

const Meeting_Modal = ({
  isOpen,
  icon: Icon,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
  children,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-6 w-full max-w-130 border-none bg-dark-1 rounded-xl px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {Icon && (
                      <div className="w-full flex items-center justify-center">
                          <div className="border-2 border-white p-3 rounded-full">
              <Icon className="text-3xl font-bold leading-10.5" />
            </div>
            </div>
          )}
          <div className={cn("text-3xl font-bold leading-10.5", className)}>
            {title}
          </div>
          {children}
          <Button
            className="bg-blue-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover:to-blue-900 cursor-pointer"
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Meeting_Modal;
