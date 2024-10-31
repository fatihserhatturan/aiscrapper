import axios from 'axios';

export interface LoggingResponse {
    success: boolean,
    result: string;          // Kayıt içeriği
    screenshots: string[];   // Ekran görüntüleri listesi
}


export async function StartLogging(text: string):  Promise<LoggingResponse> {
   
   try {
    const response = await axios.get('http://localhost:3000/start-log', {
        params: { url: text }
      });
     
    const screenshots = (response.data.screenshots || []).map((path: string) => {
        const fileName = path.split('/').pop(); // Dosya adını alır
        return `http://localhost:3000/log-screenshots/${fileName}`; // Sunucu URL'sine göre günceller
    });

    const resultStringData = formatEventLogs(response.data.result);

    return {
        success : response.data.success,
        result: resultStringData,
        screenshots: screenshots || [] // API yanıtından ekran görüntüleri
    };
  } catch (error) {
    console.error('Sayfa içeriğini kazıma hatası:', error);
  }

  return {
    success : false,
    result: 'An error occurred during code generation.',
    screenshots: [] // Hata durumunda boş bir liste döndür
  };
 

}

function formatEventLogs(eventLogs : string[]) {
    return eventLogs.map(log => {
        // Replace \n with line breaks and remove extra escape characters for better readability
        let formattedLog = log.replace(/\\n/g, '\n').replace(/\\"/g, '"');
        
        // Optionally, you can parse certain parts of JSON within the string for further formatting.
        const elementIndex = formattedLog.indexOf('Element: {');
        if (elementIndex !== -1) {
            const elementJsonStr = formattedLog.slice(elementIndex + 'Element: '.length);
            try {
                const elementObject = JSON.parse(elementJsonStr);
                formattedLog = formattedLog.slice(0, elementIndex) + 'Element:\n' + JSON.stringify(elementObject, null, 2);
            } catch (error) {
                console.log("Error parsing JSON:", error);
            }
        }
        
        return formattedLog;
    }).join('\n\n');  // Join all logs with two new lines for spacing between entries
}
