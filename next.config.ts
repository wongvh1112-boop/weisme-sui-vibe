/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 允许忽略 TS 错误进行打包
  },
  eslint: {
    ignoreDuringBuilds: true, // 允许忽略 ESLint 检查进行打包
  },
};

export default nextConfig;