import axios from 'axios';

export interface AnthropicResponse {
    success: boolean; // API'nin başarılı olup olmadığını belirtir
    data: string;     // API'den gelen analiz verisi
}

export async function StartAnthropic(): Promise<AnthropicResponse> {
    try {
        // API'yi axios ile çağır
        const response = await axios.get('http://localhost:3002/analysis-result');

        
        if (response.data && response.data.success) {
            return {
                success: true,
                data: response.data.data
            };
        } else {
            const error = 'Hata';
            const resultString = typeof response.data.data.error === 'object' ? JSON.stringify(response.data.data.error) : error; 
            return {
                success: false,
                data: resultString
            };
        }
    } catch (error) {
        console.error('API çağrısı sırasında bir hata oluştu:', error);
        return {
            success: false,
            data: 'API çağrısı sırasında bir hata oluştu'
        };
    }
}
