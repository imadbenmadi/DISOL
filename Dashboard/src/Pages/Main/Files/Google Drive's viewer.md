### Steps to Use Google Drive Viewer for PDFs Hosted on Your Node.js Server:

1. **Host the PDF on Your Node.js Server**:

    - Ensure the PDF is accessible via a public URL (e.g., `https://yourdomain.com/path/to/file.pdf`).

2. **Use Google Drive Viewer**:

    - Google Drive Viewer can display external files (like PDFs) if you provide a direct link to the file.
    - The format for using Google Drive Viewer is:
        ```
        https://drive.google.com/viewerng/viewer?embedded=true&url=YOUR_PDF_URL
        ```
    - Replace `YOUR_PDF_URL` with the full URL to your PDF hosted on your Node.js server.

3. **Embed the Viewer in Your Website**:
    - Use an `<iframe>` to embed the Google Drive Viewer on your website. Here's the code:
        ```html
        <iframe
            src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://yourdomain.com/path/to/file.pdf"
            width="100%"
            height="600px"
            style="border: none;"
        >
        </iframe>
        ```

---

### Example:

If your PDF is hosted at:

```
https://yourdomain.com/files/myfile.pdf
```

The embed code would be:

```html
<iframe
    src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://yourdomain.com/files/myfile.pdf"
    width="100%"
    height="600px"
    style="border: none;"
>
</iframe>
```

---

### Important Notes:

1. **Public Access**:

    - The PDF must be publicly accessible (i.e., no authentication required) for Google Drive Viewer to work. If the file is private, Google Drive Viewer won't be able to access it.

2. **CORS Issues**:

    - If your Node.js server has CORS (Cross-Origin Resource Sharing) restrictions, ensure it allows requests from `https://drive.google.com`.

3. **Alternative**:
    - If you don't want to rely on Google Drive Viewer, you can use a JavaScript PDF viewer library like [PDF.js](https://mozilla.github.io/pdf.js/) to render the PDF directly on your website.
