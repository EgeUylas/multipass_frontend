<<<<<<< HEAD
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Monitor, Play, Square, Trash2, RefreshCw, Cpu, HardDrive, Wifi, Eraser } from 'lucide-react';
// import { VMInfo, getVMList } from '@/lib/api'; // VMInfo burada kullanılmıyor, bu satırı tuttum ama VMInfo'yu kullanmadığımızı belirttim
import { getVMList } from '@/lib/api'; // getVMList kullanılıyor
=======
import React, { useState, useEffect, useCallback } from 'react';
import { Monitor, Play, Square, Trash2, RefreshCw, Cpu, HardDrive, Wifi, Eraser } from 'lucide-react';
import { VMInfo, getVMList } from '@/lib/api';
>>>>>>> 5fcaa1a (Initial frontend commit)

// API base URL
const API_BASE_URL = 'http://localhost:8001';

interface VMStatusProps {
  onRefresh?: () => void;
}

interface LocalVM {
  name: string;
  state: string;
  ipv4: string[];
<<<<<<< HEAD
  cpus: string;
  memory: string;
  disk: string;
=======
  cpus: string | null;
  memory: string | null;
  disk: string | null;
>>>>>>> 5fcaa1a (Initial frontend commit)
  release: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function VMStatus({ onRefresh: _onRefresh }: VMStatusProps) {
  const [vms, setVms] = useState<LocalVM[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);

<<<<<<< HEAD
  // fetchVMs artık `fetchVMs` bağımlılığını içermiyor, bu zaten kendisi
  // eslint-disable-next-line react-hooks/exhaustive-deps
=======
>>>>>>> 5fcaa1a (Initial frontend commit)
  const fetchVMs = useCallback(async (force = false) => {
    // Performans iyileştirmesi: 2 saniyede bir kere çağır
    const now = Date.now();
    if (!force && now - lastFetch < 2000) {
      console.log('fetchVMs skip edildi - çok yakın çağrı');
      return;
    }
<<<<<<< HEAD

=======
    
>>>>>>> 5fcaa1a (Initial frontend commit)
    console.log('fetchVMs başlatıldı');
    setLoading(true);
    setError(null);
    setLastFetch(now);
<<<<<<< HEAD

=======
    
>>>>>>> 5fcaa1a (Initial frontend commit)
    try {
      // API yardımcı fonksiyonunu kullanarak VM listesini al
      console.log('VM listesi alınıyor...');
      const data = await getVMList();
<<<<<<< HEAD

=======
      
>>>>>>> 5fcaa1a (Initial frontend commit)
      if (!data.success) {
        throw new Error(data.error || 'VM listesi alınamadı');
      }
      console.log('VM List Response:', data);
<<<<<<< HEAD

      // VM listesini işle
      // Vercel çıktısındaki @typescript-eslint/no-explicit-any hatası buradaydı
      const parsedVMs: LocalVM[] = data.vms.map((vm: { // 'any' yerine daha spesifik bir tip kullanmaya çalışın
        state?: string;
        ipv4?: string[] | string;
        name?: string;
        cpus?: string;
        disk_usage?: string;
        memory?: string;
        memory_usage?: string;
        disk?: string;
        release?: string;
      }) => {
        // VM durumunu güvenli şekilde al
        const vmState = (vm.state || '').toString().toLowerCase() || 'Bilinmeyen';

        // IP adreslerini işle
        let ipAddresses: string[] = [];
        if (Array.isArray(vm.ipv4)) {
          ipAddresses = vm.ipv4.filter((ip: string) => ip && typeof ip === 'string'); // 'any' yerine 'string'
=======
      
      // VM listesini işle
      const parsedVMs: LocalVM[] = data.vms.map((vm: any) => {
        // VM durumunu güvenli şekilde al
        const vmState = (vm.state || '').toString().toLowerCase() || 'Bilinmeyen';
        
        // IP adreslerini işle
        let ipAddresses: string[] = [];
        if (Array.isArray(vm.ipv4)) {
          ipAddresses = vm.ipv4.filter((ip: any) => ip && typeof ip === 'string');
>>>>>>> 5fcaa1a (Initial frontend commit)
        } else if (vm.ipv4 && typeof vm.ipv4 === 'string') {
          ipAddresses = [vm.ipv4];
        }

        return {
          name: (vm.name || 'Bilinmeyen').toString(),
          state: vmState,
          ipv4: ipAddresses,
<<<<<<< HEAD
          cpus: (vm.cpus || vm.disk_usage?.split('/')?.[0]?.trim() || 'N/A').toString(),
          memory: (vm.memory || vm.memory_usage || 'N/A').toString(),
          disk: (vm.disk || vm.disk_usage || 'N/A').toString(),
          release: (vm.release || 'N/A').toString()
        };
      });

=======
          cpus: vm.cpus,
          memory: vm.memory,
          disk: vm.disk,
          release: (vm.release || 'N/A').toString()
        };
      });
      
>>>>>>> 5fcaa1a (Initial frontend commit)
      console.log('Parsed VMs:', parsedVMs);
      setVms(parsedVMs);
    } catch (err) {
      let errorMessage = 'Bilinmeyen hata';
<<<<<<< HEAD

      if (err instanceof Error) {
        errorMessage = err.message;

        // Multipass socket hatası kontrolü
        if (errorMessage.includes('cannot connect to the multipass socket') ||
          errorMessage.includes('socket')) {
=======
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // Multipass socket hatası kontrolü
        if (errorMessage.includes('cannot connect to the multipass socket') || 
            errorMessage.includes('socket')) {
>>>>>>> 5fcaa1a (Initial frontend commit)
          setError(`⚠️ Multipass servisi çalışmıyor!
          
Çözüm:
1. PowerShell'i YÖNETİCİ olarak açın
2. Bu komutu çalıştırın: net start multipass
3. Ardından bu sayfayı yenileyin

Alternatif: Bilgisayarınızı yeniden başlatın.`);
          setVms([]);
          setLoading(false);
          return;
        }
<<<<<<< HEAD

=======
        
>>>>>>> 5fcaa1a (Initial frontend commit)
        // API bağlantı hatası
        if (errorMessage === 'Failed to fetch') {
          setError(`🔌 Backend sunucusu çalışmıyor!
          
API sunucusu (port 8000) erişilebilir değil.
Terminal'de şu komutu çalıştırın:
uvicorn api_server:app --reload --host 0.0.0.0 --port 8000`);
          setVms([]);
          setLoading(false);
          return;
        }
      }
<<<<<<< HEAD

=======
      
>>>>>>> 5fcaa1a (Initial frontend commit)
      setError(`VM listesi alınamadı: ${errorMessage}`);
      console.error('VM Fetch Error:', err);
      setVms([]);
    } finally {
      console.log('fetchVMs tamamlandı, loading false yapılıyor');
      setLoading(false);
    }
<<<<<<< HEAD
  }, [lastFetch]); // useCallback bağımlılık dizisine lastFetch eklendi.
=======
  }, [lastFetch]); // Add dependencies here
>>>>>>> 5fcaa1a (Initial frontend commit)

  // Sayfa yüklendiğinde ve yenileme tetiklendiğinde VM listesini getir
  useEffect(() => {
    fetchVMs(true);
<<<<<<< HEAD

    // Yenileme event'ini dinle
    const handleRefresh = () => fetchVMs(true);
    window.addEventListener('refreshVMs', handleRefresh);

    return () => {
      window.removeEventListener('refreshVMs', handleRefresh);
    };
  }, [fetchVMs]); // 'fetchVMs' dependency'si eklendi, çünkü useCallback kullanılıyor.
=======
    
    // Yenileme event'ini dinle
    const handleRefresh = () => fetchVMs(true);
    window.addEventListener('refreshVMs', handleRefresh);
    
    return () => {
      window.removeEventListener('refreshVMs', handleRefresh);
    };
  }, []); // fetchVMs dependency'sini kaldırdık
>>>>>>> 5fcaa1a (Initial frontend commit)

  const getStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case 'running': return 'text-green-600 bg-green-100';
      case 'stopped': return 'text-red-600 bg-red-100';
      case 'starting': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStateIcon = (state: string) => {
    switch (state.toLowerCase()) {
      case 'running': return <Play className="w-4 h-4 text-green-600" />;
      case 'stopped': return <Square className="w-4 h-4 text-red-600" />;
      default: return <Monitor className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleVMAction = async (vmName: string, action: 'start' | 'stop' | 'delete') => {
    setLoading(true);
    try {
      let url = '';
      let method = 'POST';
<<<<<<< HEAD

=======
      
>>>>>>> 5fcaa1a (Initial frontend commit)
      switch (action) {
        case 'start':
          url = `${API_BASE_URL}/vms/start/${vmName}`;
          break;
        case 'stop':
          url = `${API_BASE_URL}/vms/stop/${vmName}`;
          break;
        case 'delete':
          url = `${API_BASE_URL}/vms/delete/${vmName}`;
          method = 'DELETE';
          break;
      }
<<<<<<< HEAD

=======
      
>>>>>>> 5fcaa1a (Initial frontend commit)
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' }
      });
<<<<<<< HEAD

      if (!response.ok) {
        throw new Error(`${action} işlemi başarısız`);
      }

      const result = await response.json();
      console.log(`${action} action result:`, result);

      // VM listesini yenile
      await fetchVMs(true);

=======
      
      if (!response.ok) {
        throw new Error(`${action} işlemi başarısız`);
      }
      
      const result = await response.json();
      console.log(`${action} action result:`, result);
      
      // VM listesini yenile
      fetchVMs(true);
      
>>>>>>> 5fcaa1a (Initial frontend commit)
    } catch (err) {
      console.error(`VM ${action} error:`, err);
      setError(`VM ${action} işlemi başarısız oldu`);
    } finally {
      setLoading(false);
    }
  };

  const handlePurge = async () => {
    if (!confirm('Tüm silinmiş VM\'leri kalıcı olarak temizlemek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/vms/purge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
<<<<<<< HEAD

      if (!response.ok) throw new Error('Temizleme işlemi başarısız');

      // Temizleme başarılı, VM listesini yenile
      await fetchVMs(true);

=======
      
      if (!response.ok) throw new Error('Temizleme işlemi başarısız');
      
      // Temizleme başarılı, VM listesini yenile
      await fetchVMs(true);
      
>>>>>>> 5fcaa1a (Initial frontend commit)
    } catch (err) {
      console.error('Purge error:', err);
      setError('VM temizleme işlemi başarısız oldu');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Sanal Makineler ({vms.length})
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePurge}
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 disabled:opacity-50"
<<<<<<< HEAD
              title="Silinmiş VM'leri kalıcı olarak temizle"
=======
              // eslint-disable-next-line react/no-unescaped-entities
              title={"Silinmiş VM'leri kalıcı olarak temizle"}
>>>>>>> 5fcaa1a (Initial frontend commit)
            >
              <Eraser className="w-4 h-4" />
              Temizle
            </button>
            <button
              onClick={() => fetchVMs(true)}
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Yenile
            </button>
          </div>
        </div>
      </div>
<<<<<<< HEAD

=======
      
>>>>>>> 5fcaa1a (Initial frontend commit)
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
<<<<<<< HEAD
            <span className="ml-2 text-gray-500">VM&apos;ler yükleniyor...</span>
=======
            <span className="ml-2 text-gray-500">VM'ler yükleniyor...</span>
>>>>>>> 5fcaa1a (Initial frontend commit)
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-red-700 whitespace-pre-line text-left">{error}</p>
            </div>
            <button
              onClick={() => fetchVMs(true)}
              className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 border border-red-200"
            >
              Tekrar Dene
            </button>
          </div>
        ) : vms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Monitor className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Henüz VM oluşturulmamış</p>
            <p className="text-sm">Chat&apos;e &quot;Ubuntu VM oluştur&quot; yazarak başlayabilirsiniz</p>
          </div>
        ) : (
          <div className="space-y-3">
            {vms.map((vm) => (
              <div key={vm.name} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStateIcon(vm.state)}
                    <h4 className="font-medium text-gray-900">{vm.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStateColor(vm.state)}`}>
                      {vm.state}
                    </span>
                  </div>
<<<<<<< HEAD

                    <div className="flex gap-1">
                     {vm.state === 'stopped' && (
                       <button
                          onClick={() => handleVMAction(vm.name, 'start')}
                          disabled={loading}
                          className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50"
                          title="Başlat"
                       >
                          <Play className="w-4 h-4" />
                       </button>
                     )}
                     {vm.state === 'running' && (
                       <button
                          onClick={() => handleVMAction(vm.name, 'stop')}
                          disabled={loading}
                          className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                          title="Durdur"
                       >
                          <Square className="w-4 h-4" />
                       </button>
                     )}
                     <button
                        onClick={() => {
                          if (confirm(`${vm.name} VM'ini silmek istediğinizden emin misiniz?`)) { // Apostrof düzeltildi
                             handleVMAction(vm.name, 'delete');
                          }
                        }}
                        disabled={loading}
                        className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                        title="Sil"
                     >
                        <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                   <div className="flex items-center gap-2">
                     <Wifi className="w-4 h-4" />
                     <span>IP: {vm.ipv4?.[0] || 'N/A'}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Cpu className="w-4 h-4" />
                     <span>CPU: {vm.cpus || 'N/A'}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <HardDrive className="w-4 h-4" />
                     <span>RAM: {vm.memory || 'N/A'}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <HardDrive className="w-4 h-4" />
                     <span>Disk: {vm.disk || 'N/A'}</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
}
=======
                  
                                     <div className="flex gap-1">
                     {vm.state === 'stopped' && (
                       <button 
                         onClick={() => handleVMAction(vm.name, 'start')}
                         disabled={loading}
                         className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50" 
                         title="Başlat"
                       >
                         <Play className="w-4 h-4" />
                       </button>
                     )}
                     {vm.state === 'running' && (
                       <button 
                         onClick={() => handleVMAction(vm.name, 'stop')}
                         disabled={loading}
                         className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50" 
                         title="Durdur"
                       >
                         <Square className="w-4 h-4" />
                       </button>
                     )}
                     <button 
                       onClick={() => {
                         if (confirm(`${vm.name} VM'ini silmek istediğinizden emin misiniz?`)) {
                           handleVMAction(vm.name, 'delete');
                         }
                       }}
                       disabled={loading}
                       className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50" 
                       title="Sil"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    <span>IP: {vm.ipv4?.[0] || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    <span>CPU: {vm.cpus && vm.cpus !== '-' ? vm.cpus : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    <span>RAM: {vm.memory && vm.memory !== '-' ? vm.memory : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    <span>Disk: {vm.disk && vm.disk !== '-' ? vm.disk : 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
>>>>>>> 5fcaa1a (Initial frontend commit)
