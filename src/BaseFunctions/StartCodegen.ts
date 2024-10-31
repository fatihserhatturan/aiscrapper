import axios from 'axios';

export interface CodegenResponse {
    result: string;          // Kayıt içeriği
    screenshots: string[];   // Ekran görüntüleri listesi
}


export async function StartCodegen(url: string) {
   
   try {
    const response = await axios.get('http://localhost:3000/playwright-codegen-new', {
      params: { url: url }
    });
    
  } catch (error) {
    console.error('Sayfa içeriğini kazıma hatası:', error);
  }

}
