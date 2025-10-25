'use client';

import { useState } from 'react';
import { useWalletClient, useChainId } from 'wagmi';
// import { manualExecuteVault } from '@/lib/automation';
import { Button } from '@/components/ui/button';
// import { 
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
import { Loader2, Zap, CheckCircle2 } from 'lucide-react';
// import { toast } from 'sonner';

interface ManualExecuteButtonProps {
  vaultAddress: string;
  isReady: boolean;
  onSuccess?: () => void;
}

export function ManualExecuteButton({ 
  vaultAddress, 
  isReady,
  onSuccess 
}: ManualExecuteButtonProps) {
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExecute = async () => {
    if (!walletClient || !chainId) {
      alert('Please connect your wallet');
      return;
    }

    setLoading(true);
    try {
      // const tx = await manualExecuteVault(walletClient as any, chainId, vaultAddress);
      // await tx.wait();
      alert('Manual execute feature temporarily disabled');
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error executing distribution:', error);
      alert('Failed to execute distribution');
    } finally {
      setLoading(false);
    }
  };

  if (!isReady) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Zap className="h-4 w-4 mr-2" />
        Not Ready
      </Button>
    );
  }

  return (
    <Button 
      variant="default" 
      size="sm"
      onClick={handleExecute}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Executing...
        </>
      ) : (
        <>
          <Zap className="h-4 w-4 mr-2" />
          Execute Now
        </>
      )}
    </Button>
  );
}
