import axios from 'axios';


export async function scrapePage(url: string) {
   console.log('Scraping page:', url);
   let scrapedContent: string | null = null;

   try {
    const response = await axios.get('http://localhost:3000/scrape', {
      params: { url: url }
    });
    scrapedContent = response.data;
    return scrapedContent;
  } catch (error) {
    console.error('Sayfa içeriğini kazıma hatası:', error);
  }

  if(scrapedContent !== null) {
    console.log('Scraped content:', scrapedContent);
  }
  else{
    console.log('Scraped content is null');
  }


}
