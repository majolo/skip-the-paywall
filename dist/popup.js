"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
(_a = document.getElementById('unblock-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if ((_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.url) {
            const currentUrl = tabs[0].url;
            const archiveUrl = `https://archive.is/${currentUrl}`;
            try {
                // Fetch the HTML content of the current URL
                const response = yield fetch(archiveUrl);
                const htmlText = yield response.text();
                // Parse the HTML string into a DOM-like structure
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');
                // Find the first href inside the TEXT-BLOCK class
                const textBlock = doc.querySelector('.TEXT-BLOCK');
                const firstHref = (_b = textBlock === null || textBlock === void 0 ? void 0 : textBlock.querySelector('a')) === null || _b === void 0 ? void 0 : _b.getAttribute('href');
                if (firstHref) {
                    console.log('First href found:', firstHref);
                    // Redirect to the archive URL
                    chrome.tabs.update(tabs[0].id, { url: firstHref });
                    // If you want to return or use the href elsewhere, you can do it here
                    return firstHref;
                }
                else {
                    console.log('No href found in the TEXT-BLOCK class.');
                }
            }
            catch (error) {
                console.error('Error fetching or parsing the page:', error);
            }
        }
    }));
});
