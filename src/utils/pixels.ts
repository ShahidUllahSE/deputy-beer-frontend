export const fireImagePixel = (url: string): void => {
  try {
    const img = new Image(1, 1);
    img.style.position = "absolute";
    img.style.left = "-9999px";
    img.style.width = "0";
    img.style.height = "0";
    img.referrerPolicy = "no-referrer-when-downgrade";
    img.src = url;
    // Let the browser GC the element; we don't need to append it
  } catch {
    // Silently ignore pixel errors
  }
};

export const fireIframePixel = (url: string): void => {
  try {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "1";
    iframe.height = "1";
    iframe.style.visibility = "hidden";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.position = "absolute";
    iframe.style.left = "-9999px";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("marginwidth", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.setAttribute("scrolling", "no");
    document.body.appendChild(iframe);
    // Remove after it loads to keep DOM clean
    iframe.addEventListener("load", () => {
      setTimeout(() => iframe.remove(), 1500);
    });
  } catch {
    // Silently ignore pixel errors
  }
};

const withCachebuster = (url: string, cachebuster: string | number): string => {
  const hasQuery = url.includes("?");
  const sep = hasQuery ? "&" : "?";
  return `${url}${sep}cb=${cachebuster}`;
};

export const fireUniversalPixels = (): void => {
  const cachebuster = Date.now();
  // Conversion
  fireImagePixel(
    withCachebuster(
      "https://cnv.event.prod.bidr.io/log/cnv?tag_id=14969&buzz_key=dsp&value=&account_id=79&order=[ORDER]&ord=[CACHEBUSTER]",
      cachebuster,
    ),
  );
  // Associate segment
  fireIframePixel(
    withCachebuster(
      "https://segment.prod.bidr.io/associate-segment?buzz_key=dsp&segment_key=dsp-53151&value=&forward_to_cookie_sync=1",
      cachebuster,
    ),
  );
};

export const fireSignupSuccessPixels = (order: string | null): void => {
  const cachebuster = Date.now();
  const orderSafe = encodeURIComponent(order ?? "");
  fireImagePixel(
    withCachebuster(
      `https://cnv.event.prod.bidr.io/log/cnv?tag_id=14970&buzz_key=dsp&value=&account_id=79&order=${orderSafe}&ord=${cachebuster}`,
      cachebuster,
    ),
  );
  fireIframePixel(
    withCachebuster(
      "https://segment.prod.bidr.io/associate-segment?buzz_key=dsp&segment_key=dsp-53152&value=&forward_to_cookie_sync=1",
      cachebuster,
    ),
  );
};

export const fireEntrySuccessPixels = (order: string | null): void => {
  const cachebuster = Date.now();
  const orderSafe = encodeURIComponent(order ?? "");
  fireImagePixel(
    withCachebuster(
      `https://cnv.event.prod.bidr.io/log/cnv?tag_id=14971&buzz_key=dsp&value=&account_id=79&order=${orderSafe}&ord=${cachebuster}`,
      cachebuster,
    ),
  );
  fireIframePixel(
    withCachebuster(
      "https://segment.prod.bidr.io/associate-segment?buzz_key=dsp&segment_key=dsp-53153&value=&forward_to_cookie_sync=1",
      cachebuster,
    ),
  );
};

