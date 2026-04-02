const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const games = [
  { id: 'wuthering-waves', url: 'https://wutheringwaves.fandom.com/wiki/Wuthering_Waves' },
  { id: 'genshin-impact', url: 'https://genshin-impact.fandom.com/wiki/Genshin_Impact' },
  { id: 'honkai-star-rail', url: 'https://honkai-star-rail.fandom.com/wiki/Honkai:_Star_Rail' },
  { id: 'zenless-zone-zero', url: 'https://zenless-zone-zero.fandom.com/wiki/Zenless_Zone_Zero' },
  { id: 'arknights-endfield', url: 'https://arknights.fandom.com/wiki/Arknights:_Endfield' },
  { id: 'nikke', url: 'https://nikke-goddess-of-victory-international.fandom.com/wiki/GODDESS_OF_VICTORY:_NIKKE' }
];

async function scrapeStaticData() {
  console.log('Iniciando Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new', // Usa el nuevo modo Headless (más eficiente/estable)
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-dev-shm-usage', // Previene crashes de memoria
      '--disable-gpu'
    ]
  });

  const results = {};

  for (const game of games) {
    console.log(`\nExtrayendo datos de: ${game.id} (${game.url})`);
    const page = await browser.newPage();

    try {
      // Configuraciones defensivas para evitar ser bloqueados
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      // La intercepcion de red está comentada para evitar bloqueos anti-bot por Cloudflare
      // await page.setRequestInterception(true);
      // page.on('request', (req) => {
      //   if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
      //     req.abort();
      //   } else {
      //     req.continue();
      //   }
      // });

      await page.goto(game.url, { waitUntil: 'domcontentloaded', timeout: 60000 });

      const data = await page.evaluate(() => {
        const result = {
          name: 'TBD',
          developer: 'TBD',
          publisher: 'TBD',
          releaseDate: 'TBD',
          platforms: [],
          genres: [],
          description: 'TBD'
        };

        // 3. Limpieza Agresiva de Datos y Referencias [1]
        const cleanText = (text) => text.replace(/\[\d+\]/g, '').trim();

        const cleanArray = (text) => {
            // Reemplazar saltos de línea por comas (ej. Action\nRPG -> Action,RPG)
            const normalized = text.replace(/\n/g, ',');
            return cleanText(normalized).split(',').map(s => s.trim()).filter(s => s);
        };

        // 2. Estrategia de Fallback Inteligente
        const extractField = (labelMatches, isArray = false) => {
            const lowerMatches = labelMatches.map(m => m.toLowerCase());
            
            // Ruta A: Atributos data-source en .portable-infobox (Estructura Estándar Fandom)
            for (const source of labelMatches) {
                const el = document.querySelector(`.portable-infobox .pi-item[data-source="${source}"] .pi-data-value`)
                        || document.querySelector(`.portable-infobox .pi-item[data-source="${source.toLowerCase()}"] .pi-data-value`);
                if (el) {
                    if (isArray) {
                        const links = Array.from(el.querySelectorAll('a')).map(a => cleanText(a.innerText)).filter(t => t);
                        if(links.length > 0) return links;
                        return cleanArray(el.innerText);
                    }
                    return cleanText(el.innerText);
                }
            }

            // Ruta B: Tablas HTML clásicas (<table>) o contenedores de labels manuales
            const labels = document.querySelectorAll('th, td, .pi-data-label');
            for (const label of labels) {
                const text = cleanText(label.innerText).toLowerCase();
                // Coincidencia exacta ignorando saltos de línea o con formato "Developer:"
                const exactMatch = lowerMatches.some(m => text === m || text === `${m}:`);
                
                if (exactMatch) {
                    // Si es un TH o label, el dato real está en el elemento siguiente contiguo (ej. TD o pi-data-value)
                    const sibling = label.nextElementSibling;
                    if (sibling) {
                        if (isArray) {
                            const links = Array.from(sibling.querySelectorAll('a')).map(a => cleanText(a.innerText)).filter(t => t);
                            if (links.length > 0) return links;
                            return cleanArray(sibling.innerText);
                        }
                        return cleanText(sibling.innerText);
                    }
                }
            }

            return isArray ? [] : 'TBD';
        };

        // Extraer Nombre Global del Artículo
        try {
          const titleEl = document.querySelector('h1.page-header__title, #firstHeading');
          if (titleEl) result.name = cleanText(titleEl.innerText);
        } catch (e) {}

        // Poblar Metadatos utilizando las estrategias híbridas
        result.developer = extractField(['developer', 'Developer', 'developer(s)', 'Developer(s)']);
        result.publisher = extractField(['publisher', 'Publisher', 'publisher(s)', 'Publisher(s)']);
        result.releaseDate = extractField(['release date', 'Release Date', 'release', 'Release']);
        result.platforms = extractField(['platforms', 'Platforms', 'platform', 'Platform'], true);
        result.genres = extractField(['genre', 'Genre', 'genres', 'Genres'], true);

        // 4. Selector de Descripción Filtrado (Limpieza agresiva)
        try {
          // Excluimos párrafos con clases para evadir cuadros de diálogo <p class="...">
          const paragraphs = document.querySelectorAll('#mw-content-text .mw-parser-output > p:not([class])');
          const validParagraphs = Array.from(paragraphs)
            .map(p => cleanText(p.innerText))
            .filter(text => text.length > 100);

          if (validParagraphs.length > 0) {
              result.description = validParagraphs[0];
          }
        } catch (e) {}

        return result;
      });

      results[game.id] = { id: game.id, ...data };
      console.log(`[OK] Extraído: ${data.name}`);
    } catch (error) {
      console.error(`[ERROR] Falló extracción para ${game.id}: ${error.message}`);
      // Fallback protegido
      results[game.id] = {
        id: game.id,
        name: 'TBD',
        developer: 'TBD',
        publisher: 'TBD',
        releaseDate: 'TBD',
        platforms: [],
        genres: [],
        description: 'TBD'
      };
    } finally {
      await page.close(); // Siempre cerrar la pestaña para limpiar memoria
    }
  }

  await browser.close();

  // Guardar datos en archivo local
  const outputDir = path.join(__dirname, '../data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'static-games-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`\n🎉 ¡Scraping completado! Datos guardados exitosamente en:`);
  console.log(`-> ${outputPath}`);
}

scrapeStaticData().catch(console.error);
