export type BookType = {
  id: string;
  selfLink?: string;
  volumeInfo?: BookVolumeInfoType;
};

export type BookVolumeInfoType = {
  title?: string;
  subtitle?: string;
  authors?: string[];
  description?: string;
  pageCount?: number;
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
};
