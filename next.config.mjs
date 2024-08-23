/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });
        return config;
    },
    devIndicators: {
        autoPrerender: false
    },
    webpackDevMiddleware: config => {
        config.hot = false;
        return config;
    },
    images: {
        domains: ['res.cloudinary.com'], // Tambahkan domain Cloudinary
    },
};

export default nextConfig;
