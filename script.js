document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadKillfeed');
    
    // Pobieranie wszystkich elementów formularza
    const feedType = document.getElementById('feedType');
    const killerName = document.getElementById('killerName');
    const killerTeam = document.getElementById('killerTeam');
    const killedName = document.getElementById('killedName');
    const killedTeam = document.getElementById('killedTeam');
    const weapon = document.getElementById('weapon');
    const headshot = document.getElementById('headshot');
    const wallbang = document.getElementById('wallbang');
    const noscope = document.getElementById('noscope');
    const smoke = document.getElementById('smoke');
    const fontFamily = document.getElementById('fontFamily');
    const downloadSize = document.getElementById('downloadSize');
    const boldKiller = document.getElementById('boldKiller');
    const boldKilled = document.getElementById('boldKilled');
    
    // Funkcja aktualizująca podgląd
    function updatePreview() {
        const feedTypeValue = feedType.value;
        const killerNameValue = killerName.value;
        const killerTeamValue = killerTeam.value;
        const killedNameValue = killedName.value;
        const killedTeamValue = killedTeam.value;
        const weaponValue = weapon.value;
        const headshotValue = headshot.checked;
        const wallbangValue = wallbang.checked;
        const noscopeValue = noscope.checked;
        const smokeValue = smoke.checked;
        const fontFamilyValue = fontFamily.value;
        const boldKillerValue = boldKiller.checked;
        const boldKilledValue = boldKilled.checked;
        
        // Tworzenie HTML dla killfeeda
        let killfeedHTML = '';
        
        if (feedTypeValue === 'killFeed') {
            killfeedHTML = `<div class="killFeed" style="font-family: '${fontFamilyValue}', sans-serif;">`;
        } else {
            killfeedHTML = `<div class="killFeedDead" style="font-family: '${fontFamilyValue}', sans-serif;">`;
        }
        
        // Dodanie zabójcy z opcją pogrubienia
        if (killerTeamValue === 'CT') {
            killfeedHTML += `<a href="" class="killerCT ${boldKillerValue ? 'bold' : ''}">${killerNameValue}</a>`;
        } else {
            killfeedHTML += `<a href="" class="killerTT ${boldKillerValue ? 'bold' : ''}">${killerNameValue}</a>`;
        }
        
        // Dodanie broni
        killfeedHTML += `<div class="weapon ${weaponValue}"></div>`;
        
        // Dodanie dodatkowych elementów z optymalizacją, aby się nie nakładały
        // Ustawiamy kolejność: smoke, noscope, wallbang, headshot
        if (smokeValue) {
            killfeedHTML += `<div class="smoke"></div>`;
        }
        
        if (noscopeValue) {
            killfeedHTML += `<div class="noscope"></div>`;
        }
        
        if (wallbangValue) {
            killfeedHTML += `<div class="wallbang"></div>`;
        }
        
        if (headshotValue) {
            killfeedHTML += `<div class="hs"></div>`;
        }
        
        // Dodanie ofiary z opcją pogrubienia
        if (killedTeamValue === 'CT') {
            killfeedHTML += `<a href="" class="killedCT ${boldKilledValue ? 'bold' : ''}">${killedNameValue}</a>`;
        } else {
            killfeedHTML += `<a href="" class="killedTT ${boldKilledValue ? 'bold' : ''}">${killedNameValue}</a>`;
        }
        
        killfeedHTML += `</div>`;
        
        // Aktualizacja podglądu
        document.getElementById('killfeedPreview').innerHTML = killfeedHTML;
    }
    
    // Funkcja pobierania killfeeda jako obraz
    function downloadKillfeed() {
        const killfeedElement = document.getElementById('killfeedPreview').firstChild;
        const scale = parseInt(downloadSize.value);
        
        // Pobieranie html2canvas dynamicznie, aby uniknąć problemów z ładowaniem
        if (typeof html2canvas === 'undefined') {
            // Jeśli html2canvas nie jest załadowany, ładujemy go dynamicznie
            const script = document.createElement('script');
            script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
            script.onload = function() {
                // Po załadowaniu biblioteki, wykonujemy pobieranie
                generateAndDownloadImage(killfeedElement, scale);
            };
            document.head.appendChild(script);
        } else {
            // Jeśli html2canvas jest już dostępny, wykonujemy pobieranie
            generateAndDownloadImage(killfeedElement, scale);
        }
    }
    
    // Funkcja generująca i pobierająca obraz
    function generateAndDownloadImage(element, scale) {
        html2canvas(element, {
            backgroundColor: null,
            scale: scale,
            logging: false,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            // Tworzenie linku do pobrania
            const link = document.createElement('a');
            link.download = `killfeed-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(error => {
            console.error('Błąd podczas generowania obrazu:', error);
            alert('Wystąpił błąd podczas generowania obrazu. Spróbuj ponownie.');
        });
    }
    
    // Dodanie event listenerów do wszystkich elementów formularza
    const formElements = [
        feedType, killerName, killerTeam, killedName, killedTeam, weapon, 
        headshot, wallbang, noscope, smoke, fontFamily, downloadSize,
        boldKiller, boldKilled
    ];
    
    formElements.forEach(element => {
        element.addEventListener('input', updatePreview);
        element.addEventListener('change', updatePreview);
    });
    
    // Event listener dla przycisku pobierania
    downloadButton.addEventListener('click', downloadKillfeed);
    
    // Inicjalizacja podglądu
    updatePreview();
});
