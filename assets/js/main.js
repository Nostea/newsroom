const formSearch = document.querySelector("#formSearch");
const searchButton = document.querySelector("#searchButton");
const newsCardsOutput = document.querySelector(".news-result");

const getNews = () => {
  const apiKey = "d56d0768e4fa4fae9fb74acc41622ec7";
  let language = document.querySelector("#languageSelection").value;
  let searchKeywordValue = document.querySelector("#searchKeywords").value;
  const sortByValue = document.querySelector("#sortBy").value;

  const endpointEverything = "top-headlines?";
  const endpointTopHeadlines = "top-headlines";
  const baseURL = "https://newsapi.org/v2/";

  //let newsAPI = `${baseURL}${sortByValue}?q=${searchKeywordValue}&apiKey=${apiKey}`;
  // wrong let newsAPI = `https://newsapi.org/v2/everything?q=${searchKeywordValue}&language=${languageSelectedValue}&apiKey=d56d0768e4fa4fae9fb74acc41622ec7`;
  let newsAPI = `${baseURL}everything?q="all"&language=${language}&sortBy=${sortByValue}&apiKey=${apiKey}`;
  let newsAPIkeyword = `${baseURL}everything?q=${searchKeywordValue}&language=${language}&sortBy=${sortByValue}&apiKey=${apiKey}`;
  fetch(newsAPI)
    .then((responseNews) => responseNews.json())
    .then((newsData) => {
      console.log(newsData);
      if (searchKeywordValue <= 0) {
        newsData.articles.forEach((articleItem) => {
          if (articleItem.urlToImage != null) {
            let card = document.createElement("article");

            card.appendChild(createImg(articleItem.urlToImage));
            card.appendChild(createTitle(articleItem.title));
            card.appendChild(createDate(articleItem.publishedAt));
            card.appendChild(createAuthorTextItem(articleItem.author));
            card.appendChild(createDescriptionTextItem(articleItem.description));
            card.appendChild(createButtonLink(articleItem.url));

            document.querySelector(".news-result").appendChild(card);
          }
        }); //end forEach
      } else {
        fetch(newsAPIkeyword)
          .then((responseNews) => responseNews.json())
          .then((newsData) => {
            newsData.articles.forEach((articleItem) => {
              let card = document.createElement("article");

              card.appendChild(createImg(articleItem.urlToImage));
              card.appendChild(createTitle(articleItem.title));
              card.appendChild(createDate(articleItem.publishedAt));
              card.appendChild(createAuthorTextItem(articleItem.author));
              card.appendChild(createDescriptionTextItem(articleItem.description));
              card.appendChild(createButtonLink(articleItem.url));

              document.querySelector(".news-result").appendChild(card);
            });
          });
      }
    }); // end gotNews()
};

getNews();

// * Create functions to build elements

const createTitle = (title) => {
  let titleElement = document.createElement("h3");
  //title.setAttribute("src", url);
  titleElement.textContent = title;
  return titleElement;
};
const createImg = (url) => {
  let img = document.createElement("img");
  img.setAttribute("src", url);
  return img;
};

const createDate = (date) => {
  let dateElement = document.createElement("time");
  dateElement.setAttribute("datetime", date);
  //title.setAttribute("src", url);
  dateElement.textContent = date;
  return dateElement;
};

const createAuthorTextItem = (author) => {
  let imgAuthor = document.createElement("p"); // create <p> tag, assign it to variable imgAuthor
  imgAuthor.textContent = author; //  text provided by parameter author assigned to (<p>tag / variable imgAuthor)
  return imgAuthor;
};

const createDescriptionTextItem = (description) => {
  let descriptionText = document.createElement("p"); // create <p> tag, assign it to variable imgAuthor
  descriptionText.textContent = description; //  text provided by parameter author assigned to (<p>tag / variable imgAuthor)
  return descriptionText;
};

const createButtonLink = (link) => {
  let cardButtonLink = document.createElement("a");
  cardButtonLink.setAttribute("href", link);
  cardButtonLink.textContent = "See More";
  return cardButtonLink;
};

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  //   console.log("test");
  // * HTML-Output-Feld vor jeder Such ausgabe leeren:
  newsCardsOutput.innerHTML = "";

  // * Funktion für User-Such-Ausgabe aufrufen:
  getNews();
});
