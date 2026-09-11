# English Day Games

Hub สำหรับเกมฝึกภาษาอังกฤษในงาน English Day ของบริษัท  
เปิดลิงก์เดียว แล้วเลือกเล่นเกมได้หลายเกม

## GitHub description

```
English Day mini-games hub — drop HTML games in, share one Railway link with the team
```

## โครงโปรเจกต์

```
english-day/
├── server.js                 # static server + auto game list
├── package.json
├── railway.toml
└── public/
    ├── index.html            # หน้าเลือกเกม
    └── games/
        └── *.html            # เกมแต่ละไฟล์
```

## รันในเครื่อง

ต้องมี Node.js 18+

```bash
npm start
```

เปิด [http://localhost:3000](http://localhost:3000)

## เพิ่มเกมใหม่

1. วางไฟล์ HTML ลงใน `public/games/`  
   ตัวอย่าง: `public/games/word-guess.html`
2. Deploy / รันใหม่
3. หน้าแรกจะโชว์เกมใหม่อัตโนมัติ (ชื่อมาจากชื่อไฟล์)

ถ้าเกมมีรูป เสียง หรือ assets อื่นๆ ใส่ใน `public/` แล้วอ้าง path จาก HTML ได้เลย

## Deploy บน Railway

โปรเจกต์พร้อม deploy ด้วย `npm start` อยู่แล้ว

1. สร้างโปรเจกต์ใหม่บน Railway จาก repo นี้
2. Railway จะรัน `npm start` ตาม `railway.toml`
3. Generate domain แล้วแชร์ลิงก์ให้เพื่อนๆ

## เกมที่มีอยู่

| ไฟล์ | ชื่อที่แสดงบน hub |
|------|-------------------|
| `tile-reveal-mystery.html` | Tile Reveal Mystery |
