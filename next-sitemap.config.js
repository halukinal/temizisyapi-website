/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.temizisyapi.com',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  exclude: ['/admin', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.temizisyapi.com/sitemap.xml',
    ],
  },
}
