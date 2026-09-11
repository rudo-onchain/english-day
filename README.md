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

### ตั้งค่าครั้งแรก

1. สร้างโปรเจกต์บน Railway แล้ว deploy ครั้งแรก (จาก GitHub หรือ `railway up`)
2. Generate domain ใน Railway แล้วแชร์ลิงก์ให้เพื่อนๆ
3. สร้าง **Project Token** ใน Railway  
   Project → Settings → Tokens → New Token (เลือก environment เช่น `production`)
4. ใส่ token ใน GitHub Secrets ของ repo นี้  
   Settings → Secrets and variables → Actions → New repository secret  
   - Name: `RAILWAY_TOKEN`  
   - Value: token จาก Railway

### Deploy ด้วย tag (GitHub Actions)

ติด tag แล้ว push — workflow จะ deploy ให้อัตโนมัติ

```bash
git tag v1.0.0
git push origin v1.0.0
```

รองรับ pattern `v*` เช่น `v1.0.0`, `v1.1.0`

ดูสถานะได้ที่ GitHub → Actions → **Deploy to Railway**

หรือกด **Run workflow** ด้วยมือจากหน้า Actions ได้ (workflow_dispatch)

## เกมที่มีอยู่

| ไฟล์ | ชื่อที่แสดงบน hub |
|------|-------------------|
| `tile-reveal-mystery.html` | Tile Reveal Mystery |
