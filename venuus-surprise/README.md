# 💝 مفاجأة Venuus - موقع سري من Riven

موقع ويب خاص ومفاجأة لـ **Venuus** من **Riven**، مصمم بتجربة بصرية وعاطفية "هرباااانة" مع لمسات فانتازية وسينمائية.

## ✨ المميزات

### 🔐 الحماية والأمان
- صفحة دخول محمية بكود سري (VRM1)
- التحقق من الكود على السيرفر (وليس الكلاينت)
- الموقع غير مفهرس في محركات البحث

### 🎨 التجربة البصرية
- تصميم فانتازي-سينمائي مع ألوان داكنة (أسود/كحلي) وتباينات ذهبية/بورغندي
- أنيميشن سلسة باستخدام Framer Motion
- تأثيرات ضوئية وconfetti
- خطوط عربية جميلة (Amiri, Tajawal, Dancing Script)
- تصميم responsive يعمل على جميع الأجهزة

### 📱 الأقسام الرئيسية

1. **صفحة الدخول** 🔑
   - حقل لإدخال الكود السري
   - أنيميشن مفتاح متحرك
   - تأثيرات جزيئات في الخلفية

2. **Hero Section** 🌟
   - اسم Venuus بخط handwritten مع تأثير glow
   - confetti احتفالي عند الدخول
   - رسالة ترحيبية من Riven

3. **Timeline** 📅
   - شريط زمني للحظات المشتركة
   - كل حدث يفتح modal مع تفاصيل أكثر
   - تصميم تفاعلي وجذاب

4. **غرفة المفاجآت** 🎁
   - **رسالة صوتية**: مقطع صوتي من Riven (يمكن إضافته)
   - **لعبة صغيرة**: "خبّي الهدية" - لعبة تفاعلية
   - **رسالة خاصة**: رسالة طويلة بتأثير typewriter

5. **الهدية الرقمية** 🎨
   - wallpaper قابل للتحميل باسم Venuus
   - يتم إنشاؤه تلقائياً عند الضغط
   - تأثير confetti عند التحميل

6. **كتاب الزوار** 📖
   - نموذج لإضافة رسائل
   - عرض جميع الرسائل
   - تخزين في ملف JSON

7. **شاشة الوداع** 👋
   - رسالة وداع جميلة
   - Easter egg: اضغط 3 مرات على اسم Riven
   - confetti نهائي

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+ أو أحدث
- pnpm (أو npm/yarn)

### خطوات التشغيل

1. **تثبيت المكتبات**
```bash
cd venuus-surprise
pnpm install
```

2. **تشغيل المشروع في وضع التطوير**
```bash
pnpm dev
```

الموقع سيعمل على: `http://localhost:3000`

3. **بناء المشروع للإنتاج**
```bash
pnpm build
```

4. **تشغيل النسخة المبنية**
```bash
pnpm start
```

## 🎯 التخصيص والتهيئة

### 1. تغيير الكود السري
افتح ملف `app/api/verify/route.ts` وغيّر القيمة:
```typescript
const SECRET_CODE = 'VRM1'; // غيّر هذا الكود
```

### 2. تخصيص Timeline
افتح ملف `app/components/Timeline.tsx` وعدّل المصفوفة `timelineEvents`:
```typescript
const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: '2024',
    title: 'اللقاء الأول',
    description: 'اليوم اللي بدات فيه القصة...',
    details: 'النص الكامل هنا...',
  },
  // أضف المزيد من الأحداث
];
```

### 3. إضافة رسالة صوتية
1. ضع ملف الصوت في مجلد `public/` باسم `audio.mp3`
2. افتح `app/components/SurpriseRoom.tsx`
3. أضف الكود التالي في قسم الصوت:
```typescript
const audioRef = useRef<HTMLAudioElement>(null);

// في JSX:
<audio ref={audioRef} src="/audio.mp3" />
```

### 4. تخصيص الرسالة الخاصة
افتح `app/components/SurpriseRoom.tsx` وعدّل متغير `fullLetter`:
```typescript
const fullLetter = `عزيزتي Venuus،
رسالتك الخاصة هنا...
`;
```

### 5. إضافة صور للـ Timeline
1. ضع الصور في مجلد `public/images/`
2. أضف خاصية `image` في `timelineEvents`:
```typescript
{
  id: 1,
  year: '2024',
  title: 'اللقاء الأول',
  image: '/images/photo1.jpg', // أضف هذا السطر
  // ...
}
```

## 📦 النشر على Vercel

1. **ادفع الكود إلى GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. **اربط مع Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - اضغط "New Project"
   - اختر المستودع
   - اضغط "Deploy"

3. **الموقع سيكون جاهز في دقائق!** 🎉

## 🎨 التقنيات المستخدمة

- **Next.js 16** - إطار React للويب
- **TypeScript** - للأمان والجودة
- **Tailwind CSS** - للتصميم السريع والجميل
- **Framer Motion** - للأنيميشن السلسة
- **Canvas Confetti** - لتأثيرات الاحتفال
- **Google Fonts** - للخطوط العربية الجميلة

## 📁 هيكل المشروع

```
venuus-surprise/
├── app/
│   ├── api/
│   │   ├── verify/route.ts      # API للتحقق من الكود
│   │   └── messages/route.ts    # API لتخزين الرسائل
│   ├── components/
│   │   ├── LoginPage.tsx        # صفحة الدخول
│   │   ├── HeroSection.tsx      # القسم الرئيسي
│   │   ├── Timeline.tsx         # الشريط الزمني
│   │   ├── SurpriseRoom.tsx     # غرفة المفاجآت
│   │   ├── DigitalGift.tsx      # الهدية الرقمية
│   │   ├── GuestBook.tsx        # كتاب الزوار
│   │   └── FarewellSection.tsx  # شاشة الوداع
│   ├── globals.css              # الستايل العام
│   ├── layout.tsx               # Layout الرئيسي
│   └── page.tsx                 # الصفحة الرئيسية
├── data/
│   └── messages.json            # تخزين الرسائل
├── public/                      # الملفات العامة (صور، صوت)
└── README.md                    # هذا الملف
```

## 🔒 الأمان والخصوصية

- ✅ الكود السري يُتحقق منه على السيرفر فقط
- ✅ الموقع غير مفهرس في محركات البحث (`noindex, nofollow`)
- ✅ لا يوجد تتبع أو analytics
- ✅ جميع البيانات محلية (في ملف JSON)

## 💡 نصائح

1. **للحفاظ على السرية**: لا تشارك الكود VRM1 إلا مع Venuus
2. **للتخصيص**: جميع النصوص والألوان قابلة للتعديل
3. **للنشر**: Vercel مجاني وسهل الاستخدام
4. **للدعم الفني**: راجع [Next.js Docs](https://nextjs.org/docs)

## 🎁 Easter Eggs

- اضغط 3 مرات على اسم "Riven" في شاشة الوداع لرسالة سرية
- جميع الأنيميشن تتفاعل مع حركة الماوس
- كل قسم له تأثيرات خاصة عند الدخول

## 📝 ملاحظات مهمة

1. **الرسائل**: تُخزن في `data/messages.json` - احتفظ بنسخة احتياطية
2. **الصور**: ضع جميع الصور في مجلد `public/`
3. **الخطوط**: تُحمّل من Google Fonts تلقائياً
4. **الأداء**: الموقع محسّن للسرعة والأداء

## 💝 رسالة من المطور

هذا الموقع صُمم بكل حب واهتمام ليكون مفاجأة خاصة ومميزة.
كل تفصيل صغير تم التفكير فيه بعناية لخلق تجربة لا تُنسى.

**من Riven إلى Venuus - عيد ميلاد سعيد! 🎉**

---

Made with 💝 by Riven | Powered by Next.js & Vercel
