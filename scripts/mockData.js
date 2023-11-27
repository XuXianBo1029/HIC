// 所有標籤
const allTags = ["奇幻", "奇幻1", "奇幻2", "奇幻3", "冒險", "愛情", "歷史", "科幻", "驚悚", "懸疑", "犯罪", "家庭", "青春", "戰爭", "古裝", "現代", "幽默", "感人", "恐怖", "成長", "浪漫", "社會", "心理", "推理", "武俠", "短篇", "長篇", "穿越", "重生", "網遊", "競技", "二次元", "都市", "仙俠", "玄幻", "武侠", "宮廷", "軍事", "校園", "生活", "商戰", "宗教", "運動", "異能", "搞笑", "治愈", "日常", "劇情", "唯美", "輕小說", "歐美", "東方奇幻"];

// 產生隨機標籤
let generateRandomTags = function() {
    const numberOfTags = Math.floor(Math.random() * 20) + 1; // 隨機1~20個
    const shuffledTags = [...allTags].sort(() => 0.5 - Math.random());
    const uniqueTagsSet = new Set();    

    for (let i = 0; i < Math.min(numberOfTags, shuffledTags.length); i++) {
        uniqueTagsSet.add(shuffledTags[i]);
    }        

    const uniqueTags = [...uniqueTagsSet];
    
    return uniqueTags;
}

// 模擬的假伺服器小說作品資料
const novelArtworkData = [];

// 模擬小說投稿日期 以現在
let currentDate = new Date();

// 隨機產生10000個小說資料
for (let i = 10000; i > 0; i--) {
    const seriesName = `作品系列名稱${i} 名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱`;
    const seriesLink = `/series/${i}`;
    const title = `小說標題${i} 標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題`;
    const artworkLink = `/artworks/${i}`;
    const author = `作者${i} 作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者`;
    const artistLink = `/users/${i}`;
    const description = `這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。`;                
    const tags = generateRandomTags();
    const cover = `./mockData/novel/cover.png`;
    const wordCount = Math.floor(Math.random() * (10000 - 100 + 1)) + 100; // 隨機100~10000之間
    const publishTime = currentDate.toISOString();                
    const likes = Math.floor(Math.random() * 10001); // 隨機0~10000之間

    novelArtworkData.push({
        seriesName: seriesName,
        seriesLink: seriesLink,
        title: title,
        artworkLink: artworkLink,
        author: author,
        artistLink: artistLink,
        description: description,
        tags: tags,
        cover: cover,
        wordCount: wordCount,
        publishTime: publishTime,
        likes: likes
    });

    currentDate.setMinutes(currentDate.getMinutes() - 30); // 每個作品投稿時間減少半小時
}

// 模擬的假伺服器插畫作品資料
const illustrationArtworkData = [];

// 模擬插畫投稿日期 以現在
currentDate = new Date();

// 隨機產生10000個插畫資料
for (let i = 10000; i > 0; i--) {
    const title = `插畫標題${i} 標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題`;
    const artworkLink = `/artworks/${i}`;
    const author = `作者${i} 作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者`;
    const artistLink = `/users/${i}`;
    const preview = `./mockData/illustration/illustration` + (Math.floor(Math.random() * (8 + 1)) + 1) + '.png'; // 隨機1~8之間
    const tags = generateRandomTags();
    const publishTime = currentDate.toISOString();                
    const likes = Math.floor(Math.random() * 10001); // 隨機0~10000之間

    illustrationArtworkData.push({
        title: title,
        artworkLink: artworkLink,
        author: author,
        artistLink: artistLink,
        preview: preview,
        tags: tags,
        publishTime: publishTime,
        likes: likes
    });

    currentDate.setMinutes(currentDate.getMinutes() - 30); // 每個作品投稿時間減少半小時
}