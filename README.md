# Project Showcase - Advertisement Display

A modern web application that displays a website alongside rotating advertisements in an adjustable split-screen layout.

## Features

✨ **Adjustable Split Screen** - Drag the divider to resize the left (demo) and right (advertisement) panels
📱 **Responsive Design** - Works on desktop and mobile devices
🎨 **Dynamic Advertisements** - Automatic rotation with manual controls
🔄 **Easy Website Switching** - Change the displayed website at any time
⚙️ **Session Memory** - Stores your last viewed URL in the current session

## Project Structure

```
projectshow_web/
├── index.html          # Start screen with URL input
├── showcase.html       # Main split-screen display
├── styles.css          # All styling and responsive design
├── script.js           # All JavaScript functionality
└── README.md           # This file
```

## How to Use

### 1. Start the Application
Open `index.html` in your web browser.

### 2. Enter a Website URL
On the start screen, enter the full URL of the website you want to display (e.g., `https://google.com`)

**Note:** The website must support being embedded in an iframe. Some sites have security restrictions that prevent embedding.

### 3. View the Showcase
- **Left Panel**: Shows the website you entered
- **Right Panel**: Displays rotating advertisements
- **Divider**: Drag the vertical divider to adjust the split

### 4. Controls

**Header Controls:**
- **Back** - Return to the start screen
- **Change URL** - Switch to a different website
- **Confirm** - Confirm the new URL

**Advertisement Controls:**
- **❮ / ❯** - Manually navigate between ads
- **Auto-rotate** - Timer shows when the next ad will appear (5 seconds by default)

## Customization

### Change Advertisement Images
Edit the `advertisements` array in `script.js`:

```javascript
const advertisements = [
    {
        title: 'Your Ad Title',
        image: 'https://your-image-url.jpg'
    },
    // Add more ads...
];
```

### Change Auto-Rotate Duration
Edit the `autoRotateInterval` variable in `script.js`:

```javascript
let autoRotateInterval = 5000; // Time in milliseconds (currently 5 seconds)
```

### Adjust Minimum Panel Widths
In the divider drag handler within `script.js`, modify:

```javascript
const minLeftWidth = 300;    // Minimum left panel width
const minRightWidth = 300;   // Minimum right panel width
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

1. **iframe Security** - Some websites (like Facebook, Twitter) don't allow embedding in iframes due to X-Frame-Options headers
2. **Mixed Content** - If viewing an HTTPS website, it cannot embed HTTP iframes
3. **CORS** - Some sites may restrict cross-origin access

## Testing with Demo Websites

Websites that generally work well with iframes:
- `https://example.com` (Good for testing)
- `https://www.wikipedia.org` (Check Wikipedia pages)
- `https://www.w3schools.com` (Great demo site)
- Personal/custom websites without iframe restrictions

## Tips

💡 **Pro Tips:**
- Use the "Try Demo" button to see how it works with a test site
- Drag the divider to customize your viewing preference
- The ad images use placeholder.com service - replace with your own ad images
- Browser DevTools (F12) can show iframe errors if a site can't be embedded

## License

Free to use and modify for your projects!

---

**Created:** May 2026
**Version:** 1.0.0
