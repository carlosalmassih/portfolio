# Upload this version

1. Extract the ZIP and open portfolio-main.
2. Open the GitHub repository folder that currently contains index.html.
3. Add file > Upload files. Drag the CONTENTS of portfolio-main, including the portfolio, side-projects, blog, about, and assets folders. Do not upload the enclosing folder or ZIP.
4. Commit to your published branch and wait for Pages deployment to finish.

Keep existing custom-domain CNAME and GitHub configuration files; do not delete the repository first.
If you edited content.js or blog-content.js since the earlier download, keep your newer versions instead of replacing them. All existing data formats are unchanged.

New addresses:
- Home: /
- Portfolio: /portfolio/
- Photography tab: /portfolio/?media=photo
- Side projects: /side-projects/
- Blog: /blog/
- Individual story: /blog/your-slug/
- About: /about/ (bio, experience, education)
- Homepage bio: /#about
- Contact: /#contact

These paths also work below your current github.io repository path. Once a custom domain is configured directly on this repository, GitHub won't appear in the address.

The old portfolio.html, side-projects.html, blog.html and post.html files are intentionally included as redirects for existing shared links. Keep them.

For EVERY published blog post, create blog/its-slug/index.html using POST_TEMPLATE.txt as explained in BLOG_GUIDE.md. If you already added blog posts to your live site, create their folder pages as part of this upload. There are no published posts in this download.

Photo hosting needs no changes: keep using local or external image URLs in content.js and photo IDs in blog posts.

About update: upload the new about folder, about-content.js, about.js, changed HTML files, style.css and POST_TEMPLATE.txt. Keep your newer content.js/blog-content.js if you have edited them. Education is edited in about-content.js; bio and experience are still edited in content.js. For any existing blog story folder pages, replace their old About navigation link with href="about/" (their template already has a site-root base).
