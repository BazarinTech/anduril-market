/**
 * Where a product image lives.
 *
 * The backend returns a fully-resolved `image_url` -- it is the only side that
 * knows whether images sit on disk, in a public bucket, or behind a presigned
 * URL, and presigned URLs cannot be constructed by a client at all.
 *
 * There used to be a fallback here that pasted the bare filename onto the old
 * cPanel host. It was meant as a bridge for the window where an older backend
 * might still be deployed, and it outlived its purpose: that host no longer
 * serves these files, so whenever `image_url` was missing for any reason the
 * fallback turned a blank image into a 404 against a dead domain. A missing
 * URL now degrades to the placeholder, which is both honest and quiet.
 */
export function productImageUrl(
  imageUrl?: string | null,
  image?: string | null,
): string {
  if (imageUrl) return imageUrl

  if (image) {
    // Reaching here means the API returned a filename but no resolved URL,
    // which is a backend problem rather than something to paper over.
    console.warn(`[image] no image_url for "${image}"; showing placeholder`)
  }

  return "/placeholder.svg"
}
