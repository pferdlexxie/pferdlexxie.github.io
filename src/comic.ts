import { formatDistanceToNow } from 'date-fns';

interface Comic {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

const email: string = 'a.kuzmich@innopolis.university';
const apiUrl: string = `https://fwd.innopolis.university/api/hw2?email=${email}`;

function refreshComic() {
  fetch(apiUrl)
    .then((response: Response) => response.text())
    .then((text: string) => {
      const trimmedText: string = text.trim();
      const number: number = parseFloat(trimmedText);
      const comicUrl: string = `https://fwd.innopolis.university/api/comic?id=${number}`;

      return fetch(comicUrl);
    })
    .then((response: Response) => response.json())
    .then((comicData: Comic) => {
      const imageUrl: string = comicData.img;
      const title: string = comicData.safe_title;
      const altText: string = comicData.alt;
      const publicationDate: Date = new Date(
        parseInt(comicData.year),
        parseInt(comicData.month) - 1,
        parseInt(comicData.day)
      );

      const comicImageElement: HTMLImageElement | null = document.getElementById(
        'comic-image'
      ) as HTMLImageElement;
      const comicTitleElement: HTMLElement | null = document.getElementById('comic-title');
      const comicDateElement: HTMLElement | null = document.getElementById('comic-date');
      const comicDateReleasedElement: HTMLElement | null = document.getElementById(
        'comic-date-released'
      );

      if (comicImageElement) {
        comicImageElement.src = imageUrl;
        comicImageElement.alt = altText;
      }

      if (comicTitleElement) {
        comicTitleElement.innerHTML = title;
      }

      if (comicDateElement) {
        comicDateElement.textContent = publicationDate.toLocaleDateString();
      }

      if (comicDateReleasedElement) {
        const currentDate = new Date();
        const timeSinceRelease = formatDistanceToNow(publicationDate, { addSuffix: true });
        comicDateReleasedElement.textContent = `Released ${timeSinceRelease}`;
      }
    });
}

refreshComic();
