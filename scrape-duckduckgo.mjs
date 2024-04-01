import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://duckduckgo.com/');
    await page.type('input[name=q]', 'samiulabir201 github');
    await page.keyboard.press('Enter');
    
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    const links = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('a.result__a').forEach(link => {
        links.push(link.href);
      });
      return links;
    });

    console.log('Search was successful');
    console.log('Links:');
    links.forEach(link => console.log(link));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();

// node --experimental-modules scrape-duckduckgo.mjs