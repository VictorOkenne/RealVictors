# Quick Reference - Renamed Assets

## How to Use Renamed Assets

All assets in the `Icons/` and `Images/` folders have been renamed to use **lowercase** and **hyphens** instead of spaces.

---

## Pattern

```
Old:  "Rectangle 16.png"
New:  "rectangle-16.png"

Old:  "Line 15.svg"
New:  "line-15.svg"
```

---

## Usage in Code

### Image Assets
```typescript
// ✅ Correct
require('../../assets/HomePage/Images/rectangle-16.png')
require('../../assets/HomePage/Images/rectangle-16-1.png')
require('../../assets/HomePage/Images/fb74f-17210207852593-1920-1.png')

// ❌ Wrong (old names with spaces)
require('../../assets/HomePage/Images/Rectangle 16.png')
```

### Icon Assets
```typescript
// ✅ Correct
require('../../assets/HomePage/Icons/line-15.svg')
require('../../assets/HomePage/Icons/ellipse-21.svg')
require('../../assets/HomePage/Icons/frame-162.svg')

// ❌ Wrong (old names with spaces)
require('../../assets/HomePage/Icons/Line 15.svg')
```

---

## Complete File List

### Images (`src/assets/HomePage/Images/`)
- `rectangle-16.png` ← Social post image
- `rectangle-16-1.png` ← Social post image
- `rectangle-16-2.png` ← Social post image
- `rectangle-14.png`
- `rectangle-12.png`
- `rectangle-11.png`
- `rectangle-10.png`
- `fb74f-17210207852593-1920-1.png`

### Icons (`src/assets/HomePage/Icons/`)
- `line-15.svg`
- `ellipse-11.svg`
- `ellipse-11-1.svg`
- `ellipse-13.svg`
- `ellipse-14.svg`
- `ellipse-15.svg`
- `ellipse-16.svg`
- `ellipse-17.svg`
- `ellipse-18.svg`
- `ellipse-21.svg`
- `frame-162.svg`

---

## Already Using Local Assets

These widgets are already configured to use local assets:

✅ `HomeHeader.tsx` - Search, chat, notification icons
✅ `SocialPost.tsx` - Like, comment, share, save icons  
✅ `UpcomingGameCard.tsx` - Location icon
✅ `BottomNavigation.tsx` - Home, stats, post, leaders icons

---

## Where They're Used

### Social Posts (mockData.ts)
```typescript
// Note: Path from src/components/screens/HomePage/mockData.ts
images: [
  require('../../../assets/HomePage/Images/rectangle-16.png'),
  require('../../../assets/HomePage/Images/rectangle-16-1.png'),
  require('../../../assets/HomePage/Images/rectangle-16-2.png'),
]
```

---

## Remember

🔸 **Always use lowercase**  
🔸 **Use hyphens, not spaces**  
🔸 **Test with `require()` immediately**  
🔸 **No special characters except hyphens**

---

## Need Help?

See full details in `FILE_RENAME_SUMMARY.md`

