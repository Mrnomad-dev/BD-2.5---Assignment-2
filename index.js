const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();

app.use(cors());
const port = 3000;

let stocks = [
  {
    id: 1,
    name: 'reliance industries',
    price: 2500,
    growth: 3.5,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 2,
    name: 'hdfc bank',
    price: 1800,
    growth: 4.2,
    industry: 'finance',
    exchange: 'bse',
  },
  {
    id: 3,
    name: 'icici bank',
    price: 1600,
    growth: 5.1,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 4,
    name: 'tata consultancy services',
    price: 3200,
    growth: 2.9,
    industry: 'finance',
    exchange: 'bse',
    price: 1900,
  },
  {
    id: 5,
    name: 'infosys',
    price: 2900,
    growth: 3.8,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 6,
    name: "dr. reddy's laboratories",
    price: 2100,
    growth: 4.7,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 7,
    name: 'sun pharmaceutical',
    price: 2300,
    growth: 3.2,
    industry: 'pharma',
    exchange: 'nse',
  },
  {
    id: 8,
    name: 'cipla',
    growth: 2.6,
    price: 2100,
    exchange: 'bse',
    industry: 'pharma',
  },
  {
    id: 9,
    name: 'ntpc',
    price: 1200,
    growth: 4.1,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 10,
    name: 'power grid corporation',
    price: 1500,
    growth: 3.4,
    industry: 'power',
    exchange: 'bse',
  },
  {
    id: 11,
    name: 'adani power',
    price: 2200,
    growth: 5.3,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 12,
    name: 'lupin',
    price: 2000,
    growth: 4.5,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 13,
    name: 'axis bank',
    price: 1750,
    growth: 2.8,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 14,
    name: 'state bank of india',
    price: 1450,
    growth: 3.6,
    industry: 'finance',
    exchange: 'bse',
  },
  {
    id: 15,
    name: 'bajaj finance',
    price: 2650,
    growth: -2.9,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 16,
    name: "dr. reddy's laboratories",
    price: 1950,
    growth: 4.3,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 17,
    name: 'biocon',
    price: 1850,
    growth: 3.9,
    industry: 'pharma',
    exchange: 'nse',
  },
  {
    id: 18,
    name: 'torrent power',
    price: 1600,
    growth: 2.4,
    industry: 'power',
    exchange: 'bse',
  },
  {
    id: 19,
    name: 'tata power',
    price: 1750,
    growth: 4.0,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 20,
    name: 'jsw energy',
    price: 1450,
    growth: 3.1,
    industry: 'power',
    exchange: 'bse',
  },
];

//function Get the stocks sorted by pricing
function priceHighToLow(stock1, stock2) {
  return stock1.price - stock2.price;
}
function priceLowToHigh(stock1, stock2) {
  return stock2.price - stock1.price;
}
//Endpoint 1.1: Get the stocks sorted by pricing(low-to-high)
app.get('/stocks/sort/pricing', (req, res) => {
  let stockCopy = stocks.slice();
  let pricing = req.query.pricing;
  if (pricing === 'high-to-low') {
    stockCopy.sort(priceHighToLow); // Sort high-to-low
  } else {
    stockCopy.sort(priceLowToHigh); // Default: Sort low-to-high
  }
  res.json({ stocks: stockCopy });
});
//stocks/sort/pricing?pricing=high-to-low
//stocks/sort/pricing?pricing=low-to-high

//function to Get the stocks sorted based on their Growth(High to low)
function growthHighToLow(stock1, stock2) {
  return stock2.growth - stock1.growth;
}
//high to low
function growthLowToHigh(stock1, stock2) {
  return stock1.growth - stock2.growth;
}
//Endpoint 2: Get the stocks sorted based on their Growth
app.get('/stocks/sort/growth', (req, res) => {
  let sortedStocks = stocks.slice();
  let growth = req.query.growth;
  if (growth === 'high-to-low') {
    sortedStocks.sort(growthHighToLow);
  } else {
    sortedStocks.sort(growthLowToHigh);
  }
  res.json({ stocks: sortedStocks });
});
//stocks/sort/growth?growth=high-to-low
//stocks/sort/growth?growth=low-to-high

//function for
function filterByExchange(stock1, exchange) {
  return stock1.exchange.toLowerCase() === exchange.toLowerCase();
}
//Endpoint 3: Filter the stocks based on the 2 Stock Exchange (NSE. and BSE)
app.get('/stocks/filter/exchange', (req, res) => {
  let exchange = req.query.exchange;
  let checkExchange = stocks.filter((stock1) =>
    filterByExchange(stock1, exchange)
  );
  res.json({ stocks: checkExchange });
});
//stocks/filter/exchange?exchange=nse
//stocks/filter/exchange?exchange=bse

//function to industrial sector
function filterByIndustry(stock1, industry) {
  return stock1.industry.toLowerCase() === industry.toLowerCase();
}
//Endpoint 4: Filter the stocks based on the Industrial Sector
app.get('/stocks/filter/industry', (req, res) => {
  let industry = req.query.industry;
  let checkIndustry = stocks.filter((stock1) =>
    filterByIndustry(stock1, industry)
  );
  res.json({ stocks: checkIndustry });
});
//stocks/filter/industry?industry=Finance
//stocks/filter/industry?industry=Pharma
//stocks/filter/industry?industry=Power

//Endpoint 5: Send all available stocks
app.get('/stocks', (req, res) => {
  res.json({ stocks: stocks });
});
//stocks

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
