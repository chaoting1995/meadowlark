// 載入 express
const express = require('express');
// 載入 模板引擎
const expressHandlebars = require('express-handlebars');
// 建立 express實例
const app = express();
// 建立handlebars實例(一個模板引擎)，使express預設使用
app.engine(
  'handlebars',
  //指定預預設layout，即除非另外指定，否則所有view都使用這個layout
  expressHandlebars({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

// 在宣告任何路由之前，加入static中介函式
// static為想傳遞的靜態檔案建立一個路由，傳給用戶端
app.use(express.static(__dirname + '/public'));

// app連接埠 如果環境變數有設定，採用環境變數，否則預設3000
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => {
  const fortunes = [
    'AAAAAAAAAAAAAAAAAA',
    'BBBBBBBBBBBBBBBBBB',
    'CCCCCCCCCCCCCCCCCC',
    'DDDDDDDDDDDDDDDDDD',
    'EEEEEEEEEEEEEEEEEE',
  ];
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
});

// 自訂404頁面
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

// 自訂500頁面
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render('500');
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press Ctrl-C to terminate.`
  )
);

// 加入路由的方法 // app.METHOD

// app.get()
// @param1 => path
// @param2 => callback function
//         ===> @req => 請求物件
//         ===> @res => 回應物件
// res.status(200);  回傳狀態碼，預設為200

// app.use => express用來加入中介函式的方法
// 中介函式 => 處理任何不符合路由的東西的統包函式
// 加入路由與中介函式的順序非常重要，如果把404處理式放最前面，所有路由都會失效

// res.render('about') => view引擎，會預設回傳
// 預設內容類型: res.type('text/html')
// 預設狀態碼: res.status(200);

// static中介函式
// 可以指定某目錄儲存的東西是靜態資源，資源可以直接傳給用戶，不需要做任何處理
// static為想傳遞的靜態檔案建立一個路由，傳給用戶端
// 在宣告任何路由之前，加入static中介函式
// 因為中介函式按照順序處理，而static中介函式會覆蓋其他路由

// 通常指定public
// 代表此目錄內的任何東西都會無條件地傳給用戶端
// 可以放圖檔,css檔,用戶端js檔(???)
