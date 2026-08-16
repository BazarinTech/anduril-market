/**
 * Where a product image lives.
 *
 * The backend now returns a fully-resolved `image_url`, because it is the only
 * side that knows whether images are on disk, in a public bucket, or behind a
 * presigned URL. This helper prefers that.
 *
 * The `image` fallback is for the window where an older backend is still
 * deployed and only sends a bare filename. It reproduces the URL the app used
 * to build by hand. Delete it once every environment is on the new backend.
 */
const LEGACY_UPLOAD_BASE =
  process.env.NEXT_PUBLIC_LEGACY_UPLOAD_BASE_URL ??
  "https://sanderson.xgramm.com/admin/uploads"

export function productImageUrl(
  imageUrl?: string | null,
  image?: string | null,
): string {
  if (imageUrl) return imageUrl
  if (image) return `${LEGACY_UPLOAD_BASE}/${image}`
  return "/placeholder.svg"
}
