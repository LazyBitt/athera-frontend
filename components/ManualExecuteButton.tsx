'use client';

import { useState } from 'react';
import { useSigner, useNetwork } from 'wagmi';
import { manualExecuteVault } from '@/lib/automation';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, Zap, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

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
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExecute = async () => {
    if (!signer || !chain) {
      toast.error('Please connect your wallet');
      return;
    }

    setLoading(true);
    try {
      const tx = await manualExecuteVault(signer, chain.id, vaultAddress);
      
      toast.loading('Executing distribution...', { id: 'execute' });
      
      await tx.wait();
      
      toast.success('Distribution executed successfully!', { 
        id: 'execute',
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
      
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error executing distribution:', error);
      
      let errorMessage = 'Failed to execute distribution';
      if (error.message?.includes('Vault not ready')) {
        errorMessage = 'Vault is not ready for distribution yet';
      } else if (error.message?.includes('Already distributed')) {
        errorMessage = 'Vault has already been distributed';
      }
      
      toast.error(errorMessage, { id: 'execute' });
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="sm">
          <Zap className="h-4 w-4 mr-2" />
          Execute Now
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Execute Distribution?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              This will immediately distribute the vault funds to all beneficiaries 
              according to their allocated percentages.
            </p>
            <p className="font-medium text-foreground">
              This action cannot be undone.
            </p>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs font-mono break-all">
                Vault: {vaultAddress}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleExecute();
            }}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Execute Distribution
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
