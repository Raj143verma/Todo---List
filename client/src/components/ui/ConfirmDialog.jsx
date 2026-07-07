import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm action?',
  description = 'This operation cannot be undone. Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center p-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/25 text-danger mb-4">
          <AlertTriangle className="h-6 w-6" />
        </div>
        
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
          {title}
        </h3>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-[280px] leading-relaxed">
          {description}
        </p>
        
        <div className="flex gap-3 w-full">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
            size="sm"
          >
            {cancelText}
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={onConfirm}
            loading={loading}
            size="sm"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
