"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var releaseTime = (0, date_fns_1.formatDistanceToNow)(new Date('2023-06-30'));
console.log("The comic was released ".concat(releaseTime, " ago"));
var comicImageElement = document.getElementById('comic-image');
var comicTitleElement = document.getElementById('comic-title');
var comicDateElement = document.getElementById('comic-date');
function refreshComic() {
    var email = 'a.kuzmich@innopolis.university';
    var apiUrl = "https://fwd.innopolis.university/api/hw2?email=".concat(email);
    fetch(apiUrl)
        .then(function (response) { return response.text(); })
        .then(function (text) {
        var trimmedText = text.trim();
        var number = parseFloat(trimmedText);
        var comicUrl = "https://fwd.innopolis.university/api/comic?id=".concat(number);
        return fetch(comicUrl);
    })
        .then(function (response) { return response.json(); })
        .then(function (comicData) {
        var imageUrl = comicData.img;
        var title = comicData.safe_title;
        var altText = comicData.alt;
        var publicationDate = new Date(comicData.year, comicData.month - 1, comicData.day);
        comicImageElement.src = imageUrl;
        comicImageElement.alt = altText;
        comicTitleElement.innerHTML = title;
        comicDateElement.textContent = publicationDate.toLocaleDateString();
    });
}
refreshComic();
