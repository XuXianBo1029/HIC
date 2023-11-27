// 目前選擇哪個類型的作品 初始為小說類型
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

// 點擊搜尋欄、展開button以外的地方不顯示
document.addEventListener('click', function (event) {
    const searchContainer = document.getElementById('searchContainer');
    const submittedWorkButton = document.getElementById('submittedWorkButton');
    const accountButton = document.getElementById('accountButton');
  
    if (!searchContainer.contains(event.target)) {
        document.getElementById('searchResults').style.display = 'none';
    }

    if (!submittedWorkButton.contains(event.target)) {
        document.getElementById('submissionOptions').style.display = 'none';
    }

    if (!accountButton.contains(event.target)) {
        document.getElementById('accountOptions').style.display = 'none';
    }
});

// 監控搜尋欄輸入改變事件
document.getElementById('searchInput').addEventListener('input', function () {
    let inputTags = document.getElementById('searchInput').value;

    // 如果沒有輸入 或 最後一個字是空格就不顯示
    if (inputTags.length == 0 || inputTags.charAt(inputTags.length - 1) === ' ') {
        document.getElementById('searchResults').style.display = 'none';
        return;
    }
    
    // 去除前後空格
    inputTags = inputTags.trim();

    // 使用正規表達式替換多個空白為單一空白，如果沒有輸入就是空陣列
    inputTags = (inputTags !== '') ? inputTags.replace(/\s+/g, ' ').split(' ') : [];        

    if (inputTags.length > 0) {
        // 最後一個標籤
        const inputLastWord = inputTags[inputTags.length - 1];

        // 過濾所有開頭為字串的標籤
        const filteredTagsData = allTags.filter(tag => tag.startsWith(inputLastWord));
        // console.log('filteredTagsData' + filteredTagsData);

        // 如果過濾有標籤
        if (filteredTagsData.length > 0) {
            // 更新搜尋標籤結果
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '';

            filteredTagsData.forEach(result => {
                const li = document.createElement('li');
                li.textContent = result;
                searchResults.appendChild(li);
            });

            searchResults.style.display = 'block';
        } else {
            document.getElementById('searchResults').style.display = 'none';
        }
    } else {
        // 如果沒有輸入 隱藏搜尋結果
        document.getElementById('searchResults').style.display = 'none';
    }
});

// 開始搜尋有關tag作品
document.getElementById('searchForm').addEventListener('submit', function (event) {
    // 防止預設表單提交行為
    event.preventDefault();

    // 如果選擇小說類型
    if (selectedWorkType == 'novel') {
        loadNovel(1);
    // 如果選擇插畫類型
    } else if (selectedWorkType == 'illustration') {
        loadIllustration(1);
    // 如果選擇漫畫類型
    } else if (selectedWorkType == 'comic') {
        //loadcomic(1);
    }

    document.getElementById('searchResults').style.display = 'none';
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
        loadNovel(1);

        illustrationWorkTypeButton.disabled = false;
        comicWorkTypeButton.disabled = false;

        illustrationWorkTypeButton.classList.remove('no-hover');
        comicWorkTypeButton.classList.remove('no-hover');

        novelWorkTypeButton.style.borderTop = "3px solid blue";
    // 如果選擇插畫類型
    } else if (selectedWorkType == 'illustration') {
        loadIllustration(1);

        novelWorkTypeButton.disabled = false;
        comicWorkTypeButton.disabled = false;
        
        novelWorkTypeButton.classList.remove('no-hover');
        comicWorkTypeButton.classList.remove('no-hover');

        illustrationWorkTypeButton.style.borderTop = "3px solid blue";
    // 如果選擇漫畫類型
    } else if (selectedWorkType == 'comic') {
        //loadComic(1);
        
        novelWorkTypeButton.disabled = false;
        illustrationWorkTypeButton.disabled = false;

        novelWorkTypeButton.classList.remove('no-hover');
        illustrationWorkTypeButton.classList.remove('no-hover');

        comicWorkTypeButton.style.borderTop = "3px solid blue";        
    }
}

/* 生成分頁 */
function generatePagination(numberOfFilteredNovels, artworksPerPage, selectPage) {
    // 總共會有多少頁數
    const totalPages = Math.ceil(numberOfFilteredNovels / artworksPerPage);    

    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    // 生成第一頁
    const firstPageLink = document.createElement('a');
    firstPageLink.id = `firstPage`;
    firstPageLink.innerHTML = '<i class="fa fa-angle-double-left" aria-hidden="true"></i>';
    firstPageLink.onclick = function() {
        goToPage(1);
    };
    paginationContainer.appendChild(firstPageLink);
    if (selectPage < 5) {
        firstPageLink.style.visibility = 'hidden';
    }

    // 生成頁數
    let minPage, maxPage;
    // 總頁數大於7 一定會生成7頁
    if (totalPages > 7) {
        if (selectPage + 3 <= 7) {
            minPage = 1;
            maxPage = 7;
        } else if (selectPage + 3 >= totalPages) {
            minPage = totalPages - 6;
            maxPage = totalPages;
        } else {
            minPage = selectPage - 3;
            maxPage = selectPage + 3;
        }
    } else {
        minPage = 1;
        maxPage = totalPages;
    }

    // 生成頁數
    for (let i = minPage; i <= maxPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.id = `page${i}`;
        pageLink.textContent = i;
        pageLink.onclick = function() {
            goToPage(i);
        };

        if (i === selectPage) {
            pageLink.classList.add('selectedPage');
        }

        paginationContainer.appendChild(pageLink);
    }

    // 生成最後一頁
    const lastPageLink = document.createElement('a');
    lastPageLink.id = `lastPage`;
    lastPageLink.innerHTML = '<i class="fa fa-angle-double-right" aria-hidden="true"></i>';
    lastPageLink.onclick = function() {
        goToPage(totalPages);
    };
    paginationContainer.appendChild(lastPageLink);
    if (totalPages - 3 <= selectPage) {
        lastPageLink.style.visibility = 'hidden';
    }
}

/* 去第幾頁 */
function goToPage(selectPage) {
    if (selectedWorkType == 'novel') {
        loadNovel(selectPage);
    } else if (selectedWorkType == 'illustration') {
        loadIllustration(selectPage);
    } else if (selectedWorkType == 'comic') {
        //loadComic(selectPage);
    }
}

/* 讀取小說資料第幾頁 */
function loadNovel(selectPage) {
    // 取得搜尋標籤
    let inputTags = document.getElementById('searchInput').value.trim();

    // 使用正規表達式替換多個空白為單一空白，如果沒有輸入就是空陣列
    inputTags = (inputTags !== '') ? inputTags.replace(/\s+/g, ' ').split(' ') : [];
    
    document.getElementById('searchTags').textContent = inputTags.join(' ');

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

    document.getElementById('searchTagsCount').textContent = numberOfFilteredNovels + ' 作品';

    // 使用 slice 函數從 filteredNovels 中提取指定範圍的元素
    // 範圍為第(page - 1) * 20 + 1 個作品 到 第(page - 1) * 20 + 20 個作品
    let startIndex = (selectPage - 1) * 20;
    let endIndex = Math.min(startIndex + 20, filteredNovels.length);
    const paginatedNovels = filteredNovels.slice(startIndex, endIndex);

    // 生成分頁
    generatePagination(numberOfFilteredNovels, 20, selectPage);

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

/* 讀取插畫資料第幾頁 */
function loadIllustration(selectPage) {
    // 取得搜尋標籤
    let inputTags = document.getElementById('searchInput').value.trim();

    // 使用正規表達式替換多個空白為單一空白，如果沒有輸入就是空陣列
    inputTags = (inputTags !== '') ? inputTags.replace(/\s+/g, ' ').split(' ') : [];
    
    document.getElementById('searchTags').textContent = inputTags.join(' ');

    let filteredIllustrations;
    
    if (inputTags.length > 0) {
        // 使用 filter 函數過濾符合搜尋標籤的插畫
        filteredIllustrations = illustrationArtworkData.filter(illustration => {
            // 使用 every 函數檢查 illustration 的 tags 是否包含所有搜尋標籤
            return inputTags.every(searchTag => illustration.tags.includes(searchTag));
        });
    } else {
        // 搜尋標籤沒有輸入標籤則不過濾標籤
        filteredIllustrations = illustrationArtworkData;
    }

    // 取得共有多少個作品
    const numberOfFilteredIllustrations = filteredIllustrations.length;

    document.getElementById('searchTagsCount').textContent = numberOfFilteredIllustrations + ' 作品';

    // 使用 slice 函數從 filteredIllustrations 中提取指定範圍的元素
    // 範圍為第(page - 1) * 20 + 1 個作品 到 第(page - 1) * 20 + 20 個作品
    let startIndex = (selectPage - 1) * 20;
    let endIndex = Math.min(startIndex + 20, filteredIllustrations.length);
    const paginatedIllustrations = filteredIllustrations.slice(startIndex, endIndex);

    // 生成分頁
    generatePagination(numberOfFilteredIllustrations, 20, selectPage);

    const galleryElement = document.getElementById("worksGallery");

    galleryElement.textContent = "";

    // 插畫資料放入 #worksGallery
    paginatedIllustrations.forEach(illustrationArtwork => {
        const artworkElement = document.createElement("div");
        artworkElement.className = "illustrationWork";

        // 圖片連結
        const imgElement = document.createElement("img");
        imgElement.src = illustrationArtwork.preview;
        imgElement.alt = illustrationArtwork.title;
        const imgLinkElement = document.createElement("a");
        imgLinkElement.href = illustrationArtwork.artworkLink;
        imgLinkElement.className = "illustrationImg";
        imgLinkElement.appendChild(imgElement);

        // 標題連結
        const titleLinkElement = document.createElement("a");
        titleLinkElement.href = illustrationArtwork.artworkLink;
        titleLinkElement.className = "illustrationTitle";
        titleLinkElement.textContent = illustrationArtwork.title;
        titleLinkElement.title = illustrationArtwork.title;
        
        // 作者連結
        const authorLinkElement = document.createElement("a");
        authorLinkElement.href = illustrationArtwork.artistLink;
        authorLinkElement.className = "illustrationAuthor";
        authorLinkElement.textContent = illustrationArtwork.author;
        authorLinkElement.title = illustrationArtwork.author;

        /*
        // 標籤
        const tagsElement = document.createElement("div");
        tagsElement.className = "illustrationTags";
        for (const tag of illustrationArtwork.tags) {
            const tagElement = document.createElement("a");
            tagElement.textContent = '#' + tag;
            tagsElement.appendChild(tagElement);
        }
        */
        /*
        // 投稿日期            
        const publishTimeElement = document.createElement("p");
        publishTimeElement.className = "illustrationPublishTime";
        publishTimeElement.textContent = formatTimeDifference(illustrationArtwork.publishTime);
        */
        /*
        // 喜歡數量
        const likesElement = document.createElement("p");
        likesElement.className = "illustrationLikes";
        likesElement.textContent = illustrationArtwork.likes;
        */
       
        const info1Element = document.createElement("div");
        info1Element.className = "illustrationInfo1";
        info1Element.appendChild(imgLinkElement);

        const info2Element = document.createElement("div");
        info2Element.className = "illustrationInfo2";
        info2Element.appendChild(titleLinkElement);
        info2Element.appendChild(authorLinkElement);
        // info2Element.appendChild(tagsElement);

        const info3Element = document.createElement("div");
        info3Element.className = "illustrationInfo3";
        // info3Element.appendChild(publishTimeElement);
        // info3Element.appendChild(likesElement);
        info2Element.appendChild(info3Element);

        const infoElement = document.createElement("div");
        infoElement.className = "illustrationInfo";
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
