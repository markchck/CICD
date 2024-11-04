const express = require("express")
const app = express()
const port = 80

// 미들웨어 설정
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 루트 경로 핸들러
app.get("/", (req, res) => {
  res.send("Hello World!")
})

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`)
})
