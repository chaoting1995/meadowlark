// 封裝自製模組
// 用exports 匯出

const fortunesCookies = [
  'AAAAAAAAAAAAAAAAAA',
  'BBBBBBBBBBBBBBBBBB',
  'CCCCCCCCCCCCCCCCCC',
  'DDDDDDDDDDDDDDDDDD',
  'EEEEEEEEEEEEEEEEEE',
];

exports.getFortune = () => {
  const index = Math.floor(Math.random() * fortunes.length);
  return fortunesCookies[index];
};

// 後端模組系統:CJS (require, exports, modules.exports)
// 前端模組系統:ESM (import, export)