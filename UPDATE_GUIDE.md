# Updating Carlos AlMassih’s portfolio

## What is included
- index.html: landing page, four featured videos, up to three featured photos, bio, experience and contact.
- portfolio.html: Video / Photo switch, video format/type/role filters, photo category buttons, and sorting.
- side-projects.html: graphic design and music explorations.
- theme.js: light/dark preference and the header switch.
- content.js: all editable text, project entries and photo entries.
- style.css and script.js: design and behavior. Normally leave these alone.
- assets/: CV, and a photos/ folder for your images.

Instagram is set to https://www.instagram.com/carlosalmassih__/ and WhatsApp to https://wa.me/971582218419. The WhatsApp buttons open a chat; they do not send a message automatically.

## First publish or update the existing website
Extract the ZIP. Upload all files inside reel-portfolio to the root of your GitHub repository, keeping the assets folder and its contents. Do not upload the ZIP itself or an extra enclosing folder. For an existing website, replace files with the same names and add the two new HTML pages.

In Settings → Pages, select Deploy from a branch, main, and /(root). Commit to that publishing branch. Wait for the Pages deployment in the Actions tab to succeed, then refresh your live site. Hard refresh with Ctrl+Shift+R if old content is cached. For later content updates, you only need to change content.js and upload any new photos; you do not need to re-upload the entire website.

## Edit text directly on GitHub
1. Open your repository, then content.js.
2. Click the pencil icon (Edit this file).
3. Change the text inside quotation marks.
4. Click Commit changes and save to your publishing branch.
5. Wait for the Pages deployment to finish, then check the live site.

Keep the quotation marks, brackets and commas. Use straight quotation marks, not smart quotes. Escape a quotation mark inside text as \" or use an apostrophe instead. There is no in-site admin/editor; GitHub is where you update the content.

## Add a video
Upload the video to YouTube and allow embedding. Copy its share URL. In content.js, find the projects array. Duplicate one complete project object, place a comma between objects, and replace its details. Here is a complete example (replace the example values):

```js
{
  "title": "My new project",
  "category": "filmed",
  "length": "short",
  "format": "vertical",
  "type": "Event recap",
  "description": "A short description of the story and purpose.",
  "credits": "Filming, editing, color grading",
  "client": "Client name",
  "year": "2026",
  "tools": "Premiere Pro",
  "collaborators": "Name — second shooter",
  "thumbnail": "assets/photos/video-cover.jpg",
  "video": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  "color": "dark"
}
```

- category: edited or filmed (filmed means filmed AND edited).
- length: short or long. This is independent of whether the video is vertical or horizontal. All eight existing projects are short form based on their durations (7 seconds to 2 minutes).
- format: vertical for a portrait player; video for a regular landscape player.
- type: a consistent label such as Interview, Product promo, Lifestyle, Event recap, Documentary. New type labels appear in the filter automatically.
- thumbnail: upload a custom cover, then enter its path. Existing projects use their YouTube thumbnail URLs. An empty thumbnail uses a numbered fallback.
- video: a YouTube watch, Shorts or youtu.be URL; Vimeo and direct MP4/WebM are also supported.
- The first four entries appear on the homepage. Move complete objects to change featured order. The portfolio page always shows every entry.
- Delete a whole project object to remove it, adjusting the adjacent comma if needed.

YouTube titles/descriptions are not automatically synced after publishing. Changes must also be entered in content.js. Embeds should be tested on the live HTTPS site, since local file previews may be rejected by YouTube. The original-video link is always available.

## Host photos for free with the website
For a curated portfolio, keep optimized image files directly in assets/photos/. GitHub Pages serves them with your website; no separate photo host is necessary.

Suggested export settings:
- JPEG or WebP, sRGB color.
- Around 1600–2000 pixels on the longest edge.
- Aim for about 200–500 KB per photo where quality permits; these are recommendations, not requirements.
- Use simple lower-case filenames without spaces, for example anfeh-sunset.jpg.
- Keep RAW files and full-resolution archives elsewhere.

To upload on GitHub: open assets/photos, choose Add file → Upload files, select your pictures, and Commit changes. Then add entries to content.js. Filename capitalization must match exactly. A path such as assets/photos/anfeh-sunset.jpg works both on a username.github.io site and inside a project site.

GitHub’s browser upload limit is 25 MiB per file. The published Pages site may not exceed 1 GB. Optimized photos will keep a small portfolio comfortably below those limits. If the gallery eventually becomes large, use a dedicated image host/CDN and put its direct public HTTPS image URLs in the same src/full fields. A Google Drive sharing-page link is not a direct image URL.

## Add photographs
Find this line in content.js:

```js
"photos": []
```

Replace it with your entries. For example, after uploading these two photos:

```js
"photos": [
  {
    "title": "Evening in Anfeh",
    "collection": "Places",
    "src": "assets/photos/anfeh-sunset.jpg",
    "alt": "Warm evening light over the coast in Anfeh"
  },
  {
    "title": "Between moments",
    "collection": "People",
    "src": "assets/photos/portrait.jpg",
    "alt": "Portrait beside a sunlit window"
  }
]
```

The first three images appear in the homepage photography section. All images appear in the Photo view on portfolio.html. Collection filters appear automatically. Photos retain their original colors and proportions. Clicking a photo opens the larger view; Escape closes it. For a separate higher-resolution view, add an optional full field containing its path. Otherwise src is used for both views.

No photographs have been supplied yet, so the current gallery has an honest “on its way” state rather than sample photos presented as your work.

## Replace your CV
Upload your new PDF into assets/ with the same name Carlos_AlMassih_CV_2026.pdf to replace it, or upload a different filename and update the cv path in content.js.

## Check after updating
- Open all three pages on your phone and desktop.
- Try combining filters, including a combination with no results, and Reset filters.
- Play a video and open a photograph; close with the X or Escape.
- Check Instagram, WhatsApp, email and CV links.
- If everything disappears after editing, check for missing quotation marks, commas or brackets in content.js.

Official references:
- Upload files: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Edit files: https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files
- Pages limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## New: combined portfolio and photo categories
The Portfolio page opens on Video. Use the Video / Photo buttons to switch media. Photo reveals category buttons; Video reveals format, project type and role controls. There is no All work button or separate photography page. The homepage View photography link opens portfolio.html?media=photo.

The available photo categories are Commercial, Portraits, Family, Events, Lifestyle, Travel, Architecture, Food & product, Landscape, and Street. Edit photoCategories in content.js to rename or add categories. Use exactly the same spelling in each photo's collection field. New collection names also appear automatically.

Organize files into optional folders such as:
- assets/photos/commercial/
- assets/photos/portraits/
- assets/photos/family/

Upload files using Add file → Upload files in GitHub. Folders organize the files, but the collection value controls filtering on the website. For example:

```js
{
  "title": "Family by the sea",
  "collection": "Family",
  "src": "assets/photos/family/by-the-sea.jpg",
  "full": "assets/photos/family/by-the-sea.jpg",
  "alt": "A family walking together by the sea",
  "year": "2026"
}
```

Add this object inside photos: [ ... ] in content.js. Keep commas between objects. The image appears in the Portfolio page’s Photo view automatically. The first three photos also appear on the homepage. Your About portrait is separate and is not presented as a photo you took.

## External photo hosting with Cloudinary
1. Create your own Cloudinary account and open its Media Library.
2. Upload your optimized images, organizing them into folders if useful.
3. Use the asset's Copy URL → Original action to get its public HTTPS delivery URL.
4. Test that URL in an incognito tab: it should show the image itself without sign-in.
5. Paste that full URL into src in your photo object. You can put a separate larger image URL in full, or omit full to reuse src.
6. Set collection exactly as for a locally hosted photo, then commit content.js.

The website supports direct public image URLs without an API key. Do not paste account/API secrets into your public repository. Cloudinary folders do not automatically import or categorize photos on this site: content.js remains the source of the gallery. Check the provider's current storage and bandwidth allowance before uploading a large archive.

Example (replace with the actual delivery URL copied from your account):

```js
{
  "title": "Commercial portrait",
  "collection": "Commercial",
  "src": "https://res.cloudinary.com/YOUR_CLOUD/image/upload/YOUR_IMAGE.jpg",
  "alt": "Describe the image",
  "year": "2026"
}
```

Cloudinary instructions: https://cloudinary.com/documentation/media_library_for_developers

## New: Side Projects — graphic design and music
side-projects.html is deliberately presented as occasional creative exploration, alongside your main video work. Find sideProjects: [] in content.js and add objects like these:

```js
"sideProjects": [
  {
    "title": "Artist presentation design",
    "kind": "design",
    "description": "A short description of your contribution.",
    "image": "assets/design-cover.jpg",
    "alt": "Cover of an artist presentation",
    "url": "https://YOUR-PUBLIC-PROJECT-LINK"
  },
  {
    "title": "An original music sketch",
    "kind": "music",
    "description": "A personal music experiment. Add your actual role and credits.",
    "image": "assets/music-cover.jpg",
    "url": "https://YOUR-PUBLIC-TRACK-LINK"
  }
]
```

For design, link to a public Behance project, Canva view-only link, PDF, or image. For music, link to a public SoundCloud, YouTube, Spotify, Bandcamp or other listening page. These are ordinary external links, so visitors open the project on its original service. Test sharing permissions while signed out.

If you have a direct hosted MP3 URL, add an optional audio field: "audio": "https://YOUR-HOST/track.mp3". This creates a native audio player. A SoundCloud/Spotify sharing-page URL belongs in url, NOT audio. You can also host a small MP3 inside assets/ and use its relative path. image and audio are optional. No fake sample design or music projects are published.

## YouTube playback troubleshooting
The updated site uses the standard YouTube embed URL, passes the genuine website origin when hosted, and sets a referrer policy that permits YouTube to identify the site. Videos load only after opening a project and do not autoplay.

When opened from file:// by double-clicking index.html, it shows a clear direct YouTube link instead of an embed that may fail. Publish to GitHub Pages to test embedded playback, or serve locally with python -m http.server 8000 and visit http://localhost:8000/.

YouTube officially documents error 153 for missing HTTP Referer/client identification. Error 135 was not identified in the official documentation checked. Do not assume they are the same. If playback still fails on the live site, provide the exact error screenshot and website URL. Check Allow embedding on the video, confirm its visibility is Unlisted/Public rather than Private, and test whether a privacy extension or browser setting blocks the player. The site cannot override YouTube restrictions. The original-video link is always available.

Official reference: https://developers.google.com/youtube/iframe_api_reference#onError

## Can ChatGPT update the published site later?
Yes. Send the repository/site URL, requested changes, and any new assets. With authorized GitHub access connected, changes can be made to the repository if the available integration supports it. Without that access, an updated package or replacement files can still be prepared for you to upload. No GitHub account connection or deployment is included in this package. Replacing source files and committing to your publishing branch triggers your existing Pages deployment.


## Installing this layout update
Upload the updated HTML, CSS and JavaScript files, including the NEW theme.js. Delete the old photography.html file from your GitHub repository: uploading an updated ZIP’s contents does not remove old files automatically. All current photography links point to portfolio.html?media=photo.

The theme switch initially follows the device light/dark preference and remembers your manual choice in the browser. The title’s mouse-reactive glow and gentle movement run only with a fine pointer and no reduced-motion preference. Touch screens keep the static title.
