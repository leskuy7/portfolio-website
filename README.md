# Kişisel Portfolyo Web Sitesi

Node.js, Express ve Bootstrap 5 kullanılarak hazırlanmış kişisel portfolyo web sitesi.

## Özellikler

- **Responsive Tasarım**: Bootstrap 5 ile tüm cihazlarda uyumlu.
- **Modern Arayüz**: Şık ve profesyonel görünüm.
- **Kolay Özelleştirme**: `index.ejs` ve `style.css` dosyaları üzerinden kolayca düzenlenebilir.

## Kurulum ve Çalıştırma

Bu projeyi yerel bilgisayarınızda çalıştırmak için **Node.js** yüklü olmalıdır.

1. **Projeyi İndirin**: Bu klasörü bilgisayarınıza kaydedin.
2. **Terminali Açın**: Proje klasörünün içinde bir terminal veya komut satırı açın.
3. **Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```
4. **Sunucuyu Başlatın**:
   ```bash
   npm start
   ```
5. **Tarayıcıda Açın**:
   Tarayıcınızda `http://localhost:3000` adresine gidin.

## Dosya Yapısı

- `server.js`: Sunucu ayarları ve rotalar.
- `views/index.ejs`: Ana sayfa tasarımı (HTML içeriği burada).
- `public/css/style.css`: Özelleştirilmiş stil dosyası.
- `package.json`: Proje bağımlılıkları.

## Düzenleme

- Adınızı ve diğer bilgilerinizi değiştirmek için `views/index.ejs` dosyasını açıp ilgili metinleri düzenleyebilirsiniz.
- Tasarımı değiştirmek için `public/css/style.css` dosyasına yeni kurallar ekleyebilirsiniz.
