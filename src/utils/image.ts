/**
 * Resolves any image URL (local, public, or compiled asset) to an absolute URL
 * based on the current window location. This is extremely robust and handles
 * GitHub Pages deployments with subfolders, with or without trailing slashes.
 */
export function resolveImagePath(imageUrl: string): string {
  if (!imageUrl) return "";

  // Return external/data URLs as is
  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("data:")
  ) {
    return imageUrl;
  }

  // Clean the imageUrl of any leading ./ or /
  let cleanPath = imageUrl;
  while (cleanPath.startsWith("./") || cleanPath.startsWith("/")) {
    if (cleanPath.startsWith("./")) {
      cleanPath = cleanPath.slice(2);
    } else if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.slice(1);
    }
  }

  // Get current path information to find subfolder/repository name (e.g. /site-lhs/)
  const pathname = window.location.pathname;
  const segments = pathname.split("/").filter(Boolean);

  let baseSegment = "";
  if (segments.length > 0) {
    const firstSegment = segments[0];
    // Exclude file names from being treated as directories
    if (!firstSegment.endsWith(".html") && firstSegment !== "index.html") {
      baseSegment = `/${firstSegment}/`;
    }
  }

  // Ensure we don't double-prefix if the cleanPath already starts with the repository name
  if (baseSegment && segments.length > 0 && cleanPath.startsWith(segments[0] + "/")) {
    return `${window.location.origin}/${cleanPath}`;
  }

  if (baseSegment) {
    return `${window.location.origin}${baseSegment}${cleanPath}`;
  }

  // Fallback to origin root
  return `${window.location.origin}/${cleanPath}`;
}
