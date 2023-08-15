import app from './src/app'
const port = process.env.APPLICATION_PORT || 8400

app.listen(port, () => {
  console.log(`O servidor está rodando em... \n http://localhost:${port}`)
})