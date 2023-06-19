export default function (req, res, next) {
    const isHttps = req.headers['x-forwarded-proto'] === 'https' || req.secure;
    if (!isHttps) {
      res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`
      });
      res.end();
    } else {
      next();
    }
  }
  