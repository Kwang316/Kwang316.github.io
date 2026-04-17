# Medical Imaging Portfolio

Professional portfolio for 3D Slicer & medical image computing engineering.

## Structure

```
portfolio/
├── index.html                  # Main portfolio page
├── css/style.css               # Custom styles
├── js/
│   ├── hero.js                 # Three.js volumetric point-cloud animation
│   └── cards.js                # Animated CT scan-line card previews
├── projects/
│   ├── autoseg-brain.html      # BraTS tumor segmentation case study
│   ├── cta-vessel-tree.html    # Coronary vessel extraction case study
│   ├── lungnodule-tracker.html # Longitudinal nodule analysis case study
│   ├── dicom-rt-dose-viz.html  # RT dose visualization case study
│   └── slicer-extension-demo.html  # Slicer extension case study
└── .github/workflows/
    ├── deploy.yml              # Auto-deploy to GitHub Pages on push to main
    └── lint.yml                # Python linting for project code
```

## Deploy to GitHub Pages

1. Create a new GitHub repo
2. Push this folder as the repo root
3. Go to **Settings → Pages → Source: GitHub Actions**
4. Push to `main` — the site deploys automatically

## Customise

- Replace `your@email.com` in `index.html` with your real email
- Replace GitHub/LinkedIn URLs in `index.html`
- Add real screenshots to `projects/` once you complete the analyses
