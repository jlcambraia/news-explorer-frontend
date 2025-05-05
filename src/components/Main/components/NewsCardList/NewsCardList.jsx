import "./NewsCardList.css";
import NewsCard from "./components/NewsCard/NewsCard";
import notFoundIcon from "../../../../images/not-found-icon.png";

import { useState, useContext } from "react";
import { CurrentPathContext } from "../../../../contexts/CurrentPathContext";

// Criado apenas para desenvolvimento. Apagar depois que buscar informações da api.
const placeholder = [
  {
    source: {
      id: null,
      name: "CNBC",
    },
    author: "Sean Conlon, Hakyung Kim",
    title:
      "Dow futures gain 300 points on solid jobs report, hope for China trade talks: Live updates  CNBC",
    description:
      "The major averages started May on a positive note, with Meta Platforms and Microsoft reigniting the artificial intelligence trade.",
    url: "https://www.cnbc.com/2025/05/01/stockmarkettodayliveupdates.html",
    urlToImage:
      "https://image.cnbcfm.com/api/v1/image/1081393901746113870207NYSE_TradersOBPhoto20250501CCPRESS7.jpg?v=1746114141&w=1920&h=1080",
    publishedAt: "20250502T12:43:00Z",
    content:
      "Stock futures rose early Friday as Wall Street digested a betterthanexpected nonfarm payrolls report for April.\r\nDow Jones Industrial Average futures rose 360 points, or 0.8%, while Nasdaq 100 futu… [+2792 chars]",
  },
  {
    source: {
      id: null,
      name: "CNBC",
    },
    author: "Yun Li",
    title:
      "Berkshire investors hope for Buffett's guidance at annual meeting with tariffs shaking markets, economy  CNBC",
    description:
      "Buffett's annual gathering in the Cornhusker State comes as the investment climate turned less certain thanks to President Trump's aggressive tariff regime.",
    url: "https://www.cnbc.com/2025/05/02/warrenbuffettannualmeetingpreviewberkshirehathaway.html",
    urlToImage:
      "https://image.cnbcfm.com/api/v1/image/1074106221714848634258BuffetAbelBAM0504244.jpg?v=1714848731&w=1920&h=1080",
    publishedAt: "20250502T11:34:00Z",
    content:
      "Warren Buffett has been mum about tariffs and the recent market turmoil, but will finally speak his mind when the 94yearold investment legend kicks off Berkshire Hathaway's annual shareholder meeti… [+4135 chars]",
  },
  {
    source: {
      id: null,
      name: "Financial Times",
    },
    author: "William Langley",
    title:
      "Temu abandons Chinese imports to US as tariffs force overhaul  Financial Times",
    description:
      "Ecommerce company to source all US products from local merchants as ‘de minimis’ tax loophole closed",
    url: "https://www.ft.com/content/d36b6be9dc754d55b9e31ec151252dd4",
    urlToImage:
      "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3240e87bdf7d4557b08900a280ba1488.jpg?source=nextbarrierpage",
    publishedAt: "20250502T11:15:09Z",
    content:
      "Complete digital access to quality analysis and expert insights, complemented with our awardwinning Weekend Print edition.\r\n<ul><li></li>Everything in Print<li></li>Weekday Print Edition<li></li>FT … [+202 chars]",
  },
  {
    source: {
      id: null,
      name: "Barron's",
    },
    author: "Barron's",
    title:
      "Chevron Beats Earnings Expectations. The Stock Is Falling.  Barron's",
    description: null,
    url: "https://www.barrons.com/articles/chevronearningsstockprice90659657",
    urlToImage: null,
    publishedAt: "20250502T10:31:00Z",
    content: null,
  },
  {
    source: {
      id: "wired",
      name: "Wired",
    },
    author: "Aarian Marshall",
    title:
      "The Slowdown at Ports Is a Warning of Rough Economic Seas Ahead  WIRED",
    description:
      "The maritime shipping industry is seeing a rise in “blank sailings,” a shift that one expert calls a “canary in the coal mine.”",
    url: "https://www.wired.com/story/maritimeshippingtariffsblanksailings/",
    urlToImage:
      "https://media.wired.com/photos/6809440f594008534db422ac/191:100/w_1280,c_limit/ContainerShippingSlowingGear210849902.jpg",
    publishedAt: "20250502T09:30:00Z",
    content:
      "The $10 billion container shipping industry, the one that moves boxes full of everything and anything around global seas, has this phenomenon called blank sailings.\r\nTo understand the term of art, th… [+3206 chars]",
  },
  {
    source: {
      id: "techcrunch",
      name: "TechCrunch",
    },
    author: "Ivan Mehta",
    title:
      "Apple changes US App Store rules to let apps link to external payment systems  TechCrunch",
    description:
      "Apple has changed its App Store rules in the U.S. to let apps link users to their own websites so they can buy subscriptions or other digital goods. This",
    url: "https://techcrunch.com/2025/05/02/applechangesusappstorerulestoletappsredirectuserstotheirownwebsitesforpayments/",
    urlToImage:
      "https://techcrunch.com/wpcontent/uploads/2024/01/appstore2024v2.jpg?resize=1200,675",
    publishedAt: "20250502T08:55:29Z",
    content:
      "Apple has changed its App Store rules in the U.S. to let apps link users to their own websites so they can buy subscriptions or other digital goods. \r\nThis change comes after a U.S. court ruled in fa… [+1705 chars]",
  },
  {
    source: {
      id: null,
      name: "WTOP",
    },
    author: "Ciara Wells",
    title:
      "Six Flags America in Prince George’s County to close this fall  WTOP",
    description:
      "Six Flags America and Hurricane Harbor in Prince George’s County, Maryland, will close in November, Six Flags announced.",
    url: "https://wtop.com/princegeorgescounty/2025/05/sixflagsamericainprincegeorgescountytoclosethisfall/",
    urlToImage:
      "https://wtop.com/wpcontent/uploads/2025/02/OpeningDay4Roare1738855840173.jpg",
    publishedAt: "20250502T03:10:38Z",
    content:
      "Six Flags America and Hurricane Harbor in Prince George’s County, Maryland, will close in November.\r\nThe amusement parks are not a “strategic fit” with the company’s longterm growth plan, Six Flags … [+2879 chars]",
  },
  {
    source: {
      id: null,
      name: "Investor's Business Daily",
    },
    author: null,
    title:
      "Dow Jones Futures Rise As China Says It's 'Evaluating' U.S. Trade Talks. Amazon, Apple Fall On Earnings.  Investor's Business Daily",
    description:
      "The S&P 500 and Nasdaq closed above their 50day lines, despite finishing off highs.",
    url: "https://www.investors.com/markettrend/stockmarkettoday/dowjonesfutureschinaevaluatesustradetalksamazonappleearnings/",
    urlToImage:
      "https://www.investors.com/wpcontent/uploads/2025/04/Stockuschinatradetariff01shutt.jpg",
    publishedAt: "20250502T03:05:00Z",
    content:
      "Information in Investors Business Daily is for informational and educational purposes only and should not be construed as an offer, recommendation, solicitation, or rating to buy or sell securities. … [+1064 chars]",
  },
  {
    source: {
      id: "cnn",
      name: "CNN",
    },
    author: "Alexandra Skores",
    title:
      "The first driverless semis have started running regular longhaul routes  CNN",
    description:
      "Driverless trucks are officially running their first regular longhaul routes, making roundtrips between Dallas and Houston.",
    url: "https://www.cnn.com/2025/05/01/business/firstdriverlesssemisstartedregularroutes",
    urlToImage:
      "https://media.cnn.com/api/v1/images/stellar/prod/auroralaunch1.jpg?c=16x9&q=w_800,c_fill",
    publishedAt: "20250502T00:41:00Z",
    content:
      "Driverless trucks are officially running their first regular longhaul routes, making roundtrips between Dallas and Houston.\r\nOn Thursday, autonomous trucking firm Aurora announced it launched commer… [+2406 chars]",
  },
  {
    source: {
      id: "thewallstreetjournal",
      name: "The Wall Street Journal",
    },
    author: "WSJ",
    title:
      "Exclusive | Kohl’s CEO Fired for Funneling Business to Romantic Partner  WSJ",
    description: null,
    url: "https://www.wsj.com/business/retail/kohlsceoashleybuchananfiredinvestigation03936a9a",
    urlToImage: null,
    publishedAt: "20250502T00:22:00Z",
    content: null,
  },
  {
    source: {
      id: "fortune",
      name: "Fortune",
    },
    author: "Verne Kopytoff",
    title:
      "Apple CEO Tim Cook reveals how much Trump’s tariffs will cost the tech giant this quarter  Fortune",
    description:
      "Investors have been eagerly awaiting details about the impact of Trump's tariffs on the tech giant.",
    url: "https://fortune.com/2025/05/01/appleearningstimcooktrumptariffschinaq22025/",
    urlToImage:
      "https://fortune.com/imgassets/wpcontent/uploads/2025/04/GettyImages2198049873e1746047494173.jpg?resize=1200,600",
    publishedAt: "20250502T00:11:00Z",
    content: null,
  },
  {
    source: {
      id: "businessinsider",
      name: "Business Insider",
    },
    author:
      "Filip De Mott, Eugene Kim, Sarah Jackson, Katherine Li, Lakshmi Varanasi, Alex Bitter",
    title:
      "Amazon earnings recap: Company 'maniacally focused on' keeping prices low amid light Q2 guidance  Business Insider",
    description:
      "Amazon's reported earnings that narrowly beat estimates. CEO Andy Jassy said he's optimistic as the company braces for tariffs.",
    url: "https://www.businessinsider.com/amazonearningscallreportamznstockliveupdates20255",
    urlToImage:
      "https://i.insider.com/6813bf94a466d2b74ab4c3f2?width=1200&format=jpeg",
    publishedAt: "20250501T23:11:00Z",
    content:
      "First quarter\r\n* Net sales: $155.67 billion, +8.6% y/y, estimate $155.16 billion\r\n** Online stores net sales: $57.41 billion, +5% y/y, estimate\r\n$56.85 billion\r\n** Physical Stores net sales: $5.53 bi… [+1349 chars]",
  },
  {
    source: {
      id: null,
      name: "BBC News",
    },
    author: null,
    title: "Apple braces for $900m blow from Trump tariffs  BBC",
    description:
      "The technology giant says US tariffs will add around $900m to its costs this quarter.",
    url: "https://www.bbc.com/news/articles/c86jx18y9e2o",
    urlToImage:
      "https://ichef.bbci.co.uk/news/1024/branded_news/ffe1/live/c737811026f211f0abc557500d47969e.jpg",
    publishedAt: "20250501T22:50:00Z",
    content:
      "Lily JamaliNorth America Technology Correspondent\r\nNatalie Sherman\r\nApple says it is shifting production of most iPhones and other devices to be sold in the US away from China, which has been the foc… [+4153 chars]",
  },
  {
    source: {
      id: null,
      name: "News12.com",
    },
    author: null,
    title:
      "Delays continue Friday at Newark Liberty due to construction, staffing issues  News 12  New Jersey",
    description:
      "According to the FAA, more than 400 flights were delayed Thursday afternoon and more than 200 were canceled.",
    url: "https://newjersey.news12.com/delayscontinuefridayatnewarklibertyduetoconstructionstaffingissues",
    urlToImage:
      "https://imagescf.news12static.com/3kqcuzntcg31/2JpH5B2pn4CZIkau9SWKGb/c1618a91ecda1e7dbe19a30e19bb061d/videoframe_5329.png?fit=thumb&w=600&h=340&q=80&fm=webp",
    publishedAt: "20250501T21:51:52Z",
    content: "Topics you care about, straight to your inbox",
  },
  {
    source: {
      id: null,
      name: "MarketWatch",
    },
    author: "Joseph Adinolfi",
    title:
      "Stock market’s rapid rebound from tariffinspired rout stuns Wall Street. But there were signs this would happen.  MarketWatch",
    description: "Several gauges showed stocks had become deeply oversold",
    url: "https://www.marketwatch.com/story/stockmarketsrapidreboundfromtariffinspiredroutstunswallstreetbutthereweresignsthiswouldhappenae9b4296",
    urlToImage: "https://images.mktw.net/im27712697/social",
    publishedAt: "20250501T21:28:00Z",
    content:
      "Barely one month has passed since President Donald Trump blindsided global investors with his aggressive tariff plans. Yet U.S. stocks have already staged a remarkable recovery.\r\nOn Thursday, the S&a… [+108 chars]",
  },
  {
    source: {
      id: null,
      name: "Investor's Business Daily",
    },
    author: "REINHARDT KRAUSE, Investor's Business Daily",
    title:
      "Square Earnings, Revenue, Key Metrics Miss In Q1. Payment Firm Lowers 2025 Guidance.  Investor's Business Daily",
    description:
      "Square stock plunged after payments firm Block reported Q1 earnings and revenue that missed Wall Street estimates and lowered fiscal 2025 guidance.",
    url: "https://www.investors.com/news/technology/squarestockblockstocksquareearningsq12025/",
    urlToImage:
      "https://www.investors.com/wpcontent/uploads/2023/09/StockSquareBlockpayments02company.jpg",
    publishedAt: "20250501T21:14:00Z",
    content:
      "Squareparent Block (XYZ) reported firstquarter earnings, revenue and key financial metrics that missed Wall Street targets. The digital payments company lowered fiscal 2025 guidance for Square stoc… [+2942 chars]",
  },
  {
    source: {
      id: null,
      name: "NPR",
    },
    author: "NPR",
    title: "Ford CEO does the math on Trump's auto tariffs  NPR",
    description:
      "Americans are rushing to car dealerships as they worry about what President Trump's tariffs will do to car prices in the coming months. New vehicle sales have been increasing steadily this year, and they jumped in March, according to market research firm Cox …",
    url: "https://www.npr.org/2025/05/01/1248444368/fordceotalkstrumpautomobiletariffs",
    urlToImage:
      "https://media.npr.org/assets/img/2025/05/01/gettyimages22067243751_wideaa69bb8367d821b3cd382a6842f89b1ec4583030.jpg?s=1400&c=100&f=jpeg",
    publishedAt: "20250501T21:13:53Z",
    content:
      "Ford150 pickup trucks are displayed for sale at a dealership on March 24, 2025 in Austin, Texas.\r\nBrandon Bell/Getty Images\r\nAmericans are rushing to car dealerships as they worry about what Preside… [+1111 chars]",
  },
  {
    source: {
      id: null,
      name: "Investopedia",
    },
    author: "Colin Laidley",
    title:
      "Why Microsoft Stock Had One of Its Best PostEarnings Days in a Decade  Investopedia",
    description:
      "Microsoft stock soared on Thursday after the tech giant’s quarterly results handily beat Wall Street estimates.",
    url: "https://www.investopedia.com/whymicrosoftstockhadoneofitsbestpostearningsdaysinadecade11726613",
    urlToImage:
      "https://www.investopedia.com/thmb/1hPq6Old_FjdBBRgzbmtJ_9Kyqk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/INV_MicrosoftHQ_GettyImages2195894808ae474dd95ea94e02b4232abce1459e6e.jpg",
    publishedAt: "20250501T20:49:57Z",
    content:
      "<ul><li>Microsoft stock rose 7.6% on Thursday, its secondbiggest postearnings jump since 2015.</li><li>Cloudcomputing revenue at the company surged to $27 billion, driven by fasterthanexpected g… [+2428 chars]",
  },
];
// Criado apenas para desenvolvimento. Apagar depois que buscar informações da api.
const savedArticles = [
  {
    source: {
      id: null,
      name: "News12.com",
    },
    author: null,
    title:
      "Delays continue Friday at Newark Liberty due to construction, staffing issues  News 12  New Jersey",
    description:
      "According to the FAA, more than 400 flights were delayed Thursday afternoon and more than 200 were canceled.",
    url: "https://newjersey.news12.com/delayscontinuefridayatnewarklibertyduetoconstructionstaffingissues",
    urlToImage:
      "https://imagescf.news12static.com/3kqcuzntcg31/2JpH5B2pn4CZIkau9SWKGb/c1618a91ecda1e7dbe19a30e19bb061d/videoframe_5329.png?fit=thumb&w=600&h=340&q=80&fm=webp",
    publishedAt: "20250501T21:51:52Z",
    content: "Topics you care about, straight to your inbox",
  },
  {
    source: {
      id: null,
      name: "MarketWatch",
    },
    author: "Joseph Adinolfi",
    title:
      "Stock market’s rapid rebound from tariffinspired rout stuns Wall Street. But there were signs this would happen.  MarketWatch",
    description: "Several gauges showed stocks had become deeply oversold",
    url: "https://www.marketwatch.com/story/stockmarketsrapidreboundfromtariffinspiredroutstunswallstreetbutthereweresignsthiswouldhappenae9b4296",
    urlToImage: "https://images.mktw.net/im27712697/social",
    publishedAt: "20250501T21:28:00Z",
    content:
      "Barely one month has passed since President Donald Trump blindsided global investors with his aggressive tariff plans. Yet U.S. stocks have already staged a remarkable recovery.\r\nOn Thursday, the S&a… [+108 chars]",
  },
  {
    source: {
      id: null,
      name: "Investor's Business Daily",
    },
    author: "REINHARDT KRAUSE, Investor's Business Daily",
    title:
      "Square Earnings, Revenue, Key Metrics Miss In Q1. Payment Firm Lowers 2025 Guidance.  Investor's Business Daily",
    description:
      "Square stock plunged after payments firm Block reported Q1 earnings and revenue that missed Wall Street estimates and lowered fiscal 2025 guidance.",
    url: "https://www.investors.com/news/technology/squarestockblockstocksquareearningsq12025/",
    urlToImage:
      "https://www.investors.com/wpcontent/uploads/2023/09/StockSquareBlockpayments02company.jpg",
    publishedAt: "20250501T21:14:00Z",
    content:
      "Squareparent Block (XYZ) reported firstquarter earnings, revenue and key financial metrics that missed Wall Street targets. The digital payments company lowered fiscal 2025 guidance for Square stoc… [+2942 chars]",
  },
  {
    source: {
      id: null,
      name: "NPR",
    },
    author: "NPR",
    title: "Ford CEO does the math on Trump's auto tariffs  NPR",
    description:
      "Americans are rushing to car dealerships as they worry about what President Trump's tariffs will do to car prices in the coming months. New vehicle sales have been increasing steadily this year, and they jumped in March, according to market research firm Cox …",
    url: "https://www.npr.org/2025/05/01/1248444368/fordceotalkstrumpautomobiletariffs",
    urlToImage:
      "https://media.npr.org/assets/img/2025/05/01/gettyimages22067243751_wideaa69bb8367d821b3cd382a6842f89b1ec4583030.jpg?s=1400&c=100&f=jpeg",
    publishedAt: "20250501T21:13:53Z",
    content:
      "Ford150 pickup trucks are displayed for sale at a dealership on March 24, 2025 in Austin, Texas.\r\nBrandon Bell/Getty Images\r\nAmericans are rushing to car dealerships as they worry about what Preside… [+1111 chars]",
  },
  {
    source: {
      id: null,
      name: "Investopedia",
    },
    author: "Colin Laidley",
    title:
      "Why Microsoft Stock Had One of Its Best PostEarnings Days in a Decade  Investopedia",
    description:
      "Microsoft stock soared on Thursday after the tech giant’s quarterly results handily beat Wall Street estimates.",
    url: "https://www.investopedia.com/whymicrosoftstockhadoneofitsbestpostearningsdaysinadecade11726613",
    urlToImage:
      "https://www.investopedia.com/thmb/1hPq6Old_FjdBBRgzbmtJ_9Kyqk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/INV_MicrosoftHQ_GettyImages2195894808ae474dd95ea94e02b4232abce1459e6e.jpg",
    publishedAt: "20250501T20:49:57Z",
    content:
      "<ul><li>Microsoft stock rose 7.6% on Thursday, its secondbiggest postearnings jump since 2015.</li><li>Cloudcomputing revenue at the company surged to $27 billion, driven by fasterthanexpected g… [+2428 chars]",
  },
];

export default function NewsCardList() {
  const [articlesToRenderize, setArticlesToRenderize] = useState(3);
  // Passar isSearchingForNews para Main e renderizar apenas após submit
  const [isSearchingForNews, setIsSearchingForNews] = useState(false);
  const pathLocation = useContext(CurrentPathContext);

  const handleShowMoreButton = () => {
    setArticlesToRenderize((articles) => articles + 3);
  };

  return (
    <>
      {pathLocation ? (
        isSearchingForNews ? (
          <section className="news-card-list">
            <i className="news-card-list__circle-preloader"></i>
            <p className="news-card-list__text-preloader">
              Searching for news...
            </p>
          </section>
        ) : placeholder.length > 0 ? (
          <section className="news-card-list">
            {pathLocation && (
              <h2 className="news-card-list__title">Search results</h2>
            )}

            <ul className="news-card-list__cards">
              {placeholder.slice(0, articlesToRenderize).map((article) => {
                return <NewsCard key={article.url} article={article} />;
              })}
            </ul>
            {placeholder.length > 3 &&
              articlesToRenderize < placeholder.length && (
                <button
                  onClick={handleShowMoreButton}
                  className="news-card-list__button"
                >
                  Show more
                </button>
              )}
          </section>
        ) : (
          <section className="news-card-list">
            <img
              className="news-card-list__not-found-icon"
              src={notFoundIcon}
              alt="Ícone de artigo não encontrado"
            />
            <h3 className="news-card-list__not-found-title">Nothing found</h3>
            <p className="news-card-list__not-found-subtitle">
              Sorry, but nothing matched your search terms.
            </p>
          </section>
        )
      ) : (
        savedArticles.length > 0 && (
          <section className="news-card-list">
            <ul className="news-card-list__cards">
              {savedArticles.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))}
            </ul>
          </section>
        )
      )}
    </>
  );
}
