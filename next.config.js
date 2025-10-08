/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1'; // true when on Vercel
const isGitHubPages = process.env.GITHUB_PAGES === 'true'; // we’ll set this in the GitHub workflow
const repoName = 'rsatokengenerator';

const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  basePath: isVercel ? '' : `/${repoName}`,
  assetPrefix: isVercel ? '' : `/${repoName}/`,
  trailingSlash: true,
};

module.exports = nextConfig;
