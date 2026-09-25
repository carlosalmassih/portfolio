# Three-page portfolio update

Start with UPDATE_GUIDE.md for step-by-step GitHub editing, photo hosting, and adding new videos/photos.

Pages: index.html (home), portfolio.html (videos and photos), side-projects.html (design and music).
All eight current videos are short form; long form shows an empty state until longer work is added. No photography files have been supplied yet.

# Carlos AlMassih — Portfolio

A static portfolio for GitHub Pages. No build command, dependencies, or hosting subscription required.

## Preview
Extract the ZIP and open index.html. Video playback should be checked on the published HTTPS site: YouTube may reject playback from a local file because it has no web referrer. Every project includes an Open original video link.

## Publish
1. Create a public repository named YOURUSERNAME.github.io on GitHub.
2. Upload the contents of reel-portfolio directly into the repository root, including assets/. Do not upload only the ZIP.
3. Open Settings → Pages → Deploy from a branch → main → /(root), then Save.
4. Open https://YOURUSERNAME.github.io/ after deployment completes.

For an existing project repository, the site also works at https://YOURUSERNAME.github.io/REPOSITORY/.

## Update content
Edit content.js for your bio, experience, contact details, and projects. Set category to edited or filmed. Add video URLs and thumbnails; duplicate a project object to add work. Your original CV is included in assets/Carlos_AlMassih_CV_2026.pdf.

Instagram and WhatsApp are configured. LinkedIn remains hidden until its URL is supplied. Contact buttons link to Instagram and WhatsApp side by side. Other links open email and phone apps. There is no contact form or tracking.

## Content sources
Bio, career history, location, email, phone, and software skills come from the attached CV. All eight project titles, categories and contributions come from the supplied YouTube descriptions. Descriptions are lightly edited for clarity. Three projects are edited; five are filmed and edited. Other contributors are credited within each project.

The serum promo description reused the talking-head summary, so its summary instead uses the video title and listed contributions. The year for Noël by the Sea is retained as 2026, as entered in the supplied description; revise if needed.

## Behavior
The landing title reacts gently to mouse movement with a subtle glow and small text movement. Reduced-motion preferences and touch devices disable this effect. No scroll animation or automatic background video. The light/dark switch remembers your choice in this browser. Thumbnails are monochrome, with original color on hover. Videos load only after opening a project. Escape closes the dialog and stops playback. YouTube hosts the videos; embedding remains subject to the video's settings.

## Verification
JavaScript syntax, all three pages, combined filters, reset, video/photo dialogs, and responsive widths of 1440, 390 and 320 pixels were checked in Chromium. YouTube media was blocked during local UI checks, so external thumbnails and video playback remain unverified. After publishing, verify the layout on your phone, all eight embeds, the CV link, and the contact links. A public GitHub repository makes its files public.
