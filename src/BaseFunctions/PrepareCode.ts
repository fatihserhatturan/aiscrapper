import axios from 'axios';

export interface CodePreapareResponse {
    result: string;          // Kayıt içeriği
    screenshots: string[];   // Ekran görüntüleri listesi
}


export async function PrepareCode(text: string):  Promise<CodePreapareResponse> {
   
   try {
    const response = await axios.post('http://localhost:3000/playwright-codegen-prepare-code', {
        text: text  // `text` doğrudan body olarak gönderiliyor
      });
    
    const resultString = response.data.text;
    const screenshots = (response.data.screenshotPaths || []).map((path: string) => {
        const fileName = path.split('/').pop(); // Dosya adını alır
        return `http://localhost:3000/screenshots/${fileName}`; // Sunucu URL'sine göre günceller
    });

    return {
        result: resultString,
        screenshots: screenshots || [] // API yanıtından ekran görüntüleri
      };
  } catch (error) {
    console.error('Sayfa içeriğini kazıma hatası:', error);
  }

  return {
    result: 'An error occurred during code generation.',
    screenshots: [] // Hata durumunda boş bir liste döndür
  };
 

}
