// 使用localStorage模擬資料庫有所有標籤
const allTags = ["奇幻", "奇幻1", "奇幻2", "奇幻3", "冒險", "愛情", "歷史", "科幻", "驚悚", "懸疑", "犯罪", "家庭", "青春", "戰爭", "古裝", "現代", "幽默", "感人", "恐怖", "成長", "浪漫", "社會", "心理", "推理", "武俠", "短篇", "長篇", "穿越", "重生", "網遊", "競技", "二次元", "都市", "仙俠", "玄幻", "武侠", "宮廷", "軍事", "校園", "生活", "商戰", "宗教", "運動", "異能", "搞笑", "治愈", "日常", "劇情", "唯美", "輕小說", "歐美", "東方奇幻"];
const allTagsData = allTags.map((tag, index) => ({ id: index + 1, tagName: tag }));

// 目前選擇哪個類型的作品
let selectedWorkType = 'novel';

// 點擊搜尋欄以外的地方不顯示searchResults
document.addEventListener('click', function (event) {
    const searchContainer = document.getElementById('searchContainer');
    const searchResults = document.getElementById('searchResults');
  
    // 檢查點擊事件是否發生在searchContainer以外的地方
    if (!searchContainer.contains(event.target)) {
      searchResults.style.display = 'none';
    }
});

// 傳送搜尋字串 返回開頭為字串的標籤
function performSearch(inputLastWord) {
    const prefix = inputLastWord;
    // 使用localStorage模擬從資料庫取得搜尋資料
    // 有一個table(allTagsData)有全部標籤 存放在模擬的資料庫中
    localStorage.setItem('allTagsData', JSON.stringify(allTagsData));    
    // 瀏覽器向伺服器請求(request) 要求所有開頭為字串的標籤 傳送一個字串
    // 伺服器接受到請求 模擬的資料庫從table(allTagsData)篩選出開頭為字串的標籤
    const storedAllTagsData = JSON.parse(localStorage.getItem('allTagsData'));
    const filteredTagsData = storedAllTagsData.filter(item => item.tagName && item.tagName.startsWith(prefix));
    localStorage.setItem('filteredTagsData', JSON.stringify(filteredTagsData));
    // 伺服器回應(response) 傳回篩選好的標籤回來 瀏覽器解讀json 拿到需求資料
    const responseData = JSON.parse(localStorage.getItem('filteredTagsData'));
    // 清空整個 localStorage (並不是資料庫刪庫跑路，只是模擬不想占空間)
    localStorage.clear();
    // 更新結果
    updateResults(responseData);
}

// 更新搜尋結果
function updateResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result.tagName;
        searchResults.appendChild(li);
    });

    searchResults.style.display = results.length > 0 ? 'block' : 'none';
}

// 監控搜尋欄輸入改變事件
document.getElementById('searchInput').addEventListener('input', function () {
    const inputTags = document.getElementById('searchInput').value.trim().split(' ');
    const inputLastWord = inputTags[inputTags.length - 1];
    if (inputLastWord !== '') {
        performSearch(inputLastWord);
    } else {
        // 如果沒有輸入 隱藏搜尋結果
        document.getElementById('searchResults').style.display = 'none';
    }
});

// 開始搜尋有關tag作品
document.getElementById('searchForm').addEventListener('submit', function (event) {
    // 防止預設表單提交行為
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim();

    if (query !== '') {
        // 如果選擇小說類型
        if (selectedWorkType == 'novel') {
            loadnovel(1);
        // 如果選擇插畫類型
        } else if (selectedWorkType == 'illustration') {
            //loadillustration(1);
        // 如果選擇漫畫類型
        } else if (selectedWorkType == 'comic') {
            //loadcomic(1);
        }
    } else {
        document.getElementById('searchResults').style.display = 'none';
    }
});

// 點擊li tag，將搜尋input最後一個字串替換成li tag 再加上空格
document.getElementById('searchResults').addEventListener('click', function (event) {
    // 確保是li
    if (event.target.tagName === 'LI') {
        const selectedText = event.target.textContent;
        
        const inputValue = document.getElementById('searchInput').value;
        // 尋找最後一個空格的位置
        const lastSpaceIndex = inputValue.lastIndexOf(' ');
        // 取代最後一個空格後的內容
        const newInputValue = inputValue.substring(0, lastSpaceIndex + 1) + selectedText;

        document.getElementById('searchInput').value = newInputValue + " ";

        document.getElementById('searchResults').style.display = 'none';
    }
});

/* 展開隱藏部分 */
function toggleNavbarRight() {
    document.getElementById('navbarRight').classList.toggle('expand');
}

/* 展開投稿作品選項 */
function expendSubmittedWorkOptions() {
    let options = document.querySelector('#submissionOptions');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

/* 切換主題 */
function toggleTheme(buttonElement) {
    // let buttonElement = document.querySelector('#themeToggle button');
     let root = document.documentElement;    
    if (buttonElement.innerHTML == '深色主題') {
        buttonElement.innerHTML = '淡色主題';
        root.style.setProperty('--main-bg-color', '#ffffff');
        root.style.setProperty('--main-text-color', '#000000');
    } else {
        buttonElement.innerHTML = '深色主題';
        root.style.setProperty('--main-bg-color', '#000000');
        root.style.setProperty('--main-text-color', '#ffffff');

    }
}

/* 登入、註冊 */
var loginModal = document.getElementById('loginModal');
var signUpModal = document.getElementById('signUpModal');

window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    } else if (event.target == signUpModal) {
        signUpModal.style.display = "none";
    }
}

function loginButton () {
    document.getElementById('signUpModal').style.display='none';
    document.getElementById('loginModal').style.display='block';
}

function signUpButton () {
    document.getElementById('loginModal').style.display='none';
    document.getElementById('signUpModal').style.display='block';
}

/* 顯示選擇作品類型 */
function workTypeSelection(workType) {
    selectedWorkType = workType;
    // 清除worksGallery
    document.getElementById("worksGallery").innerHTML = "";
    /*
    // 將作品類型選擇列按鈕取消邊框
    const buttons = document.querySelectorAll('.workTypeSelection button');
    
    for (const button of buttons) {
        button.style.border = "none";
    }
    */
    document.getElementById("novelWorkTypeButton").style.border = "none";
    document.getElementById("illustrationWorkTypeButton").style.border = "none";
    document.getElementById("comicWorkTypeButton").style.borderTop = "none";
    // 如果選擇小說類型
    if (selectedWorkType == 'novel') {
        loadnovel(1);
        document.getElementById("novelWorkTypeButton").style.borderTop = "3px solid blue";
    // 如果選擇插畫類型
    } else if (selectedWorkType == 'illustration') {
        //loadillustration(1);
        document.getElementById("illustrationWorkTypeButton").style.borderTop = "3px solid blue";
    // 如果選擇漫畫類型
    } else if (selectedWorkType == 'comic') {
        //loadcomic(1);
        document.getElementById("comicWorkTypeButton").style.borderTop = "3px solid blue";
    }
    
    //clickedElement.style.borderTop = "3px solid blue";
}

/* 讀取小說資料第幾頁 */
function loadnovel(page) {
    // 模擬資料庫 從 localStorage 取得小說資料
    const novelArtworkData = [];    
    // 取得搜尋標籤
    const inputTags = document.getElementById('searchInput').value.trim().split(' ');
    // 產生隨機標籤
    let generateRandomTags = function() {
        const numberOfTags = Math.floor(Math.random() * 20) + 1; // 隨機1~20個
        const shuffledTags = [...allTags].sort(() => 0.5 - Math.random());

        const uniqueTagsSet = new Set();

        // 如果搜尋欄有標籤 全部加入
        inputTags.forEach((tag) => {
            if (tag != "") {
                uniqueTagsSet.add(tag);
            }            
        })

        for (let i = 0; i < Math.min(numberOfTags, shuffledTags.length); i++) {
            uniqueTagsSet.add(shuffledTags[i]);
        }        

        const uniqueTags = [...uniqueTagsSet];
        
        return uniqueTags;
    }
    // 模擬小說投稿日期 以現在
    let currentDate = new Date();
    // 第N頁的作品 投稿時間減少(page - 1) * 10小時
    currentDate.setHours(currentDate.getHours() - (page - 1) * 10);
    // 每頁有20個作品
    for (let i = (page - 1) * 20 + 1, size = i + 19; i <= size; i++) {
        const seriesName = `作品系列名稱${i} 名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱名稱`;
        const seriesLink = `/series/${i}`;
        const title = `小說標題${i} 標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題`;
        const artworkLink = `/artworks/${i}`;
        const author = `作者${i} 作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者作者`;
        const artistLink = `/users/${i}`;
        const description = `這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。這是小說${i}的說明。`;                
        const tags = generateRandomTags();
        const cover = `./localstorage/novel/novel1/cover.png`;
        const wordCount = Math.floor(Math.random() * (10000 - 100 + 1)) + 100; // 隨機100~10000之間
        const publishTime = currentDate.toISOString();                
        const likes = Math.floor(Math.random() * 10001); // 隨機0~10000之間
    
        novelArtworkData.push({
            seriesName,
            seriesLink,
            title,
            artworkLink,
            author,
            artistLink,
            description,
            tags,
            cover,
            wordCount,
            publishTime,            
            likes
        });

        currentDate.setMinutes(currentDate.getMinutes() - 30); // 每個作品投稿時間減少一小時
    }

    // 模擬從 localStorage 取得小說資料
    // 存入 localStorage
    localStorage.setItem('novelArtworkData', JSON.stringify(novelArtworkData));
    // 從 localStorage 讀取並轉換回陣列
    const storedNovelArtworkData = JSON.parse(localStorage.getItem('novelArtworkData'));
    // 清空整個 localStorage
    localStorage.clear();

    // 返回投稿日期過了多久
    let formatTimeDifference = function(publishTime) {
        const currentTime = new Date();
        const postTime = new Date(publishTime);
    
        const timeDifference = currentTime - postTime;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    
        if (minutesDifference < 1) {
            return "剛剛";
        } else if (minutesDifference === 1) {
            return "1分鐘前";
        } else if (minutesDifference < 60) {
            return `${minutesDifference}分鐘前`;
        } else {
            const hoursDifference = Math.floor(minutesDifference / 60);
            if (hoursDifference === 1) {
                return "1小時前";
            } else if (hoursDifference < 24) {
                return `${hoursDifference}小時前`;
            } else {
                const daysDifference = Math.floor(hoursDifference / 24);
                if (daysDifference === 1) {
                    return "1天前";
                } else if (daysDifference < 30) {
                    return `${daysDifference}天前`;
                } else {
                    const monthsDifference = Math.floor(daysDifference / 30);
                    if (monthsDifference === 1) {
                        return "1個月前";
                    } else if (monthsDifference < 12) {
                        return `${monthsDifference}個月前`;
                    } else {
                        const yearsDifference = Math.floor(monthsDifference / 12);
                        if (yearsDifference === 1) {
                            return "1年前";
                        } else {
                            return `${yearsDifference}年前`;
                        }
                    }
                }
            }
        }
    }        
        
    const galleryElement = document.getElementById("worksGallery");
    // 清空
    galleryElement.textContent = "";
    // 小說資料放入 #worksGallery
    storedNovelArtworkData.forEach(novelArtwork => {
        const artworkElement = document.createElement("div");
        artworkElement.className = "novelWork";

        // 圖片連結
        const imgElement = document.createElement("img");
        imgElement.src = novelArtwork.cover;
        imgElement.alt = novelArtwork.title;
        const imgLinkElement = document.createElement("a");
        imgLinkElement.href = novelArtwork.artworkLink;
        imgLinkElement.className = "novelImg";
        imgLinkElement.appendChild(imgElement);
        
        // 系列連結
        const seriesLinkElement = document.createElement("a");
        seriesLinkElement.href = novelArtwork.seriesLink;
        seriesLinkElement.className = "novelSeries";
        seriesLinkElement.textContent = novelArtwork.seriesName;
        seriesLinkElement.title = novelArtwork.seriesName;

        // 標題連結
        const titleLinkElement = document.createElement("a");
        titleLinkElement.href = novelArtwork.artworkLink;
        titleLinkElement.className = "novelTitle";
        titleLinkElement.textContent = novelArtwork.title;
        titleLinkElement.title = novelArtwork.title;
        
        // 作者連結
        const authorLinkElement = document.createElement("a");
        authorLinkElement.href = novelArtwork.artistLink;
        authorLinkElement.className = "novelAuthor";
        authorLinkElement.textContent = novelArtwork.author;
        authorLinkElement.title = novelArtwork.author;

        // 說明
        const descriptionElement = document.createElement("p");
        descriptionElement.className = "novelDescription";
        descriptionElement.textContent = novelArtwork.description;

        // 標籤
        const tagsElement = document.createElement("div");
        tagsElement.className = "novelTags";
        for (const tag of novelArtwork.tags) {
            const tagElement = document.createElement("a");
            tagElement.textContent = '#' + tag;
            tagsElement.appendChild(tagElement);
        }        

        // 字數
        const wordCountElement = document.createElement("p");
        wordCountElement.className = "novelWordCount";
        wordCountElement.textContent = novelArtwork.wordCount + '字';

        // 投稿日期            
        const publishTimeElement = document.createElement("p");
        publishTimeElement.className = "novelPublishTime";
        publishTimeElement.textContent = formatTimeDifference(novelArtwork.publishTime);

        // 喜歡數量
        const likesElement = document.createElement("p");
        likesElement.className = "novelLikes";
        likesElement.textContent = novelArtwork.likes;
        
        const info1Element = document.createElement("div");
        info1Element.className = "novelInfo1";
        info1Element.appendChild(imgLinkElement);

        const info2Element = document.createElement("div");
        info2Element.className = "novelInfo2";
        info2Element.appendChild(seriesLinkElement);
        info2Element.appendChild(titleLinkElement);
        info2Element.appendChild(authorLinkElement);
        info2Element.appendChild(descriptionElement);
        info2Element.appendChild(tagsElement);

        const info3Element = document.createElement("div");
        info3Element.className = "novelInfo3";
        info3Element.appendChild(wordCountElement);
        info3Element.appendChild(publishTimeElement);
        info3Element.appendChild(likesElement);
        info2Element.appendChild(info3Element);

        const infoElement = document.createElement("div");
        infoElement.className = "novelInfo";
        artworkElement.appendChild(info1Element);
        artworkElement.appendChild(info2Element);

        galleryElement.appendChild(artworkElement);
    });
}




/* 捲動到頂部 */
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// 初始顯示小說
workTypeSelection('novel');