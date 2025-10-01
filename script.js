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
    
    // Elementy pozycjonowania
    const weaponTop = document.getElementById('weaponTop');
    const weaponRight = document.getElementById('weaponRight');
    const weaponLeft = document.getElementById('weaponLeft');
    const hsTop = document.getElementById('hsTop');
    const hsRight = document.getElementById('hsRight');
    const hsLeft = document.getElementById('hsLeft');
    const wbTop = document.getElementById('wbTop');
    const wbRight = document.getElementById('wbRight');
    const wbLeft = document.getElementById('wbLeft');
    
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
        
        // Pobieranie wartości pozycjonowania
        const weaponTopValue = weaponTop.value;
        const weaponRightValue = weaponRight.value;
        const weaponLeftValue = weaponLeft.value;
        const hsTopValue = hsTop.value;
        const hsRightValue = hsRight.value;
        const hsLeftValue = hsLeft.value;
        const wbTopValue = wbTop.value;
        const wbRightValue = wbRight.value;
        const wbLeftValue = wbLeft.value;
        
        // Tworzenie HTML dla killfeeda
        let killfeedHTML = '';
        
        if (feedTypeValue === 'killFeed') {
            killfeedHTML = `<div class="killFeed" style="font-family: '${fontFamilyValue}', sans-serif;">`;
        } else {
            killfeedHTML = `<div class="killFeedDead" style="font-family: '${fontFamilyValue}', sans-serif;">`;
        }
        
        // Dodanie zabójcy
        if (killerTeamValue === 'CT') {
            killfeedHTML += `<a href="" class="killerCT">${killerNameValue}</a>`;
        } else {
            killfeedHTML += `<a href="" class="killerTT">${killerNameValue}</a>`;
        }
        
        // Dodanie broni z dynamicznym pozycjonowaniem
        killfeedHTML += `<div class="weapon ${weaponValue}" style="margin: ${weaponTopValue}px ${weaponRightValue}px 0px ${weaponLeftValue}px;"></div>`;
        
        // Dodanie dodatkowych elementów z dynamicznym pozycjonowaniem
        if (headshotValue) {
            killfeedHTML += `<div class="hs" style="margin: ${hsTopValue}px ${hsRightValue}px 0px ${hsLeftValue}px;"></div>`;
        }
        
        if (wallbangValue) {
            killfeedHTML += `<div class="wallbang" style="margin: ${wbTopValue}px ${wbRightValue}px 0px ${wbLeftValue}px;"></div>`;
        }
        
        if (noscopeValue) {
            killfeedHTML += `<div class="noscope"></div>`;
        }
        
        if (smokeValue) {
            killfeedHTML += `<div class="smoke"></div>`;
        }
        
        // Dodanie ofiary
        if (killedTeamValue === 'CT') {
            killfeedHTML += `<a href="" class="killedCT">${killedNameValue}</a>`;
        } else {
            killfeedHTML += `<a href="" class="killedTT">${killedNameValue}</a>`;
        }
        
        killfeedHTML += `</div>`;
        
        // Aktualizacja podglądu
        document.getElementById('killfeedPreview').innerHTML = killfeedHTML;
    }
    
    // Funkcja pobierania killfeeda jako obraz
    function downloadKillfeed() {
        const killfeedElement = document.getElementById('killfeedPreview').firstChild;
        
        html2canvas(killfeedElement, {
            backgroundColor: null,
            scale: 2, // Wyższa rozdzielczość
            logging: false
        }).then(canvas => {
            // Tworzenie linku do pobrania
            const link = document.createElement('a');
            link.download = `killfeed-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }
    
    // Dodanie event listenerów do wszystkich elementów formularza
    const formElements = [
        feedType, killerName, killerTeam, killedName, killedTeam, weapon, 
        headshot, wallbang, noscope, smoke, fontFamily,
        weaponTop, weaponRight, weaponLeft, hsTop, hsRight, hsLeft,
        wbTop, wbRight, wbLeft
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
