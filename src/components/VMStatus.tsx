'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Monitor, Play, Square, Trash2, RefreshCw, Cpu, HardDrive, Wifi, Eraser } from 'lucide-react';
import { getVMList } from '@/lib/api';

const API_BASE_URL = 'http://localhost:8001';

interface VMStatusProps {
  onRefresh?: () => void;
}

interface LocalVM {
  name: string;
  state: string;
  ipv4: string[];
  cpus: string;
  memory: string;
  disk: string;
  release: string;
}

export default function VMStatus({ onRefresh: _onRefresh }: VMStatusProps) {
  const [vms, setVms] = useState<LocalVM[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);

  const fetchVMs = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastFetch < 2000) return;

    setLoading(true);
    setError(null);
    setLastFetch(now);

    try {
      const data = await getVMList();

      if (!data.success) {
        throw new Error(data.error || 'VM listesi alınamadı');
      }

      const parsedVMs: LocalVM[] = data.vms.map((vm: any) => ({
        name: vm.name || 'Bilinmeyen',
        state: (vm.state || 'Bilinmeyen').toLowerCase(),
        ipv4: Array.isArray(vm.ipv4)
          ? vm.ipv4.filter((ip: string) => ip)
          : vm.ipv4 ? [vm.ipv4] : [],
        cpus: vm.cpus || vm.disk_usage?.split('/')?.[0]?.trim() || 'N/A',
        memory: vm.memory || vm.memory_usage || 'N/A',
        disk: vm.disk || vm.disk_usage || 'N/A',
        release: vm.release || 'N/A'
      }));

      setVms(parsedVMs);
    } catch (err: any) {
      let errorMessage = err.message || 'Bilinmeyen hata';

      if (errorMessage.includes('multipass socket')) {
        setError(`⚠️ Multipass servisi çalışmıyor!

Çözüm:
1. PowerShell'i YÖNETİCİ olarak açın
2. Bu komutu çalıştırın: net start multipass
3. Ardından bu sayfayı yenileyin

Alternatif: Bilgisayarınızı yeniden başlatın.`);
        setVms([]);
        return;
      }

      if (errorMessage === 'Failed to fetch') {
        setError(`🔌 Backend sunucusu çalışmıyor!

API sunucusu (port 8000) erişilebilir değil.
Terminal'de şu komutu çalıştırın:
uvicorn api_server:app --reload --host 0.0.0.0 --port 8000`);
        setVms([]);
        return;
      }

      setError(`VM listesi alınamadı: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [lastFetch]);

  useEffect(() => {
    fetchVMs(true);
    const handleRefresh = () => fetchVMs(true);
    window.addEventListener('refreshVMs', handleRefresh);

    return () => window.removeEventListener('refreshVMs', handleRefresh);
  }, [fetchVMs]);

  const getStateColor = (state: string) => {
    switch (state) {
      case 'running': return 'text-green-600 bg-green-100';
      case 'stopped': return 'text-red-600 bg-red-100';
      case 'starting': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStateIcon = (state: string) => {
    switch (state) {
      case 'running': return <Play className="w-4 h-4 text-green-600" />;
      case 'stopped': return <Square className="w-4 h-4 text-red-600" />;
      default: return <Monitor className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleVMAction = async (vmName: string, action: 'start' | 'stop' | 'delete') => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/vms/${action}/${vmName}`;
      let method = action === 'delete' ? 'DELETE' : 'POST';

      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' } });

      if (!response.ok) throw new Error(`${action} işlemi başarısız`);

      await response.json();
      await fetchVMs(true);
    } catch (err) {
      setError(`VM ${action} işlemi başarısız oldu`);
    } finally {
      setLoading(false);
    }
  };

  const handlePurge = async () => {
    if (!confirm("Tüm silinmiş VM'leri kalıcı olarak temizlemek istediğinizden emin misiniz?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/vms/purge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Temizleme işlemi başarısız');

      await fetchVMs(true);
    } catch (err) {
      setError('VM temizleme işlemi başarısız oldu');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          Sanal Makineler ({vms.length})
        </h3>
        <div className="flex gap-2">
          <button onClick={handlePurge} disabled={loading}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 disabled:opacity-50">
            <Eraser className="w-4 h-4" />
            Temizle
          </button>
          <button onClick={() => fetchVMs(true)} disabled={loading}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span className="ml-2">VM'ler yükleniyor...</span>
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <div className="bg-red-50 border border-red-200 rounded p-4 text-left text-red-700 whitespace-pre-line max-w-2xl mx-auto">
              {error}
            </div>
            <button onClick={() => fetchVMs(true)}
              className="mt-4 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100">
              Tekrar Dene
            </button>
          </div>
        ) : vms.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Monitor className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Henüz VM oluşturulmamış</p>
            <p className="text-sm">Chat'e "Ubuntu VM oluştur" yazarak başlayabilirsiniz</p>
          </div>
        ) : (
          <div className="space-y-3">
            {vms.map((vm) => (
              <div key={vm.name} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    {getStateIcon(vm.state)}
                    <h4 className="font-medium text-gray-900">{vm.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStateColor(vm.state)}`}>
                      {vm.state}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {vm.state === 'stopped' && (
                      <button onClick={() => handleVMAction(vm.name, 'start')} disabled={loading}
                        className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50" title="Başlat">
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    {vm.state === 'running' && (
                      <button onClick={() => handleVMAction(vm.name, 'stop')} disabled={loading}
                        className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50" title="Durdur">
                        <Square className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => confirm(`${vm.name} VM'ini silmek istediğinizden emin misiniz?`) && handleVMAction(vm.name, 'delete')}
                      disabled={loading} className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50" title="Sil">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><Wifi className="w-4 h-4" /><span>IP: {vm.ipv4?.[0] || 'N/A'}</span></div>
                  <div className="flex items-center gap-2"><Cpu className="w-4 h-4" /><span>CPU: {vm.cpus}</span></div>
                  <div className="flex items-center gap-2"><HardDrive className="w-4 h-4" /><span>RAM: {vm.memory}</span></div>
                  <div className="flex items-center gap-2"><HardDrive className="w-4 h-4" /><span>Disk: {vm.disk}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
