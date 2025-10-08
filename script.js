document.addEventListener('DOMContentLoaded', function() {
    const downloadCurrentButton = document.getElementById('downloadCurrentKillfeed');
    const downloadMultipleButton = document.getElementById('downloadMultipleKillfeeds');
    const downloadAllButton = document.getElementById('downloadAllKillfeeds');
    const killfeedTabs = document.querySelectorAll('.killfeed-tab');
    const copyButton = document.getElementById('copySettings');
    const pasteButton = document.getElementById('pasteSettings');
    const downloadOptions = document.getElementById('downloadOptions');
    const confirmDownloadButton = document.getElementById('confirmDownload');
    
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
    let clipboard = null;
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
    
    // Funkcja zapisywania ustawień do localStorage
    function saveToLocalStorage() {
        const data = {
            settings: killfeedSettings,
            timestamp: Date.now()
        };
        localStorage.setItem('killfeedGenerator', JSON.stringify(data));
    }
    
    // Funkcja wczytywania ustawień z localStorage
    function loadFromLocalStorage() {
        const data = localStorage.getItem('killfeedGenerator');
        if (data) {
            const parsedData = JSON.parse(data);
            const now = Date.now();
            // Sprawdź czy dane są starsze niż 5 minut (300000 ms)
            if (now - parsedData.timestamp < 300000) {
                // Wczytaj ustawienia
                Object.keys(parsedData.settings).forEach(key => {
                    killfeedSettings[key] = parsedData.settings[key];
                });
                return true;
            } else {
                // Usuń przestarzałe dane
                localStorage.removeItem('killfeedGenerator');
            }
        }
        return false;
    }
    
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
        
        // Zapisz do localStorage
        saveToLocalStorage();
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
    
    // Funkcja generująca HTML killfeeda na podstawie ustawień
    function generateKillfeedHTML(settings) {
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
        
        return killfeedHTML;
    }
    
    // Funkcja aktualizująca podgląd
    function updatePreview() {
        saveCurrentSettings();
        
        const settings = killfeedSettings[currentKillfeed];
        const killfeedHTML = generateKillfeedHTML(settings);
        
        // Aktualizacja podglądu
        document.getElementById('killfeedPreview').innerHTML = killfeedHTML;
    }
    
    // Funkcja kopiowania ustawień
    function copySettings() {
        saveCurrentSettings();
        clipboard = JSON.parse(JSON.stringify(killfeedSettings[currentKillfeed]));
        alert('Ustawienia killfeeda ' + currentKillfeed + ' zostały skopiowane!');
    }
    
    // Funkcja wklejania ustawień
    function pasteSettings() {
        if (clipboard) {
            killfeedSettings[currentKillfeed] = JSON.parse(JSON.stringify(clipboard));
            loadCurrentSettings();
            updatePreview();
            alert('Ustawienia zostały wklejone do killfeeda ' + currentKillfeed + '!');
        } else {
            alert('Brak skopiowanych ustawień! Najpierw skopiuj ustawienia z innego killfeeda.');
        }
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
    
    // Funkcja pobierania wybranych killfeedów
    function downloadSelectedKillfeeds() {
        const selectedCheckboxes = document.querySelectorAll('.killfeed-checkboxes input[type="checkbox"]:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Wybierz przynajmniej jeden killfeed do pobrania!');
            return;
        }
        
        const selectedKillfeeds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.value));
        downloadMultipleKillfeeds(selectedKillfeeds);
    }
    
    // Funkcja pobierania wielu killfeedów
    function downloadMultipleKillfeeds(killfeedNumbers) {
        if (typeof html2canvas === 'undefined') {
            alert('Błąd: Biblioteka html2canvas nie została załadowana. Spróbuj odświeżyć stronę.');
            return;
        }
        
        // Zapisz aktualne ustawienia
        saveCurrentSettings();
        
        // Pobierz oryginalny stan
        const originalKillfeed = currentKillfeed;
        let downloadCount = 0;
        const totalCount = killfeedNumbers.length;
        
        // Funkcja do pobierania kolejnego killfeeda
        function downloadNextKillfeed() {
            if (downloadCount >= totalCount) {
                // Przywróć oryginalny killfeed
                currentKillfeed = originalKillfeed;
                loadCurrentSettings();
                updatePreview();
                return;
            }
            
            const killfeedNumber = killfeedNumbers[downloadCount];
            const settings = killfeedSettings[killfeedNumber];
            
            // Generuj HTML dla killfeeda
            const killfeedHTML = generateKillfeedHTML(settings);
            
            // Stwórz tymczasowy element
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = killfeedHTML;
            const killfeedElement = tempDiv.firstChild;
            
            // Dodaj do dokumentu (ukryty)
            killfeedElement.style.position = 'absolute';
            killfeedElement.style.left = '-9999px';
            document.body.appendChild(killfeedElement);
            
            const scale = parseInt(downloadSize.value);
            
            // Wygeneruj obraz
            html2canvas(killfeedElement, {
                backgroundColor: null,
                scale: scale,
                logging: false,
                useCORS: true,
                allowTaint: false
            }).then(canvas => {
                // Usuń element z dokumentu
                document.body.removeChild(killfeedElement);
                
                // Tworzenie linku do pobrania
                const link = document.createElement('a');
                link.download = `killfeed-${killfeedNumber}-${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Przejdź do następnego killfeeda
                downloadCount++;
                setTimeout(downloadNextKillfeed, 500); // Małe opóźnienie między pobraniami
            }).catch(error => {
                console.error('Błąd podczas generowania obrazu:', error);
                alert('Wystąpił błąd podczas generowania killfeeda ' + killfeedNumber + '. Spróbuj ponownie.');
                
                // Usuń element z dokumentu
                document.body.removeChild(killfeedElement);
                
                // Przejdź do następnego killfeeda
                downloadCount++;
                setTimeout(downloadNextKillfeed, 500);
            });
        }
        
        // Rozpocznij pobieranie
        downloadNextKillfeed();
    }
    
    // Funkcja pobierania wszystkich killfeedów
    function downloadAllKillfeeds() {
        downloadMultipleKillfeeds([1, 2, 3, 4, 5]);
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
            allowTaint: false
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
    
    // Obsługa przycisków kopiuj/wklej
    copyButton.addEventListener('click', copySettings);
    pasteButton.addEventListener('click', pasteSettings);
    
    // Obsługa przycisku pobierania wielu killfeedów
    downloadMultipleButton.addEventListener('click', function() {
        downloadOptions.style.display = downloadOptions.style.display === 'none' ? 'block' : 'none';
    });
    
    // Obsługa przycisku potwierdzenia pobierania wybranych killfeedów
    confirmDownloadButton.addEventListener('click', function() {
        downloadOptions.style.display = 'none';
        downloadSelectedKillfeeds();
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
    
    // Inicjalizacja - wczytaj ustawienia z localStorage
    const settingsLoaded = loadFromLocalStorage();
    if (settingsLoaded) {
        console.log('Ustawienia zostały wczytane z pamięci');
    }
    
    // Inicjalizacja podglądu
    loadCurrentSettings();
    updatePreview();
});
