module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/cost-manager/usage/',
        permanent: true,
      },
      {
        source: '/master-data-manager',
        destination: '/master-data-manager/organizations/',
        permanent: true,
      },
      {
        source: '/cost-manager',
        destination: '/cost-manager/usage/',
        permanent: true,
      }
    ]
  },
}
