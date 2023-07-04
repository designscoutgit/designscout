export default function ({ route, error }) {
    if (route.matched.length === 0) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
  