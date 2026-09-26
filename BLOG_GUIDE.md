# Your blog

The new Blog link opens blog.html. Individual stories use post.html?post=your-slug.
The home page shows your three latest published stories. Categories come from your posts.
The blog is empty until you add a post; no sample stories are published.

## Publish this update

Unzip the download. Upload the CONTENTS of portfolio-main into the same GitHub repository folder that currently contains index.html, replacing existing files and adding the new files. Do not upload the ZIP itself or create a nested portfolio-main folder. Commit and wait for the Pages deployment to finish. Refresh your site.

This update preserves your nine video projects, including SNO GNO Jamboree Ad, and your bio and contact information.

## 1. Upload a photo once

Upload a photo into assets/photos/ (create that folder), or use a stable public HTTPS direct image URL from your image host. A photo-hosting gallery/share page is not a direct image URL. Use your own photos or images you have permission to publish.

In content.js, replace the empty "photos": [] with this example, adjusting the text and path:

```js
"photos": [
  {
    "id": "sunset-anfeh-01",
    "title": "Sunset in Anfeh",
    "collection": "Travel",
    "src": "assets/photos/sunset-anfeh.jpg",
    "alt": "Describe what is visible in your photograph",
    "year": "2026"
  }
],
```

The id is your permanent, unique reference. Use lowercase letters, numbers, and hyphens. Keep it unchanged when renaming a photo or changing its URL. Categories can be Commercial, Portraits, Family, Events, Lifestyle, Travel, Architecture, Food & product, Landscape, Street, or your own.

You can replace src with a public direct external image link. Both the portfolio and blog will use that same link. Optional full is the larger image for the portfolio lightbox; the blog uses src to avoid loading a huge original. Resize/compress photos before uploading (roughly 1600–2000px wide is a useful starting point).

## 2. Write a post

Open blog-content.js. Replace its empty array with your own version of this example:

```js
window.BLOG_POSTS = [
  {
    slug: "anfeh-at-sunset",
    title: "Anfeh at sunset",
    date: "2026-09-26",
    category: "Photo stories",
    excerpt: "A short introduction to the story behind this photograph.",
    published: true,
    cover: { photoId: "sunset-anfeh-01" },
    blocks: [
      { type: "paragraph", text: "Write your opening paragraph here." },
      { type: "heading", text: "Finding the frame" },
      { type: "paragraph", text: "Describe the setting, the light, or your process." },
      { type: "photo", photoId: "sunset-anfeh-01", caption: "Your caption here." },
      { type: "quote", text: "A thought you want to highlight." },
      { type: "paragraph", text: "Finish your story here." }
    ]
  }
];
```

Use a unique permanent slug for each post, and dates as YYYY-MM-DD. Copy another object inside the array to add another post; separate objects with commas. The newest dates appear first. Categories such as Photo stories, Products, Behind the scenes, or Notes automatically create filter buttons.

Set published: false to hide a post from the website. This is NOT private storage: anyone can read shipped JavaScript and public repository history. Keep confidential drafts off the repository. Dates sort posts; they do not schedule future publication.

Use plain text in paragraphs, headings, quotes, and captions. HTML and Markdown are not rendered. Escape a double quote inside double-quoted text as \" or use single quotes around that text.

## 3. Reuse photos

cover: { photoId: "sunset-anfeh-01" } looks up that photo in content.js. A photo block works the same way. There is no second upload and no second image URL to maintain. Change its src once in content.js and every reference follows it. Do not delete a photo still referenced by posts; missing references show a neutral placeholder.

For a product image that should appear only in the blog, you can instead use:

```js
cover: { src: "assets/photos/product.jpg", alt: "Describe the product" },
```

And inside blocks:

```js
{ type: "photo", src: "assets/photos/product-detail.jpg", alt: "Describe the detail", caption: "Detail view" },
{ type: "link", text: "View the product ↗", url: "https://example.com/product" }
```

For an affiliate/sponsored link add sponsored: true to its link block, and include a plain-language disclosure paragraph where appropriate.

## 4. Update after publishing

For new posts: edit blog-content.js on GitHub and commit.
For new portfolio photos: upload the image once, edit content.js, then reference its id in blog-content.js.
For text corrections: edit only blog-content.js.
Wait for your Pages deployment to complete before checking. If a change is missing, check GitHub Actions for a failed deployment, verify the published branch/folder, and refresh the browser cache.

Test post URLs directly, check mobile, and click category filters. Always keep a backup of your current files.

## Management tools

This version remains a static GitHub Pages site. It does not include an admin login, stored comments, an inbox, ad account, or email hosting. Contact links still open your email/Instagram/WhatsApp.

- Keep the design and GitHub: Decap CMS can provide editing forms after the content is adapted to CMS-friendly JSON/YAML and GitHub authentication is configured. It is not connected in this download. https://decapcms.org/docs/github-backend/
- Comments: giscus stores discussions on GitHub and requires GitHub sign-in to comment. With this query-based post URL, use a unique post slug as a specific mapping term (or full URL); pathname alone would combine every post's comments. https://giscus.app/
- Contact form/inbox: Formspree can handle submissions from a static site after account/form setup. https://formspree.io/
- Integrated dashboard: WordPress offers posts, reusable media, comments, forms, and ad integrations. This HTML ZIP is not a WordPress theme. Moving requires recreating/converting the layout and migrating content. https://wordpress.com/support/import/converting-an-html-site-to-wordpress/
- A custom mailbox needs your own domain and an email provider. WordPress.com offers Professional Email or Google Workspace separately from hosting. https://wordpress.com/support/add-email/
- Earning from display ads is Google AdSense; paying to promote your services is Google Ads. Ads require their own setup and eligibility review. No ad scripts are included. https://wordpress.com/support/monetize-your-site/

The blog is rendered with JavaScript. Social preview bots may only see the generic HTML metadata, rather than each post's generated title and cover. If search traffic and rich social previews become important, generate separate static HTML files per post or migrate to a CMS/static-site generator.

## Fonts and palette

The site uses system fonts, with no font subscription or font downloads:
- Main text and headings: Arial, falling back to Helvetica, then sans-serif.
- Italic editorial accents/quotes: Georgia, falling back to serif.

Effective colors (later CSS rules override earlier legacy blue values):

| Role | Light | Dark |
|---|---|---|
| Background | #FFFFFF | #141414 |
| Text | #161616 | #EEEEEB |
| Secondary text | #686868 | #B5B5B0 |
| Borders | #DEDEDE | #393939 |
| Accent variable | #84953C | #D5E998 |
| Hero/contact background | #111111 | #0A0A0A |

Lime highlight / WhatsApp: #D5E998, with #263014 text on the button.
Instagram: #E7DDEF, with #35243E text.
Some existing keyboard focus outlines retain blue #6385FF.
