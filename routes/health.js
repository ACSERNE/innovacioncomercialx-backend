export default function healthRoute(app) {
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
  })
}
