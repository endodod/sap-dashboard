"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-[90vw] max-w-lg max-h-[85vh] overflow-y-auto",
            "rounded-lg p-6 shadow-2xl corner-cut focus:outline-none"
          )}
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {title && (
            <Dialog.Title
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              {title}
            </Dialog.Title>
          )}
          {children}
          <Dialog.Close
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            style={{ color: "var(--text-dim)" }}
            aria-label="Close"
          >
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
