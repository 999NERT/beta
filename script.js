document.addEventListener('DOMContentLoaded', function() {
    const downloadCurrentButton = document.getElementById('downloadCurrentKillfeed');
    const downloadAllButton = document.getElementById('downloadAllKillfeeds');
    const killfeedTabs = document.querySelectorAll('.killfeed-tab');
    
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
    const boldFont = document.getElementById('boldFont');
    
    // Zmienne do przechowywania ustawień dla 5 killfeedów
    let currentKillfeed = 1;
    const killfeedSettings = {
        1: {
            feedType: 'killFeed',
            killerName: '',
            killerTeam: 'CT',
            killedName: '',
            killedTeam: 'TT',
            weapon: 'ak47',
            headshot: false,
            wallbang: false,
            noscope: false,
            smoke: false,
            fontFamily: 'Arial',
            boldFont: false
        },
        2: {
            feedType: 'killFeed',
            killerName: '',
            killerTeam: 'CT',
            killedName: '',
            killedTeam: 'TT',
            weapon: 'ak47',
            headshot: false,
            wallbang: false,
            noscope: false,
            smoke: false,
            fontFamily: 'Arial',
            boldFont: false
        },
        3: {
            feedType: 'killFeed',
            killerName: '',
            killerTeam: 'CT',
            killedName: '',
            killedTeam: 'TT',
            weapon: 'ak47',
            headshot: false,
            wallbang: false,
            noscope: false,
            smoke: false,
            fontFamily: 'Arial',
            boldFont: false
        },
        4: {
            feedType: 'killFeed',
            killerName: '',
            killerTeam: 'CT',
            killedName: '',
            killedTeam: 'TT',
            weapon: 'ak47',
            headshot: false,
            wallbang: false,
            noscope: false,
            smoke: false,
            fontFamily: 'Arial',
            boldFont: false
        },
        5: {
            feedType: 'killFeed',
            killerName: '',
            killerTeam: 'CT',
            killedName: '',
            killedTeam: 'TT',
            weapon: 'ak47',
            headshot: false,
            wallbang: false,
            noscope: false,
            smoke: false,
            fontFamily: 'Arial',
            boldFont: false
        }
    };
    
    // Funkcja zapisująca ustawienia do aktualnego killfeeda
    function saveCurrentSettings() {
        killfeedSettings[currentKillfeed] = {
            feedType: feedType.value,
            killerName: killerName.value,
            killerTeam: killerTeam.value,
            killedName: killedName.value,
            killedTeam: killedTeam.value,
            weapon: weapon.value,
            headshot: headshot.checked,
            wallbang: wallbang.checked,
            noscope: noscope.checked,
            smoke: smoke.checked,
            fontFamily: fontFamily.value,
            boldFont: boldFont.checked
        };
    }
    
    // Funkcja wczytująca ustawienia z aktualnego killfeeda
    function loadCurrentSettings() {
        const settings = killfeedSettings[currentKillfeed];
        
        feedType.value = settings.feedType;
        killerName.value = settings.killerName;
        killerTeam.value = settings.killerTeam;
        killedName.value = settings.killedName;
        killedTeam.value = settings.killedTeam;
        weapon.value = settings.weapon;
        headshot.checked = settings.headshot;
        wallbang.checked = settings.wallbang;
        noscope.checked = settings.noscope;
        smoke.checked = settings.smoke;
        fontFamily.value = settings.fontFamily;
        boldFont.checked = settings.boldFont;
        
        // Aktualizacja numeru killfeeda w interfejsie
        document.getElementById('currentKillfeedNumber').textContent = currentKillfeed;
        document.getElementById('previewKillfeedNumber').textContent = currentKillfeed;
    }
    
    // Funkcja aktualizująca podgląd
    function updatePreview() {
        saveCurrentSettings();
        
        const settings = killfeedSettings[currentKillfeed];
        const killerNameValue = settings.killerName || "Zabójca";
        const killedNameValue = settings.killedName || "Ofiara";
        
        // Tworzenie HTML dla killfeeda
        let killfeedHTML = '';
        let boldClass = settings.boldFont ? ' bold-killfeed' : '';
        
        if (settings.feedType === 'killFeed') {
            killfeedHTML = `<div class="killFeed${boldClass}" style="font-family: '${settings.fontFamily}', sans-serif;">`;
        } else {
            killfeedHTML = `<div class="killFeedDead${boldClass}" style="font-family: '${settings.fontFamily}', sans-serif;">`;
        }
        
        // Dodanie zabójcy
        if (settings.killerTeam === 'CT') {
            killfeedHTML += `<a href="" class="killerCT">${killerNameValue}</a>`;
        } else {
            killfeedHTML += `<a href="" class="killerTT">${killerNameValue}</a>`;
        }
        
        // Dodanie broni
        killfeedHTML += `<div class="weapon ${settings.weapon}"></div>`;
        
        // Dodanie dodatkowych elementów
        if (settings.smoke) {
            killfeedHTML += `<div class="smoke"></div>`;
        }
        
        if (settings.noscope) {
            killfeedHTML += `<div class="noscope"></div>`;
        }
        
        if (settings.wallbang) {
            killfeedHTML += `<div class="wallbang"></div>`;
        }
        
        if (settings.headshot) {
            killfeedHTML += `<div class="hs"></div>`;
        }
        
        // Dodanie ofiary
        if (settings.killedTeam === 'CT') {
            killfeedHTML += `<a href="" class="killedCT">${killedNameValue}</a>`;
        } else {
            killfeedHTML += `<a href="" class="killedTT">${killedNameValue}</a>`;
        }
        
        killfeedHTML += `</div>`;
        
        // Aktualizacja podglądu
        document.getElementById('killfeedPreview').innerHTML = killfeedHTML;
    }
    
    // Funkcja pobierania aktualnego killfeeda jako obraz
    function downloadCurrentKillfeed() {
        const killfeedElement = document.getElementById('killfeedPreview').firstChild;
        const scale = parseInt(downloadSize.value);
        
        // Sprawdzenie, czy html2canvas jest dostępny
        if (typeof html2canvas === 'undefined') {
            alert('Błąd: Biblioteka html2canvas nie została załadowana. Spróbuj odświeżyć stronę.');
            return;
        }
        
        // Generowanie i pobieranie obrazu
        generateAndDownloadImage(killfeedElement, scale, `killfeed-${currentKillfeed}-${Date.now()}.png`);
    }
    
    // Funkcja pobierania wszystkich killfeedów
    function downloadAllKillfeeds() {
        if (typeof html2canvas === 'undefined') {
            alert('Błąd: Biblioteka html2canvas nie została załadowana. Spróbuj odświeżyć stronę.');
            return;
        }
        
        // Zapisz aktualne ustawienia
        saveCurrentSettings();
        
        // Pobierz oryginalny stan
        const originalKillfeed = currentKillfeed;
        const originalText = downloadAllButton.textContent;
        downloadAllButton.textContent = 'Generowanie...';
        downloadAllButton.disabled = true;
        
        // Stwórz kontener dla wszystkich killfeedów
        const container = document.createElement('div');
        container.style.padding = '20px';
        container.style.background = 'transparent';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '15px';
        container.style.alignItems = 'center';
        
        // Dodaj killfeedy do kontenera
        for (let i = 1; i <= 5; i++) {
            const settings = killfeedSettings[i];
            const killerNameValue = settings.killerName || "Zabójca";
            const killedNameValue = settings.killedName || "Ofiara";
            
            let killfeedHTML = '';
            let boldClass = settings.boldFont ? ' bold-killfeed' : '';
            
            if (settings.feedType === 'killFeed') {
                killfeedHTML = `<div class="killFeed${boldClass}" style="font-family: '${settings.fontFamily}', sans-serif;">`;
            } else {
                killfeedHTML = `<div class="killFeedDead${boldClass}" style="font-family: '${settings.fontFamily}', sans-serif;">`;
            }
            
            // Dodanie zabójcy
            if (settings.killerTeam === 'CT') {
                killfeedHTML += `<a href="" class="killerCT">${killerNameValue}</a>`;
            } else {
                killfeedHTML += `<a href="" class="killerTT">${killerNameValue}</a>`;
            }
            
            // Dodanie broni
            killfeedHTML += `<div class="weapon ${settings.weapon}"></div>`;
            
            // Dodanie dodatkowych elementów
            if (settings.smoke) {
                killfeedHTML += `<div class="smoke"></div>`;
            }
            
            if (settings.noscope) {
                killfeedHTML += `<div class="noscope"></div>`;
            }
            
            if (settings.wallbang) {
                killfeedHTML += `<div class="wallbang"></div>`;
            }
            
            if (settings.headshot) {
                killfeedHTML += `<div class="hs"></div>`;
            }
            
            // Dodanie ofiary
            if (settings.killedTeam === 'CT') {
                killfeedHTML += `<a href="" class="killedCT">${killedNameValue}</a>`;
            } else {
                killfeedHTML += `<a href="" class="killedTT">${killedNameValue}</a>`;
            }
            
            killfeedHTML += `</div>`;
            
            container.innerHTML += killfeedHTML;
        }
        
        // Dodaj kontener do dokumentu
        document.body.appendChild(container);
        
        const scale = parseInt(downloadSize.value);
        
        // Wygeneruj obraz
        html2canvas(container, {
            backgroundColor: null,
            scale: scale,
            logging: false,
            useCORS: true,
            allowTaint: false
        }).then(canvas => {
            // Usuń kontener z dokumentu
            document.body.removeChild(container);
            
            // Przywróć przycisk
            downloadAllButton.textContent = originalText;
            downloadAllButton.disabled = false;
            
            // Przywróć oryginalny killfeed
            currentKillfeed = originalKillfeed;
            loadCurrentSettings();
            updatePreview();
            
            // Tworzenie linku do pobrania
            const link = document.createElement('a');
            link.download = `wszystkie-killfeedy-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(error => {
            console.error('Błąd podczas generowania obrazu:', error);
            alert('Wystąpił błąd podczas generowania obrazu. Spróbuj ponownie.');
            
            // Usuń kontener z dokumentu
            document.body.removeChild(container);
            
            // Przywróć przycisk w przypadku błędu
            downloadAllButton.textContent = originalText;
            downloadAllButton.disabled = false;
            
            // Przywróć oryginalny killfeed
            currentKillfeed = originalKillfeed;
            loadCurrentSettings();
            updatePreview();
        });
    }
    
    // Funkcja generująca i pobierająca obraz
    function generateAndDownloadImage(element, scale, filename) {
        // Dodanie informacji o ładowaniu
        const originalText = downloadCurrentButton.textContent;
        downloadCurrentButton.textContent = 'Generowanie...';
        downloadCurrentButton.disabled = true;
        
        html2canvas(element, {
            backgroundColor: null,
            scale: scale,
            logging: false,
            useCORS: true,
            allowTaint: false,
            width: element.offsetWidth,
            height: element.offsetHeight
        }).then(canvas => {
            // Przywrócenie przycisku
            downloadCurrentButton.textContent = originalText;
            downloadCurrentButton.disabled = false;
            
            // Tworzenie linku do pobrania
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(error => {
            console.error('Błąd podczas generowania obrazu:', error);
            alert('Wystąpił błąd podczas generowania obrazu. Spróbuj ponownie.');
            
            // Przywrócenie przycisku w przypadku błędu
            downloadCurrentButton.textContent = originalText;
            downloadCurrentButton.disabled = false;
        });
    }
    
    // Obsługa przełączania między killfeedami
    killfeedTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Zapisz aktualne ustawienia
            saveCurrentSettings();
            
            // Usuń klasę active ze wszystkich zakładek
            killfeedTabs.forEach(t => t.classList.remove('active'));
            
            // Dodaj klasę active do klikniętej zakładki
            this.classList.add('active');
            
            // Ustaw nowy aktualny killfeed
            currentKillfeed = parseInt(this.getAttribute('data-killfeed'));
            
            // Wczytaj ustawienia nowego killfeeda
            loadCurrentSettings();
            
            // Zaktualizuj podgląd
            updatePreview();
        });
    });
    
    // Dodanie event listenerów do wszystkich elementów formularza
    const formElements = [
        feedType, killerName, killerTeam, killedName, killedTeam, weapon, 
        headshot, wallbang, noscope, smoke, fontFamily, downloadSize, boldFont
    ];
    
    formElements.forEach(element => {
        element.addEventListener('input', updatePreview);
        element.addEventListener('change', updatePreview);
    });
    
    // Event listener dla przycisków pobierania
    downloadCurrentButton.addEventListener('click', downloadCurrentKillfeed);
    downloadAllButton.addEventListener('click', downloadAllKillfeeds);
    
    // Inicjalizacja podglądu
    loadCurrentSettings();
    updatePreview();
});
