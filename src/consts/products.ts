export interface IProductRecord {
  id: number,
  image: string;
  name: string;
  price: number;
  description: string;
}

const PRODUCTS: IProductRecord[] = [
  {
    id: 1,
    image: '/images/camera-sony.webp',
    name: 'Camera Sony',
    price: 100,
    description: 'Compact Sony camera. Perfect for travel and casual photography.',
  },
  {
    id: 2,
    image: '/images/headphone-dt900.webp',
    name: 'Headphone DT900',
    price: 7,
    description: 'High-quality audio with deep bass and comfortable fit.',
  },
  {
    id: 3,
    image: '/images/headphone-pink.webp',
    name: 'Headphone Pink',
    price: 13,
    description: 'Stylish pink headphones for everyday music listening.',
  },
  {
    id: 4,
    image: '/images/headset.webp',
    name: 'Headset',
    price: 11,
    description: 'Versatile headset for gaming, calls, and music.',
  },
  {
    id: 5,
    image: '/images/microphone-saramonic.webp',
    name: 'Microphone Saramonic',
    price: 5,
    description: 'Compact microphone for video recording and streaming.',
  },
  {
    id: 6,
    image: '/images/monitor-acer.webp',
    name: 'Monitor Acer',
    price: 14,
    description: 'Affordable Acer monitor for home office and gaming setup.',
  },
  {
    id: 7,
    image: '/images/smartphone-samsung.webp',
    name: 'Smartphone Samsung',
    price: 6,
    description: 'Compact Samsung smartphone with sleek design and features.',
  },
];


export default PRODUCTS;
