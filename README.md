# Multipass VM Yönetim Frontend

Bu frontend, Mistral model'inin multipass dokümantasyonu ile eğitilmiş kod üretim yeteneklerini kullanır. Model, doğal dil komutlarını multipass CLI komutlarına çevirir ve proxy_agent.py üzerinden işleme alır.

## Özellikler

- Doğal dil ile VM komutları verilebilir.
- Streaming yanıtlar ile anlık etkileşim.
- Yan panel'de VM'lerinizi görüntülenebilir ve yönetilebilir.
- Mistral model'i ile doğal dil komutlarını anlama.
- Tailwind CSS ile tasarlanmış responsive arayüz.

## Frontend Mimarisi

```
Frontend (Next.js) → api_server.py → Ollama Mistral Model
                                            ↓
                                         Multipass
```

## Gereksinimler

 1.  Node.js 18+ ve npm
 2.  Python Backend:

       `api_server.py` (Port: 8000)
 3.  Ollama + Mistral model
 4.  Multipass kurulu ve çalışır durumda

## Kurulum ve Çalıştırma

### 1. Backend'i Başlatın

```bash
# Terminal: API Server'ı başlat
cd ..
python api_server.py
```

### 2. Frontend'i Başlatın

- `npm install`

- `npm run dev`

Frontend: http://localhost:3000 adresinde çalışacak.

## Kullanım

### Temel Komutlar

- "VM listele" → Mevcut VM'leri görülür.
- "Ubuntu VM oluştur" → Yeni Ubuntu VM oluşturur.
- "2GB RAM ile VM oluştur" → Özel konfigürasyonla VM oluşturulur.

### Örnek Konuşmalar

```
Kullanıcı: "deneme adında 4GB RAM ve 2GB disk ile VM oluştur."
Asistan: "deneme-vm oluşturuluyor..."
         "deneme-vm oluşturuldu!"

 Kullanıcı: "VM'leri listele"  
 Asistan: "Mevcut sanal makineleriniz:
         - deneme-vm: running, IP: 192.168.64.2"
```

## Arayüz Özellikleri

### Sol Panel
- **VM Listesi**: Tüm sanal makinelerinizi görün
- **Durum İkonları**: Running, Stopped, Starting
- **VM Bilgileri**: IP, RAM, CPU, Disk bilgileri
- **Hızlı Aksiyonlar**: Başlat, Durdur, Sil butonları

### Chat Alanı  
- **VM İşlem Durumu**: Oluşturma/güncelleme progress'i
- **Hızlı Komutlar**: Önceden tanımlı butonlar


## Konfigürasyon

### Backend URL'leri
```javascript
const OLLAMA_URL = "http://localhost:11434";

const API_URL = "http://localhost:8000";
```

## Sorun Giderme

### "API hatası" mesajı alıyorum
- Backend'lerin çalıştığından emin olun
- Port'ların müsait olduğunu kontrol edin (8000, 11434)

### VM işlemleri çalışmıyor
- Multipass'ın kurulu ve PATH'de olduğunu kontrol edin
- `multipass --version` komutu ile test edin