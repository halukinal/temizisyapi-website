/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
// build trigger

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
/* build trigger 2 */
