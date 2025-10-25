'use client';

import { useEffect, useState } from 'react';
import { usePublicClient, useChainId, useChains } from 'wagmi';
import { 
  getAutomationStats, 
  isAutomationEnabled,
  getAutomationUIUrl,
  listenToAutomationEvents,
  type AutomationStats 
} from '@/lib/automation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Activity, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export function AutomationStatus() {
  const publicClient = usePublicClient();
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find(c => c.id === chainId);
  const [stats, setStats] = useState<AutomationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    if (!chain || !publicClient) return;
    if (!isAutomationEnabled(chain.id)) {
      setLoading(false);
      return;
    }

    // Load initial stats
    loadStats();

    // Listen to automation events
    const cleanup = listenToAutomationEvents(publicClient, chain.id, {
      onVaultDistributed: () => {
        loadStats();
      },
      onUpkeepPerformed: () => {
        loadStats();
      },
    });

    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);

    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [chain, publicClient]);

  const loadStats = async () => {
    if (!chain || !publicClient) return;
    
    try {
      const data = await getAutomationStats(publicClient, chain.id);
      setStats(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading automation stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!chain || !isAutomationEnabled(chain.id)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Chainlink Automation
          </CardTitle>
          <CardDescription>
            Automatic vault distribution monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Chainlink Automation is not available on this network
            </p>
            <p className="text-xs text-muted-foreground">
              Switch to Ethereum, Polygon, or other supported networks
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 animate-pulse" />
            Chainlink Automation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            <p className="text-sm text-muted-foreground mt-4">Loading automation status...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Chainlink Automation
              <Badge variant="outline" className="ml-2">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Active
              </Badge>
            </CardTitle>
            <CardDescription>
              Monitoring all vaults for automatic distribution
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(getAutomationUIUrl(chain.id), '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Chainlink
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Vaults */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                Total Vaults
              </div>
              <div className="text-2xl font-bold">{stats.totalVaults}</div>
            </div>

            {/* Active Vaults */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Active
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {stats.activeVaults}
              </div>
            </div>

            {/* Ready for Distribution */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                Ready
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {stats.readyVaults}
              </div>
            </div>

            {/* Executed */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                Executed
              </div>
              <div className="text-2xl font-bold text-green-600">
                {stats.executedVaults}
              </div>
            </div>
          </div>
        )}

        {/* Status Info */}
        <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Monitoring Active
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Update</span>
            <span className="font-mono text-xs">
              {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Network</span>
            <span className="font-medium">{chain.name}</span>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-3">
            <Activity className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900">
                Fully Automated Distribution
              </p>
              <p className="text-xs text-blue-700">
                Chainlink Automation monitors all vaults 24/7. When countdown reaches 0, 
                funds are automatically distributed to heirs. No manual intervention needed!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
