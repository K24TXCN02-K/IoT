# ESP32 IoT Dashboard - React + Tailwind CSS + Dark Mode

Dashboard React dành cho hệ thống ESP32 hiện tại:

- DHT22: nhiệt độ + độ ẩm
- Cảm biến ánh sáng digital: DARK / BRIGHT
- Relay 1 / Relay 2
- Firebase Realtime Database
- Biểu đồ lịch sử bằng Recharts
- Tailwind CSS
- Dark mode (class-based, lưu lựa chọn vào localStorage)
- Bộ lọc thời gian: 30 phút / 1 giờ / 6 giờ / 24 giờ / tất cả

## 1. Cài đặt

```bash
npm install
```

## 2. Cấu hình Firebase

Project đã có URL mặc định:

```text
https://esp32-sensor-dev-default-rtdb.asia-southeast1.firebasedatabase.app
```

Nếu muốn cấu hình bằng biến môi trường:

```bash
cp .env.example .env
```

Sau đó sửa `VITE_FIREBASE_DATABASE_URL` nếu cần.

## 3. Chạy local

```bash
npm run dev
```

Mở địa chỉ Vite hiển thị, thường là:

```text
http://localhost:5173
```

## 4. Build production

```bash
npm run build
```

Output nằm trong thư mục `dist/`.

## 5. Cấu trúc dữ liệu Firebase

Dashboard đọc:

```text
/sensor/current
/sensor/history
```

Ví dụ `current`:

```json
{
  "datetime": "29/09/2026 11:49:34",
  "humidity": 66.4,
  "lightDigital": 1,
  "lightState": "DARK",
  "relay1": false,
  "relay2": false,
  "temperature": 31.6,
  "timestamp": 1790657374
}
```

## 6. Firebase Rules

Với cấu hình demo hiện tại, web phải có quyền đọc `/sensor`.

Không nên để public write cho hệ thống thực tế. Sau khi demo, nên chuyển sang Firebase Authentication hoặc rule chặt hơn.

## 7. Dark mode

Nút mặt trăng/mặt trời ở góc phải dùng Tailwind `darkMode: 'class'`. Lựa chọn được lưu ở `localStorage`.
