import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
export default function DemoRadixDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="border px-4 py-2 rounded bg-blue-100">Open Radix Dialog</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded shadow -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title>Radix Dialog</Dialog.Title>
          <Dialog.Description>This is a Radix UI dialog.</Dialog.Description>
          <button onClick={()=>setOpen(false)} className="mt-4 px-4 py-2 bg-blue-200 rounded">Close</button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
