// 目前選擇哪個類型的作品 初始為小說
let selectedWorkType = 'novel';

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
    
    const filteredTagsData = allTagsData.filter(item => item.tagName && item.tagName.startsWith(prefix));
    
    updateResults(filteredTagsData);
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
    let options = document.getElementById('submissionOptions');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

/* 切換主題 */
function toggleTheme(buttonElement) {
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

/* 展開投稿作品選項 */
function expendAccountOptions() {
    let options = document.getElementById('accountOptions');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

/* 顯示選擇作品類型 */
function workTypeSelection(workType) {
    selectedWorkType = workType;

    // 清除worksGallery
    document.getElementById("worksGallery").innerHTML = "";

    let novelWorkTypeButton = document.getElementById("novelWorkTypeButton");
    let illustrationWorkTypeButton = document.getElementById("illustrationWorkTypeButton");
    let comicWorkTypeButton = document.getElementById("comicWorkTypeButton");
    // button都設為不能按、沒邊框
    novelWorkTypeButton.disabled = true;
    illustrationWorkTypeButton.disabled = true;
    comicWorkTypeButton.disabled = true;

    novelWorkTypeButton.style.border = "none";
    illustrationWorkTypeButton.style.border = "none";
    comicWorkTypeButton.style.border = "none";

    novelWorkTypeButton.classList.add('no-hover');
    illustrationWorkTypeButton.classList.add('no-hover');
    comicWorkTypeButton.classList.add('no-hover');

    // 如果選擇小說類型
    if (selectedWorkType == 'novel') {
        loadnovel(1);

        illustrationWorkTypeButton.disabled = false;
        comicWorkTypeButton.disabled = false;

        illustrationWorkTypeButton.classList.remove('no-hover');
        comicWorkTypeButton.classList.remove('no-hover');

        novelWorkTypeButton.style.borderTop = "3px solid blue";
    // 如果選擇插畫類型
    } else if (selectedWorkType == 'illustration') {
        //loadillustration(1);

        novelWorkTypeButton.disabled = false;
        comicWorkTypeButton.disabled = false;
        
        novelWorkTypeButton.classList.remove('no-hover');
        comicWorkTypeButton.classList.remove('no-hover');

        illustrationWorkTypeButton.style.borderTop = "3px solid blue";
    // 如果選擇漫畫類型
    } else if (selectedWorkType == 'comic') {
        //loadcomic(1);
        
        novelWorkTypeButton.disabled = false;
        illustrationWorkTypeButton.disabled = false;

        novelWorkTypeButton.classList.remove('no-hover');
        illustrationWorkTypeButton.classList.remove('no-hover');

        comicWorkTypeButton.style.borderTop = "3px solid blue";        
    }
}

/* 讀取小說資料第幾頁 */
function loadnovel(page) {
    // 取得搜尋標籤
    let inputTags = document.getElementById('searchInput').value.trim();

    // 使用正規表達式替換多個空白為單一空白，如果沒有輸入就是空陣列
    inputTags = (inputTags !== '') ? inputTags.replace(/\s+/g, ' ').split(' ') : [];
    
    document.getElementById('tags').textContent = inputTags.join(' ');

    let filteredNovels;
    
    if (inputTags.length > 0) {
        // 使用 filter 函數過濾符合搜尋標籤的小說
        filteredNovels = novelArtworkData.filter(novel => {
            // 使用 every 函數檢查 novel 的 tags 是否包含所有搜尋標籤
            return inputTags.every(searchTag => novel.tags.includes(searchTag));
        });
    } else {
        // 搜尋標籤沒有輸入標籤則不過濾標籤
        filteredNovels = novelArtworkData;
    }

    // 取得共有多少個作品
    const numberOfFilteredNovels = filteredNovels.length;

    document.getElementById('tagsCount').textContent = numberOfFilteredNovels + ' 作品';

    // 使用 slice 函數從 filteredNovels 中提取指定範圍的元素
    // 範圍為第(page - 1) * 20 + 1 個作品 到 第(page - 1) * 20 + 20 個作品
    let startIndex = (page - 1) * 20;
    const paginatedNovels = filteredNovels.slice(startIndex, startIndex + 20);

    const galleryElement = document.getElementById("worksGallery");

    galleryElement.textContent = "";

    // 小說資料放入 #worksGallery
    paginatedNovels.forEach(novelArtwork => {
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
