import { formatDistanceToNow } from 'date-fns';

const releaseTime: string = formatDistanceToNow(new Date('2023-06-30'));
console.log(`The comic was released ${releaseTime} ago`);

interface ComicData {
  img: string;
  safe_title: string;
  alt: string;
  year: number;
  month: number;
  day: number;
}

interface APIResponse {
  text: string;
  comicData: ComicData;
}

const comicImageElement: HTMLImageElement | null = document.getElementById('comic-image') as HTMLImageElement;
const comicTitleElement: HTMLSpanElement | null = document.getElementById('comic-title') as HTMLSpanElement;
const comicDateElement: HTMLSpanElement | null = document.getElementById('comic-date') as HTMLSpanElement;

function refreshComic(): void {
  const email: string = 'a.kuzmich@innopolis.university';
  const apiUrl: string = `https://fwd.innopolis.university/api/hw2?email=${email}`;

  fetch(apiUrl)
    .then((response: Response): Promise<APIResponse> => response.json() as Promise<APIResponse>)
    .then((data: APIResponse | null): void => {
      if (data && data.comicData) {
        const comicData: ComicData = data.comicData;
        const imageUrl: string = comicData.img || '';
        const title: string = comicData.safe_title || '';
        const altText: string = comicData.alt || '';
        const publicationDate: Date = new Date(comicData.year, comicData.month - 1, comicData.day);

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
      }
    })
    .catch((error: Error): void => {
      console.error('Error:', error);
    });
}

refreshComic();
